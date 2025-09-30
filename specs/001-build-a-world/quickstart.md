# Quick Start# Quick Start# Quickstart Guide: World-Sim JavaScript Package



## Install

```bash

npm install world-sim## Install## Installation

```

```bash

## Use It (TypeScript)

```typescriptnpm install world-sim```bash

import { loadData, setTrend, calculate } from 'world-sim';

```npm install world-sim

// 1. Load YAML data with types

const data = loadData('./data/projections.yaml');```



// 2. Modify trends (type-safe years: 2025|2040|2055)## Use It

setTrend(data, 'co2_emissions', 2025, 0.5);

```javascript## Basic Usage

// 3. Recalculate future values

calculate(data);const { loadData, setTrend, calculate } = require('world-sim');



// 4. Use the updated data (fully typed)### 1. Load and Explore Data

console.log(data.projections[0].paths.data[2030]);

```// 1. Load YAML data



That's it! 4 lines with full type safety.const data = loadData('./data/projections.yaml');```javascript

import { WorldSimulation } from 'world-sim';

// 2. Modify trends  import path from 'path';

setTrend(data, 'co2_emissions', 2025, 0.5);

// Create simulation instance

// 3. Recalculate future valuesconst sim = new WorldSimulation();

calculate(data);

// Load projection data

// 4. Use the updated dataconst dataPath = path.join(__dirname, 'data', 'projections.yaml');

console.log(data.projections[0].paths.data[2030]);sim.loadData(dataPath);

```

// Explore available indicators

That's it! 4 lines to load, modify, and calculate.console.log('Available indicators:', Array.from(sim.indicators.keys()));
// Output: ['co2_emissions', 'mining_waste_dump', 'forests_area', 'soils_area']

// Get historical data (1980-2025)
const historicalCO2 = sim.getHistoricalData('co2_emissions');
console.log(`CO2 in 1980: ${historicalCO2[0].value} (rate: ${historicalCO2[0].rate})`);
console.log(`CO2 in 2025: ${historicalCO2[45].value} (rate: ${historicalCO2[45].rate})`);
```

### 2. Modify Trends and Run Simulation

```javascript
// Set new trends for milestone years
sim.setTrend(2025, 'co2_emissions', 0.5)   // Higher acceleration
   .setTrend(2040, 'co2_emissions', -0.2)  // Deceleration
   .setTrend(2055, 'co2_emissions', -0.8); // Strong deceleration

// Execute mathematical model
sim.run();

// Get updated projections
const projections = sim.getProjections('co2_emissions');
const projection2030 = projections.find(p => p.year === 2030);
const projection2050 = projections.find(p => p.year === 2050);

console.log(`CO2 in 2030: ${projection2030.value} (rate: ${projection2030.rate})`);
console.log(`CO2 in 2050: ${projection2050.value} (rate: ${projection2050.rate})`);
```

### 3. Compare Scenarios

```javascript
// Scenario 1: Business as usual (default trends)
sim.reset();
sim.run();
const scenarioDefault = sim.getProjections('co2_emissions')
  .find(p => p.year === 2070).value;

// Scenario 2: Aggressive reduction
sim.reset();
sim.setTrend(2025, 'co2_emissions', -0.5)
   .setTrend(2040, 'co2_emissions', -1.0)
   .setTrend(2055, 'co2_emissions', -1.5)
   .run();
const scenarioReduction = sim.getProjections('co2_emissions')
  .find(p => p.year === 2070).value;

console.log(`Default 2070: ${scenarioDefault}`);
console.log(`Reduction 2070: ${scenarioReduction}`);
console.log(`Difference: ${scenarioDefault - scenarioReduction}`);
```

## Educational Examples

### Example 1: Forest Conservation Analysis

```javascript
// Analyze forest area under different conservation policies

const sim = new WorldSimulation();
sim.loadData('./data/projections.yaml');

// Current trend
sim.run();
const currentForest2070 = sim.getProjections('forests_area')
  .find(p => p.year === 2070).value;

// Enhanced conservation (slower decline)
sim.reset();
sim.setTrend(2025, 'forests_area', -0.1)  // Reduce deforestation rate
   .setTrend(2040, 'forests_area', 0.1)   // Begin reforestation
   .setTrend(2055, 'forests_area', 0.3)   // Accelerate reforestation
   .run();

const conservationForest2070 = sim.getProjections('forests_area')
  .find(p => p.year === 2070).value;

console.log('Forest Conservation Impact Analysis:');
console.log(`Current trend: ${currentForest2070} thousand km²`);
console.log(`With conservation: ${conservationForest2070} thousand km²`);
console.log(`Forest saved: ${conservationForest2070 - currentForest2070} thousand km²`);
```

### Example 2: Multi-Indicator Environmental Policy

