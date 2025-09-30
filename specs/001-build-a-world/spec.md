# World-Sim Package

## What it does

1. Load YAML data → JS object
2. Modify trends for 2025, 2040, 2055
3. Recalculate 2026-2070 using math model
4. Return updated data

## Mathematical Model
**Step 1** — Overwrite trends for year ranges:
- 2025 trend applies to years 2025-2039
- 2040 trend applies to years 2040-2054  
- 2055 trend applies to years 2055-2070

**Step 2** — Forward calculation for t = 2025, 2026, ..., 2069:
- Rate recurrence: `r_{t+1} = clip_k(r_t + τ_t)`
- Value recurrence: `v_{t+1} = v_t + r_t`
- Where `clip_k(x) = min(M_k, max(m_k, x))` if rate limits exist

## Key constraints
- Historical data (1980-2025) stays unchanged
- Only modify trends for milestone years (2025, 2040, 2055)
