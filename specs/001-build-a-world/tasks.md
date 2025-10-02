# Simple Tasks: World-Sim TypeScript Package

Just build 3 simple functions to load YAML, modify trends, and recalculate projections.

## Setup (Already Done)
- [x] T001 Create src/ directory
- [x] T002 Initialize package.json  
- [x] T003 [P] Install dependencies: js-yaml, lodash, jest
- [x] T004 [P] Have projections.yaml in data/
- [x] T005 [P] Configure TypeScript and Jest for TS

## TypeScript Setup
- [x] T006 [P] Install TypeScript: typescript, @types/node, @types/js-yaml, @types/lodash
- [x] T007 [P] Create tsconfig.json - target ES2022, strict mode
- [x] T008 [P] Configure Jest for TypeScript: ts-jest, jest.config.ts

## Core Implementation (Simple!)
- [x] T009 Create src/config.ts - all configuration constants with types
- [x] T010 Create src/load-data.ts - function to load YAML and clone original  
- [x] T011 Create src/set-trend.ts - function to modify trends for specific years
- [x] T012 Create src/calculate.ts - function to recalculate future projections
- [x] T013 Create src/index.ts - export the 3 main functions
- [x] T014 Create basic test in tests/simple.test.ts

## That's it!
Total: ~100 lines of code across 4 files. No classes, no complex architecture.

## Dependencies
- Setup (T001-T005) before all other phases
- All tests (T006-T020) before ANY implementation (T021-T033)
- Supporting types (T021) before classes that use them (T022-T026, T028-T032)
- T027 (data loader) before T029 (WorldSimulation.loadData)
- T022-T023 (Projection) before T024-T026 (Indicator) before T028-T032 (WorldSimulation)
- T033 (exports) after all implementations
- Integration (T034-T036) after core implementation  
- Polish (T037-T041) after integration

## Parallel Execution Examples

### Setup Phase (can run together)
```bash
# T003, T004, T005 can run in parallel:
Task: "Install dependencies: js-yaml, lodash, jest, and configure jest.config.js"
Task: "Configure ESLint and Prettier for JavaScript ES2022"  
Task: "Copy projections.yaml to data/ directory for testing"
```

### Contract Tests Phase (can run together)
```bash
# T006-T017 can run in parallel (different test files):
Task: "Contract test WorldSimulation constructor in tests/contract/edu-world-modelulation.test.js"
Task: "Contract test Indicator constructor and properties in tests/contract/indicator.test.js"  
Task: "Contract test Projection constructor and properties in tests/contract/projection.test.js"
# ... etc for all contract tests
```

### Core Implementation Phase (some parallel)
```bash
# T021, T022, T024 can run in parallel (different files):
Task: "Supporting types: RateLimit, TrendRange, YearRange in src/types.js"
Task: "Projection class with constructor, properties, and validation in src/projection.js"
Task: "Indicator class with constructor and projection management in src/indicator.js"
```

## TDD Validation Checklist
- [ ] All contract tests (T006-T017) written and failing
- [ ] All integration tests (T018-T020) written and failing  
- [ ] No implementation started until all tests fail
- [ ] Each implementation task makes specific tests pass
- [ ] Run full test suite after each implementation task

## Mathematical Model Implementation Notes
- T031 must implement the formal mathematical model from spec clarifications:
  - Step 1: Trend overwrite for year ranges (2025→2025-2039, etc.)
  - Step 2: Forward recurrence calculation with rate clamping
  - Rate recurrence: r_{t+1} = clip_k(r_t + τ_t)
  - Value recurrence: v_{t+1} = v_t + r_t
- T020 (math verification test) must validate against known expected results

## Notes
- [P] tasks = different files, no shared dependencies
- Verify ALL tests fail before implementing (strict TDD)
- Historical data immutability enforced at Projection level
- Package designed for educational clarity over performance
- Target: ~500 LOC total across all source files