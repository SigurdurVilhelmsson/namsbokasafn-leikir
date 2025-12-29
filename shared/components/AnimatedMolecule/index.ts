/**
 * AnimatedMolecule - Shared molecule visualization component
 *
 * A flexible SVG-based component for rendering molecules across multiple games:
 * - Lewis Structures
 * - VSEPR Geometry
 * - Intermolecular Forces
 * - Organic Nomenclature
 * - Molar Mass
 *
 * @example
 * ```tsx
 * import { AnimatedMolecule } from '@shared/components';
 *
 * const water: Molecule = {
 *   id: 'h2o',
 *   formula: 'H₂O',
 *   name: 'Water',
 *   atoms: [
 *     { id: 'o1', symbol: 'O', lonePairs: 2 },
 *     { id: 'h1', symbol: 'H' },
 *     { id: 'h2', symbol: 'H' },
 *   ],
 *   bonds: [
 *     { from: 'o1', to: 'h1', type: 'single' },
 *     { from: 'o1', to: 'h2', type: 'single' },
 *   ],
 *   geometry: 'bent',
 * };
 *
 * <AnimatedMolecule
 *   molecule={water}
 *   mode="lewis"
 *   size="lg"
 *   showLonePairs
 *   animation="build"
 * />
 * ```
 */

// Main component
export { AnimatedMolecule } from './AnimatedMolecule';

// Sub-components (for advanced/custom usage)
export { MoleculeAtom, MoleculeAtomDefs } from './MoleculeAtom';
export { MoleculeBond, MoleculeBondDefs } from './MoleculeBond';
export { MoleculeLonePair, MoleculeLonePairDefs, calculateLonePairAngles } from './MoleculeLonePair';

// Constants and utilities
export { ELEMENT_VISUALS, SIZE_CONFIG, GEOMETRY_COORDS, MOLECULE_COLORS } from './molecule.constants';
export {
  getElementVisual,
  project3Dto2D,
  calculateAtomPositions,
  calculateBondEndpoints,
  getContrastTextColor,
} from './molecule.utils';

// Types are exported from @shared/types
// See: shared/types/molecule.types.ts
