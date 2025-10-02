// REPL startup script for edu-world-model
import repl from 'repl';

console.log('🌍 Loading edu-world-model library...');

// Import the library
const { loadData, setTrend, calculate, getProjection, getTrend } = await import('./dist/index.js');

// Load the data
const data = loadData('./data/projections.yaml');

console.log(`✓ Loaded ${data.projections.length} indicators:`);
data.projections.forEach(p => {
  console.log(`  - ${p.indicator_key}: ${p.name}`);
});

console.log('\n📚 Available variables/functions:');
console.log('  data, loadData, setTrend, calculate, getProjection, getTrend');
console.log('\n💡 Try: getProjection(data, "co2_emissions", 2030)');
console.log('');

// Start REPL with preloaded context
const replServer = repl.start('🌍 > ');

// Add variables/functions to REPL context
replServer.context.data = data;
replServer.context.loadData = loadData;
replServer.context.setTrend = setTrend;
replServer.context.calculate = calculate;
replServer.context.getProjection = getProjection;
replServer.context.getTrend = getTrend;