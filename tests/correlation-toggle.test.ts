/**
 * Test for correlation matrix functionality
 */

import { loadData, setTrend, applyTrend, applyCorrelation, calculate, getProjection } from '../src/index';
import { MilestoneTrends } from '../src/types';
import { resolve } from 'path';

describe('Correlation Matrix Functionality', () => {
  const dataPath = resolve(__dirname, '../data/projections.yaml');
  
  test('should apply baseline trends without correlations', () => {
    const data = loadData(dataPath);
    
    // Create trends and set CO2 trend - no correlations applied
    const trends: MilestoneTrends = {};
    setTrend(trends, 'co2_emissions', 2025, 2.0, 'Gt');
    applyTrend(data, trends);
    calculate(data);
    
    const result = getProjection(data, 'co2_emissions', 2026);
    
    // Should get baseline calculation without correlation effects
    expect(result?.rate).toBeDefined();
  });
  
  test('should apply correlation adjustments explicitly', () => {
    const data = loadData(dataPath);
    
    const initialCO2 = getProjection(data, 'co2_emissions', 2025);
    
    // Create trends and set CO2 trend, then apply correlations explicitly
    const trends: MilestoneTrends = {};
    setTrend(trends, 'co2_emissions', 2025, 1.0, 'Gt');
    const correlatedTrends = applyCorrelation(trends);
    applyTrend(data, correlatedTrends);
    calculate(data);
    
    const result = getProjection(data, 'co2_emissions', 2026);
    
    // With correlations applied, should get adjusted results
    expect(result?.rate).toBeGreaterThan(39);
    expect(result?.rate).toBeLessThan(42);
  });
  
  test('should produce different results with and without correlation adjustments', () => {
    const dataPath = resolve(__dirname, '../data/projections.yaml');
    
    // Test WITHOUT correlation adjustments (baseline)
    const dataBaseline = loadData(dataPath);
    const trendsBaseline: MilestoneTrends = {};
    setTrend(trendsBaseline, 'co2_emissions', 2025, 1.0, 'Gt');
    setTrend(trendsBaseline, 'forests_area', 2025, -1.0, '000 km²'); // Add another indicator for correlation
    applyTrend(dataBaseline, trendsBaseline);
    calculate(dataBaseline);
    const resultBaseline = getProjection(dataBaseline, 'co2_emissions', 2026);
    
    // Test WITH correlation adjustments
    const dataWithCorr = loadData(dataPath);
    const trendsWithCorr: MilestoneTrends = {};
    setTrend(trendsWithCorr, 'co2_emissions', 2025, 1.0, 'Gt');
    setTrend(trendsWithCorr, 'forests_area', 2025, -1.0, '000 km²'); // Add another indicator for correlation
    const correlatedTrends = applyCorrelation(trendsWithCorr, undefined, 1.0); // Use stronger effect
    applyTrend(dataWithCorr, correlatedTrends);
    calculate(dataWithCorr);
    const resultWithCorr = getProjection(dataWithCorr, 'co2_emissions', 2026);
    
    // Results should be defined
    expect(resultBaseline?.rate).toBeDefined();
    expect(resultWithCorr?.rate).toBeDefined();
    
    // Baseline vs correlation-adjusted results should be different
    expect(resultWithCorr?.rate).not.toBe(resultBaseline?.rate);
  });
});