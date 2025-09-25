/**
 * World-Sim TypeScript Package
 * Educational TypeScript library for world simulation modeling
 * 
 * Main exports for the package
 */

// Core functions
export { loadData, cloneData } from './load-data.js';
export { setTrend, getTrend, isValidTrend } from './set-trend.js';
export { calculate, calculateIndicator, getProjection } from './calculate.js';

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
  trend_limits, 
  consequences 
} from './config.js';

export type {
  YearRange,
  CorrelationMatrix,
  RateLimits,
  TrendLimits,
  Consequences
} from './config.js';