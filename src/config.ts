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
  "life_expectancy",
  "gdp_per_cap",
  "debt_per_cap",
  "wealth_per_cap",
  "population",
  "global_reaction_fund"
] as const;

// Correlation matrix data (13x13) - encodes what influences whom
const correlation_matrix_data = [
  //co2  min  for  soi  une  gin  hap  lif  gdp  deb  wea  pop  grf
  [ 1.0, 0.0,-1.0,-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // co2_emissions
  [ 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // mining_waste_dump  
  [-1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // forests_area
  [-1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // soils_area
  [ 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // unemployment_rate
  [ 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // gini_index
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // happiness_index
  [-0.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0], // life_expectancy
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0], // gdp_per_cap
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0], // debt_per_cap
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0], // wealth_per_cap
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0], // population
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0]  // global_reaction_fund
];

// Diagonal matrix data (13x13) - no cross-correlations
const correlation_matrix_diag_data = [
  //co2  min  for  soi  une  gin  hap  lif  gdp  deb  wea  pop  grf
  [ 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // co2_emissions
  [ 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // mining_waste_dump  
  [ 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // forests_area
  [ 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // soils_area
  [ 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // unemployment_rate
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // gini_index
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // happiness_index
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0], // life_expectancy
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0], // gdp_per_cap
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0], // debt_per_cap
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0], // wealth_per_cap
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0], // population
  [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0]  // global_reaction_fund
];

// Convert matrix data to object format
export const correlation_matrix: CorrelationMatrix = matrixToObject(indicator_names, correlation_matrix_data);
export const correlation_matrix_diag: CorrelationMatrix = matrixToObject(indicator_names, correlation_matrix_diag_data);



// Upper/lower limits for rates
export const rate_limits: RateLimits = {
  'co2_emissions':        [    0, 100],
  'mining_waste_dump':    [    0, 500], 
  'forests_area':         [ -200, 200],
  'soils_area':           [ -100, 100],
  'unemployment_rate':    [    0,  50],
  'gini_index':           [    0, 100],
  'happiness_index':      [   -0.5,  0.5],
  'life_expectancy':      [   -2.0,  2.0],
  'gdp_per_cap':          [   -200000, 200000],
  'debt_per_cap':         [   -500000, 500000],
  'wealth_per_cap':       [   -1000000, 1000000],
  'population':           [   -20,  20],
  'global_reaction_fund': [    0, 10000]
};

// Upper/lower limits for trends - to clamp user input
export const trend_limits: TrendLimits = {
  'co2_emissions':        [ -2.0,  2.0],
  'mining_waste_dump':    [ -5.0,  5.0],
  'forests_area':         [-10.0, 10.0], 
  'soils_area':           [ -5.0,  5.0],
  'unemployment_rate':    [ -5.0,  5.0],
  'gini_index':           [ -5.0,  5.0],
  'happiness_index':      [ -2.0,  2.0],
  'life_expectancy':      [ -5.0,  5.0],
  'gdp_per_cap':          [-10.0, 10.0],
  'debt_per_cap':         [-10.0, 10.0],
  'wealth_per_cap':       [-20.0, 20.0],
  'population':           [ -1.0,  1.0],
  'global_reaction_fund': [-50.0, 50.0]
};

