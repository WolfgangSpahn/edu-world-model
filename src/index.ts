/**
 * edu-world-model TypeScript Package
 * Educational TypeScript library for world simulation modeling
 * 
 * Main exports for the package
 */



// Core functions
export { projections } from './projections.js';
export { setTrend, applyTrend, applyCorrelation, getTrendsFromData, printTrends, getTrend, isValidTrend, set_correlation_trend } from './set-trend.js';
export { fixTrendRate, calculate } from './calculate.js';

// Types
export type { 
  YearData, 
  Indicator, 
  ProjectionData, 
  MilestoneYear 
} from './types.js';

// Configuration (optional exports for advanced usage)
export { 
  years_map, 
  correlation_matrix, 
  rate_limits, 
  trend_limits
} from './config.js';

export type {
  YearRange,
  CorrelationMatrix,
  RateLimits,
  TrendLimits,
  Consequences
} from './config.js';