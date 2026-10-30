const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');
const checks = [
  [/<!doctype html>/i, 'HTML5 document declaration'],
  [/<html lang="bn">/, 'Bangla document language'],
  [/name="viewport"/, 'responsive viewport'],
  [/id="map"/, 'map container'],
  [/leaflet@1\.9\.4/, 'Leaflet version'],
  [/cdn\.jsdelivr\.net/, 'Leaflet fallback CDN'],
  [/openstreetmap\.org/, 'OpenStreetMap tile source'],
  [/navigator\.geolocation/, 'browser GPS API'],
  [/window\.isSecureContext/, 'secure-context GPS guard'],
  [/getCurrentPosition/, 'GPS location request'],
  [/id="locate"/, 'GPS control'],
  [/id="distance"/, 'distance control'],
  [/id="area"/, 'area control'],
  [/function haversine\(/, 'Haversine distance calculation'],
  [/function areaSquareMeters\(/, 'area calculation'],
  [/function totalDistance\(/, 'multi-segment distance total'],
  [/id="undo"/, 'undo control'],
  [/id="clear"/, 'clear control'],
  [/id="export"/, 'GeoJSON export control'],
  [/id="import"/, 'GeoJSON import control'],
  [/FeatureCollection/, 'GeoJSON FeatureCollection handling'],
  [/application\/geo\+json/, 'GeoJSON MIME type'],
  [/role="status"/, 'accessible status region'],
  [/invalidateSize/, 'responsive map resize handling'],
  [/maximumAge:0/, 'fresh GPS reading option'],
  [/id="trackStart"/, 'live GPS tracking start control'],
  [/id="trackStop"/, 'live GPS tracking stop control'],
  [/navigator\.geolocation\.watchPosition/, 'continuous GPS tracking'],
  [/navigator\.geolocation\.clearWatch/, 'GPS tracking cleanup'],
  [/deviceorientation/, 'device compass orientation support'],
  [/function bearingBetween\(/, 'GPS heading calculation'],
  [/function updateHeadingMarker\(/, 'direction arrow marker'],
  [/trackDistance\/, 'live distance tracking'],
  [/toFixed\(3\).*কিমি/, 'kilometer tracking display'],

];

for (const [pattern, description] of checks) {
  assert.match(html, pattern, 'Missing or broken feature: ' + description);
}

const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)];
assert.ok(inlineScripts.length, 'Inline application script exists');
for (const [, script] of inlineScripts) {
  new Function(script);
}

console.log('GeoMap Bangladesh checks passed (' + checks.length + ' feature checks + JavaScript syntax).');
