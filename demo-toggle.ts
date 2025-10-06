/**
 * Demo script showing correlation matrix toggle effects
 * 
 * This demo:
 * 1. Shows baseline values
 * 2. Changes CO2 trends to -1 for milestone years with correlation matrix ON
 * 3. Changes CO2 trends to -1 for milestone years with correlation matrix OFF
 * 4. Compares the differences
 */

import { projections, setTrend, applyTrend, applyCorrelation, getTrendsFromData, printTrends, calculate } from './src/index.js';
import { MilestoneTrends, Indicator } from './src/types.js';
import { resolve } from 'path';


// Helper function to format numbers for display
function formatNumber(num: number | undefined): string {
  return num !== undefined ? num.toFixed(2) : 'N/A';
}

// Helper function to print milestone data without forward calculation
function printMilestoneData(data: any, title: string) {
  console.log(`\n=== ${title} ===`);
  console.log('Indicator'.padEnd(20) + 'Year'.padEnd(8) + 'Trend'.padEnd(10) + 'Rate'.padEnd(12) + 'Value'.padEnd(15));
  console.log('-'.repeat(65));

  const milestoneYears = [2025, 2040, 2055];
  
  // Get all indicators from the loaded data
  const indicators = data.projections.map((proj: any) => proj.indicator_key);
  
  for (const indicator of indicators) {
    const indicatorData = data.projections.find((proj: any) => proj.indicator_key === indicator);
    
    for (const year of milestoneYears) {
      const yearData = indicatorData?.paths?.data?.[year.toString()];
      if (yearData) {
        console.log(
          indicator.padEnd(20) +
          year.toString().padEnd(8) +
          formatNumber(yearData.trend).padEnd(10) +
          formatNumber(yearData.rate).padEnd(12) +
          formatNumber(yearData.value).padEnd(15)
        );
      } else {
        console.log(
          indicator.padEnd(20) +
          year.toString().padEnd(8) +
          'N/A'.padEnd(10) +
          'N/A'.padEnd(12) +
          'N/A'.padEnd(15)
        );
      }
    }
    console.log('-'.repeat(65));
  }
}

// Helper function to print all indicators data for comparison
function printAllIndicatorsData(data: any, title: string) {
  console.log(`\n=== ${title} ===`);
  console.log('Indicator'.padEnd(20) + 'Year'.padEnd(8) + 'Trend'.padEnd(10) + 'Rate'.padEnd(12) + 'Value'.padEnd(15));
  console.log('-'.repeat(65));

  const years = [2025, 2040, 2055, 2069, 2070];
  
  // Get all indicators from the loaded data instead of hardcoding
  const indicators = data.projections.map((proj: any) => proj.indicator_key);
  
  for (const indicator of indicators) {
    for (const year of years) {
      const indicatorProj = data.projections.find((p: Indicator) => p.indicator_key === indicator);
      const projection = indicatorProj?.paths.data[year];
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
  
  console.log('🌍 Correlation Matrix Demo');
  console.log('===========================');
  
  // Show true milestone baseline (no calculation)
  // const baselineData = loadData(dataPath);
  const baselineData = projections ; // Use imported projections data
  
  // Show calculated baseline for comparison
  calculate(baselineData);
  printAllIndicatorsData(baselineData, 'BASELINE AFTER CALCULATION');
  
  console.log('\n🔄 Testing with CORRELATION MATRIX...');
  
  // Load fresh data for correlation test
  const data = projections ;
  // Get data from projections.js


  // get trends from all indicators in the loaded data
  const trends = getTrendsFromData(data);
  
  printTrends(trends, 'BASIS TRENDS');
  
  // Create milestone trends and set multiple indicator trends to see correlation effects
  setTrend(trends, 'co2_emissions', 2025, -1.0, 'Gt');
  setTrend(trends, 'co2_emissions', 2040, -1.0, 'Gt');
  setTrend(trends, 'co2_emissions', 2055, -1.0, 'Gt');
  
  printTrends(trends, 'INITIAL TRENDS');

  // Apply correlation adjustments to the trends
  const correlatedTrends = applyCorrelation(trends);

  printTrends(correlatedTrends, 'TRENDS AFTER CORRELATION ADJUSTMENTS');

  // Apply trends to data
  applyTrend(data, correlatedTrends);

  calculate(data);

  printAllIndicatorsData(data, 'ALL INDICATORS WITH CORRELATION MATRIX ON');
  
  console.log('\n✨ Demo completed successfully!');
}

// Run the demo
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}