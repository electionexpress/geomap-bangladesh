const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');
const required = [
  ['<!doctype html>', 'HTML5 document'],
  ['<html lang="bn">', 'Bangla language metadata'],
  ['name="viewport"', 'mobile viewport'],
  ['class="site-header"', 'professional site header'],
  ['position:sticky;top:0;z-index:1400', 'sticky header stays above map'],
  ['is-scrolled', 'compact sticky header on scroll'],
  ['class="quick-dock"', 'sticky bottom quick action dock'],
  ['data-quick="locate"', 'bottom GPS shortcut'],
  ['data-quick="trackStart"', 'bottom tracking shortcut'],
  ['data-quick="distance"', 'bottom distance shortcut'],
  ['data-quick="area"', 'bottom land measurement shortcut'],
  ['data-quick="undo"', 'bottom undo shortcut'],
  ['data-quick="clear"', 'bottom clear shortcut'],
  ['data-quick="export"', 'bottom GeoJSON download shortcut'],
  ['safe-area-inset-bottom', 'mobile safe-area spacing for bottom dock'],
  ['class="app-nav"', 'workspace navigation'],
  ['id="mapShell"', 'map-first workspace'],
  ['id="map"', 'interactive map'],
  ['leaflet@1.9.4', 'Leaflet library'],
  ['openstreetmap.org', 'OpenStreetMap map/geocoder'],
  ['World_Imagery', 'satellite basemap'],
  ['opentopomap.org', 'terrain basemap'],
  ['basemaps.cartocdn.com/light_all', 'light basemap'],
  ['basemaps.cartocdn.com/dark_all', 'dark basemap'],
  ['id="placeSearch"', 'place search form'],
  ['id="coordinateReadout"', 'coordinate display'],
  ['id="copyCoordinates"', 'copy coordinates control'],
  ['L.control.scale', 'map scale ruler'],
  ['id="locate"', 'GPS location control'],
  ['getCurrentPosition', 'one-time GPS request'],
  ['navigator.geolocation.watchPosition', 'continuous GPS tracking'],
  ['navigator.geolocation.clearWatch', 'tracking cleanup'],
  ['function fuseGpsPosition(', 'accuracy-weighted GPS filtering'],
  ['function handleTrackPosition(', 'GPS fix validation'],
  ['noiseFloor', 'GPS jitter filtering'],
  ['id="trackStart"', 'tracking start control'],
  ['id="trackStop"', 'tracking stop control'],
  ['function haversine(', 'distance calculation'],
  ['function areaSquareMeters(', 'area calculation'],
  ['id="distance"', 'distance tool'],
  ['id="area"', 'land area tool'],
  ['id="undo"', 'undo measurement control'],
  ['id="clear"', 'clear measurement control'],
  ['id="export"', 'GeoJSON export'],
  ['id="import"', 'GeoJSON import'],
  ['FeatureCollection', 'GeoJSON FeatureCollection support'],
  ['application/geo+json', 'GeoJSON MIME type'],
  ['id="status"', 'accessible status feedback'],
  ['class="site-footer"', 'project footer and measurement disclaimer'],
  ['prefers-reduced-motion', 'reduced motion accessibility'],
  ['@media(max-width:620px)', 'mobile responsive layout'],
  ['window.isSecureContext', 'HTTPS GPS security check'],
  ['aria-live="polite"', 'screen reader live feedback'],
  ['id="boundaryPanel"', 'administrative boundary panel'],
  ['id="boundaryLevel"', 'boundary level selector'],
  ['ADM1', 'division boundary level'],
  ['ADM2', 'district boundary level'],
  ['ADM3', 'subdistrict boundary level'],
  ['https://www.geoboundaries.org/api/current/gbOpen/BGD/', 'Bangladesh administrative boundary API'],
  ['simplifiedGeometryGeoJSON', 'simplified boundary geometry download'],
  ['id="clearBoundaries"', 'boundary layer removal'],
  ['id="savedPlotsPanel"', 'saved land plot panel'],
  ['id="savePlot"', 'save measured land plot'],
  ['localStorage', 'browser-local plot persistence'],
  ['id="exportPlots"', 'saved plots GeoJSON export'],
  ['id="savedPlotsList"', 'saved plot list']
];

for (const [snippet, description] of required) {
  assert.ok(html.includes(snippet), 'Missing feature: ' + description);
}

assert.ok(!html.includes('lastSpeed=0;\\n   watchId='), 'GPS tracking source must not contain a literal escaped newline');
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.indexOf('</script>', scriptStart);
assert.ok(scriptStart >= 0 && scriptEnd > scriptStart, 'Inline application script exists');
new Function(html.slice(scriptStart + 8, scriptEnd));

console.log('GeoMap Bangladesh checks passed (' + required.length + ' feature checks + JavaScript syntax).');
