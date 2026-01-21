/**
 * MoleculeViewer3D - Three.js based 3D molecule visualization
 *
 * Uses @react-three/fiber and @react-three/drei for React integration
 * with Three.js. Supports ball-and-stick and space-fill rendering styles.
 */

import { Suspense, useMemo, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { MoleculeViewer3DProps, Atom3DProps, Bond3DProps } from './types';
import type { MoleculeAtom, MoleculeBond } from '../../types/molecule.types';
import { ELEMENT_VISUALS, DEFAULT_ELEMENT_VISUAL } from '../AnimatedMolecule/molecule.constants';

/**
 * Get element visual properties with fallback
 */
function getElementVisual(symbol: string) {
  return ELEMENT_VISUALS[symbol] || DEFAULT_ELEMENT_VISUAL;
}

/**
 * Calculate 3D positions for atoms based on bonds and geometry
 */
function calculateAtomPositions3D(
  atoms: MoleculeAtom[],
  bonds: MoleculeBond[]
): Map<string, [number, number, number]> {
  const positions = new Map<string, [number, number, number]>();

  if (atoms.length === 0) return positions;

  // Find central atom (most bonds)
  const bondCounts = new Map<string, number>();
  for (const bond of bonds) {
    bondCounts.set(bond.from, (bondCounts.get(bond.from) || 0) + 1);
    bondCounts.set(bond.to, (bondCounts.get(bond.to) || 0) + 1);
  }

  let centralAtom = atoms[0];
  let maxBonds = 0;
  for (const atom of atoms) {
    const count = bondCounts.get(atom.id) || 0;
    if (count > maxBonds) {
      maxBonds = count;
      centralAtom = atom;
    }
  }

  // Place central atom at origin
  positions.set(centralAtom.id, [0, 0, 0]);

  // Get atoms bonded to central atom
  const bondedAtomIds: string[] = [];
  for (const bond of bonds) {
    if (bond.from === centralAtom.id) {
      bondedAtomIds.push(bond.to);
    } else if (bond.to === centralAtom.id) {
      bondedAtomIds.push(bond.from);
    }
  }

  // Position bonded atoms using tetrahedral/other geometries
  const bondLength = 1.5;
  const tetrahedralAngle = (109.5 * Math.PI) / 180;

  bondedAtomIds.forEach((atomId, index) => {
    const theta = (2 * Math.PI * index) / bondedAtomIds.length;
    const phi = index === 0 ? 0 : tetrahedralAngle;

    const x = bondLength * Math.sin(phi) * Math.cos(theta);
    const y = bondLength * Math.cos(phi);
    const z = bondLength * Math.sin(phi) * Math.sin(theta);

    positions.set(atomId, [x, y, z]);
  });

  // Handle remaining atoms (simple radial placement)
  for (const atom of atoms) {
    if (!positions.has(atom.id)) {
      const angle = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = bondLength * 2;
      positions.set(atom.id, [
        r * Math.sin(phi) * Math.cos(angle),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(angle),
      ]);
    }
  }

  return positions;
}

/**
 * 3D Atom component
 */
function Atom3D({
  atom,
  position,
  radius,
  color,
  showLabel = false,
  interactive = false,
  onClick,
}: Atom3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const handleClick = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      onClick?.();
    },
    [onClick]
  );

  const handlePointerOver = useCallback(() => {
    if (interactive && meshRef.current) {
      document.body.style.cursor = 'pointer';
    }
  }, [interactive]);

  const handlePointerOut = useCallback(() => {
    if (interactive) {
      document.body.style.cursor = 'default';
    }
  }, [interactive]);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={interactive ? handleClick : undefined}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      {showLabel && (
        <Text
          position={[0, radius + 0.2, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {atom.symbol}
        </Text>
      )}
    </group>
  );
}

/**
 * 3D Bond component (cylinder between two points)
 */
