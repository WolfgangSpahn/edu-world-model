/**
 * Trend modification utility for World-Sim TypeScript Package
 * Modifies trends for specific milestone years with validation
 */

import { ProjectionData, MilestoneYear, MilestoneTrends } from './types.js';
import { years_map, trend_limits, correlation_matrix } from './config.js';
import lodash from 'lodash';




/**
 * Sets trend value for a specific indicator and milestone year in a MilestoneYearTrend object
 * 
 * @param trends - MilestoneYearTrend object to modify
 * @param indicatorKey - Key of the indicator to modify (e.g. 'co2_emissions')
 * @param year - Milestone year (2025, 2040, or 2055)
 * @param trend - New trend value to apply
 * @param unit - Unit for the indicator (e.g. 'Gt' or '000 km²')
 * @throws Error if trend value out of bounds
 */
export function setTrend(
  trends: MilestoneTrends,
  indicatorKey: string, 
  year: MilestoneYear, 
  trend: number,
  unit: string = ''
): void {
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

  // Initialize indicator if it doesn't exist
  if (!trends[indicatorKey]) {
    trends[indicatorKey] = {
      2025: 0,
      2040: 0,
      2055: 0,
      unit: unit
    };
  }

  // Set the trend for the specific year
  trends[indicatorKey][year] = trend;
  
  // Update unit if provided
  if (unit) {
    trends[indicatorKey].unit = unit;
  }
}

/**
 * Applies trends from a MilestoneTrends object to the actual ProjectionData
 * Only applies trends for indicators that exist in the projection data
 * 
 * @param data - ProjectionData object to modify
 * @param trends - MilestoneTrends object containing trend values
 */
