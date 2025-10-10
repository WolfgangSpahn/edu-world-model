/**
 * Demo: Interventions Feature
 * One simple flow demonstrating policy interventions
 */

import { 
  interventions, 
  projections, 
  calculate
} from './src/index.js';
import type { ProjectionData, Indicator } from './src/index.js';

// Simple deep clone function
function cloneDeep(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

console.log('🌍 World-Sim Interventions Demo\n');

// 1. Prepare your trends to apply
const aggressive_reduction = interventions.co2_emissions[1];
console.log('Intervention:', aggressive_reduction.description);

// 2. Get your current trend matrix (clone to avoid modifying original)
const data = cloneDeep(projections);

// 3. Apply new trends to current trends
// Apply CO2 reduction impacts to the projections
Object.entries(aggressive_reduction.impacts).forEach(([indicator, deltas]) => {
  const proj = data.projections.find((p: Indicator) => p.indicator_key === indicator);
  if (proj) {
    Object.entries(deltas).forEach(([year, delta]) => {
      if (proj.paths.data[year] && proj.paths.data[year].trend !== null) {
        proj.paths.data[year].trend! += delta;
      }
    });
  }
});

// 4. Recalculate data
calculate(data);

// Results
console.log('\n📊 Results for 2055:');
const co2_2055 = data.projections.find((p: Indicator) => p.indicator_key === 'co2_emissions')?.paths.data['2055']?.value;
const temp_2055 = data.projections.find((p: Indicator) => p.indicator_key === 'global_temp')?.paths.data['2055']?.value;
const gdp_2055 = data.projections.find((p: Indicator) => p.indicator_key === 'gdp_per_cap')?.paths.data['2055']?.value;

console.log(`CO2: ${co2_2055?.toFixed(1)} Gt`);
console.log(`Temperature: ${temp_2055?.toFixed(2)}°C`);
console.log(`GDP: ${gdp_2055?.toFixed(1)}k USD`);

console.log('\n✅ Demo complete!');