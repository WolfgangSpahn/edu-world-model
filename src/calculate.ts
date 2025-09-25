/**
 * Calculation engine for World-Sim TypeScript Package
 * Implements the mathematical model for future projection calculations
 */

import { ProjectionData } from './types.js';
import { rate_limits } from './config.js';

/**
 * Clips a rate value to the configured bounds for an indicator
 * Uses the clipping operator: clip_k(x) = min(M_k, max(m_k, x))
 * 
 * @param indicatorKey - Key of the indicator
 * @param rate - Rate value to clip
 * @returns Clipped rate value
 */
function clipRate(indicatorKey: string, rate: number): number {
  if (!(indicatorKey in rate_limits)) {
    return rate; // No limits defined, return original rate
  }
  
  const [minRate, maxRate] = rate_limits[indicatorKey];
  return Math.min(maxRate, Math.max(minRate, rate));
}

/**
 * Recalculates future projections for all indicators using the mathematical model
 * 
 * Mathematical Model:
 * Step 1: Trends are already applied by setTrend() function
 * Step 2: Forward calculation for t = 2025, 2026, ..., 2069:
 *   - Rate recurrence: r_{t+1} = clip_k(r_t + τ_t)
 *   - Volume recurrence: v_{t+1} = v_t + r_t
 * 
 * @param data - ProjectionData object to calculate
 * @throws Error if data structure is invalid
 */
export function calculate(data: ProjectionData): void {
  if (!data || !data.projections) {
    throw new Error('Invalid data structure: missing projections');
  }

  // Process each indicator
  for (const indicator of data.projections) {
    if (!indicator.paths || !indicator.paths.data) {
      throw new Error(`Invalid indicator structure: ${indicator.indicator_key}`);
    }

    const indicatorData = indicator.paths.data;
    
    // Forward calculation from 2025 to 2069
    for (let year = 2025; year <= 2069; year++) {
      const currentYear = indicatorData[year];
      const nextYear = indicatorData[year + 1];
      
      if (!currentYear || !nextYear) {
        continue; // Skip if year data is missing
      }

      // Rate recurrence: r_{t+1} = clip_k(r_t + τ_t)
      const newRate = clipRate(
        indicator.indicator_key, 
        currentYear.rate + currentYear.trend
      );
      nextYear.rate = newRate;

      // Volume recurrence: v_{t+1} = v_t + r_t
      nextYear.volume = currentYear.volume + currentYear.rate;
    }
  }
}

/**
 * Calculates projections for a single indicator
 * Useful for selective recalculation
 * 
 * @param data - ProjectionData object
 * @param indicatorKey - Key of the indicator to calculate
 * @throws Error if indicator not found
 */
export function calculateIndicator(data: ProjectionData, indicatorKey: string): void {
  const indicator = data.projections.find(p => p.indicator_key === indicatorKey);
  if (!indicator) {
    throw new Error(`Indicator '${indicatorKey}' not found`);
  }

  const indicatorData = indicator.paths.data;
  
  // Forward calculation from 2025 to 2069
  for (let year = 2025; year <= 2069; year++) {
    const currentYear = indicatorData[year];
    const nextYear = indicatorData[year + 1];
    
    if (!currentYear || !nextYear) {
      continue; // Skip if year data is missing
    }

    // Rate recurrence: r_{t+1} = clip_k(r_t + τ_t)
    const newRate = clipRate(
      indicator.indicator_key, 
      currentYear.rate + currentYear.trend
    );
    nextYear.rate = newRate;

    // Volume recurrence: v_{t+1} = v_t + r_t
    nextYear.volume = currentYear.volume + currentYear.rate;
  }
}

/**
 * Gets projection values for a specific indicator and year
 * 
 * @param data - ProjectionData object
 * @param indicatorKey - Key of the indicator
 * @param year - Year to get data for
 * @returns Year data or undefined if not found
 */
export function getProjection(
  data: ProjectionData, 
  indicatorKey: string, 
  year: number
) {
  const indicator = data.projections.find(p => p.indicator_key === indicatorKey);
  if (!indicator) {
    return undefined;
  }
  return indicator.paths.data[year];
}