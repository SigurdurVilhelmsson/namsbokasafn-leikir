/**
 * ICE Table Calculator for Equilibrium Problems
 *
 * Provides utilities for:
 * - Setting up ICE tables from equilibrium data
 * - Solving for equilibrium concentrations
 * - Validating user inputs
 * - Calculating Q and comparing to K
 */

import type {
  Equilibrium,
  ICETableRow,
  ICETableProblem,
  ICESolveResult,
  ShiftDirection,
} from '../types';

/**
 * Create initial ICE table rows from an equilibrium and initial concentrations
 */
export function createICETable(
  equilibrium: Equilibrium,
  initialConcentrations: Record<string, number>
): ICETableRow[] {
  const rows: ICETableRow[] = [];

  // Add reactants
  for (const reactant of equilibrium.reactants) {
    rows.push({
      species: reactant.formula,
      coefficient: reactant.coefficient,
      phase: reactant.phase,
      initial: initialConcentrations[reactant.formula] ?? 0,
      change: 0, // Will be -coefficient * x
      equilibrium: 0,
    });
  }

  // Add products
  for (const product of equilibrium.products) {
    rows.push({
      species: product.formula,
      coefficient: product.coefficient,
      phase: product.phase,
      initial: initialConcentrations[product.formula] ?? 0,
      change: 0, // Will be +coefficient * x
      equilibrium: 0,
    });
  }

  return rows;
}

/**
 * Calculate the reaction quotient Q from current concentrations
 * Only includes species in gas (g) or aqueous (aq) phases
 */
export function calculateQ(
  equilibrium: Equilibrium,
  concentrations: Record<string, number>
): number {
  let numerator = 1;
  let denominator = 1;

  // Products in numerator
  for (const product of equilibrium.products) {
    if (product.phase === 'g' || product.phase === 'aq') {
      const conc = concentrations[product.formula] ?? 0;
      numerator *= Math.pow(conc, product.coefficient);
    }
  }

  // Reactants in denominator
  for (const reactant of equilibrium.reactants) {
    if (reactant.phase === 'g' || reactant.phase === 'aq') {
      const conc = concentrations[reactant.formula] ?? 0;
      denominator *= Math.pow(conc, reactant.coefficient);
    }
  }

  if (denominator === 0) return Infinity;
  return numerator / denominator;
}

/**
 * Determine shift direction by comparing Q to K
 */
export function getShiftDirection(Q: number, K: number): ShiftDirection {
  if (Q < K * 0.99) return 'right'; // Q < K, shift toward products
  if (Q > K * 1.01) return 'left'; // Q > K, shift toward reactants
  return 'none'; // At equilibrium
}

/**
 * Solve the ICE table for equilibrium concentrations
 *
 * For a general reaction: aA + bB ⇌ cC + dD
 * K = [C]^c [D]^d / [A]^a [B]^b
 *
 * With ICE:
 * [A]eq = [A]i - ax
 * [B]eq = [B]i - bx
 * [C]eq = [C]i + cx
 * [D]eq = [D]i + dx
 *
 * This uses Newton-Raphson iteration to solve for x
 */
