# Simple World-Sim TypeScript Package

# Simple World-Sim JavaScript Package

**Branch**: `001-build-a-world` | **Date**: 2025-09-24

**Branch**: `001-build-a-world` | **Date**: 2025-09-24

## Summary

Simple TypeScript utility to load YAML projection data, modify trends, and recalculate future values. Just 3 main functions with full type safety.## Summary

Simple JavaScript utility to load YAML projection data, modify trends, and recalculate future values. Just 3 main functions.

## What it does

1. **Load** YAML data into typed JS object## What it does

2. **Keep** original copy untouched  1. **Load** YAML data into JS object

3. **Modify** trends for specific years (2025, 2040, 2055)2. **Keep** original copy untouched  

4. **Recalculate** future projections with simple math3. **Modify** trends for specific years (2025, 2040, 2055)

4. **Recalculate** future projections with simple math

## Technical Context

**Language**: TypeScript 5.0+/Node.js 18+  ## Technical Context

**Dependencies**: js-yaml, lodash, @types/js-yaml, @types/lodash  **Language**: JavaScript ES2022/Node.js 18+  

**Files**: ~4 TS files, ~150 LOC total**Dependencies**: js-yaml, lodash  

**Structure**: Simple functions with TypeScript interfaces**Files**: ~3 JS files, ~100 LOC total
**Structure**: Simple functions, not classes

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Library-First**: ✅ PASS - Creating standalone npm library package  
**Clear Interface**: ✅ PASS - Programmatic API for students to import and use  
**Test-First**: ✅ PASS - Will implement TDD with Jest test suite  
**Self-Contained**: ✅ PASS - Single library with YAML data loading capability  
**Educational Focus**: ✅ PASS - Designed specifically for student learning  

**Post-Design Re-evaluation**:
- API contracts define clear boundaries and error handling
- Data model maintains immutability principles for historical data
- Mathematical model implementation preserves educational clarity
- No additional complexity introduced during design phase

No constitutional violations identified in design phase.

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure]
```

**Structure Decision**: [DEFAULT to Option 1 unless Technical Context indicates web/mobile app]

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh copilot`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base template
- Generate contract test tasks from `/contracts/` directory:
  * WorldSimulation class contract tests [P]
  * Indicator class contract tests [P]  
  * Projection class contract tests [P]
- Generate model implementation tasks from `data-model.md`:
  * Core entity classes (Projection, Indicator, WorldSimulation) [P]
  * Supporting types (RateLimit, TrendRange, YearRange) [P]
  * YAML data loading functionality
  * Mathematical model implementation
- Generate integration test tasks from quickstart scenarios:
  * Basic usage scenario test
  * Multi-indicator policy scenario test
  * Mathematical model verification test
- Generate package setup tasks:
  * npm package configuration
  * Jest test suite setup
  * Build and distribution setup

**Ordering Strategy**:
- **Phase 1**: Package setup and test infrastructure
- **Phase 2**: Contract tests (TDD - tests first, must fail initially)
- **Phase 3**: Core model implementation to make contract tests pass
- **Phase 4**: Mathematical model implementation and validation
- **Phase 5**: Integration tests and quickstart validation
- **Phase 6**: Package build, documentation, and distribution

**Parallel Execution Strategy**:
- Mark [P] for independent tasks (different files/modules)
- Contract test tasks can run in parallel
- Core entity implementation can be parallel after contracts
- Integration tests depend on all implementations

**Estimated Task Breakdown**:
- Setup tasks: 3-4 tasks
- Contract test tasks: 8-10 tasks (covering all API methods)
- Implementation tasks: 12-15 tasks (entities + mathematical model)
- Integration tasks: 4-5 tasks (scenarios + validation)
- Package tasks: 2-3 tasks (build + distribution)
- **Total estimated**: 29-37 numbered, sequenced tasks

**Quality Gates**:
- All contract tests must fail initially (TDD validation)
- Mathematical model must match provided formal specification
- Integration tests must validate quickstart examples
- Package must be installable and importable

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
