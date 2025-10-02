# Feature Specification: Explicit Correlation Matrix Application

**Feature Branch**: `002-add-an-update`  
**Created**: September 29, 2025  
**Updated**: October 2, 2025  
**Status**: Implemented ✅  
**Input**: User description: "add an update of the data by applying the correlation matrix according to this example"

## Implementation Summary *(added Oct 2)*
This feature has been successfully implemented with the following key architectural improvements:

### ✅ **Explicit Correlation Pattern**
- **Before**: Global configuration flag (`config.enableCorrelationMatrix`)
- **After**: Explicit function calls (`applyCorrelation(trends)`)
- **Benefits**: Clear separation between baseline calculations and correlation effects

### ✅ **Simplified Data Access**  
- **Removed**: `getProjection()` and `getProjectionWithInterpolation()` functions
- **Replaced with**: Direct data structure access
- **Pattern**: `data.projections.find(p => p.indicator_key === 'name')?.paths.data[year]`

### ✅ **Functional Programming Approach**
- `applyCorrelation()` now returns new modified trends instead of mutating input
- Pure functions with no side effects
- Pattern: `const correlatedTrends = applyCorrelation(trends)`

## Execution Flow (main)
```
1. Parse user description from Input
   → Feature identified: Apply correlation matrix to influence cross-indicator calculations
2. Extract key concepts from description
   → Actors: World simulation system, indicators
   → Actions: Apply cross-indicator influences during calculations
   → Data: Correlation matrix, indicator rates and values
   → Constraints: Mathematical model from Python example
3. For each unclear aspect:
   → Implementation follows provided Python mathematical model
4. Fill User Scenarios & Testing section
   → User modifies trends, system applies correlations automatically
5. Generate Functional Requirements
   → Each requirement testable through calculation outputs
6. Identify Key Entities
   → Indicators, correlation coefficients, rates, values
7. Run Review Checklist
   → Spec focuses on behavior, not implementation details
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
As a world simulation user, I want to apply correlation effects explicitly to my trend modifications so that I can clearly distinguish between baseline mathematical projections and correlation-influenced results.

### Updated Implementation Pattern *(Oct 2, 2025)*
```typescript
// 1. Load data and get baseline trends
const data = loadData('./data/projections.yaml');
const trends = getTrendsFromData(data);

// 2. Modify trends as needed
setTrend(trends, 'co2_emissions', 2025, -1.0, 'Gt');

// 3. EXPLICIT CHOICE: Apply correlations or not
// Option A: Baseline calculation (no correlations)
applyTrend(data, trends);
calculate(data);

// Option B: Correlation-adjusted calculation  
const correlatedTrends = applyCorrelation(trends);
applyTrend(data, correlatedTrends);
calculate(data);

// 4. Access results directly
const co2Data = data.projections.find(p => p.indicator_key === 'co2_emissions');
const result2026 = co2Data?.paths.data[2026]; // { rate, trend, value }
```

### Acceptance Scenarios *(updated)*
1. **Given** CO2 emissions trend is modified, **When** user applies `applyCorrelation(trends)`, **Then** related indicators should be influenced according to correlation matrix
2. **Given** user wants baseline projection, **When** user skips `applyCorrelation()`, **Then** calculation should use pure mathematical model without cross-indicator influences  
3. **Given** correlation matrix defines influence factors, **When** `applyCorrelation()` is called, **Then** trends should be adjusted by the specified correlation coefficients
4. **Given** user needs data access, **When** using direct data structure access, **Then** `getProjection()` functions are no longer needed

### Edge Cases *(updated)*
- Correlation influences respect rate limits and apply clamping when needed
- Missing indicators in correlation matrix are safely handled
- `applyCorrelation()` returns new trends object without modifying input

## Requirements *(mandatory)*

### Functional Requirements *(updated Oct 2)*
- **FR-001**: ✅ System MUST provide explicit correlation application via `applyCorrelation()` function
- **FR-002**: ✅ System MUST allow baseline calculations without correlation effects  
- **FR-003**: ✅ System MUST respect existing rate limits when applying correlation influences
- **FR-004**: ✅ System MUST return new trends object from `applyCorrelation()` without modifying input
- **FR-005**: ✅ System MUST provide direct data structure access without wrapper functions
- **FR-006**: ✅ System MUST maintain separation of concerns between baseline math and correlation effects
- **FR-007**: ✅ System MUST preserve existing value recurrence calculations
- **FR-008**: ✅ System MUST eliminate need for global configuration flags

### Implementation Requirements *(completed)*
- **IR-001**: ✅ Remove `getProjection()` and `getProjectionWithInterpolation()` functions
- **IR-002**: ✅ Update all demos and tests to use direct data access  
- **IR-003**: ✅ Modify `applyCorrelation()` to return `MilestoneTrends` instead of `void`
- **IR-004**: ✅ Update README.md with new patterns and examples
- **IR-005**: ✅ Ensure all tests pass with new architecture

### Key Entities *(updated)*
- **MilestoneTrends**: Object containing trend values for milestone years (2025, 2040, 2055)
- **Correlation Matrix**: 13x13 matrix defining cross-indicator influence coefficients  
- **Direct Data Access**: Pattern `data.projections.find().paths.data[year]` for accessing year data
- **Functional Correlation**: `applyCorrelation(trends): MilestoneTrends` returns modified trends
- **Baseline vs Correlation**: Clear distinction between pure mathematical projection and correlation-influenced results

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

### Requirement Completeness
- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous  
- [x] Success criteria are measurable
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

---

## Execution Status
*Updated by main() during processing*

- [x] User description parsed
- [x] Key concepts extracted
- [x] Ambiguities marked
- [x] User scenarios defined
- [x] Requirements generated
- [x] Entities identified
- [x] Review checklist passed

---
