# Edu-World-Model Quick Start Guide

Get started with Edu-World-Model in 5 minutes! This guide will walk you through the basics of using the package.

## Installation

```bash
npm install edu-world-model
```

## 1. Basic Usage - Your First Simulation

```typescript
import { loadData, setTrend, calculate } from 'edu-world-model';

// Load the data
const data = loadData('./data/projections.yaml');

// See current CO2 emissions projection for 2030
const co2Indicator = data.projections.find(p => p.indicator_key === 'co2_emissions');
const baseline2030 = co2Indicator?.paths.data[2030];
console.log(`📊 Baseline CO2 2030: ${baseline2030?.value.toFixed(1)} Gt`);

// Apply a policy: reduce CO2 emissions starting 2025
setTrend(data, 'co2_emissions', 2025, -1.5); // Reduce by 1.5 Gt/year

// Recalculate with the new policy
calculate(data);

// See the impact
const withPolicy2030 = co2Indicator?.paths.data[2030];
console.log(`🌱 With policy CO2 2030: ${withPolicy2030?.value.toFixed(1)} Gt`);
console.log(`✅ Reduction: ${(baseline2030!.value - withPolicy2030!.value).toFixed(1)} Gt`);
```

**Expected Output:**
```
📊 Baseline CO2 2030: 2799.9 Gt
🌱 With policy CO2 2030: 2724.9 Gt  
✅ Reduction: 75.0 Gt
```

## 2. Working with Multiple Indicators

```typescript
import { loadData, getTrendsFromData, setTrend, applyTrend, calculate, printTrends } from 'edu-world-model';

const data = loadData('./data/projections.yaml');

// Extract trends for batch operations
const trends = getTrendsFromData(data);

// Set multiple environmental policies
setTrend(trends, 'co2_emissions', 2025, -2.0, 'Gt');        // Reduce CO2
setTrend(trends, 'forests_area', 2025, 1.0, '000 km²');     // Increase forests
setTrend(trends, 'mining_waste_dump', 2025, -1.0, 'Gt');   // Reduce mining waste

// Show what we're planning to do
console.log('🎯 Environmental Policy Package:');
printTrends(trends, 'Policy Interventions');

// Apply all trends at once
applyTrend(data, trends);
calculate(data);

// Check results for 2040
console.log('\n📈 Results for 2040:');
const indicators = ['co2_emissions', 'forests_area', 'mining_waste_dump'];
for (const indicator of indicators) {
  const indicatorData = data.projections.find(p => p.indicator_key === indicator);
  const result2040 = indicatorData?.paths.data[2040];
  console.log(`${indicator}: ${result2040?.value.toFixed(1)} ${indicatorData?.paths.unit}`);
}
```

## 3. Comparing Scenarios

```typescript
import { loadData, setTrend, calculate } from 'edu-world-model';

// Scenario 1: Business as usual
const businessAsUsual = loadData('./data/projections.yaml');
calculate(businessAsUsual); // Calculate baseline

// Scenario 2: Moderate action
const moderateAction = loadData('./data/projections.yaml');
setTrend(moderateAction, 'co2_emissions', 2025, -1.0);
calculate(moderateAction);

// Scenario 3: Aggressive action  
const aggressiveAction = loadData('./data/projections.yaml');
setTrend(aggressiveAction, 'co2_emissions', 2025, -3.0);
setTrend(aggressiveAction, 'forests_area', 2025, 2.0);
calculate(aggressiveAction);

// Compare CO2 emissions in 2050
console.log('🌍 CO2 Emissions in 2050:');

const bau2050 = businessAsUsual.projections.find(p => p.indicator_key === 'co2_emissions')?.paths.data[2050];
const mod2050 = moderateAction.projections.find(p => p.indicator_key === 'co2_emissions')?.paths.data[2050];
const agg2050 = aggressiveAction.projections.find(p => p.indicator_key === 'co2_emissions')?.paths.data[2050];

console.log(`📊 Business as usual: ${bau2050?.value.toFixed(1)} Gt`);
console.log(`🟨 Moderate action:    ${mod2050?.value.toFixed(1)} Gt (${((mod2050!.value - bau2050!.value) / bau2050!.value * 100).toFixed(1)}%)`);
console.log(`🟢 Aggressive action:  ${agg2050?.value.toFixed(1)} Gt (${((agg2050!.value - bau2050!.value) / bau2050!.value * 100).toFixed(1)}%)`);
```

## 4. Using Correlation Effects

Real-world environmental and economic systems are interconnected. The correlation matrix models how changes in one indicator affect others.

