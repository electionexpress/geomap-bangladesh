const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');

const requiredChecks = [
  [/<!doctype html>/i, 'HTML5 document declaration exists'],
  [/<html lang="bn">/, 'Bangla document language is set'],
  [/name="viewport"/, 'Responsive viewport is configured'],
  [/id="map"/, 'Map container exists'],
  [/leaflet@1\.9\.4/, 'Leaflet map library is included'],
  [/openstreetmap\.org/, 'OpenStreetMap tile source exists'],
  [/navigator\.geolocation/, 'GPS location support exists'],
  [/id="locate"/, 'GPS control exists'],
  [/id="distance"/, 'Distance measurement control exists'],
  [/id="area"/, 'Area measurement control exists'],
  [/function haversine\(/, 'Distance calculation is implemented'],
  [/function area\(/, 'Area calculation is implemented'],
  [/id="export"/, 'GeoJSON export control exists'],
  [/id="import"/, 'GeoJSON import control exists'],
  [/application\/geo\+json/, 'GeoJSON export MIME type is configured'],
  [/role="status"/, 'Accessible status region exists'],
];

for (const [pattern, message] of requiredChecks) {
  assert.match(html, pattern, message);
}

console.log(`GeoMap Bangladesh smoke tests passed (${requiredChecks.length} checks).`);
