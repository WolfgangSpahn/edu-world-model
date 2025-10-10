/**
 * Intervention API functions for World-Sim TypeScript Package
 * Provides convenient functions for applying policy interventions
 */

import { InterventionOption, MilestoneTrends, MilestoneYear, YearlyData, ProjectionData } from './types.js';

/**
 * Creates a new MilestoneTrends object from a single intervention
 * 
 * @param intervention - InterventionOption to convert
 * @param projections - ProjectionData to get unit information from
 * @returns New MilestoneTrends object with intervention impacts
 */
export function interventionToTrends(intervention: InterventionOption): MilestoneTrends {
  const trends: MilestoneTrends = {};
  
  Object.entries(intervention.impacts).forEach(([indicatorKey, deltas]) => {
    // Extract unit from the deltas object
    const unit = deltas.unit || '';
    
    // Initialize indicator with the unit
    trends[indicatorKey] = { 2025: null, 2040: null, 2055: null, unit };
    
    // Apply each delta (only numeric years)
    Object.entries(deltas).forEach(([year, delta]) => {
      if (year === 'unit') return; // Skip unit property
      const milestoneYear = parseInt(year) as MilestoneYear;
      if (!isNaN(milestoneYear)) { // Only process valid years
        trends[indicatorKey][milestoneYear] = delta;
      }
    });
  });
  
  return trends;
}

/**
 * Creates a new MilestoneTrends object from multiple interventions
 * 
 * @param interventions - Array of InterventionOptions to combine
 * @returns New MilestoneTrends object with combined intervention impacts
 */
export function interventionsToTrends(interventions: InterventionOption[]): MilestoneTrends {
  const trends: MilestoneTrends = {};
  
  interventions.forEach(intervention => {
    Object.entries(intervention.impacts).forEach(([indicatorKey, deltas]) => {
      // Extract unit from the deltas object
      const unit = deltas.unit || '';
      
      // Initialize indicator if needed
      if (!trends[indicatorKey]) {
        trends[indicatorKey] = { 2025: null, 2040: null, 2055: null, unit };
      }
      
      // Add deltas to existing trends (cumulative effect, only numeric years)
      Object.entries(deltas).forEach(([year, delta]) => {
        if (year === 'unit') return; // Skip unit property
        const milestoneYear = parseInt(year) as MilestoneYear;
        if (!isNaN(milestoneYear)) { // Only process valid years
          const currentTrend = trends[indicatorKey][milestoneYear] || 0;
          trends[indicatorKey][milestoneYear] = currentTrend + delta;
        }
      });
    });
  });
  
  return trends;
}

/**
 * Adds intervention trends to existing trends (cumulative effect)
 * 
 * @param currentTrends - Existing MilestoneTrends to add to
 * @param trendUpdates - MilestoneTrends from intervention to add
 * @returns New MilestoneTrends object with combined trends
 */
export function addTrends(currentTrends: MilestoneTrends, trendUpdates: MilestoneTrends): MilestoneTrends {
  // update current trends with intervention updates via adding the updates to the current trends
  const newTrends = { ...currentTrends };
  Object.entries(trendUpdates).forEach(([indicator, deltas]) => {
    if (!newTrends[indicator]) {
      newTrends[indicator] = { 2025: null, 2040: null, 2055: null, unit: deltas.unit || '' };
    }
    Object.entries(deltas).forEach(([year, delta]) => {
      if (year === 'unit') return; // Skip unit property
      const milestoneYear = parseInt(year) as MilestoneYear;
      if (!isNaN(milestoneYear) && typeof delta === 'number') { // Only process valid years and numeric deltas
        const currentValue = newTrends[indicator][milestoneYear] || 0;
        newTrends[indicator][milestoneYear] = currentValue + delta;
      }
    });
  });
  
  return newTrends;
}