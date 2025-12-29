/**
 * AnimatedMolecule - Main component for rendering molecules with animations
 *
 * A flexible, SVG-based molecule visualization component that supports:
 * - Multiple rendering modes (simple, lewis, vsepr, organic)
 * - Entrance animations with accessibility support
 * - Interactive atom/bond clicking
 * - Highlighting for selected atoms/bonds
 * - Size variants
 */

import { useMemo } from 'react';
import type { AnimatedMoleculeProps } from '@shared/types';
import { MoleculeAtom, MoleculeAtomDefs } from './MoleculeAtom';
import { MoleculeBond, MoleculeBondDefs } from './MoleculeBond';
import { MoleculeLonePair, MoleculeLonePairDefs, calculateLonePairAngles } from './MoleculeLonePair';
import {
  calculateAtomPositions,
  calculateBondEndpoints,
  calculateAngle,
  getElementVisual,
  getSizeConfig,
  ensureAtomIds,
  getDepthStyle,
} from './molecule.utils';
import { GEOMETRY_COORDS, ANIMATION_DURATIONS } from './molecule.constants';

export function AnimatedMolecule({
  molecule,
  mode = 'simple',
  size = 'md',
  animation = 'fade-in',
  animationDuration,
  showLonePairs = false,
  showFormalCharges = true,
  showPartialCharges = false,
  showDipoleMoment: _showDipoleMoment = false, // TODO: Phase 4
  showAtomLabels = false,
  interactive = false,
  onAtomClick,
  onBondClick,
  highlightedAtoms = [],
  highlightedBonds = [],
  className = '',
  reducedMotion = false,
  ariaLabel,
}: AnimatedMoleculeProps) {
  // Get size configuration
  const sizeConfig = getSizeConfig(size);
  const { width, height, atomRadius, bondWidth, fontSize } = sizeConfig;

  // Ensure all atoms have IDs
  const atomsWithIds = useMemo(() => ensureAtomIds(molecule.atoms), [molecule.atoms]);

  // Calculate atom positions
  const atomPositions = useMemo(
    () => calculateAtomPositions(
      { ...molecule, atoms: atomsWithIds },
      width,
      height,
      atomRadius
    ),
    [molecule, atomsWithIds, width, height, atomRadius]
  );

  // Calculate animation timing
  const baseDuration = animationDuration || ANIMATION_DURATIONS.normal;
  const atomDelay = animation === 'build' ? baseDuration / atomsWithIds.length : 0;
  const bondDelay = animation === 'build' ? baseDuration : 0;
  const bondDelayIncrement = animation === 'build' ? baseDuration / Math.max(molecule.bonds.length, 1) : 0;
  const lonePairDelay = animation === 'build' ? baseDuration * 2 : baseDuration;

  // Calculate bond angles for each atom (needed for lone pair positioning)
  const atomBondAngles = useMemo(() => {
    const angles = new Map<string, number[]>();

    for (const atom of atomsWithIds) {
      const atomPos = atomPositions.get(atom.id);
      if (!atomPos) continue;

      const bondAnglesForAtom: number[] = [];

      for (const bond of molecule.bonds) {
        if (bond.from === atom.id) {
          const otherPos = atomPositions.get(bond.to);
          if (otherPos) {
            bondAnglesForAtom.push(calculateAngle(atomPos, otherPos));
          }
        } else if (bond.to === atom.id) {
          const otherPos = atomPositions.get(bond.from);
          if (otherPos) {
            bondAnglesForAtom.push(calculateAngle(atomPos, otherPos));
          }
        }
      }

      angles.set(atom.id, bondAnglesForAtom);
    }

    return angles;
  }, [atomsWithIds, atomPositions, molecule.bonds]);

  // Get 3D depth info for VSEPR mode
  const depthInfo = useMemo(() => {
    if (mode !== 'vsepr' || !molecule.geometry) return new Map<string, { opacity: number; scale: number }>();

    const coords3D = GEOMETRY_COORDS[molecule.geometry];
    if (!coords3D) return new Map();

    const info = new Map<string, { opacity: number; scale: number }>();

    // First atom is central - full opacity
    if (atomsWithIds.length > 0) {
      info.set(atomsWithIds[0].id, { opacity: 1, scale: 1 });
    }

    // Remaining atoms get depth-based styling
    for (let i = 1; i < atomsWithIds.length && i <= coords3D.length; i++) {
      const z = coords3D[i - 1].z;
      info.set(atomsWithIds[i].id, getDepthStyle(z));
    }

    return info;
  }, [mode, molecule.geometry, atomsWithIds]);

  // Handle atom click
  const handleAtomClick = (atomId: string) => {
    if (!interactive || !onAtomClick) return;
    const atom = atomsWithIds.find(a => a.id === atomId);
    onAtomClick({ type: 'atom', atomId, atom });
  };

  // Handle bond click
  const handleBondClick = (bondIndex: number) => {
    if (!interactive || !onBondClick) return;
    const bond = molecule.bonds[bondIndex];
    onBondClick({ type: 'bond', bondIndex, bond });
  };

  // Render bonds
  const renderedBonds = molecule.bonds.map((bond, index) => {
    const fromPos = atomPositions.get(bond.from);
    const toPos = atomPositions.get(bond.to);

    if (!fromPos || !toPos) return null;

    // Get atom radii for bond endpoint calculation
    const fromAtom = atomsWithIds.find(a => a.id === bond.from);
    const toAtom = atomsWithIds.find(a => a.id === bond.to);
    const fromRadius = atomRadius * (fromAtom ? getElementVisual(fromAtom.symbol).radius : 1);
    const toRadius = atomRadius * (toAtom ? getElementVisual(toAtom.symbol).radius : 1);

    // Calculate bond endpoints (just outside atom circles)
    const { start, end } = calculateBondEndpoints(fromPos, toPos, fromRadius, toRadius);

    return (
      <MoleculeBond
        key={`bond-${index}`}
        bond={bond}
        startPos={start}
        endPos={end}
        bondWidth={bondWidth}
        mode={mode}
        isHighlighted={highlightedBonds.includes(index) || bond.highlight}
        isInteractive={interactive}
        onClick={() => handleBondClick(index)}
        animationDelay={bondDelay + index * bondDelayIncrement}
        reducedMotion={reducedMotion || animation === 'none'}
      />
    );
  });

  // Render atoms
  const renderedAtoms = atomsWithIds.map((atom, index) => {
    const position = atomPositions.get(atom.id);
    if (!position) return null;

    const depth = depthInfo.get(atom.id) || { opacity: 1, scale: 1 };

    return (
      <MoleculeAtom
        key={atom.id}
        atom={atom}
        position={position}
        baseRadius={atomRadius}
        fontSize={fontSize}
        mode={mode}
        showLabel={showAtomLabels}
        showFormalCharge={showFormalCharges && mode === 'lewis'}
        showPartialCharge={showPartialCharges}
        isHighlighted={highlightedAtoms.includes(atom.id) || atom.highlight}
        isInteractive={interactive}
        onClick={() => handleAtomClick(atom.id)}
        animationDelay={index * atomDelay}
        reducedMotion={reducedMotion || animation === 'none'}
        depthOpacity={depth.opacity}
        depthScale={depth.scale}
      />
    );
  });

  // Generate accessible label
  const accessibleLabel = ariaLabel || `${molecule.name || molecule.formula} molecule with ${atomsWithIds.length} atoms and ${molecule.bonds.length} bonds`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`animated-molecule ${className}`}
      role="img"
      aria-label={accessibleLabel}
    >
      {/* SVG definitions for filters and animations */}
      <MoleculeAtomDefs />
      <MoleculeBondDefs />
      <MoleculeLonePairDefs />

      {/* Background (optional) */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="transparent"
        rx={8}
      />

      {/* Bonds layer (rendered first so atoms appear on top) */}
      <g className="molecule-bonds">
        {renderedBonds}
      </g>

      {/* Atoms layer */}
      <g className="molecule-atoms">
        {renderedAtoms}
      </g>

      {/* Lone pairs layer (Lewis mode only) */}
      {showLonePairs && mode === 'lewis' && (
        <g className="molecule-lone-pairs">
          {atomsWithIds.map((atom, atomIndex) => {
            if (!atom.lonePairs || atom.lonePairs === 0) return null;

            const position = atomPositions.get(atom.id);
            if (!position) return null;

            const bondAngles = atomBondAngles.get(atom.id) || [];
            const lonePairAngles = calculateLonePairAngles(bondAngles, atom.lonePairs);
            const visual = getElementVisual(atom.symbol);
            const radius = atomRadius * visual.radius;

            // Distance from atom center to lone pairs
            const lonePairDistance = radius + 8;

            return lonePairAngles.map((angle, lpIndex) => (
              <MoleculeLonePair
                key={`${atom.id}-lp-${lpIndex}`}
                atomPosition={position}
                angle={angle}
                distance={lonePairDistance}
                dotSize={Math.max(4, fontSize * 0.4)}
                animationDelay={lonePairDelay + atomIndex * 100 + lpIndex * 50}
                reducedMotion={reducedMotion || animation === 'none'}
              />
            ));
          })}
        </g>
      )}

      {/* TODO: Add dipole moment arrow in Phase 4 */}
    </svg>
  );
}

// Re-export sub-components for advanced usage
export { MoleculeAtom, MoleculeAtomDefs } from './MoleculeAtom';
export { MoleculeBond, MoleculeBondDefs } from './MoleculeBond';
