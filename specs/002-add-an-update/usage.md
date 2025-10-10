# Usage Guide: Interventions Feature

This document explains how to use the interventions feature added in the 002-add-an-update specification.

## Overview

The interventions feature allows you to apply policy interventions that modify multiple indicators simultaneously through delta adjustments to the base scenario. Each intervention represents a policy choice with cascading effects across the world model.

## Basic Usage

### Importing

```typescript
import { 
  interventions, 
  projections, 
  applyTrend, 
  calculate,
  interventionToTrends,
  interventionsToTrends 
} from 'edu-world-model';
import type { InterventionData, InterventionOption, YearlyData } from 'edu-world-model';
```

### Accessing Interventions

```typescript
// Get all available interventions for CO2 emissions
const co2Interventions = interventions.co2_emissions;

// Each intervention has a description and impacts
co2Interventions.forEach((intervention, index) => {
  console.log(`Option ${index}: ${intervention.description}`);
  console.log('Impacts:', intervention.impacts);
});
```

### Applying an Intervention

```typescript
// Select an intervention (e.g., aggressive CO2 reduction)
const aggressiveReduction = interventions.co2_emissions[1]; // index 1 = aggressive reduction

// Convert intervention to trends and apply
const trends = interventionToTrends(aggressiveReduction);
applyTrend(projections, trends);
calculate(projections);
```

## Available Interventions by Indicator

### Environmental Indicators

#### CO2 Emissions (`co2_emissions`)
- **Default**: No action, emissions continue current trend
- **Aggressive Reduction**: Immediate measures to reduce CO2 emissions
  - Direct effects: Reduces CO2 emissions, global temperature, mining waste
  - Side effects: Slight increase in unemployment, improved forests/soils
  - Economic impact: Minor GDP reduction, increased debt

#### Mining Waste (`mining_waste_dump`)
- **Default**: Moderate reduction in accelerated mineral extraction
- **Strong Reduction**: Strict regulations and recycling promotion
  - Direct effects: Significant waste reduction
  - Side effects: Improved forests/soils, slight unemployment increase
  - Economic impact: Minor GDP/income reduction

#### Forests (`forests_area`)
- **Default**: Follow extraction patterns, no active measures

#### Soils (`soils_area`)
- **Default**: Follow extraction patterns, no active measures

### Economic Indicators

#### Unemployment (`unemployment_rate`)
- **Default**: Follows other indicators, no active measures
- **Job Resilience Program**: Targeted job security and retraining programs
  - Direct effects: Reduces unemployment
  - Side effects: Improved happiness, disposable income, reduced inequality
  - Economic impact: Slight GDP reduction (investment cost)

#### Other Economic Indicators
Most economic indicators have default policies that follow market dynamics without active intervention.

## Working with Multiple Interventions

```typescript
import { interventionsToTrends } from 'edu-world-model';

// Combine multiple interventions
const co2Intervention = interventions.co2_emissions[1];
const jobIntervention = interventions.unemployment_rate[1];

const combinedTrends = interventionsToTrends([co2Intervention, jobIntervention]);
applyTrend(projections, combinedTrends);
calculate(projections);
```

## Understanding Impact Values

- **Positive values**: Increase the indicator (e.g., +0.1 for forests_area = more forest coverage)
- **Negative values**: Decrease the indicator (e.g., -0.5 for co2_emissions = reduced emissions)
- **Units**: Impact values are in the same units as the base indicator
- **Timeline**: Impacts are specified for milestone years 2025, 2040, 2055

## Example: Complete Policy Scenario

```typescript
import { 
  projections, 
  interventions, 
  applyTrend, 
  calculate, 
  getProjection,
  interventionsToTrends 
} from 'edu-world-model';

// Create environmental policy package
const environmentalInterventions = [
  interventions.co2_emissions[1],      // Aggressive CO2 reduction
  interventions.mining_waste_dump[1]   // Strong mining reduction
];

// Convert interventions to trends and apply
const environmentalPolicy = interventionsToTrends(environmentalInterventions);
applyTrend(projections, environmentalPolicy);
calculate(projections);

// Analyze results
console.log('Environmental Policy Results for 2055:');
console.log('CO2 Emissions:', getProjection(projections, 'co2_emissions', 2055));
console.log('Global Temperature:', getProjection(projections, 'global_temp', 2055));
console.log('GDP per Capita:', getProjection(projections, 'gdp_per_cap', 2055));
```

## Notes

- Interventions represent **delta adjustments** to the base scenario, not absolute values
- Multiple interventions can be combined by summing their impact deltas
- Each intervention choice is mutually exclusive within its indicator category
- Side effects are modeled as cross-indicator impacts based on correlation analysis
- All indicator keys in interventions match exactly with those in projections data