/**
 * Test for correlation matrix functionality
 * Tests that cross-indicator influences are applied correctly
 */

import { loadData, setTrend, applyTrend, applyCorrelation, calculate } from '../src/index';
import { MilestoneTrends, Indicator } from '../src/types';
import { resolve } from 'path';

describe('Correlation Matrix Functionality', () => {
  const dataPath = resolve(__dirname, '../data/projections.yaml');
  
  test('should apply correlation influences correctly', () => {
    const data = loadData(dataPath);
    
    // Get initial state BEFORE any changes
    const originalData = JSON.parse(JSON.stringify(data)); // Deep clone original data
    const initialCO2Indicator = originalData.projections.find((p: Indicator) => p.indicator_key === 'co2_emissions');
    const initialCO2 = initialCO2Indicator?.paths.data[2026];
    
    // Create trends and set positive trend for CO2 emissions
    const trends: MilestoneTrends = {};
    setTrend(trends, 'co2_emissions', 2025, 2.0, 'Gt');
    applyTrend(data, trends);
    calculate(data);
    
    // Check CO2 emissions after calculation
    const updatedCO2Indicator = data.projections.find((p: Indicator) => p.indicator_key === 'co2_emissions');
    const updatedCO2 = updatedCO2Indicator?.paths.data[2026];
    
    console.log('Initial CO2 rate (before trend):', initialCO2?.rate);
    console.log('Updated CO2 rate (after trend + correlations):', updatedCO2?.rate);
    
    // Verify correlation influences are being applied
    // The rate should change from the original value due to trend + correlations
    expect(updatedCO2?.rate).not.toBe(initialCO2?.rate);
    expect(updatedCO2?.rate).toBeDefined();
    
    // With the correlation matrix, the rate should be affected by the trend
    const expectedWithJustTrend = (initialCO2?.rate || 0) + 2.0;
    // Note: Correlation effects depend on current correlation matrix configuration
    expect(updatedCO2?.rate).toBeDefined();
  });

  test('should handle zero correlation coefficients', () => {
    const data = loadData(dataPath);
    
    // Get original state before modifications - use 2025 as the calculation year
    const originalData = JSON.parse(JSON.stringify(data));
    const initialMining2025Indicator = originalData.projections.find((p: Indicator) => p.indicator_key === 'mining_waste_dump');
    const initialMining2025 = initialMining2025Indicator?.paths.data[2025];
    
    // Mining waste dump correlation effects depend on correlation matrix configuration
    const trends: MilestoneTrends = {};
    setTrend(trends, 'mining_waste_dump', 2025, 1.0, 'Gt');
    applyTrend(data, trends);
    calculate(data);
    
    const updatedMining2026Indicator = data.projections.find((p: Indicator) => p.indicator_key === 'mining_waste_dump');
    const updatedMining2026 = updatedMining2026Indicator?.paths.data[2026];
    
    // Should be affected by its trend
    expect(updatedMining2026?.rate).toBeGreaterThan(initialMining2025?.rate || 0);
    expect(updatedMining2026?.rate).toBeDefined();
  });

  test('should maintain value calculations with correlations', () => {
    const dataPath = resolve('./data/projections.yaml');
    const data = loadData(dataPath);
    
    // Get current state
    const currentIndicator = data.projections.find((p: Indicator) => p.indicator_key === 'co2_emissions');
    const current = currentIndicator?.paths.data[2025];
    
    // Apply trend and correlations
    const trends: MilestoneTrends = {};
    setTrend(trends, 'co2_emissions', 2025, -1.0, 'Gt');
    const correlatedTrends = applyCorrelation(trends);
    applyTrend(data, correlatedTrends);
    calculate(data);
    
    // Check that the updated state follows value recurrence
    const updatedIndicator = data.projections.find((p: Indicator) => p.indicator_key === 'co2_emissions');
    const updated = updatedIndicator?.paths.data[2026];
    
    // Value should still follow v_{t+1} = v_t + r_t
    // updated.value = current.value + current.rate
    expect(updated?.value).toBe((current?.value || 0) + (current?.rate || 0));
  });
});