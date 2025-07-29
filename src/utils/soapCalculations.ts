// Soap calculation functions based on fatty acid profiles
// Based on standard soap making formulas used by SoapCalc and other calculators

export interface FattyAcidProfile {
  lauric: number;      // C12:0
  myristic: number;    // C14:0
  palmitic: number;    // C16:0
  stearic: number;     // C18:0
  oleic: number;       // C18:1
  linoleic: number;    // C18:2
  linolenic: number;   // C18:3
  ricinoleic: number;  // C18:1OH
}

export interface SapValues {
  naoh: number;  // NaOH SAP value
  koh: number;   // KOH SAP value
}

export interface SoapProperties {
  hardness: number;
  cleansing: number;
  conditioning: number;
  bubbly: number;
  creamy: number;
  iodine: number;
  longevity: number;
  ins: number;
}

// Individual fatty acid SAP values (mg KOH/g)
export const FATTY_ACID_SAP_VALUES = {
  lauric: 268.0,
  myristic: 250.4,
  palmitic: 218.8,
  stearic: 197.7,
  oleic: 189.9,
  linoleic: 190.6,
  linolenic: 191.3,
  ricinoleic: 180.3,
};

// Individual fatty acid Iodine values
export const FATTY_ACID_IODINE_VALUES = {
  lauric: 0,
  myristic: 0,
  palmitic: 0,
  stearic: 0,
  oleic: 89.9,
  linoleic: 181.0,
  linolenic: 273.5,
  ricinoleic: 85.5,
};

/**
 * Calculate soap hardness
 * Formula: Lauric% + Myristic% + Palmitic% + Stearic%
 */
export function calculateHardness(profile: FattyAcidProfile): number {
  return profile.lauric + profile.myristic + profile.palmitic + profile.stearic;
}

/**
 * Calculate cleansing value
 * Formula: Lauric% + Myristic%
 */
export function calculateCleansing(profile: FattyAcidProfile): number {
  return profile.lauric + profile.myristic;
}

/**
 * Calculate conditioning value
 * Formula: Oleic% + Linoleic% + Linolenic% + Ricinoleic%
 */
export function calculateConditioning(profile: FattyAcidProfile): number {
  return profile.oleic + profile.linoleic + profile.linolenic + profile.ricinoleic;
}

/**
 * Calculate bubbly lather value
 * Formula: Lauric% + Myristic% + Ricinoleic%
 */
export function calculateBubbly(profile: FattyAcidProfile): number {
  return profile.lauric + profile.myristic + profile.ricinoleic;
}

/**
 * Calculate creamy lather value
 * Formula: Palmitic% + Stearic% + Ricinoleic%
 */
export function calculateCreamy(profile: FattyAcidProfile): number {
  return profile.palmitic + profile.stearic + profile.ricinoleic;
}

/**
 * Calculate Iodine value
 * Formula: Σ(% of fatty acid) × (Iodine Value of each fatty acid) / 100
 */
export function calculateIodineValue(profile: FattyAcidProfile): number {
  return (
    (profile.lauric * FATTY_ACID_IODINE_VALUES.lauric) +
    (profile.myristic * FATTY_ACID_IODINE_VALUES.myristic) +
    (profile.palmitic * FATTY_ACID_IODINE_VALUES.palmitic) +
    (profile.stearic * FATTY_ACID_IODINE_VALUES.stearic) +
    (profile.oleic * FATTY_ACID_IODINE_VALUES.oleic) +
    (profile.linoleic * FATTY_ACID_IODINE_VALUES.linoleic) +
    (profile.linolenic * FATTY_ACID_IODINE_VALUES.linolenic) +
    (profile.ricinoleic * FATTY_ACID_IODINE_VALUES.ricinoleic)
  ) / 100;
}

/**
 * Calculate SAP values for NaOH and KOH
 */
export function calculateSapValues(profile: FattyAcidProfile): SapValues {
  const kohSap = (
    (profile.lauric * FATTY_ACID_SAP_VALUES.lauric) +
    (profile.myristic * FATTY_ACID_SAP_VALUES.myristic) +
    (profile.palmitic * FATTY_ACID_SAP_VALUES.palmitic) +
    (profile.stearic * FATTY_ACID_SAP_VALUES.stearic) +
    (profile.oleic * FATTY_ACID_SAP_VALUES.oleic) +
    (profile.linoleic * FATTY_ACID_SAP_VALUES.linoleic) +
    (profile.linolenic * FATTY_ACID_SAP_VALUES.linolenic) +
    (profile.ricinoleic * FATTY_ACID_SAP_VALUES.ricinoleic)
  ) / 100;

  // Convert KOH SAP to NaOH SAP using molecular weight ratio
  // NaOH molecular weight: 40, KOH molecular weight: 56.1
  const naohSap = kohSap * (40 / 56.1);

  return {
    naoh: Math.round(naohSap * 1000) / 1000, // Round to 3 decimal places
    koh: Math.round(kohSap * 1000) / 1000
  };
}

/**
 * Calculate longevity (inverse of unsaturation)
 * Higher saturated fatty acids = longer lasting soap
 */
export function calculateLongevity(profile: FattyAcidProfile): number {
  // Longevity is primarily determined by saturated fatty acids
  return profile.palmitic + profile.stearic;
}

/**
 * Calculate INS value
 * Formula: SAP Value × 1000 - Iodine Value
 */
export function calculateINS(profile: FattyAcidProfile): number {
  const sapValues = calculateSapValues(profile);
  const iodineValue = calculateIodineValue(profile);
  
  // Use KOH SAP for INS calculation (standard practice)
  return Math.round((sapValues.koh * 1000) - iodineValue);
}

/**
 * Calculate all soap properties from fatty acid profile
 */
export function calculateAllSoapProperties(profile: FattyAcidProfile): SoapProperties {
  return {
    hardness: Math.round(calculateHardness(profile) * 100) / 100,
    cleansing: Math.round(calculateCleansing(profile) * 100) / 100,
    conditioning: Math.round(calculateConditioning(profile) * 100) / 100,
    bubbly: Math.round(calculateBubbly(profile) * 100) / 100,
    creamy: Math.round(calculateCreamy(profile) * 100) / 100,
    iodine: Math.round(calculateIodineValue(profile) * 100) / 100,
    longevity: Math.round(calculateLongevity(profile) * 100) / 100,
    ins: calculateINS(profile)
  };
}

/**
 * Calculate saturated, monounsaturated, and polyunsaturated fatty acid percentages
 */
export function calculateFattyAcidTypes(profile: FattyAcidProfile) {
  const saturated = profile.lauric + profile.myristic + profile.palmitic + profile.stearic;
  const monoUnsaturated = profile.oleic + profile.ricinoleic;
  const polyUnsaturated = profile.linoleic + profile.linolenic;
  
  const totalUnsaturated = monoUnsaturated + polyUnsaturated;
  const ratio = totalUnsaturated > 0 ? `${Math.round(saturated)}:${Math.round(totalUnsaturated)}` : `${Math.round(saturated)}:0`;
  
  return {
    saturated: Math.round(saturated * 100) / 100,
    monoUnsaturated: Math.round(monoUnsaturated * 100) / 100,
    polyUnsaturated: Math.round(polyUnsaturated * 100) / 100,
    saturatedUnsaturatedRatio: ratio
  };
}
