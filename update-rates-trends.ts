import * as fs from 'fs';
import * as yaml from 'js-yaml';

interface YearData {
  rate: number;
  trend: number;
  value: number;
}

interface IndicatorData {
  indicator_key: string;
  name: string;
  paths: {
    unit: string;
    data: { [year: string]: YearData };
  };
}

interface ProjectionsData {
  projections: IndicatorData[];
}

function updateRatesAndTrends(filePath: string): void {
  // Read and parse YAML file
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContent) as ProjectionsData;

  // Process each indicator
  for (const indicator of data.projections) {
    const years = Object.keys(indicator.paths.data).map(y => parseInt(y)).sort((a, b) => a - b);
    
    console.log(`\nProcessing ${indicator.indicator_key}:`);
    
    // Calculate new rates and trends based on delta/15 formula
    for (let i = 0; i < years.length; i++) {
      const currentYear = years[i];
      const currentData = indicator.paths.data[currentYear.toString()];
      
      if (i === 0) {
        // First year: keep original values or set to 0
        console.log(`  ${currentYear}: rate=${currentData.rate} (kept), trend=${currentData.trend} (kept)`);
        continue;
      }
      
      const prevYear = years[i - 1];
      const prevData = indicator.paths.data[prevYear.toString()];
      const yearDelta = currentYear - prevYear;
      
      // Calculate value delta
      const valueDelta = currentData.value - prevData.value;
      
      // New rate = delta value / 15
      const newRate = Math.round((valueDelta / 15) * 10) / 10; // Round to 1 decimal
      
      // Calculate rate delta for trend
      const rateDelta = currentData.rate - prevData.rate;
      
      // New trend = delta rate / 15
      const newTrend = Math.round((rateDelta / 15) * 100) / 100; // Round to 2 decimals for precision
      
      console.log(`  ${currentYear}: value_delta=${valueDelta.toFixed(1)}, rate_delta=${rateDelta.toFixed(2)}`);
      console.log(`    old: rate=${currentData.rate}, trend=${currentData.trend}`);
      console.log(`    new: rate=${newRate}, trend=${newTrend}`);
      
      // Update the data
      indicator.paths.data[currentYear.toString()].rate = newRate;
      indicator.paths.data[currentYear.toString()].trend = newTrend;
    }
  }

  // Convert back to YAML with custom formatting to preserve compact format
  let yamlOutput = yaml.dump(data, {
    indent: 2,
    lineWidth: -1,
    noRefs: true,
    sortKeys: false
  });

  // Post-process to create compact format for year data
  yamlOutput = yamlOutput.replace(
    /(\d{4}):\s*\n\s*rate:\s*([+-]?\d+\.?\d*)\s*\n\s*trend:\s*([+-]?\d+\.?\d*)\s*\n\s*value:\s*([+-]?\d+\.?\d*)/g,
    (match, year, rate, trend, value) => {
      // Format numbers with proper + signs
      const formatNum = (num: string) => {
        const n = parseFloat(num);
        if (n === 0) return n.toString();
        return n > 0 ? `+${n}` : n.toString();
      };
      
      return `${year}: { rate: ${formatNum(rate)}, trend: ${formatNum(trend)}, value: ${value} }`;
    }
  );

  // Write the updated file
  fs.writeFileSync(filePath, yamlOutput, 'utf8');
  console.log(`\n✅ Updated ${filePath} with new rates and trends using delta/15 formula`);
}

// Run the script
const filePath = './data/projections.yaml';
updateRatesAndTrends(filePath);
