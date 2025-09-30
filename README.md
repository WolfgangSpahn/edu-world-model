# World-Sim

Educational TypeScript package for world simulation modeling with environmental indicators.

## Overview

World-Sim is a simple mathematical model that simulates environmental indicators over time using rate-based calculations with trend modifications. It's designed for educational purposes to explore how policy interventions (trends) can affect long-term projections.

## Features

- **Simple API**: Load data, set trends, calculate projections
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Educational Focus**: Clean, understandable code for learning purposes
- **Interactive REPL**: Built-in command-line interface for experimentation

## Installation

```bash
npm install
npm run build
```

## Quick Start

```typescript
import { loadData, setTrend, calculate, getProjection } from 'world-sim';

// Load projection data
const data = loadData('./data/projections.yaml');

// Get baseline projection for 2030
const baseline = getProjection(data, 'co2_emissions', 2030);
console.log(`Baseline CO2 2030: ${baseline?.value.toFixed(2)} units`);

// Apply a policy intervention (trend modification)
setTrend(data, 'co2_emissions', 2025, -1.0); // Reduce trend by 1.0

// Recalculate with new trend
calculate(data);

// See the impact
const updated = getProjection(data, 'co2_emissions', 2030);
console.log(`After intervention: ${updated?.value.toFixed(2)} units`);
```

## Interactive REPL

Start an interactive session with preloaded data:

```bash
npm run repl
```

This loads all functions and data into a Node.js REPL for experimentation:

```javascript
🌍 > getProjection(data, 'co2_emissions', 2030)
🌍 > setTrend(data, 'co2_emissions', 2025, -0.5)
🌍 > calculate(data)
🌍 > data.projections.map(p => p.indicator_key)
```

## API Reference

### Core Functions

- **`loadData(filePath: string): ProjectionData`** - Load YAML projection data
- **`setTrend(data: ProjectionData, indicator: string, year: number, trend: number): void`** - Modify trend for milestone years (2025, 2040, 2055)
- **`calculate(data: ProjectionData): void`** - Recalculate all projections with current trends
- **`getProjection(data: ProjectionData, indicator: string, year: number): YearData | null`** - Get data for specific indicator and year
- **`getTrend(data: ProjectionData, indicator: string, year: number): number`** - Get trend value for specific year

### Mathematical Model

The simulation uses a simple forward-calculation model:

```
rate[t+1] = clamp(rate[t] + trend[t], min_rate, max_rate)
value[t+1] = value[t] + rate[t]
```

Where:
- **Rate**: The yearly change amount
- **Trend**: Policy intervention that modifies the rate
- **Value**: Cumulative total over time
- **Clamp**: Bounds checking using configured limits

### Milestone Years

Trends are applied to specific year ranges:
- **2025**: Affects years 2025-2040
- **2040**: Affects years 2040-2055  
- **2055**: Affects years 2055-2070

## Data Structure

The system expects YAML data with this structure:

```yaml
projections:
  - indicator_key: "co2_emissions"
    name: "CO2 Emissions"
    paths:
      unit: "Gt CO2/year"
      data:
        "2025": { rate: 40, trend: 0, value: 2600 }
        "2026": { rate: 40, trend: 0, value: 2640 }
        # ... more years
```

## Development

```bash
# Build the project
npm run build

# Run tests
npm test

# Start interactive REPL
npm run repl

# Lint code
npm run lint
```

## Project Structure

```
src/
├── config.ts      # Configuration constants and limits
├── types.ts       # TypeScript type definitions
├── load-data.ts   # YAML data loading
├── set-trend.ts   # Trend modification logic
├── calculate.ts   # Mathematical model implementation
└── index.ts       # Main API exports

data/
└── projections.yaml  # Sample projection data

tests/
└── simple.test.ts    # Integration tests
```

## License

MIT