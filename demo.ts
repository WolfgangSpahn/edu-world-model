/**
 * Demo script showing correlation matrix effects in World-Sim
 * 
 * This demo:
 * 1. Shows baseline values for all 4 indicators at key years
 * 2. Changes trends from 0 to -1 for milestone years 2025, 2040, 2055
 * 3. Shows how correlation matrix influences the final results
 */

import { loadData, setTrend, applyTrend, calculate } from './src/index.js';
import { Indicator } from './src/types.js';
import { MilestoneTrends } from './src/types.js';
import { resolve } from 'path';

// Helper function to format numbers for display
function formatNumber(num: number | undefined): string {
  return num !== undefined ? num.toFixed(2) : 'N/A';
}

// Helper function to print indicator data for specific years
function printIndicatorData(data: any, title: string) {
  console.log(`\n=== ${title} ===`);
  console.log('Indicator'.padEnd(20) + 'Year'.padEnd(8) + 'Trend'.padEnd(10) + 'Rate'.padEnd(12) + 'Value'.padEnd(15));
  console.log('-'.repeat(65));
  
  const indicators = ['co2_emissions', 'mining_waste_dump', 'forests_area', 'soils_area'];
  const years = [2025, 2040, 2055, 2070];
  
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
  
  console.log('🌍 World Simulation Correlation Matrix Demo');
  console.log('==========================================');
  
  // Load initial data
  const data = loadData(dataPath);
  
  // Show baseline values BEFORE any changes
  printIndicatorData(data, 'BASELINE VALUES (Before Any Changes)');
  
  console.log('\n📝 Now setting CO2 emissions trend to -1.0 for milestone years 2025, 2040, 2055...');
  console.log('   Other indicators will remain at baseline values');
  console.log('   This will show how correlation matrix affects CO2 when only it changes');
  
  // Create milestone trends and set CO2 trends
  const trends: MilestoneTrends = {};
  const milestoneYears: (2025 | 2040 | 2055)[] = [2025, 2040, 2055];
  
  for (const year of milestoneYears) {
    try {
      setTrend(trends, 'co2_emissions', year, -1.0, 'Gt');
      console.log(`   ✓ Set co2_emissions trend to -1.0 for year ${year}`);
    } catch (error) {
      console.log(`   ⚠️  Could not set trend for co2_emissions at ${year}: ${error}`);
    }
  }
  
  // Apply trends to data
  applyTrend(data, trends);
  
  console.log('\n🔄 Calculating with correlation matrix influences...');
  
  // Calculate with correlation matrix
  calculate(data);
  
  // Show results after correlation matrix application
  printIndicatorData(data, 'AFTER CO2 TREND CHANGES AND CORRELATION MATRIX APPLICATION');
  
  console.log('\n📊 CORRELATION MATRIX ANALYSIS:');
  console.log('-------------------------------');
  console.log('The correlation matrix is:');
  console.log('co2_emissions    → affects: co2(1.0), mining(-1.0), forests(-1.0), soils(-1.0)');
  console.log('mining_waste_dump → affects: mining(1.0), others(0.0)');
  console.log('forests_area     → affects: forests(1.0), others(0.0)');
  console.log('soils_area       → affects: soils(1.0), others(0.0)');
  
  console.log('\n🎯 KEY OBSERVATIONS:');
  console.log('- Only CO2 emissions trend was changed to -1.0');
  console.log('- Other indicators remained at baseline, but still influence CO2 through correlation matrix');
  console.log('- CO2 is negatively correlated with mining (+100 rate) → gets negative influence');
  console.log('- CO2 is negatively correlated with forests (-52 rate) → gets positive influence');
  console.log('- CO2 is negatively correlated with soils (-33 rate) → gets positive influence');
  console.log('- Net effect: CO2 rate changes by trend + correlation influences from other indicators');
  
  console.log('\n✨ Demo completed successfully!');
}

// Run the demo
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}