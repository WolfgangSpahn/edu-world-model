/**
 * Demo script showing correlation matrix toggle effects
 * 
 * This demo:
 * 1. Shows baseline values
 * 2. Changes CO2 trends to -1 for milestone years with correlation matrix ON
 * 3. Changes CO2 trends to -1 for milestone years with correlation matrix OFF
 * 4. Compares the differences
 */

import { fixTrendRate, projections, setTrend, applyTrend, applyCorrelation, getTrendsFromData, printTrends, calculate } from './src/index.js';
import { MilestoneTrends, Indicator, ProjectionData } from './src/types.js';
import { resolve } from 'path';


// Helper function to format numbers for display
function formatNumber(num: number | undefined): string {
  return num !== undefined ? num.toFixed(3) : 'N/A';
}

// Helper function to print milestone data without forward calculation
function printMilestoneData(data: any, title: string) {
  console.log(`\n=== ${title} ===`);
  console.log('Indicator'.padEnd(20) + 'Year'.padEnd(8) + 'Trend'.padEnd(10) + 'Rate'.padEnd(12) + 'Value'.padEnd(15));
  console.log('-'.repeat(65));

  const milestoneYears = [1980, 1995, 2010, 2025, 2040, 2055, 2070];
  
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
function printIndicatorData(data: any, title: string, indicatorKey?: string) {
  console.log(`\n=== ${title} ===`);
  console.log('Indicator'.padEnd(20) + 'Year'.padEnd(8) + 'Trend'.padEnd(10) + 'Rate'.padEnd(12) + 'Value'.padEnd(15));
  console.log('-'.repeat(65));

  const years = [1980, 1995, 2010, 2025, 2040, 2055, 2070];

  // Filter indicators if indicatorKey is provided
  const indicators = indicatorKey
    ? [indicatorKey]
    : data.projections.map((proj: any) => proj.indicator_key);

  for (const indicator of indicators) {
    const indicatorProj = data.projections.find((p: Indicator) => p.indicator_key === indicator);
    for (const year of years) {
      const projection = indicatorProj?.paths.data[year];
      const formatTrend = projection?.trend !== undefined ? projection.trend.toFixed(3) : 'N/A';
      const formatRate = projection?.rate !== undefined ? projection.rate.toFixed(3) : 'N/A';
      console.log(
        indicator.padEnd(20) +
        year.toString().padEnd(8) +
        formatTrend.padEnd(10) +
        formatRate.padEnd(12) +
        formatNumber(projection?.value).padEnd(15)
      );
    }
    console.log('-'.repeat(65));
  }
}

const YEARS_TO_DISPLAY = [1980, 1995, 2010, 2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038,2039, 2040, 2055, 2070];

function filterProjectionsByYears(data: any, years: number[]) {
  const allowedYears = new Set(years.map((year) => year.toString()));

  return {
    ...data,
    projections: data.projections?.map((projection: any) => {
      const filteredData = Object.fromEntries(
        Object.entries(projection.paths?.data ?? {}).filter(([year]) => allowedYears.has(year))
      );

      return {
        ...projection,
        paths: {
          ...projection.paths,
          data: filteredData,
        },
      };
    }),
  };
}

const INDICATORS_TO_DISPLAY = ['happiness_index']
function filterProjectionsByIndicators(data: any, indicatorKeys: string[]) {
  const allowedIndicators = new Set(indicatorKeys);

  return {
    ...data,
    projections: data.projections?.filter((projection: any) =>
      allowedIndicators.has(projection.indicator_key)
    ),
    };
}
// log projectins including paths inside. the paths objects to be printed as well
function printFiltered(data: any) {
  const filtered = filterProjectionsByIndicators(
    filterProjectionsByYears(data, YEARS_TO_DISPLAY),
    INDICATORS_TO_DISPLAY
  );
  console.log(JSON.stringify(filtered, null, 2));
}






function main() {
  const dataPath = resolve('./data/projections.yaml');
  const years = [2025, 2040, 2055, 2069, 2070];
  const hist_anchor_year_intervals = [[1980, 1995], [1995, 2010], [2010, 2025]];
  
  console.log('🌍 Demo');
  console.log('===========================');
  
  // Show true milestone baseline (no calculation)
  // const baselineData = loadData(dataPath);
  const baseData = projections ; // Use imported projections data

  fixTrendRate(baseData, [[1980, 1995], [1995, 2010], [2010, 2025]]);
  calculate(baseData);

  printFiltered(baseData);
  printMilestoneData(baseData, 'Baseline Data (No Calculation)');


  return;

}

// Run the demo
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}