```javascript
// Model comprehensive environmental policy across all indicators

const sim = new WorldSimulation();
sim.loadData('./data/projections.yaml');

// Policy: Reduce emissions, waste, preserve forests and soils
const environmentalPolicy = {
  co2_emissions: { 2025: -0.3, 2040: -0.8, 2055: -1.2 },
  mining_waste_dump: { 2025: -0.2, 2040: -0.5, 2055: -0.8 },
  forests_area: { 2025: 0.1, 2040: 0.3, 2055: 0.5 },
  soils_area: { 2025: 0.05, 2040: 0.2, 2055: 0.4 }
};

// Apply policy trends
Object.entries(environmentalPolicy).forEach(([indicator, trends]) => {
  Object.entries(trends).forEach(([year, trend]) => {
    sim.setTrend(parseInt(year), indicator, trend);
  });
});

sim.run();

// Analyze results for 2070
console.log('Environmental Policy Results for 2070:');
Object.keys(environmentalPolicy).forEach(indicator => {
  const result = sim.getProjections(indicator).find(p => p.year === 2070);
  console.log(`${indicator}: ${result.value} ${sim.indicators.get(indicator).unit}`);
});
```

### Example 3: Understanding Mathematical Model

```javascript
// Demonstrate the mathematical model step-by-step

const sim = new WorldSimulation();
sim.loadData('./data/projections.yaml');

// Get baseline 2025 data
const baseline2025 = sim.getProjections('co2_emissions').find(p => p.year === 2025);
console.log('2025 Baseline:', {
  value: baseline2025.value,
  rate: baseline2025.rate,
  trend: baseline2025.trend
});

// Set new trend and calculate manually for verification
sim.setTrend(2025, 'co2_emissions', 0.8).run();

const result2026 = sim.getProjections('co2_emissions').find(p => p.year === 2026);
console.log('2026 Result:', {
  value: result2026.value,
  rate: result2026.rate,
  trend: result2026.trend
});

// Mathematical verification:
// r_2026 = r_2025 + τ_2025 = baseline2025.rate + 0.8
// v_2026 = v_2025 + r_2025 = baseline2025.value + baseline2025.rate
console.log('Mathematical Verification:');
console.log(`Expected rate: ${baseline2025.rate + 0.8}`);
console.log(`Expected value: ${baseline2025.value + baseline2025.rate}`);
```

## Common Patterns

### Fluent Interface Usage
```javascript
// Chain operations for cleaner code
const results = new WorldSimulation()
  .loadData('./data/projections.yaml')
  .setTrend(2025, 'co2_emissions', 0.5)
  .setTrend(2040, 'co2_emissions', -0.2)
  .run()
  .getProjections('co2_emissions');
```

### Error Handling
```javascript
try {
  sim.setTrend(2030, 'co2_emissions', 0.5); // Invalid year
} catch (error) {
  if (error.name === 'InvalidYearError') {
    console.log('Trends can only be set for years 2025, 2040, 2055');
  }
}
```

### Data Validation
```javascript
// Check if modifications have been applied
if (sim.isModified) {
  console.log('Simulation has pending modifications. Call run() to calculate.');
} else {
  console.log('Simulation is up to date.');
}

// Verify historical data protection
const historical = sim.getHistoricalData('co2_emissions');
console.log(`Historical data points: ${historical.length}`); // Should be 46 (1980-2025)
console.log(`All historical: ${historical.every(p => p.isHistorical)}`); // Should be true
```

## Testing Your Understanding

### Verification Steps
1. Load data and verify 4 indicators are available
2. Confirm historical data (1980-2025) cannot be modified
3. Set trends for 2025, run simulation, verify 2030 uses 2025 trend
4. Set trends for 2040, verify 2045 uses 2040 trend, not 2025 trend
5. Reset simulation and confirm all modifications are cleared

### Expected Results
- Historical data always identical across resets
- Trend changes affect year ranges as specified in clarifications
- Mathematical model produces consistent results
- Rate clamping prevents unrealistic values when limits defined

## Next Steps

1. **Explore the data**: Examine projections.yaml to understand indicator scales
2. **Create scenarios**: Design environmental policies and measure their impact  
3. **Validate mathematics**: Manually verify mathematical model calculations
4. **Build applications**: Use the package in educational dashboards or analysis tools

# edu-world-model Constitution

## Core Principles

### I. Library-First
Every feature starts as a standalone library. Libraries must be self-contained, independently testable, and documented. Clear educational purpose required - no organizational-only libraries.

### II. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement. Red-Green-Refactor cycle strictly enforced for educational code quality.

### III. Educational Clarity
Code readability and learning value over performance optimization. Verbose variable names, clear function signatures, educational examples prioritized.

### IV. Mathematical Rigor
When implementing mathematical models, preserve formal notation and provide verification against known results. Educational accuracy is non-negotiable.

### V. Self-Contained Packages
Each package must include all necessary data, configuration, and examples. Students should be able to `npm install` and immediately start learning.

## Development Workflow

### Quality Gates
- All contract tests must fail before implementation begins
- Mathematical models must be verified against formal specifications  
- Educational examples must be executable and well-documented
- Performance targets are learning-focused, not production-focused

## Governance

This constitution supersedes other practices. Educational value and mathematical accuracy take precedence over conventional software optimization.

**Version**: 1.0.0 | **Ratified**: 2025-09-24 | **Last Amended**: 2025-09-24