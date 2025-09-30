/**
 * Demo script showing correlation matrix toggle effects
 * 
 * This demo:
 * 1. Shows baseline values
 * 2. Changes CO2 trends to -1 for milestone years with correlation matrix ON
 * 3. Changes CO2 trends to -1 for milestone years with correlation matrix OFF
 * 4. Compares the differences
 */

import { loadData, setTrend, applyTrend, applyCorrelation, getTrendsFromData, printTrends, calculate, getProjection, config } from './src/index.js';
import { MilestoneTrends } from './src/types.js';
import { resolve } from 'path';
import { consequences_trends, ConsequenceTrends } from './src/config.js';

// Helper function to format numbers for display
function formatNumber(num: number | undefined): string {
  return num !== undefined ? num.toFixed(2) : 'N/A';
}

// Helper function to print all indicators data for comparison
function printAllIndicatorsData(data: any, title: string) {
  console.log(`\n=== ${title} ===`);
  console.log('Indicator'.padEnd(20) + 'Year'.padEnd(8) + 'Trend'.padEnd(10) + 'Rate'.padEnd(12) + 'Value'.padEnd(15));
  console.log('-'.repeat(65));

  const years = [2025, 2040, 2055, 2069, 2070];
  const indicators = ['co2_emissions', 'mining_waste_dump', 'forests_area', 'soils_area'];
  
  for (const indicator of indicators) {
    for (const year of years) {
      const projection = getProjection(data, indicator, year);
      console.log(
        indicator.padEnd(20) +
        year.toString().padEnd(8) +
        formatNumber(projection?.trend).padEnd(10) +
        formatNumber(projection?.rate).padEnd(12) +
        formatNumber(projection?.value).padEnd(15)
      );
    }
    console.log('-'.repeat(65));
  }
}



function main() {
  const dataPath = resolve('./data/projections.yaml');
  
  console.log('🌍 Correlation Matrix Toggle Demo');
  console.log('=================================');
  
  // Show baseline first
  const baselineData = loadData(dataPath);
  printAllIndicatorsData(baselineData, 'BASELINE (No Changes)');
  // printAllIndicatorsDataAllYears(baselineData, 'BASELINE (No Changes)');
  
  console.log('\n🔄 Testing with CORRELATION MATRIX ENABLED...');
  
  // Test with correlation matrix ON
  config.enableCorrelationMatrix = true;
  const data = loadData(dataPath);



  // get trends from data
  const trends = getTrendsFromData(data);
  // add trends from consequences
  const cTrends = consequences_trends;

  // add cTrends to trends
  for (const [indicator, yearValues] of Object.entries(cTrends)) {
    if (!trends[indicator]) {
      trends[indicator] = { 2025: 0, 2040: 0, 2055: 0, unit: '' };
    }
    for (const [year, value] of Object.entries(yearValues)) {
      const yearNum = parseInt(year) as 2025 | 2040 | 2055;
      trends[indicator][yearNum] = value;
    }
  }
  
  printTrends(trends, 'BASIS TRENDS');
  
  // Create milestone trends and set multiple indicator trends to see correlation effects

  setTrend(trends, 'co2_emissions', 2025, -1.0, 'Gt');
  setTrend(trends, 'co2_emissions', 2040, -1.0, 'Gt');
  setTrend(trends, 'co2_emissions', 2055, -1.0, 'Gt');
  

  printTrends(trends, 'INITIAL TRENDS');

  // Apply correlation adjustments to the trends
  applyCorrelation(trends);

  printTrends(trends, 'TRENDS AFTER CORRELATION ADJUSTMENTS');

  // Apply trends to data
  applyTrend(data, trends);

  calculate(data);

  printAllIndicatorsData(data, 'ALL INDICATORS WITH CORRELATION MATRIX ON');
  // printAllIndicatorsDataAllYears(dataWithCorr, 'ALL INDICATORS WITH CORRELATION MATRIX ON (All Years)');
 
  // Reset config to default
  config.enableCorrelationMatrix = true;
  
  console.log('\n✨ Demo completed successfully!');
}

// Run the demo
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}