/**
 * Quick script to add units to all intervention impacts
 * Run this once to update interventions.ts with proper units
 */

import fs from 'fs';

// Unit mapping based on projections.ts
const unitMap = {
  'co2_emissions': 'Gt',
  'global_temp': '°C above pre-industrial',
  'mining_waste_dump': 'Gt',
  'forests_area': '000 km²',
  'soils_area': '000 km²',
  'unemployment_rate': '%',
  'avg_country_gini': 'index',
  'happiness_index': 'index',
  'life_expectancy': 'years',
  'gdp_per_cap': 'k USD',
  'debt_per_cap': 'k USD per person',
  'disp_income_per_cap': 'k USD per person',
  'wealth_per_cap': 'k USD per person',
  'top_1_percent_eff_tax_rate': '% of income',
  'population': 'G people',
  'reaction_per_cap': 'USD per person per year'
};

// Read the file
const filePath = './src/interventions.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Add units to lines that have 2055: but no unit: yet
for (const [indicator, unit] of Object.entries(unitMap)) {
  // Match lines like: indicator: { 2025: value, 2040: value, 2055: value }
  // But only if they don't already have unit:
  const regex = new RegExp(`(${indicator}:\\s*{[^}]+2055:[^}]+)(?!.*unit:)\\s*}`, 'g');
  content = content.replace(regex, `$1, unit: "${unit}" }`);
}

// Write the file back
fs.writeFileSync(filePath, content);
console.log('✅ Added units to all interventions!');