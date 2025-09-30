/**
 * Example usage of set_correlation_trend function
 */

import { loadData, setTrend, applyTrend, set_correlation_trend, calculate, getProjection } from './src/index.js';
import { MilestoneTrends } from './src/types.js';
import { resolve } from 'path';

function main() {
  const dataPath = resolve('./data/projections.yaml');
  const data = loadData(dataPath);
  
  console.log('🌍 Testing set_correlation_trend function');
  console.log('========================================');
  
  // First, set some base trends
  console.log('\n📝 Setting base trends...');
  const trends: MilestoneTrends = {};
  setTrend(trends, 'co2_emissions', 2025, -1.0, 'Gt');
  setTrend(trends, 'mining_waste_dump', 2025, -2.0, '000 km²');
  setTrend(trends, 'forests_area', 2025, 1.0, '000 km²');
  setTrend(trends, 'soils_area', 2025, 0.5, '000 km²');
  
  // Apply trends to data
  applyTrend(data, trends);
  
  console.log('Base trends set:');
  console.log(`CO2 emissions 2025: ${getProjection(data, 'co2_emissions', 2025)?.trend}`);
  console.log(`Mining waste 2025: ${getProjection(data, 'mining_waste_dump', 2025)?.trend}`);
  console.log(`Forests 2025: ${getProjection(data, 'forests_area', 2025)?.trend}`);
  console.log(`Soils 2025: ${getProjection(data, 'soils_area', 2025)?.trend}`);
  
  // Now apply correlation-based adjustments
  set_correlation_trend(data);
  
  console.log('After correlation adjustments:');
  console.log(`CO2 emissions 2025: ${getProjection(data, 'co2_emissions', 2025)?.trend}`);
  console.log(`Mining waste 2025: ${getProjection(data, 'mining_waste_dump', 2025)?.trend}`);
  console.log(`Forests 2025: ${getProjection(data, 'forests_area', 2025)?.trend}`);
  console.log(`Soils 2025: ${getProjection(data, 'soils_area', 2025)?.trend}`);
  
  // Calculate the results
  calculate(data);
  
  console.log('\n📊 Final results after calculation:');
  console.log(`CO2 emissions 2026 rate: ${getProjection(data, 'co2_emissions', 2026)?.rate}`);
  console.log(`Mining waste 2026 rate: ${getProjection(data, 'mining_waste_dump', 2026)?.rate}`);
  console.log(`Forests 2026 rate: ${getProjection(data, 'forests_area', 2026)?.rate}`);
  console.log(`Soils 2026 rate: ${getProjection(data, 'soils_area', 2026)?.rate}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}