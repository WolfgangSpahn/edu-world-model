/**
 * Calculation engine for World-Sim TypeScript Package
 * Implements the mathematical model for future projection calculations
 * 
 * Features:
 * - Rate clipping within configured bounds
 * - Optional correlation matrix application for cross-indicator influences
 * - Forward projection calculations with trend application
 * 
 * Correlation Matrix:
 * The correlation matrix defines how indicators influence each other during calculations.
 * Each entry correlation_matrix[target][source] specifies how much the source indicator's
 * rate affects the target indicator's rate in the next time step.
 * Correlation effects are applied explicitly via applyCorrelation() function.
 * 
 * Mathematical Model with Optional Correlations:
 * 1. For each year t, collect current rates from all indicators
 * 2. For each indicator k, calculate correlation influences (if enabled):
 *    influence_k = Σ(correlation_matrix[k][j] × rate_j) for all j ≠ k
 * 3. Apply rate recurrence: r_{k,t+1} = clip_k(r_{k,t} + τ_{k,t} + influence_k)
 * 4. Apply value recurrence: v_{k,t+1} = v_{k,t} + r_{k,t}
 */

import { ProjectionData } from './types.js';
import { rate_limits, correlation_matrix } from './config.js';

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
 * Recalculates future projections for all indicators using milestone-based trends
 * 
 * Mathematical Model with Milestone Trend Switching:
 * - 2025-2039: Use trend from 2025 milestone (constant)
 * - 2040-2054: Use trend from 2040 milestone (constant) 
 * - 2055+: Use trend from 2055 milestone (constant)
 * 
 * Step 1: Trends are already applied by setTrend() function
 * Step 2: Forward calculation for t = 2025, 2026, ..., 2069:
 *   - Rate recurrence: r_{t+1} = clip_k(r_t + τ_t + correlation_influences?)
 *   - Value recurrence: v_{t+1} = v_t + r_t
 * Step 3: Correlation influences calculated from correlation matrix (if enabled)
 * 
 * @param data - ProjectionData object to calculate
 * @throws Error if data structure is invalid
 */
export function calculate(data: ProjectionData): void {
  if (!data || !data.projections) {
    throw new Error('Invalid data structure: missing projections');
  }

  // Validate all indicators have proper structure
  for (const indicator of data.projections) {
    if (!indicator.paths || !indicator.paths.data) {
      throw new Error(`Invalid indicator structure: ${indicator.indicator_key}`);
    }
  }

  // Define milestone years where trends switch
  const milestoneYears = [2025, 2040, 2055];
  
  // Helper function to get the active trend for a given year
  function getActiveTrend(indicatorData: any, year: number): number {
    if (year < 2040) {
      return indicatorData['2025']?.trend || 0;
    } else if (year < 2055) {
      return indicatorData['2040']?.trend || 0;
    } else {
      return indicatorData['2055']?.trend || 0;
    }
  }

  // Process year by year to allow correlation influences between indicators
  for (let year = 2025; year <= 2069; year++) {
    // Collect current year data for all indicators (needed for correlation calculations)
    const currentYearData = new Map<string, { rate: number; value: number; trend: number }>();
    
    for (const indicator of data.projections) {
      const indicatorData = indicator.paths.data;
      const currentYear = indicatorData[year];
      
      if (currentYear) {
        currentYearData.set(indicator.indicator_key, {
          rate: currentYear.rate ?? 0,
          value: currentYear.value ?? 0,
          trend: currentYear.trend ?? 0
        });
      }
    }

    // Calculate next year values for all indicators
    for (const indicator of data.projections) {
      const indicatorData = indicator.paths.data;
      const currentYear = indicatorData[year];
      
      if (!currentYear) {
        continue; // Skip if current year data is missing
      }

      // Create next year data if it doesn't exist
      if (!indicatorData[year + 1]) {
        indicatorData[year + 1] = {
          rate: 0,
          trend: 0,
          value: 0
        };
      }
      
      const nextYear = indicatorData[year + 1];

      // Get the active trend for the current year (milestone-based)
      const activeTrend = getActiveTrend(indicatorData, year);

      // Rate recurrence: r_{t+1} = clip_k(r_t + τ_t)
      // isue a warning if rate is null
      if (currentYear.rate == null) {
        console.warn(`Missing rate for indicator ${indicator.indicator_key} in year ${year}, cannot compute next rate.`);
        nextYear.rate = null;
      }
      const basicRateChange = (currentYear.rate ?? 0) + activeTrend;
      
      const newRate = clipRate(
        indicator.indicator_key, 
        basicRateChange
      );

      nextYear.rate = newRate;

      // Value recurrence: v_{t+1} = v_t + r_t  
      // issue a warning if value is null
      if (currentYear.value == null) {
        console.warn(`Missing value for indicator ${indicator.indicator_key} in year ${year}, cannot compute next value.`);
        nextYear.value = null;
      } 
      nextYear.value = (currentYear.value ?? 0) + (currentYear.rate ?? 0);

      
      // Set trend based on milestone switching logic
      nextYear.trend = getActiveTrend(indicatorData, year + 1);

      console.log(`Indicator ${indicator.indicator_key} - Year ${year + 1}: Next Year Rate = ${nextYear.rate.toFixed(4)}, Next Year Value = ${nextYear.value.toFixed(4)}, Next Year Trend = ${nextYear.trend.toFixed(4)}`);
    }
  }
}


// assume data is well formed
export function fixTrendRate(
  data: ProjectionData,
  anchorYearIntervals: number[][]
): void {
  for (const indicator of data.projections) {
    const series = indicator.paths.data;
    for (let i = anchorYearIntervals.length - 1; i >= 0; i--) {
      const [startYear, endYear] = anchorYearIntervals[i];
      const startEntry = series[String(startYear)];
      const endEntry = series[String(endYear)];
      const interval = endYear - startYear;

      if (!startEntry || !endEntry) {
        console.warn(`Missing data for trend/rate fix: ${indicator.indicator_key} ${startYear}-${endYear}`);
        continue;
      }

      const startValue = startEntry.value;
      const endValue = endEntry.value;
      if (startValue == null || endValue == null) {
        console.warn(`Missing values for trend/rate fix: ${indicator.indicator_key} ${startYear}-${endYear}`);
        continue;
      }

      const derivedStartRate = (endValue - startValue) / interval;
      startEntry.rate = derivedStartRate;

      let endRate: number | null = typeof endEntry.rate === 'number' ? endEntry.rate : null;
      if (endRate == null) {
        const nextEntry = series[String(endYear + 1)];
        if (nextEntry && typeof nextEntry.value === 'number') {
          endRate = nextEntry.value - endValue;
          endEntry.rate = endRate;
        }
      }

      if (endRate == null) {
        console.warn(`Missing end rate for trend fix: ${indicator.indicator_key} ${startYear}-${endYear}`);
        continue;
      }

      startEntry.trend = (endRate - derivedStartRate) / interval;
    }
  }
}