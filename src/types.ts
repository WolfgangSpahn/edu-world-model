/**
 * Data types for World-Sim TypeScript Package
 * Interfaces matching the YAML structure exactly
 */

// Year data point - rate/trend/volume for one year
export interface YearData {
  rate: number;    // Current rate of change (unit/y)
  trend: number;   // Rate acceleration (unit/y²)  
  volume: number;  // Cumulative total (unit)
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