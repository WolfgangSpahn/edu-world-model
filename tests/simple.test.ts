/**
 * Simple integration test for World-Sim TypeScript Package
 * Tests the basic workflow: load → modify → calculate
 */

import { loadData, setTrend, applyTrend, getTrendsFromData, calculate, getProjection } from '../src/index';
import { MilestoneTrends } from '../src/types';
import { resolve } from 'path';

describe('World-Sim Basic Functionality', () => {
  const dataPath = resolve(__dirname, '../data/projections.yaml');
  
  test('should load YAML data successfully', () => {
    const data = loadData(dataPath);
    
    expect(data).toBeDefined();
    expect(data.projections).toBeDefined();
    expect(Array.isArray(data.projections)).toBe(true);
    expect(data.projections.length).toBeGreaterThan(0);
    
    // Check first indicator structure
    const firstIndicator = data.projections[0];
    expect(firstIndicator.indicator_key).toBeDefined();
    expect(firstIndicator.name).toBeDefined();
    expect(firstIndicator.paths).toBeDefined();
    expect(firstIndicator.paths.data).toBeDefined();
  });

  test('should modify trends for milestone years', () => {
    const data = loadData(dataPath);
    const indicatorKey = data.projections[0].indicator_key;
    
    // Create trends and set trend for 2025
    const trends: MilestoneTrends = {};
    setTrend(trends, indicatorKey, 2025, 0.5, 'unit');
    applyTrend(data, trends);
    
    // Check that trend was applied to 2025-2039 range
    for (let year = 2025; year <= 2039; year++) {
      const projection = getProjection(data, indicatorKey, year);
      if (projection) {
        expect(projection.trend).toBe(0.5);
      }
    }
  });

  test('should recalculate future projections', () => {
    const data = loadData(dataPath);
    const indicatorKey = data.projections[0].indicator_key;
    
    // Get original values for 2027 (further out to see more change)
    const original2027 = getProjection(data, indicatorKey, 2027);
    const originalRate = original2027?.rate;
    const originalValue = original2027?.value;
    
    // Create trends and modify trend significantly
    const trends: MilestoneTrends = {};
    setTrend(trends, indicatorKey, 2025, 2.0, 'unit');
    applyTrend(data, trends);
    calculate(data);
    
    // Check that values changed
    const updated2027 = getProjection(data, indicatorKey, 2027);
    expect(updated2027?.rate).not.toBe(originalRate);
    expect(updated2027?.value).not.toBe(originalValue);
    
    // Note: With correlation matrix, CO2 emissions are negatively influenced by other indicators
    // So even with positive trend, the rate might decrease due to correlation effects
    // The important thing is that values changed, indicating calculation occurred
    expect(updated2027?.rate).toBeDefined();
    expect(updated2027?.value).toBeDefined();
  });

  test('should handle invalid indicator key', () => {
    const trends: MilestoneTrends = {};
    
    expect(() => {
      setTrend(trends, 'invalid_indicator', 2025, 0.5, 'unit');
    }).not.toThrow(); // setTrend no longer validates against data
    
    // applyTrend now silently skips invalid indicators instead of throwing
    const data = loadData(dataPath);
    expect(() => {
      applyTrend(data, trends);
    }).not.toThrow(); // Should not throw, just skip invalid indicators
  });

  test('should handle invalid milestone year', () => {
    const trends: MilestoneTrends = {};
    
    expect(() => {
      // @ts-expect-error Testing invalid year
      setTrend(trends, 'co2_emissions', 2026, 0.5, 'unit');
    }).toThrow('Invalid milestone year');
  });
});