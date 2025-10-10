# Quick Start Guide
This quick start guide provides a concise overview of how to use the interventions feature in the edu-world-model.

## Setup

```bash
npm install
```

## Step-by-Step Workflow



Take one intervention from interventions.ts convert it to a trends update and add it to your current trends.

```typescript
import { interventions, interventionToTrends, projections, calculate, getTrendsFromData, addTrends } from './src';
// in tsx repl import like this:
// const { interventions, interventionToTrends, projections, calculate, getTrendsFromData, addTrends } = await import('./src/index.jsx');


// Get current trends from projections
const currentTrends = getTrendsFromData(projections);

// Get the aggressive CO2 reduction intervention
const aggressive_reduction = interventions.co2_emissions[1];
// Extract the trends from it
const trendUpdates = interventionToTrends(aggressive_reduction);

// update current trends with intervention updates via adding the updates to the current trends
const newTrends = addTrends(currentTrends, trendUpdates);

// 3. Apply the new trends to projections and calculate
applyTrend(projections, newTrends);
calculate(projections);

```



