/**
 * Configuration constants and types for World-Sim TypeScript Package
 * Contains all configuration data with full type safety
 */

// Configuration interfaces
export interface YearRange {
  [key: number]: [number, number]; // milestone year -> [start, end] range
}

export interface CorrelationMatrix {
  [indicator: string]: {
    [influenced: string]: number;  // -1.0 to 1.0 influence factor
  };
}

export interface RateLimits {
  [indicator: string]: [number, number]; // [min, max] rate bounds
}

export interface TrendLimits {
  [indicator: string]: [number, number]; // [min, max] trend bounds  
}

export interface ConsequenceData {
  [indicator: string]: Record<number, number>; // year -> value
}

export interface ConsequenceScale {
  sign: number;                    // 1 or -1 for positive/negative correlation
  value: number;                   // scaling factor
  color_fct: (v: number) => string; // color mapping function
  limit: [number, number];         // [min, max] display bounds
}

export interface Consequences {
  data: ConsequenceData;
  scale: {
    [indicator: string]: ConsequenceScale;
  };
}

// CTrends
export interface ConsequenceTrends {
  [indicator: string]: { [year: number]: number };
}

// Configuration settings
export interface Config {
  enableCorrelationMatrix: boolean; // Toggle correlation matrix calculations on/off
}

// Global configuration
export const config: Config = {
  enableCorrelationMatrix: true // Default: correlation matrix enabled
};

// Years to fill - milestone year maps to range it affects
export const years_map: YearRange = {
  2025: [2025, 2039], 
  2040: [2040, 2054], 
  2055: [2055, 2069]
};

// Matrix conversion utility function
function matrixToObject<T extends string>(
  titles: readonly T[],
  matrix: number[][]
): Record<T, Record<T, number>> {
  const result: Partial<Record<T, Record<T, number>>> = {};

  titles.forEach((rowTitle, i) => {
    const row: Partial<Record<T, number>> = {};
    titles.forEach((colTitle, j) => {
      row[colTitle] = matrix[i][j];
    });
    result[rowTitle] = row as Record<T, number>;
  });

  return result as Record<T, Record<T, number>>;
}

// Indicator names in matrix order
const indicator_names = [
  "co2_emissions",
  "mining_waste_dump", 
  "forests_area",
  "soils_area",
  "unemployment_rate",
  "gini_index",
  "happiness_index",
  "life_expectancy"
] as const;

// Correlation matrix data (8x8) - encodes what influences whom
const correlation_matrix_data = [
  //co2  min  for  soi  une  gin  hap  lif
  [ 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // co2_emissions
  [ 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // mining_waste_dump  
  [-1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0], // forests_area
  [-1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0], // soils_area
  [ 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0], // unemployment_rate
  [ 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0], // gini_index
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0], // happiness_index
  [ 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0]  // life_expectancy
];

// Diagonal matrix data (8x8) - no cross-correlations
const correlation_matrix_diag_data = [
  //co2  min  for  soi  une  gin  hap  lif
  [ 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // co2_emissions
  [ 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // mining_waste_dump  
  [ 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0], // forests_area
  [ 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0], // soils_area
  [ 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0], // unemployment_rate
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0], // gini_index
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0], // happiness_index
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0]  // life_expectancy
];

// Convert matrix data to object format
export const correlation_matrix: CorrelationMatrix = matrixToObject(indicator_names, correlation_matrix_data);
export const correlation_matrix_diag: CorrelationMatrix = matrixToObject(indicator_names, correlation_matrix_diag_data);



// Upper/lower limits for rates
export const rate_limits: RateLimits = {
  'co2_emissions':     [    0, 100],
  'mining_waste_dump': [    0, 500], 
  'forests_area':      [ -200, 200],
  'soils_area':        [ -100, 100],
  'unemployment_rate': [    0,  50],
  'gini_index':        [    0, 100],
  'happiness_index':   [    0,  10],
  'life_expectancy':   [   40, 100]
};

// Upper/lower limits for trends - to clamp user input
export const trend_limits: TrendLimits = {
  'co2_emissions':     [ -2.0,  2.0],
  'mining_waste_dump': [ -5.0,  5.0],
  'forests_area':      [-10.0, 10.0], 
  'soils_area':        [ -5.0,  5.0],
  'unemployment_rate': [ -5.0,  5.0],
  'gini_index':        [ -5.0,  5.0],
  'happiness_index':   [ -2.0,  2.0],
  'life_expectancy':   [ -5.0,  5.0]
};

// consequence_ids: unemployment_rate, gini_index, happiness_index, life_expectancy

// consequences_trends for MilestoneYears
export const consequences_trends: ConsequenceTrends = {
  'unemployment_rate': {2025: 0.5, 2040: 0.5, 2055: 0.5, 2070: 0.5},
  'gini_index':        {2025: 0.2, 2040: 0.2, 2055: 0.2, 2070: 0.2},
  'happiness_index':   {2025: -0.1, 2040: -0.1, 2055: -0.1, 2070: -0.1},
  'life_expectancy':   {2025: 0.3, 2040: 0.3, 2055: 0.3, 2070: 0.3}
};

// consequences trend, rate and value at 2025
export const consequences_2025 = {
  'unemployment_rate': {trend: 0.5, rate: 5.0, value: 5.0},
  'gini_index':        {trend: 0.2, rate: 62.0, value: 62.0},
  'happiness_index':   {trend: -0.1, rate: 6.5, value: 6.5},
  'life_expectancy':   {trend: 0.3, rate: 80.0, value: 80.0}
};


// Parameters to calculate consequences
export const consequences: Consequences = {
  data: {
    'unemployment_rate': {2025: 5.0, 2040: 6, 2055: 12, 2070: 17},
    'gini_index': {2025: 62.0, 2040: 62.0, 2055: 64.0, 2070: 66.0},
    'happiness_index': {2025: 6.5, 2040: 6.5, 2055: 5.5, 2070: 5.0},
    'life_expectancy': {2025: 80.0, 2040: 79.0, 2055: 75.0, 2070: 72.0}
  },
  scale: {
    'unemployment_rate': { 
      sign: -1, 
      value: -10.0,
      // Color function for visual representation
      color_fct: (v: number) => v < 6 ? 'green' : v < 12 ? 'orange' : 'red',
      limit: [5, 25]
    },
    'gini_index': { 
      sign: 1, 
      value: -0.5,
      color_fct: (v: number) => v < 40 ? 'green' : v < 63 ? 'orange' : 'red',
      limit: [20, 70]
    },
    'happiness_index': { 
      sign: -1, 
      value: 1.0, 
      color_fct: (v: number) => v < 6.1 ? 'red' : v < 7 ? 'orange' : 'green',
      limit: [0, 10]
    },
    'life_expectancy': { 
      sign: -1, 
      value: 1.0, 
      color_fct: (v: number) => v < 75 ? 'red' : v < 78 ? 'orange' : 'green',
      limit: [50, 90]
    }
  }
};