export function applyTrend(
  data: ProjectionData,
  trends: MilestoneTrends
): void {
  // Filter trends to only include indicators that exist in projection data
  const availableIndicators = data.projections.map(p => p.indicator_key);
  
  for (const indicatorKey of Object.keys(trends)) {
    // Skip indicators that don't exist in projection data
    if (!availableIndicators.includes(indicatorKey)) {
      continue;
    }
    
    // Find the indicator
    const indicator = data.projections.find(p => p.indicator_key === indicatorKey);
    if (!indicator) {
      continue; // This shouldn't happen due to the check above, but just in case
    }

    // Apply trends for each milestone year
    const milestoneYears: MilestoneYear[] = [2025, 2040, 2055];
    
    for (const year of milestoneYears) {
      const trendValue = trends[indicatorKey][year];
      
      // Get year range for this milestone
      const [startYear, endYear] = years_map[year];

      // Apply trend to all years in the range
      for (let currentYear = startYear; currentYear <= endYear; currentYear++) {
        if (indicator.paths.data[currentYear]) {
          indicator.paths.data[currentYear].trend = trendValue;
        }
      }
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

/**
 * Applies correlation-based trend adjustments to all indicators
 * This function should be called after setTrend() to add correlation influences
 * Works for all years and indicators automatically
 * 
 * @param data - ProjectionData object to modify
 * @param correlationMatrix - Correlation matrix to use for influences
 * @param strengthFactor - Multiplier for correlation influences (default: 0.1)
 */
export function set_correlation_trend(
  data: ProjectionData,
  correlationMatrix: any = correlation_matrix,
  strengthFactor: number = 0.1
): void {
  console.log('\n🔄 Applying correlation-based trend adjustments...');
  console.log('='.repeat(70));

  // Create a MilestoneYearTrend object to hold adjusted trends
  const adjustedTrends: MilestoneTrends = {};

  // Process each indicator in the correlation matrix
  for (const indicatorKey of Object.keys(correlationMatrix)) {
    // Find the indicator in data
    const indicator = data.projections.find(p => p.indicator_key === indicatorKey);
    if (!indicator) {
      console.log(`⚠️  Indicator '${indicatorKey}' not found in data, skipping`);
      continue;
    }

    console.log(`\nAnalyzing correlations for ${indicatorKey}:`);
    console.log('-'.repeat(50));

    // Get correlation influences
    const correlations = correlationMatrix[indicatorKey];
    let influenceSum = 0;
    
    for (const [influencingKey, factor] of Object.entries(correlations)) {
      if (influencingKey === indicatorKey) {
        continue; // Skip self-influence
      }
      
      const numericFactor = Number(factor);
      console.log(
        `Influence of ${influencingKey.padEnd(20)} on ${indicatorKey.padEnd(20)} is ${numericFactor}`
      );
      influenceSum += numericFactor;
    }
    
    console.log(`Total correlation influence sum: ${influenceSum}`);
    
    // Apply correlation adjustment to all milestone years that have trends set
    const milestoneYears: MilestoneYear[] = [2025, 2040, 2055];
    
    for (const year of milestoneYears) {
      const currentTrend = getTrend(data, indicatorKey, year);
      if (currentTrend === undefined) {
        continue; // Skip if no trend is set for this year
      }

      // Calculate adjusted trend
      const correlationAdjustment = influenceSum * strengthFactor;
      const adjustedTrend = currentTrend + correlationAdjustment;
      
      console.log(`  Year ${year}: ${currentTrend} → ${adjustedTrend} (adjustment: ${correlationAdjustment})`);
      
      // Validate and apply the adjusted trend
      if (!isValidTrend(indicatorKey, adjustedTrend)) {
        const [minTrend, maxTrend] = trend_limits[indicatorKey] || [-Infinity, Infinity];
        const clampedTrend = Math.min(maxTrend, Math.max(minTrend, adjustedTrend));
        console.log(`    ⚠️  Clamped to bounds: ${clampedTrend}`);
        setTrend(adjustedTrends, indicatorKey, year, clampedTrend, indicator.paths.unit);
      } else {
        setTrend(adjustedTrends, indicatorKey, year, adjustedTrend, indicator.paths.unit);
      }
    }
  }
  
  // Apply all adjusted trends to the data
  applyTrend(data, adjustedTrends);
  
  console.log('\n✅ Correlation-based trend adjustments completed!\n');
}

/**
 * Applies correlation-based adjustments to trends in a MilestoneYearTrend object
 * This function returns a new trends object with correlation influences applied
 * 
 * @param trends - MilestoneYearTrend object to use as base
 * @param correlationMatrix - Correlation matrix to use for influences
 * @param strengthFactor - Multiplier for correlation influences (default: 0.1)
 * @returns New MilestoneTrends object with correlation adjustments applied
 */
export function applyCorrelation(
  trends: MilestoneTrends,
  correlationMatrix: any = correlation_matrix,
  strengthFactor: number = 0.1
): MilestoneTrends {
  // Create a deep copy of the trends to avoid modifying the original
  const adjustedTrends = lodash.cloneDeep(trends);
  
  // Process each indicator in the trends object
  for (const indicatorKey of Object.keys(adjustedTrends)) {
    // Get correlation influences from other indicators
    const correlations = correlationMatrix[indicatorKey] || {};
    let influenceSum = 0;
    
    for (const [influencingKey, factor] of Object.entries(correlations)) {
      if (influencingKey === indicatorKey) {
        continue; // Skip self-influence
      }
      
      const numericFactor = Number(factor);
      
      // Only count influence if the influencing indicator has trends set
      if (trends[influencingKey]) {
        influenceSum += numericFactor;
      }
    }
    
    // Apply correlation adjustment to all milestone years
    const milestoneYears: MilestoneYear[] = [2025, 2040, 2055];
    
    for (const year of milestoneYears) {
      const currentTrend = adjustedTrends[indicatorKey][year];
      if (currentTrend === undefined) {
        continue; // Skip if no trend is set for this year
      }

      // Calculate adjusted trend
      const correlationAdjustment = influenceSum * strengthFactor;
      const adjustedTrend = currentTrend + correlationAdjustment;
      
      // Validate and apply the adjusted trend
      if (!isValidTrend(indicatorKey, adjustedTrend)) {
        const [minTrend, maxTrend] = trend_limits[indicatorKey] || [-Infinity, Infinity];
        const clampedTrend = Math.min(maxTrend, Math.max(minTrend, adjustedTrend));
        adjustedTrends[indicatorKey][year] = clampedTrend;
      } else {
        adjustedTrends[indicatorKey][year] = adjustedTrend;
      }
    }
  }
  
  return adjustedTrends;
}

/**
 * Extracts current trends from ProjectionData and creates a MilestoneYearTrend object
 * This function reads the existing trend values from milestone years in the data
 * 
 * @param data - ProjectionData object to extract trends from
 * @returns MilestoneYearTrend object with current trend values
 */
export function getTrendsFromData(data: ProjectionData): MilestoneTrends {
  const trends: MilestoneTrends = {};
  
  // Process each indicator in the data
  for (const indicator of data.projections) {
    const indicatorKey = indicator.indicator_key;
    
    // Initialize the indicator in trends object with zeros
    trends[indicatorKey] = {
      2025: 0,
      2040: 0,
      2055: 0,
      unit: indicator.paths.unit
    };
    
    // Extract actual trends for milestone years from the data
    const milestoneYears: MilestoneYear[] = [2025, 2040, 2055];
    
    for (const year of milestoneYears) {
      if (indicator.paths.data[year]) {
        trends[indicatorKey][year] = indicator.paths.data[year].trend;
      }
    }
  }
  
  return trends;
}

/**
 * Prints trends from a MilestoneYearTrend object in a formatted grid
 * 
 * @param trends - MilestoneYearTrend object to display
 * @param title - Optional title for the trends display
 */
export function printTrends(trends: MilestoneTrends, title: string = 'TRENDS'): void {
  console.log(`\n=== ${title} ===`);
  console.log('Indicator'.padEnd(20) + '2025'.padEnd(12) + '2040'.padEnd(12) + '2055'.padEnd(12) + 'Unit'.padEnd(10));
  console.log('-'.repeat(68));
  
  // Sort indicators alphabetically for consistent display
  const sortedIndicators = Object.keys(trends).sort();
  
  for (const indicatorKey of sortedIndicators) {
    const indicatorTrends = trends[indicatorKey];
    
    console.log(
      indicatorKey.padEnd(20) +
      indicatorTrends[2025].toFixed(2).padEnd(12) +
      indicatorTrends[2040].toFixed(2).padEnd(12) +
      indicatorTrends[2055].toFixed(2).padEnd(12) +
      indicatorTrends.unit.padEnd(10)
    );
  }
  
  console.log('-'.repeat(68));
}