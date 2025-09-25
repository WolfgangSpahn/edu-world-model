/**
 * Simple integration test for World-Sim TypeScript Package
 * Tests the basic workflow: load → modify → calculate
 */

import { loadData, setTrend, calculate, getProjection } from '../src/index';
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
    
    // Set trend for 2025
    setTrend(data, indicatorKey, 2025, 0.5);
    
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
    const originalVolume = original2027?.volume;
    
    // Modify trend significantly and calculate
    setTrend(data, indicatorKey, 2025, 2.0);
    calculate(data);
    
    // Check that values changed
    const updated2027 = getProjection(data, indicatorKey, 2027);
    expect(updated2027?.rate).not.toBe(originalRate);
    expect(updated2027?.volume).not.toBe(originalVolume);
    
    // Verify the rate increased (due to positive trend)
    expect(updated2027?.rate).toBeGreaterThan(originalRate || 0);
  });

  test('should handle invalid indicator key', () => {
    const data = loadData(dataPath);
    
    expect(() => {
      setTrend(data, 'invalid_indicator', 2025, 0.5);
    }).toThrow("Indicator 'invalid_indicator' not found");
  });

  test('should handle invalid milestone year', () => {
    const data = loadData(dataPath);
    const indicatorKey = data.projections[0].indicator_key;
    
    expect(() => {
      // @ts-expect-error Testing invalid year
      setTrend(data, indicatorKey, 2026, 0.5);
    }).toThrow('Invalid milestone year');
  });
});