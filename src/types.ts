/**
 * Data types for World-Sim TypeScript Package
 * Interfaces matching the YAML structure exactly
 */


// Type for a year value (e.g. 1980, 2025)
export type Year =string;

// Year data point - rate/trend/value for one year
export interface YearData {
  rate: number | null;    // Change rate (unit/year)
  trend: number | null;   // Trend modifier (additive adjustment to rate, can be null)
  value: number | null;  // Cumulative total (unit)
}

// Single environmental indicator (matches YAML structure exactly)
export interface Indicator {
  indicator_key: string;
  name: string;
  category: string;
  source: string;
  strategy: string;      // e.g. "reduce" or "increase" - optional
  paths: {
    data: Record<string, YearData>;
    unit: string;
  };
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
    2025: number | null;
    2040: number | null;
    2055: number | null;
    unit: string;
  };
}