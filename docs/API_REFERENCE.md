# World-Sim API Reference

Complete API documentation for the World-Sim TypeScript package.

## Table of Contents

- [Core Functions](#core-functions)
- [Trend Management](#trend-management)
- [Correlation Functions](#correlation-functions)
- [Data Access](#data-access)
- [Type Definitions](#type-definitions)
- [Configuration](#configuration)

## Core Functions

### loadData(filePath: string): ProjectionData

Loads YAML projection data from a file.

**Parameters:**
- `filePath` (string): Path to the YAML data file

**Returns:**
- `ProjectionData`: Loaded data structure with all indicators

**Example:**
```typescript
const data = loadData('./data/projections.yaml');
```

**Throws:**
- Error if file cannot be read or parsed

---

### calculate(data: ProjectionData): void

Recalculates all projections using the mathematical model with current trends.

**Parameters:**
- `data` (ProjectionData): Data object to recalculate

**Returns:**
- `void`: Modifies the data object in place

**Example:**
```typescript
setTrend(data, 'co2_emissions', 2025, -1.0);
calculate(data); // Applies trends and recalculates all years
```

**Mathematical Model:**
```
Rate Recurrence:  r[t+1] = clamp(r[t] + trend[t], min_rate, max_rate)
Value Recurrence: v[t+1] = v[t] + r[t]
```

**Throws:**
- Error if data structure is invalid

---

### setTrend(data: ProjectionData, indicator: string, year: MilestoneYear, trend: number): void

Sets a trend value for a specific indicator and milestone year.

**Parameters:**
- `data` (ProjectionData): Data object to modify
- `indicator` (string): Indicator key (e.g., 'co2_emissions')
- `year` (MilestoneYear): Milestone year (2025, 2040, or 2055)
- `trend` (number): Trend value to apply

**Returns:**
- `void`: Modifies the data object in place

**Example:**
```typescript
// Reduce CO2 emissions by 1.5 Gt/year starting from 2025
setTrend(data, 'co2_emissions', 2025, -1.5);
```

**Milestone Year Ranges:**
- 2025: Affects years 2025-2039
- 2040: Affects years 2040-2054
- 2055: Affects years 2055-2070

---

### getTrend(data: ProjectionData, indicator: string, year: MilestoneYear): number

Gets the current trend value for an indicator and milestone year.

**Parameters:**
- `data` (ProjectionData): Data object to query
- `indicator` (string): Indicator key
- `year` (MilestoneYear): Milestone year to query

**Returns:**
- `number`: Current trend value

**Example:**
```typescript
const currentTrend = getTrend(data, 'co2_emissions', 2025);
console.log(`Current CO2 trend: ${currentTrend}`);
```

## Trend Management

### getTrendsFromData(data: ProjectionData): MilestoneTrends

Extracts current trends from loaded data into a trends object for batch operations.

**Parameters:**
- `data` (ProjectionData): Data object to extract trends from

**Returns:**
- `MilestoneTrends`: Object containing all current trends by indicator and milestone year

**Example:**
```typescript
const trends = getTrendsFromData(data);
// Returns: { co2_emissions: { 2025: 0, 2040: 0, 2055: 0, unit: 'Gt' }, ... }
```

---

### setTrend(trends: MilestoneTrends, indicator: string, year: MilestoneYear, trend: number, unit: string): void

Sets a trend value in a trends object (batch operation version).

**Parameters:**
- `trends` (MilestoneTrends): Trends object to modify
- `indicator` (string): Indicator key
- `year` (MilestoneYear): Milestone year
- `trend` (number): Trend value
- `unit` (string): Unit for the indicator

**Returns:**
- `void`: Modifies the trends object in place

**Example:**
```typescript
const trends = getTrendsFromData(data);
setTrend(trends, 'co2_emissions', 2025, -2.0, 'Gt');
setTrend(trends, 'forests_area', 2025, 1.0, '000 km²');
```

---

### applyTrend(data: ProjectionData, trends: MilestoneTrends): void

Applies all trends from a trends object to the data.

**Parameters:**
- `data` (ProjectionData): Data object to modify
- `trends` (MilestoneTrends): Trends to apply

**Returns:**
- `void`: Modifies the data object in place

**Example:**
```typescript
const trends = getTrendsFromData(data);
setTrend(trends, 'co2_emissions', 2025, -1.5, 'Gt');
applyTrend(data, trends); // Applies all trends to data
```

---

### printTrends(trends: MilestoneTrends, title: string): void

Displays trends in a formatted table for debugging and analysis.

**Parameters:**
- `trends` (MilestoneTrends): Trends object to display
- `title` (string): Title for the output table

**Returns:**
- `void`: Prints to console

**Example:**
```typescript
printTrends(trends, 'Policy Interventions');

// Output:
// === Policy Interventions ===
// Indicator           2025        2040        2055        Unit      
// --------------------------------------------------------------------
// co2_emissions       -1.50       0.00        0.00        Gt        
// forests_area        1.00        0.00        0.00        000 km²   
```

---

### isValidTrend(indicator: string, trend: number): boolean

Validates if a trend value is within acceptable limits for an indicator.

**Parameters:**
- `indicator` (string): Indicator key to validate against
- `trend` (number): Trend value to validate

**Returns:**
- `boolean`: True if trend is valid, false otherwise

**Example:**
```typescript
const isValid = isValidTrend('co2_emissions', -5.0);
if (!isValid) {
  console.log('Trend value is outside acceptable limits');
}
```

## Correlation Functions

### applyCorrelation(trends: MilestoneTrends, correlationMatrix?: any, strengthFactor?: number): MilestoneTrends

Applies correlation adjustments to trends and returns a new trends object with cross-indicator influences.

**Parameters:**
- `trends` (MilestoneTrends): Base trends to apply correlations to
- `correlationMatrix` (optional): Custom correlation matrix (uses default if not provided)
- `strengthFactor` (optional, default: 0.1): Multiplier for correlation strength

**Returns:**
- `MilestoneTrends`: New trends object with correlation adjustments applied

**Example:**
```typescript
const trends = getTrendsFromData(data);
setTrend(trends, 'co2_emissions', 2025, -2.0, 'Gt');

// Apply correlations with default strength
const correlatedTrends = applyCorrelation(trends);

// Apply correlations with stronger effect
const strongCorrelations = applyCorrelation(trends, undefined, 0.5);
```

**Correlation Logic:**
For each indicator, calculates influence from other indicators:
```
influence = Σ(correlation_matrix[target][source] × trend[source]) × strengthFactor
adjusted_trend = original_trend + influence
```

## Data Access

### Direct Data Access Pattern

Access projection data directly using standard JavaScript/TypeScript patterns:

```typescript
// Get indicator
const indicator = data.projections.find(p => p.indicator_key === 'co2_emissions');

// Get year data
const yearData = indicator?.paths.data[2030];

// Access properties
const rate = yearData?.rate;      // Current rate of change (units/year)
const trend = yearData?.trend;    // Applied trend adjustment
const value = yearData?.value;    // Cumulative value (units)
const unit = indicator?.paths.unit; // Unit string (e.g., 'Gt')
```

### Helper Functions

#### Find All Indicators
```typescript
const indicatorKeys = data.projections.map(p => p.indicator_key);
console.log('Available indicators:', indicatorKeys);
```

#### Get Available Years
```typescript
const indicator = data.projections.find(p => p.indicator_key === 'co2_emissions');
const availableYears = Object.keys(indicator?.paths.data || {}).map(Number).sort();
console.log('Available years:', availableYears);
```

#### Get Value Range
```typescript
const indicator = data.projections.find(p => p.indicator_key === 'co2_emissions');
const values = Object.values(indicator?.paths.data || {}).map(d => d.value);
const minValue = Math.min(...values);
const maxValue = Math.max(...values);
console.log(`Value range: ${minValue} - ${maxValue} ${indicator?.paths.unit}`);
```

## Type Definitions

### ProjectionData
```typescript
interface ProjectionData {
  projections: Indicator[];        // Array of all indicators
}
```

### Indicator
```typescript
interface Indicator {
  indicator_key: string;           // Unique identifier (e.g., 'co2_emissions')
  name: string;                    // Human-readable name
  paths: {
    data: Record<number, YearData> // Year -> YearData mapping (1980-2070)
    unit: string;                  // Unit string (e.g., 'Gt', '000 km²')
  }
}
```

### YearData
```typescript
interface YearData {
  rate: number;    // Change rate (units/year)
  trend: number;   // Trend modifier (additive adjustment to rate)
  value: number;   // Cumulative total (units)
}
```

### MilestoneTrends
```typescript
interface MilestoneTrends {
  [indicator_key: string]: {
    2025: number;    // Trend for 2025-2039
    2040: number;    // Trend for 2040-2054
    2055: number;    // Trend for 2055-2070
    unit: string;    // Unit string
  }
}
```

### MilestoneYear
```typescript
type MilestoneYear = 2025 | 2040 | 2055;
```

## Configuration

### Rate Limits
Each indicator has configured rate limits to prevent unrealistic values:

```typescript
// Example rate limits (units/year)
const rate_limits = {
  'co2_emissions': [0, 100],        // 0-100 Gt/year
  'life_expectancy': [-2.0, 2.0],  // -2 to +2 years/year
  'gdp_per_cap': [-5.0, 5.0],      // -5 to +5 k USD/year
  // ... more indicators
};
```

### Trend Limits
Trend values are also bounded to prevent extreme interventions:

```typescript
// Example trend limits
const trend_limits = {
  'co2_emissions': [-5.0, 5.0],    // Max ±5 Gt/year trend
  'forests_area': [-2.0, 3.0],     // Max -2 to +3 000km²/year trend
  // ... more indicators
};
```

### Correlation Matrix
Defines how indicators influence each other:

```typescript
// Simplified example (actual matrix is 13x13)
const correlation_matrix = {
  'co2_emissions': {
    'forests_area': -1.0,          // CO2 negatively affects forests
    'mining_waste_dump': 1.0,      // CO2 positively correlates with mining
  },
  'forests_area': {
    'co2_emissions': -1.0,         // Forests negatively affect CO2
    'soils_area': 0.5,             // Forests positively affect soils
  }
  // ... more correlations
};
```

### Available Indicators

| Indicator Key | Name | Unit | Description |
|---------------|------|------|-------------|
| `co2_emissions` | CO2 Emissions | Gt | Annual CO2 emissions |
| `mining_waste_dump` | Mining Waste | Gt | Accumulated mining waste |
| `forests_area` | Forest Area | 000 km² | Total forest coverage |
| `soils_area` | Soil Area | 000 km² | Healthy soil area |
| `unemployment_rate` | Unemployment Rate | % | Unemployment percentage |
| `avg_country_gini` | Average Gini Index | index (0-100) | Income inequality measure |
| `happiness_index` | Happiness Index | index (0-10) | Population happiness measure |
| `life_expectancy` | Life Expectancy | years | Average life expectancy |
| `gdp_per_cap` | GDP per Capita | k USD | GDP per person |
| `debt_per_cap` | Debt per Capita | k USD per person | Debt per person |
| `wealth_per_cap` | Wealth per Capita | k USD per person | Wealth per person |
| `population` | Population | G people | Total population |
| `global_reaction_fund` | Global Reaction Fund | GUSD/year | Global response funding |

## Error Handling

### Common Errors

#### Invalid Indicator
```typescript
// Throws: Error: Indicator 'invalid_key' not found
setTrend(data, 'invalid_key', 2025, -1.0);
```

#### Invalid Milestone Year
```typescript
// Throws: Error: Year must be 2025, 2040, or 2055
setTrend(data, 'co2_emissions', 2030, -1.0);
```

#### Invalid Data Structure
```typescript
// Throws: Error: Invalid data structure: missing projections
calculate(null);
```

### Best Practices for Error Handling

```typescript
// Validate indicator exists
function safeSetTrend(data: ProjectionData, indicator: string, year: MilestoneYear, trend: number) {
  const indicatorExists = data.projections.some(p => p.indicator_key === indicator);
  if (!indicatorExists) {
    throw new Error(`Indicator '${indicator}' not found`);
  }
  
  if (![2025, 2040, 2055].includes(year)) {
    throw new Error('Year must be 2025, 2040, or 2055');
  }
  
  setTrend(data, indicator, year, trend);
}
```

---

For examples and tutorials, see the [User Guide](./USER_GUIDE.md).