```typescript
import { loadData, getTrendsFromData, setTrend, applyCorrelation, applyTrend, calculate } from 'edu-world-model';

const data = loadData('./data/projections.yaml');
const trends = getTrendsFromData(data);

// Set a major CO2 reduction policy
setTrend(trends, 'co2_emissions', 2025, -2.5, 'Gt');

console.log('🎯 Direct Policy:');
printTrends(trends, 'CO2 Reduction Policy');

// Apply correlation effects (how CO2 reduction affects other indicators)
const correlatedTrends = applyCorrelation(trends);

console.log('\n🔗 With Cross-Indicator Effects:');
printTrends(correlatedTrends, 'Including Correlations');

// Apply and calculate
applyTrend(data, correlatedTrends);
calculate(data);

// Show how multiple indicators changed by 2040
console.log('\n📊 System-wide Impact in 2040:');
const indicatorsToCheck = ['co2_emissions', 'forests_area', 'mining_waste_dump', 'happiness_index'];

for (const indicator of indicatorsToCheck) {
  const indicatorData = data.projections.find(p => p.indicator_key === indicator);
  const result2040 = indicatorData?.paths.data[2040];
  console.log(`${indicator.replace('_', ' ')}: ${result2040?.value.toFixed(1)} ${indicatorData?.paths.unit}`);
}
```

## 5. Understanding the Data Structure

```typescript
import { loadData } from 'edu-world-model';

const data = loadData('./data/projections.yaml');

// Explore available indicators
console.log('📋 Available Indicators:');
data.projections.forEach(indicator => {
  console.log(`- ${indicator.indicator_key}: ${indicator.name} (${indicator.paths.unit})`);
});

// Look at a specific indicator
const co2 = data.projections.find(p => p.indicator_key === 'co2_emissions');
console.log(`\n🔍 CO2 Emissions Data:`);
console.log(`Name: ${co2?.name}`);
console.log(`Unit: ${co2?.paths.unit}`);

// Check available years
const availableYears = Object.keys(co2?.paths.data || {}).map(Number).sort();
console.log(`Years: ${availableYears[0]} - ${availableYears[availableYears.length - 1]}`);

// Look at specific year data
const year2025 = co2?.paths.data[2025];
console.log(`\n📅 2025 Data:`);
console.log(`- Rate: ${year2025?.rate} ${co2?.paths.unit}/year`);
console.log(`- Trend: ${year2025?.trend} (policy adjustment)`);
console.log(`- Value: ${year2025?.value} ${co2?.paths.unit}`);
```

## Key Concepts to Remember

### 🎯 Milestone Years
Trends can only be set for milestone years that affect ranges:
- **2025** → affects 2025-2039
- **2040** → affects 2040-2054  
- **2055** → affects 2055-2070

### 🔄 The Workflow
1. **Load** data with `loadData()`
2. **Set** trends with `setTrend()` 
3. **Calculate** projections with `calculate()`
4. **Access** results directly from the data structure

### 🔗 Correlations
- Use `applyCorrelation()` to model how indicators influence each other
- Always compare baseline vs correlation-adjusted results
- Correlations make the model more realistic but more complex

### 📊 Data Access
```typescript
// Direct access pattern
const indicator = data.projections.find(p => p.indicator_key === 'co2_emissions');
const yearData = indicator?.paths.data[2030];
const value = yearData?.value; // The actual result
```

## Next Steps

1. **Read the [User Guide](./USER_GUIDE.md)** for comprehensive examples
2. **Check the [API Reference](./API_REFERENCE.md)** for complete function documentation  
3. **Explore the demo files** in the project repository
4. **Experiment** with different policy combinations and correlation effects

## Common First-Time Mistakes

❌ **Forgetting to call `calculate()`**
```typescript
setTrend(data, 'co2_emissions', 2025, -1.0);
// Missing: calculate(data);
const result = indicator.paths.data[2030]; // Still old values!
```

❌ **Using non-milestone years**
```typescript
setTrend(data, 'co2_emissions', 2030, -1.0); // Error! Use 2025, 2040, or 2055
```

❌ **Reusing modified data for comparisons**
```typescript
const data = loadData('./data/projections.yaml');
setTrend(data, 'co2_emissions', 2025, -1.0);
// ... 
// Later, trying to get "baseline" from already-modified data
const baseline = data; // This is wrong! Load fresh data for baseline
```

✅ **Correct approach:**
```typescript
// Load fresh data for each scenario
const baseline = loadData('./data/projections.yaml');
const scenario = loadData('./data/projections.yaml');

setTrend(scenario, 'co2_emissions', 2025, -1.0);
calculate(scenario);

// Now you can safely compare baseline vs scenario
```

Happy simulating! 🌍