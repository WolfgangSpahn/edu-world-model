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
  strategy: string;      // Strategy description (supports multiline text display for long content)
  // alternative?: [
  //   string,                        // Description text (can be long, supports text wrapping)
  //   [number, number, number]       // Three trend values for milestone years [2025, 2040, 2055]
  // ];  
  paths: {
    data: Record<string, YearData>;
    unit: string;
  };
}

// type for one intervention data
// export const interventions: InterventionData = {
//   interventions:[{description: "Halte Emission konstant. Kein Umbau Richtung carbon free. Nimmt Hitze und Umweltzerstörung in Kauf.",
//                   impacts: { co2_emissions:{2025: 0, 2040: 0, 2055: 0}, global_temp:{2025: 0.0007, 2040: 0.00125, 2055: 0.0015}},],
export interface InterventionOption {
  description: string;
  impacts: {
    [indicator_key: string]: YearlyData;  // e.g., { 2025: -0.5, 2040: -1.0, 2055: -1.5
  };
}

export interface YearlyData {
    2025: number | null;
    2040: number | null;
    2055: number | null;
    unit?: string;  // Optional unit field to harmonize with MilestoneTrends
}

export interface InterventionData {
  [indicator_key: string]: InterventionOption[];
}

// Root data structure from YAML
export interface ProjectionData {
  projections: Indicator[];        // Array of all indicators
}


// Type for milestone years
export type MilestoneYear = 2025 | 2040 | 2055;


// Trend data for milestone years: each indicator maps to values for 2025, 2040, 2055
export interface MilestoneTrends {
  [indicatorKey: string]: {
    2025: number | null;
    2040: number | null;
    2055: number | null;
    unit: string;
  };
}

