# World-Sim User Guide

A comprehensive guide to using the World-Sim TypeScript package for educational world simulation modeling.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Core Concepts](#core-concepts)
3. [API Reference](#api-reference)
4. [Data Structure](#data-structure)
5. [Working with Trends](#working-with-trends)
6. [Correlation Matrix](#correlation-matrix)
7. [Examples](#examples)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## Quick Start

### Installation

```bash
npm install world-sim
```

### Basic Usage

```typescript
import { loadData, setTrend, calculate } from 'world-sim';

// 1. Load projection data
const data = loadData('./data/projections.yaml');

// 2. Get baseline projection
const co2Indicator = data.projections.find(p => p.indicator_key === 'co2_emissions');
const baseline2030 = co2Indicator?.paths.data[2030];
console.log(`Baseline CO2 2030: ${baseline2030?.value} Gt`);

// 3. Apply policy intervention
setTrend(data, 'co2_emissions', 2025, -1.0); // Reduce emissions

// 4. Recalculate projections
calculate(data);

// 5. See the impact
const updated2030 = co2Indicator?.paths.data[2030];
console.log(`After intervention: ${updated2030?.value} Gt`);
```

## Core Concepts

### Mathematical Model

World-Sim uses a simple forward-calculation model:

```
Rate Recurrence:  r[t+1] = clamp(r[t] + trend[t], min_rate, max_rate)
Value Recurrence: v[t+1] = v[t] + r[t]
```

Where:
- **Rate**: The yearly change amount (units/year)
- **Trend**: Policy intervention that modifies the rate
- **Value**: Cumulative total over time
- **Clamp**: Bounds checking using configured limits

### Milestone Years

Trends are applied to specific milestone years that affect ranges:

- **2025**: Affects years 2025-2039
- **2040**: Affects years 2040-2054  
- **2055**: Affects years 2055-2070

### Indicators

The system models various environmental and socio-economic indicators:

- `co2_emissions` - CO2 Emissions (Gt CO2/year)
- `forests_area` - Forest Area (000 km²)
- `soils_area` - Soil Area (000 km²)
- `mining_waste_dump` - Mining Waste (Gt)
- `unemployment_rate` - Unemployment Rate (%)
- `life_expectancy` - Life Expectancy (years)
- `gdp_per_cap` - GDP per Capita (k USD)
- `population` - Population (G people)
- And more...

## API Reference

### Core Functions

#### `loadData(filePath: string): ProjectionData`
Loads YAML projection data from file.

```typescript
const data = loadData('./data/projections.yaml');
```

#### `calculate(data: ProjectionData): void`
Recalculates all projections with current trends using the mathematical model.

```typescript
calculate(data);
```

#### `setTrend(data: ProjectionData, indicator: string, year: number, trend: number): void`
Sets a trend value for a specific indicator and milestone year.

```typescript
// Reduce CO2 emissions trend by 1.0 Gt/year starting from 2025
setTrend(data, 'co2_emissions', 2025, -1.0);
```

#### `getTrend(data: ProjectionData, indicator: string, year: number): number`
Gets the current trend value for an indicator and year.

```typescript
const currentTrend = getTrend(data, 'co2_emissions', 2025);
```

### Trend Management Functions

#### `getTrendsFromData(data: ProjectionData): MilestoneTrends`
Extracts current trends from loaded data into a trends object.

```typescript
const trends = getTrendsFromData(data);
```

#### `applyTrend(data: ProjectionData, trends: MilestoneTrends): void`
Applies milestone trends to the data.

```typescript
applyTrend(data, trends);
```

#### `printTrends(trends: MilestoneTrends, title: string): void`
Displays trends in a formatted table for debugging.

```typescript
printTrends(trends, 'Current Trends');
```

### Correlation Matrix Functions

#### `applyCorrelation(trends: MilestoneTrends): MilestoneTrends`
Applies correlation adjustments and returns a new trends object.

```typescript
const correlatedTrends = applyCorrelation(trends);
```

### Data Access

#### Direct Data Access Pattern
```typescript
// Get data for specific indicator and year
const indicator = data.projections.find(p => p.indicator_key === 'co2_emissions');
const yearData = indicator?.paths.data[2030]; // { rate, trend, value }

// Access specific properties
const rate = yearData?.rate;      // Current rate of change
const trend = yearData?.trend;    // Applied trend adjustment
const value = yearData?.value;    // Cumulative value
```

## Data Structure

### ProjectionData
```typescript
interface ProjectionData {
  projections: Indicator[];        // Array of all indicators
}
```

### Indicator
```typescript
interface Indicator {
  indicator_key: string;           // e.g. 'co2_emissions'
  name: string;                    // e.g. 'CO2 Emissions'
  paths: {
    data: Record<number, YearData> // Year -> YearData mapping
    unit: string;                  // e.g. 'Gt' or '000 km²'
  }
}
```

### YearData
```typescript
interface YearData {
  rate: number;    // Change rate (unit/year)
  trend: number;   // Trend modifier (additive adjustment to rate)
  value: number;   // Cumulative total (unit)
}
```

### MilestoneTrends
```typescript
interface MilestoneTrends {
  [indicator_key: string]: {
    2025: number;
    2040: number;
    2055: number;
    unit: string;
  }
}
```

## Working with Trends

### Setting Individual Trends

```typescript
// Load data
const data = loadData('./data/projections.yaml');

// Set trends for different milestone years
setTrend(data, 'co2_emissions', 2025, -2.0);  // Strong reduction starting 2025
setTrend(data, 'co2_emissions', 2040, -1.0);  // Moderate reduction 2040-2054
setTrend(data, 'co2_emissions', 2055, -0.5);  // Small reduction 2055+

// Apply changes
calculate(data);
```

### Working with Trend Objects

```typescript
// Extract current trends
const trends = getTrendsFromData(data);

// Modify multiple indicators
setTrend(trends, 'co2_emissions', 2025, -1.5, 'Gt');
setTrend(trends, 'forests_area', 2025, 0.5, '000 km²');
setTrend(trends, 'mining_waste_dump', 2025, -0.8, 'Gt');

// Apply all trends at once
applyTrend(data, trends);
calculate(data);
```

### Viewing Trends

```typescript
// Print trends in a formatted table
printTrends(trends, 'Policy Interventions');

// Output:
// === Policy Interventions ===
// Indicator           2025        2040        2055        Unit      
// --------------------------------------------------------------------
// co2_emissions       -1.50       0.00        0.00        Gt        
// forests_area        0.50        0.00        0.00        000 km²   
// mining_waste_dump   -0.80       0.00        0.00        Gt        
```

## Correlation Matrix

The correlation matrix models how indicators influence each other.

### Basic Correlation Usage

```typescript
// Load data and set base trends
const data = loadData('./data/projections.yaml');
const trends = getTrendsFromData(data);

// Set primary intervention
setTrend(trends, 'co2_emissions', 2025, -2.0, 'Gt');

// Apply correlation effects
const correlatedTrends = applyCorrelation(trends);

// Apply and calculate
applyTrend(data, correlatedTrends);
calculate(data);
```

### Correlation Strength

You can adjust correlation strength:

```typescript
// Apply with stronger correlation effects (default is 0.1)
const strongCorrelation = applyCorrelation(trends, undefined, 0.5);

// Apply with weaker correlation effects
const weakCorrelation = applyCorrelation(trends, undefined, 0.05);
```

### Baseline vs Correlation Comparison

```typescript
// Calculate baseline (no correlations)
const baselineData = loadData('./data/projections.yaml');
const baseTrends = getTrendsFromData(baselineData);
setTrend(baseTrends, 'co2_emissions', 2025, -1.0, 'Gt');
applyTrend(baselineData, baseTrends);
calculate(baselineData);

// Calculate with correlations
const corrData = loadData('./data/projections.yaml');
const corrTrends = getTrendsFromData(corrData);
setTrend(corrTrends, 'co2_emissions', 2025, -1.0, 'Gt');
const correlatedTrends = applyCorrelation(corrTrends);
applyTrend(corrData, correlatedTrends);
calculate(corrData);

// Compare results
const baselineCO2 = baselineData.projections.find(p => p.indicator_key === 'co2_emissions')?.paths.data[2030];
const correlatedCO2 = corrData.projections.find(p => p.indicator_key === 'co2_emissions')?.paths.data[2030];

console.log(`Baseline: ${baselineCO2?.value} Gt`);
console.log(`With correlations: ${correlatedCO2?.value} Gt`);
```

## Examples

### Example 1: Simple CO2 Reduction

```typescript
import { loadData, setTrend, calculate } from 'world-sim';

async function co2ReductionScenario() {
  // Load baseline data
  const data = loadData('./data/projections.yaml');
  
  // Get baseline 2050 projection
  const co2Indicator = data.projections.find(p => p.indicator_key === 'co2_emissions');
  const baseline2050 = co2Indicator?.paths.data[2050];
  
  console.log(`Baseline CO2 2050: ${baseline2050?.value.toFixed(2)} Gt`);
  
  // Apply aggressive CO2 reduction policy
  setTrend(data, 'co2_emissions', 2025, -3.0);  // Immediate strong reduction
  setTrend(data, 'co2_emissions', 2040, -2.0);  // Continued reduction
  setTrend(data, 'co2_emissions', 2055, -1.0);  // Maintenance phase
  
  // Recalculate
  calculate(data);
  
  // See results
  const policy2050 = co2Indicator?.paths.data[2050];
  console.log(`With policy CO2 2050: ${policy2050?.value.toFixed(2)} Gt`);
  console.log(`Reduction: ${(baseline2050!.value - policy2050!.value).toFixed(2)} Gt`);
}
```

### Example 2: Multi-Indicator Environmental Policy

```typescript
import { loadData, getTrendsFromData, setTrend, applyTrend, applyCorrelation, calculate } from 'world-sim';

async function environmentalPolicy() {
  const data = loadData('./data/projections.yaml');
  const trends = getTrendsFromData(data);
  
  // Comprehensive environmental policy
  setTrend(trends, 'co2_emissions', 2025, -2.5, 'Gt');        // Reduce emissions
  setTrend(trends, 'forests_area', 2025, 1.0, '000 km²');     // Reforestation
  setTrend(trends, 'mining_waste_dump', 2025, -1.5, 'Gt');   // Reduce mining waste
  setTrend(trends, 'soils_area', 2025, 0.3, '000 km²');      // Soil conservation
  
  console.log('=== Environmental Policy Interventions ===');
  printTrends(trends, 'Base Policy');
  
  // Apply correlation effects
  const correlatedTrends = applyCorrelation(trends);
  console.log('=== After Correlation Adjustments ===');
  printTrends(correlatedTrends, 'With Correlations');
  
  // Apply and calculate
  applyTrend(data, correlatedTrends);
  calculate(data);
  
  // Report results for 2050
  const indicators = ['co2_emissions', 'forests_area', 'mining_waste_dump', 'soils_area'];
  console.log('\n=== 2050 Results ===');
  
  for (const indicator of indicators) {
    const indicatorData = data.projections.find(p => p.indicator_key === indicator);
    const result2050 = indicatorData?.paths.data[2050];
    console.log(`${indicator}: ${result2050?.value.toFixed(2)} ${indicatorData?.paths.unit}`);
  }
}
```

### Example 3: Economic vs Environmental Trade-offs

```typescript
import { loadData, getTrendsFromData, setTrend, applyTrend, calculate } from 'world-sim';

async function economicVsEnvironmental() {
  // Scenario 1: Economic Growth Focus
  const economicData = loadData('./data/projections.yaml');
  const economicTrends = getTrendsFromData(economicData);
  
  setTrend(economicTrends, 'gdp_per_cap', 2025, 0.5, 'k USD');
  setTrend(economicTrends, 'mining_waste_dump', 2025, 2.0, 'Gt');  // More mining
  
  applyTrend(economicData, economicTrends);
  calculate(economicData);
  
  // Scenario 2: Environmental Focus
  const envData = loadData('./data/projections.yaml');
  const envTrends = getTrendsFromData(envData);
  
  setTrend(envTrends, 'co2_emissions', 2025, -2.0, 'Gt');
  setTrend(envTrends, 'forests_area', 2025, 1.5, '000 km²');
  setTrend(envTrends, 'mining_waste_dump', 2025, -1.0, 'Gt');
  
  applyTrend(envData, envTrends);
  calculate(envData);
  
  // Compare outcomes in 2060
  console.log('=== 2060 Comparison ===');
  
  const economicGDP = economicData.projections.find(p => p.indicator_key === 'gdp_per_cap')?.paths.data[2060];
  const envGDP = envData.projections.find(p => p.indicator_key === 'gdp_per_cap')?.paths.data[2060];
  
  const economicCO2 = economicData.projections.find(p => p.indicator_key === 'co2_emissions')?.paths.data[2060];
  const envCO2 = envData.projections.find(p => p.indicator_key === 'co2_emissions')?.paths.data[2060];
  
  console.log(`Economic Focus - GDP: ${economicGDP?.value.toFixed(2)} k USD, CO2: ${economicCO2?.value.toFixed(2)} Gt`);
  console.log(`Environmental Focus - GDP: ${envGDP?.value.toFixed(2)} k USD, CO2: ${envCO2?.value.toFixed(2)} Gt`);
}
```

## Best Practices

### 1. Always Load Fresh Data for Comparisons

```typescript
// ✅ Good - Fresh data for each scenario
const scenario1 = loadData('./data/projections.yaml');
const scenario2 = loadData('./data/projections.yaml');

// ❌ Bad - Reusing modified data
const baseData = loadData('./data/projections.yaml');
// ... modify baseData ...
const scenario2 = baseData; // This carries over previous changes
```

### 2. Use Trend Objects for Complex Scenarios

```typescript
// ✅ Good - Use trend objects for multiple changes
const trends = getTrendsFromData(data);
setTrend(trends, 'co2_emissions', 2025, -1.0, 'Gt');
setTrend(trends, 'forests_area', 2025, 0.5, '000 km²');
applyTrend(data, trends);

// ❌ Less efficient - Multiple direct calls
setTrend(data, 'co2_emissions', 2025, -1.0);
setTrend(data, 'forests_area', 2025, 0.5);
```

### 3. Validate Input Data

```typescript
// ✅ Good - Check data exists
const indicator = data.projections.find(p => p.indicator_key === 'co2_emissions');
if (!indicator) {
  throw new Error('CO2 emissions indicator not found');
}

const yearData = indicator.paths.data[2030];
if (!yearData) {
  throw new Error('Data for 2030 not available');
}
```

### 4. Use Correlation Matrix Thoughtfully

```typescript
// ✅ Good - Show both baseline and correlated results
const baselineResult = calculateBaseline(trends);
const correlatedResult = calculateWithCorrelations(trends);
console.log('Baseline:', baselineResult);
console.log('With correlations:', correlatedResult);

// ❌ Less informative - Only showing correlated results
const result = applyCorrelation(trends);
// Missing context of what changed due to correlations
```

### 5. Round Results for Display

```typescript
// ✅ Good - Round for human readability
console.log(`CO2 emissions: ${result.value.toFixed(2)} Gt`);

// ❌ Poor - Too many decimal places
console.log(`CO2 emissions: ${result.value} Gt`); // Might show 2599.899999999
```

## Troubleshooting

### Common Issues

#### Issue: "Indicator not found"
```typescript
// Problem: Typo in indicator name
setTrend(data, 'co2_emission', 2025, -1.0); // Missing 's'

// Solution: Check available indicators
const indicators = data.projections.map(p => p.indicator_key);
console.log('Available indicators:', indicators);
```

#### Issue: "Year data not available"
```typescript
// Problem: Accessing year outside range
const yearData = indicator.paths.data[1995]; // Too early

// Solution: Check available years
const availableYears = Object.keys(indicator.paths.data).map(Number);
console.log('Available years:', availableYears.sort());
```

#### Issue: Unexpected results after calculate()
```typescript
// Problem: Forgetting to call calculate()
setTrend(data, 'co2_emissions', 2025, -1.0);
// Missing: calculate(data);
const result = indicator.paths.data[2030]; // Still old values

// Solution: Always call calculate() after setting trends
setTrend(data, 'co2_emissions', 2025, -1.0);
calculate(data); // ✅ Now results will be updated
```

### Debugging Tips

#### 1. Print Trends to Verify
```typescript
const trends = getTrendsFromData(data);
printTrends(trends, 'Current Trends');
```

#### 2. Check Rate Limits
Rate changes are bounded by configured limits. Very large trends might be clipped.

#### 3. Verify Milestone Years
Remember that trends only apply to milestone years: 2025, 2040, 2055.

#### 4. Compare Before/After
```typescript
// Capture before state
const before = indicator.paths.data[2030].value;

// Apply changes
setTrend(data, 'co2_emissions', 2025, -1.0);
calculate(data);

// Check after state
const after = indicator.paths.data[2030].value;
console.log(`Change: ${after - before}`);
```

### Performance Tips

1. **Reuse trend objects** when making multiple related changes
2. **Load data once** and clone for different scenarios if needed
3. **Call calculate() only once** after all trend changes
4. **Use specific indicators** rather than processing all data when possible

---

For more examples and advanced usage, see the demo files in the project repository.