export function solveICETable(
  problem: ICETableProblem,
  _language: 'is' | 'en' = 'is'
): ICESolveResult {
  const { equilibrium, K, initialConcentrations } = problem;
  const steps: string[] = [];
  const stepsIs: string[] = [];

  // Step 1: Calculate initial Q
  const Q0 = calculateQ(equilibrium, initialConcentrations);
  const direction = getShiftDirection(Q0, K);

  steps.push(`Initial Q = ${Q0.toExponential(2)}, K = ${K.toExponential(2)}`);
  stepsIs.push(`Upphafs Q = ${Q0.toExponential(2)}, K = ${K.toExponential(2)}`);

  if (direction === 'right') {
    steps.push('Q < K, so reaction shifts RIGHT toward products');
    stepsIs.push('Q < K, svo hvarfið færist TIL HÆGRI að myndefnum');
  } else if (direction === 'left') {
    steps.push('Q > K, so reaction shifts LEFT toward reactants');
    stepsIs.push('Q > K, svo hvarfið færist TIL VINSTRI að hvarfefnum');
  } else {
    steps.push('Q ≈ K, system is at equilibrium');
    stepsIs.push('Q ≈ K, kerfið er í jafnvægi');
  }

  // Step 2: Set up the equation
  // We'll solve K = products/reactants with ICE expressions
  const sign = direction === 'left' ? -1 : 1; // If shifting left, x is negative conceptually

  // Newton-Raphson to find x
  let x = 0;
  const maxIter = 100;
  const tolerance = 1e-10;

  // Build the K expression function and its derivative
  const getKExpression = (xVal: number): number => {
    let num = 1;
    let den = 1;

    for (const product of equilibrium.products) {
      if (product.phase === 'g' || product.phase === 'aq') {
        const init = initialConcentrations[product.formula] ?? 0;
        const eq = init + sign * product.coefficient * xVal;
        if (eq < 0) return Infinity; // Invalid
        num *= Math.pow(eq, product.coefficient);
      }
    }

    for (const reactant of equilibrium.reactants) {
      if (reactant.phase === 'g' || reactant.phase === 'aq') {
        const init = initialConcentrations[reactant.formula] ?? 0;
        const eq = init - sign * reactant.coefficient * xVal;
        if (eq < 0) return Infinity; // Invalid
        den *= Math.pow(eq, reactant.coefficient);
      }
    }

    if (den === 0) return Infinity;
    return num / den;
  };

  // Simple bisection method for robustness
  // Find bounds for x
  let xMin = 0;
  let xMax = findMaxX(equilibrium, initialConcentrations, sign);

  for (let i = 0; i < maxIter; i++) {
    const xMid = (xMin + xMax) / 2;
    const Kmid = getKExpression(xMid);

    if (Math.abs(Kmid - K) / K < tolerance) {
      x = xMid;
      break;
    }

    if ((Kmid < K && direction === 'right') || (Kmid > K && direction === 'left')) {
      xMin = xMid;
    } else {
      xMax = xMid;
    }

    if (i === maxIter - 1) {
      x = xMid; // Use best approximation
    }
  }

  // Step 3: Calculate equilibrium concentrations
  const equilibriumConcentrations: Record<string, number> = {};

  for (const product of equilibrium.products) {
    const init = initialConcentrations[product.formula] ?? 0;
    equilibriumConcentrations[product.formula] = init + sign * product.coefficient * x;
  }

  for (const reactant of equilibrium.reactants) {
    const init = initialConcentrations[reactant.formula] ?? 0;
    equilibriumConcentrations[reactant.formula] = init - sign * reactant.coefficient * x;
  }

  // Add step descriptions
  steps.push(`Solved for x = ${x.toFixed(4)} M`);
  stepsIs.push(`Leyst fyrir x = ${x.toFixed(4)} M`);

  for (const [species, conc] of Object.entries(equilibriumConcentrations)) {
    steps.push(`[${species}]eq = ${conc.toFixed(4)} M`);
    stepsIs.push(`[${species}]jafnv = ${conc.toFixed(4)} M`);
  }

  // Verify
  const Qfinal = calculateQ(equilibrium, equilibriumConcentrations);
  steps.push(`Verification: Q = ${Qfinal.toExponential(2)} ≈ K = ${K.toExponential(2)}`);
  stepsIs.push(`Staðfesting: Q = ${Qfinal.toExponential(2)} ≈ K = ${K.toExponential(2)}`);

  return {
    x: sign * x,
    equilibriumConcentrations,
    Q: Qfinal,
    shiftDirection: direction,
    steps,
    stepsIs,
  };
}

/**
 * Find the maximum value of x that keeps all concentrations non-negative
 */
