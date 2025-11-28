export const CHEMICALS = {
  simple: [
    { name: 'NaCl', molarMass: 58.5, displayName: 'NaCl (borðsalt)' },
    { name: 'glúkósa', formula: 'C₆H₁₂O₆', molarMass: 180, displayName: 'glúkósa (C₆H₁₂O₆)' },
    { name: 'H₂O₂', molarMass: 34, displayName: 'H₂O₂ (vetursperoxíð)' }
  ],
  medium: [
    { name: 'NaOH', molarMass: 40, displayName: 'NaOH (natríumhýdroxíð)' },
    { name: 'CaCl₂', molarMass: 111, displayName: 'CaCl₂ (kalsíumklóríð)' },
    { name: 'HCl', molarMass: 36.5, displayName: 'HCl (saltsýra)' }
  ],
  hard: [
    { name: 'KNO₃', molarMass: 101, displayName: 'KNO₃ (kalíumnitrat)' },
    { name: 'MgSO₄', molarMass: 120, displayName: 'MgSO₄ (magnesíumsúlfat)' },
    { name: 'H₂SO₄', molarMass: 98, displayName: 'H₂SO₄ (brennisteinssýra)' }
  ]
} as const;
