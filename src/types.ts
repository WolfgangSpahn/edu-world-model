/**
 * Data types for World-Sim TypeScript Package
 * Interfaces matching the YAML structure exactly
 */


// Year data point - rate/trend/value for one year
export interface YearData {
  rate: number;    // Change rate (unit/year)
  trend: number;   // Trend modifier (additive adjustment to rate)
  value: number;  // Cumulative total (unit)
}

// Single environmental indicator (matches YAML structure exactly)
export interface Indicator {
  indicator_key: string;           // e.g. 'co2_emissions'
  name: string;                    // e.g. 'CO2 Emissionen'
  paths: {
    data: Record<number, YearData> // Year -> YearData mapping (1980-2070)
    unit: string;                  // e.g. 'Gt' or '000 km²'
  }
}

// Root data structure from YAML
export interface ProjectionData {
  projections: Indicator[];        // Array of all indicators
}


// Type for milestone years
export type MilestoneYear = 2025 | 2040 | 2055;


// Trend data for each milestone year: f.Ex. MilestoneYearTrend['co2_emissions'].2025
export interface MilestoneTrends {
  [indicator_key: string]: {
    2025: number;
    2040: number;
    2055: number;
    unit: string;                  // e.g. 'Gt' or '000 km²'
  }
}