function Bond3D({ start, end, radius, color }: Bond3DProps) {
  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];

  const direction = new THREE.Vector3(
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2]
  );
  const length = direction.length();

  // Calculate rotation to align cylinder with bond direction
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize()
  );

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius, length, 16]} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
    </mesh>
  );
}

/**
 * Scene content component (contains all 3D objects)
 */
function MoleculeScene({
  molecule,
  style = 'ball-stick',
  showLabels = false,
  onAtomClick,
}: Pick<MoleculeViewer3DProps, 'molecule' | 'style' | 'showLabels' | 'onAtomClick'>) {
  // Calculate 3D positions
  const atomPositions = useMemo(
    () => calculateAtomPositions3D(molecule.atoms, molecule.bonds),
    [molecule.atoms, molecule.bonds]
  );

  // Determine atom radius based on style
  const getAtomRadius = useCallback(
    (symbol: string) => {
      const visual = getElementVisual(symbol);
      if (style === 'space-fill') {
        return visual.radius * 0.8;
      }
      return visual.radius * 0.35;
    },
    [style]
  );

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />

      {/* Atoms */}
      {molecule.atoms.map((atom) => {
        const position = atomPositions.get(atom.id) || [0, 0, 0];
        const visual = getElementVisual(atom.symbol);
        const radius = getAtomRadius(atom.symbol);

        return (
          <Atom3D
            key={atom.id}
            atom={atom}
            position={position}
            radius={radius}
            color={visual.color}
            showLabel={showLabels}
            interactive={!!onAtomClick}
            onClick={() => onAtomClick?.(atom.id, atom)}
          />
        );
      })}

      {/* Bonds (only in ball-stick mode) */}
      {style === 'ball-stick' &&
        molecule.bonds.map((bond, index) => {
          const startPos = atomPositions.get(bond.from) || [0, 0, 0];
          const endPos = atomPositions.get(bond.to) || [0, 0, 0];

          return (
            <Bond3D
              key={`bond-${index}`}
              start={startPos}
              end={endPos}
              radius={0.08}
              color="#374151"
            />
          );
        })}
    </>
  );
}

/**
 * Loading fallback component
 */
function LoadingFallback({ text = 'Loading 3D viewer...' }: { text?: string }) {
  return (
    <Html center>
      <div className="text-gray-500 text-sm">{text}</div>
    </Html>
  );
}

/**
 * MoleculeViewer3D Component
 *
 * A 3D molecule visualization component using Three.js.
 * Supports orbital controls (rotate, zoom, pan) and multiple rendering styles.
 *
 * @example
 * ```tsx
 * <MoleculeViewer3D
 *   molecule={waterMolecule}
 *   style="ball-stick"
 *   showLabels
 *   autoRotate
 *   onAtomClick={(id, atom) => console.log('Clicked:', atom.symbol)}
 * />
 * ```
 */
export function MoleculeViewer3D({
  molecule,
  style = 'ball-stick',
  showLabels = false,
  autoRotate = false,
  autoRotateSpeed = 2,
  cameraPreset = 'default',
  onAtomClick,
  width = '100%',
  height = 300,
  backgroundColor = 'transparent',
  className = '',
  loadingFallback,
}: MoleculeViewer3DProps) {
  // Camera position based on preset
  const cameraPosition = useMemo((): [number, number, number] => {
    switch (cameraPreset) {
      case 'top':
        return [0, 5, 0];
      case 'front':
        return [0, 0, 5];
      case 'side':
        return [5, 0, 0];
      case 'default':
      default:
        return [3, 2, 3];
    }
  }, [cameraPreset]);

  return (
    <div
      className={`molecule-viewer-3d ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        backgroundColor,
      }}
    >
      <Canvas
        camera={{ position: cameraPosition, fov: 50 }}
        style={{ background: backgroundColor }}
      >
        <Suspense fallback={loadingFallback || <LoadingFallback />}>
          <MoleculeScene
            molecule={molecule}
            style={style}
            showLabels={showLabels}
            onAtomClick={onAtomClick}
          />
        </Suspense>
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}

export default MoleculeViewer3D;
