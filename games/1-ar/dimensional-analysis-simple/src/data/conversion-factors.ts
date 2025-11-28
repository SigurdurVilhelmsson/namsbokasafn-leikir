// Conversion factors database
export interface ConversionFactor {
  from: string;
  to: string;
  factor: number;
  name: string;
}

export interface ConversionFactorsDB {
  length: ConversionFactor[];
  mass: ConversionFactor[];
  volume: ConversionFactor[];
  time: ConversionFactor[];
}

export const CONVERSION_FACTORS: ConversionFactorsDB = {
  length: [
    { from: 'm', to: 'cm', factor: 100, name: 'metrar í sentímetra' },
    { from: 'cm', to: 'm', factor: 0.01, name: 'sentímetrar í metra' },
    { from: 'km', to: 'm', factor: 1000, name: 'kílómetrar í metra' },
    { from: 'm', to: 'km', factor: 0.001, name: 'metrar í kílómetra' },
    { from: 'cm', to: 'mm', factor: 10, name: 'sentímetrar í millimetra' },
    { from: 'mm', to: 'cm', factor: 0.1, name: 'millímetrar í sentímetra' },
  ],
  mass: [
    { from: 'kg', to: 'g', factor: 1000, name: 'kílógrömm í grömm' },
    { from: 'g', to: 'kg', factor: 0.001, name: 'grömm í kílógrömm' },
    { from: 'g', to: 'mg', factor: 1000, name: 'grömm í milligrömm' },
    { from: 'mg', to: 'g', factor: 0.001, name: 'milligrömm í grömm' },
    { from: 'kg', to: 'mg', factor: 1000000, name: 'kílógrömm í milligrömm' },
  ],
  volume: [
    { from: 'L', to: 'mL', factor: 1000, name: 'lítrar í millilítra' },
    { from: 'mL', to: 'L', factor: 0.001, name: 'millilítrar í lítra' },
    { from: 'L', to: 'cm³', factor: 1000, name: 'lítrar í teningsentímetra' },
    { from: 'm³', to: 'L', factor: 1000, name: 'teningmetrar í lítra' },
  ],
  time: [
    { from: 'h', to: 'min', factor: 60, name: 'klukkustundir í mínútur' },
    { from: 'min', to: 's', factor: 60, name: 'mínútur í sekúndur' },
    { from: 'h', to: 's', factor: 3600, name: 'klukkustundir í sekúndur' },
    { from: 's', to: 'min', factor: 1/60, name: 'sekúndur í mínútur' },
    { from: 'min', to: 'h', factor: 1/60, name: 'mínútur í klukkustundir' },
  ],
};
