# Data Model

```typescript
// Year data point - rate/trend/value for one year
interface YearData {
  rate: number;    // Current rate of change (unit/y)
  trend: number;   // Rate acceleration (unit/y²)  
  value: number;  // Cumulative total (unit)
}

// Single environmental indicator (matches YAML structure exactly)
interface Indicator {
  indicator_key: string;           // e.g. 'co2_emissions'
  name: string;                    // e.g. 'CO2 Emissionen'
  paths: {
    data: Record<number, YearData> // Year -> YearData mapping (1980-2070)
    unit: string;                  // e.g. 'Gt' or '000 km²'
  }
}

// Root data structure from YAML
interface ProjectionData {
  projections: Indicator[];        // Array of all indicators
}

// Configuration interfaces
interface YearRange {
  [key: number]: [number, number]; // milestone year -> [start, end] range
}

interface CorrelationMatrix {
  [indicator: string]: {
    [influenced: string]: number;  // -1.0 to 1.0 influence factor
  };
}

interface RateLimits {
  [indicator: string]: [number, number]; // [min, max] rate bounds
}

interface TrendLimits {
  [indicator: string]: [number, number]; // [min, max] trend bounds  
}

interface ConsequenceData {
  [indicator: string]: Record<number, number>; // year -> value
}

interface ConsequenceScale {
  sign: number;                    // 1 or -1 for positive/negative correlation
  value: number;                   // scaling factor
  color_fct: (v: number) => string; // color mapping function
  limit: [number, number];         // [min, max] display bounds
}

interface Consequences {
  data: ConsequenceData;
  scale: {
    [indicator: string]: ConsequenceScale;
  };
}

// Functions we'll build
declare function loadData(yamlPath: string): ProjectionData;
declare function setTrend(data: ProjectionData, indicatorKey: string, year: 2025|2040|2055, trend: number): void;
declare function calculate(data: ProjectionData): void;
```

## Configuration (config.ts)

```typescript
// Years to fill - milestone year maps to range it affects
export const years_map: YearRange = {
  2025: [2025, 2039], 
  2040: [2040, 2054], 
  2055: [2055, 2069]
};

// Correlation matrix - encodes what influences whom
export const correlation_matrix: CorrelationMatrix = {
  'co2_emissions':     {'co2_emissions':  1.0, 'mining_waste_dump': -1.0, 'forests_area':  -1.0, 'soils_area':  -1.0},
  'mining_waste_dump': {'co2_emissions':  0.0, 'mining_waste_dump':  1.0, 'forests_area':   0.0, 'soils_area':   0.0},
  'forests_area':      {'co2_emissions':  0.0, 'mining_waste_dump':  0.0, 'forests_area':   1.0, 'soils_area':   0.0},
  'soils_area':        {'co2_emissions':  0.0, 'mining_waste_dump':  0.0, 'forests_area':   0.0, 'soils_area':   1.0}
};

// Upper/lower limits for rates
export const rate_limits: RateLimits = {
  'co2_emissions':     [    0, 100],
  'mining_waste_dump': [    0, 500], 
  'forests_area':      [ -200, 200],
  'soils_area':        [ -100, 100]
};

// Upper/lower limits for trends - to clamp user input
export const trend_limits: TrendLimits = {
  'co2_emissions':     [ -2.0,  2.0],
  'mining_waste_dump': [ -5.0,  5.0],
  'forests_area':      [-10.0, 10.0], 
  'soils_area':        [ -5.0,  5.0]
};

// Parameters to calculate consequences
export const consequences: Consequences = {
  data: {
    'unemployment_rate': {2025: 5.0, 2040: 6, 2055: 12, 2070: 17},
    'gini_index': {2025: 62.0, 2040: 62.0, 2055: 64.0, 2070: 66.0},
    'happiness_index': {2025: 6.5, 2040: 6.5, 2055: 5.5, 2070: 5.0},
    'life_expectancy': {2025: 80.0, 2040: 79.0, 2055: 75.0, 2070: 72.0}
  },
  scale: {
    'unemployment_rate': { 
      sign: -1, 
      value: -10.0, 
      color_fct: (v: number) => v < 6 ? 'green' : v < 12 ? 'orange' : 'red',
      limit: [5, 25]
    },
    'gini_index': { 
      sign: 1, 
      value: -0.5, 
      color_fct: (v: number) => v < 40 ? 'green' : v < 63 ? 'orange' : 'red',
      limit: [20, 70]
    },
    'happiness_index': { 
      sign: -1, 
      value: 1.0, 
      color_fct: (v: number) => v < 6.1 ? 'red' : v < 7 ? 'orange' : 'green',
      limit: [0, 10]
    },
    'life_expectancy': { 
      sign: -1, 
      value: 1.0, 
      color_fct: (v: number) => v < 75 ? 'red' : v < 78 ? 'orange' : 'green',
      limit: [50, 90]
    }
  }
};
```