# Simple Tech Choices# Simple Tech Choices



## What We'll Use## What We'll Use

- **Node.js 18+** - Standard runtime- **Node.js 18+** - Standard JavaScript runtime

- **TypeScript 5.0+** - Type safety and modern features- **js-yaml** - Load YAML files  

- **js-yaml** - Load YAML files  - **lodash** - Clone data safely

- **lodash** - Clone data safely- **jest** - Basic testing

- **jest + ts-jest** - Testing with TypeScript support

## Why These?

## Type DefinitionsSimple, well-known libraries that just work. No over-engineering.

- **@types/node** - Node.js types**Alternatives considered**:

- **@types/js-yaml** - YAML parser types- Multiple packages (rejected: increases complexity)

- **@types/lodash** - Lodash utility types- CLI-only interface (rejected: limits programmatic use)



## Why TypeScript?### Rate/Trend Clamping Strategy

Better IDE support, compile-time error checking, and self-documenting interfaces.**Decision**: Configurable per-indicator bounds with graceful fallback  
**Rationale**:
- Educational scenarios benefit from realistic constraints
- Mathematical model requires explicit bounds for stability
- Fallback to no-clamp ensures robustness
**Alternatives considered**:
- Global bounds (rejected: different indicators have different scales)
- Hard-coded limits (rejected: reduces educational flexibility)

## Best Practices Research

### Educational Software Design
- **Principle**: Code readability over performance optimization
- **Implementation**: Verbose variable names, clear function signatures
- **Example**: `calculateValueRecurrence()` instead of `calcVol()`

### Mathematical Model Validation
- **Principle**: Validate inputs before calculation, clamp during calculation
- **Implementation**: Two-phase validation (input bounds, then rate clamping)
- **Example**: Trend validation before Step 1, rate clamping in Step 2

### Data Immutability Patterns
- **Principle**: Never mutate historical data (1980-2025)
- **Implementation**: Deep clone data structure, mark historical years read-only
- **Example**: Object.freeze() on historical year objects

### Test-Driven Development for Educational Code
- **Principle**: Tests serve as executable documentation
- **Implementation**: Test names describe mathematical behavior clearly
- **Example**: `test('applies 2025 trend to years 2025-2039 immediately')`

## Technical Integration Patterns

### YAML Data Loading
- Load projections.yaml at initialization
- Parse and validate structure before mathematical operations
- Cache parsed data to avoid repeated file I/O

### Mathematical Model Pipeline
- Step 1: Trend overwrite using label-to-interval mapping
- Step 2: Forward recurrence calculation with rate clamping
- Clear separation between configuration and calculation phases

### Error Handling Strategy
- Input validation errors: Throw descriptive errors immediately  
- Calculation errors: Log warnings, continue with clamped values
- File loading errors: Provide clear guidance for data format

### Educational API Design
- Fluent interface: `sim.setTrend(2025, 0.5).run().getProjections()`
- Inspection methods: `sim.getHistoricalData()`, `sim.getCurrentTrends()`
- Clear state management: explicit run() method for calculations