function findMaxX(
  equilibrium: Equilibrium,
  initialConcentrations: Record<string, number>,
  sign: number
): number {
  let maxX = Infinity;

  // For products being consumed (sign = -1, left shift)
  if (sign < 0) {
    for (const product of equilibrium.products) {
      if (product.phase === 'g' || product.phase === 'aq') {
        const init = initialConcentrations[product.formula] ?? 0;
        const limit = init / product.coefficient;
        if (limit < maxX) maxX = limit;
      }
    }
  }

  // For reactants being consumed (sign = 1, right shift)
  if (sign > 0) {
    for (const reactant of equilibrium.reactants) {
      if (reactant.phase === 'g' || reactant.phase === 'aq') {
        const init = initialConcentrations[reactant.formula] ?? 0;
        const limit = init / reactant.coefficient;
        if (limit < maxX) maxX = limit;
      }
    }
  }

  return maxX * 0.9999; // Slightly less to avoid boundary issues
}

/**
 * Check if the 5% approximation is valid
 * (If x is less than 5% of the initial concentration)
 */
export function is5PercentApproximationValid(
  x: number,
  initialConcentrations: Record<string, number>
): { valid: boolean; maxPercent: number; species: string } {
  let maxPercent = 0;
  let species = '';

  for (const [s, init] of Object.entries(initialConcentrations)) {
    if (init > 0) {
      const percent = (Math.abs(x) / init) * 100;
      if (percent > maxPercent) {
        maxPercent = percent;
        species = s;
      }
    }
  }

  return {
    valid: maxPercent <= 5,
    maxPercent,
    species,
  };
}

/**
 * Validate user's ICE table input
 */
export function validateICEInput(
  userX: number,
  correctX: number,
  tolerance: number = 0.10
): { correct: boolean; percentError: number } {
  const percentError = Math.abs(userX - correctX) / Math.abs(correctX);
  return {
    correct: percentError <= tolerance,
    percentError: percentError * 100,
  };
}

/**
 * Format equilibrium expression (K expression) as a string
 */
export function formatKExpression(equilibrium: Equilibrium): string {
  const numParts: string[] = [];
  const denParts: string[] = [];

  for (const product of equilibrium.products) {
    if (product.phase === 'g' || product.phase === 'aq') {
      if (product.coefficient === 1) {
        numParts.push(`[${product.formula}]`);
      } else {
        numParts.push(`[${product.formula}]^${product.coefficient}`);
      }
    }
  }

  for (const reactant of equilibrium.reactants) {
    if (reactant.phase === 'g' || reactant.phase === 'aq') {
      if (reactant.coefficient === 1) {
        denParts.push(`[${reactant.formula}]`);
      } else {
        denParts.push(`[${reactant.formula}]^${reactant.coefficient}`);
      }
    }
  }

  const numerator = numParts.join(' × ') || '1';
  const denominator = denParts.join(' × ') || '1';

  return `K = ${numerator} / ${denominator}`;
}

/**
 * Build the ICE table change expressions as strings
 */
export function getChangeExpressions(
  equilibrium: Equilibrium,
  shiftRight: boolean = true
): Record<string, string> {
  const expressions: Record<string, string> = {};
  const sign = shiftRight ? '' : '-';
  const oppSign = shiftRight ? '-' : '+';

  for (const reactant of equilibrium.reactants) {
    if (reactant.coefficient === 1) {
      expressions[reactant.formula] = `${oppSign}x`;
    } else {
      expressions[reactant.formula] = `${oppSign}${reactant.coefficient}x`;
    }
  }

  for (const product of equilibrium.products) {
    if (product.coefficient === 1) {
      expressions[product.formula] = `${sign}+x`.replace('+-', '-').replace('++', '+');
    } else {
      expressions[product.formula] = `${sign}+${product.coefficient}x`
        .replace('+-', '-')
        .replace('++', '+');
    }
  }

  return expressions;
}
