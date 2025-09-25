/**
 * Trend modification utility for World-Sim TypeScript Package
 * Modifies trends for specific milestone years with validation
 */

import { ProjectionData, MilestoneYear } from './types.js';
import { years_map, trend_limits } from './config.js';

/**
 * Sets trend value for a specific indicator and milestone year
 * Applies the trend to the entire year range defined by the milestone
 * 
 * @param data - ProjectionData object to modify
 * @param indicatorKey - Key of the indicator to modify (e.g. 'co2_emissions')
 * @param year - Milestone year (2025, 2040, or 2055)
 * @param trend - New trend value to apply
 * @throws Error if indicator not found or trend value out of bounds
 */
export function setTrend(
  data: ProjectionData, 
  indicatorKey: string, 
  year: MilestoneYear, 
  trend: number
): void {
  // Find the indicator
  const indicator = data.projections.find(p => p.indicator_key === indicatorKey);
  if (!indicator) {
    throw new Error(`Indicator '${indicatorKey}' not found`);
  }

  // Validate milestone year
  if (!(year in years_map)) {
    throw new Error(`Invalid milestone year: ${year}. Must be 2025, 2040, or 2055`);
  }

  // Validate trend bounds if limits exist
  if (indicatorKey in trend_limits) {
    const [minTrend, maxTrend] = trend_limits[indicatorKey];
    if (trend < minTrend || trend > maxTrend) {
      throw new Error(
        `Trend value ${trend} for '${indicatorKey}' is out of bounds [${minTrend}, ${maxTrend}]`
      );
    }
  }

  // Get year range for this milestone
  const [startYear, endYear] = years_map[year];

  // Apply trend to all years in the range
  for (let currentYear = startYear; currentYear <= endYear; currentYear++) {
    if (indicator.paths.data[currentYear]) {
      indicator.paths.data[currentYear].trend = trend;
    }
  }
}

/**
 * Gets the current trend value for an indicator at a specific year
 * 
 * @param data - ProjectionData object
 * @param indicatorKey - Key of the indicator
 * @param year - Year to check
 * @returns Current trend value or undefined if not found
 */
export function getTrend(
  data: ProjectionData, 
  indicatorKey: string, 
  year: number
): number | undefined {
  const indicator = data.projections.find(p => p.indicator_key === indicatorKey);
  if (!indicator || !indicator.paths.data[year]) {
    return undefined;
  }
  return indicator.paths.data[year].trend;
}

/**
 * Validates if a trend value is within acceptable bounds for an indicator
 * 
 * @param indicatorKey - Key of the indicator
 * @param trend - Trend value to validate
 * @returns true if valid, false if out of bounds
 */
export function isValidTrend(indicatorKey: string, trend: number): boolean {
  if (!(indicatorKey in trend_limits)) {
    return true; // No limits defined, accept any value
  }
  
  const [minTrend, maxTrend] = trend_limits[indicatorKey];
  return trend >= minTrend && trend <= maxTrend;
}