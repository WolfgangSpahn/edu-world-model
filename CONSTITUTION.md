# edu-world-model Constitution

## Core Principles

### I. Library-First
This implementation is a small, standalone library that is self-contained, independently testable, and documented. Clear educational purpose required - no organizational-only libraries.

### II. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement. Red-Green-Refactor cycle strictly enforced for educational code quality.

### III. Educational Clarity
Code readability and learning value over performance optimization. Verbose variable names, clear function signatures, educational examples prioritized.

### IV. Mathematical Rigor
When implementing mathematical models, preserve formal notation and provide verification against known results. Educational accuracy is non-negotiable.

### V. Self-Contained Packages
Package must include all necessary data, configuration, and examples. Students should be able to `npm install` and immediately start learning.

### VI. Simplicity First (YAGNI)

Solve the smallest valuable slice; defer abstractions until demanded by examples.

Prefer functions over classes; prefer composition over configuration.

One concept per module; target ≤ 100 LOC per module, ≤ 20 LOC per function (soft caps).

### VII. Test What Matters

Tests cover behavioral contracts and math invariants; avoid trivial tests (getters, pass-throughs).

Prefer executable examples and property tests for math; avoid mocking internals.

Each PR must justify any test that repeats behavior already covered by an example.

### VIII. Narrow Surface Area

No new dependencies unless on the “teaching whitelist”.

Each feature must include an “Out-of-Scope” list and a “Deletion Plan” for dead code.

## Development Workflow

### Quality Gates
- All contract tests must fail before implementation begins
- Mathematical models must be verified against formal specifications  
- Educational examples must be executable and well-documented
- Performance targets are learning-focused, not production-focused

## Governance

This constitution supersedes other practices. Educational value and mathematical accuracy take precedence over conventional software optimization.

**Version**: 1.0.0 | **Ratified**: 2025-09-24 | **Last Amended**: 2025-09-24
