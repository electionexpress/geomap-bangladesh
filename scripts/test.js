const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');
const required = [
  ['Clean map-first layout: compact tracking strip and no redundant bottom dock', 'clean simplified page layout'],
  ['padding-bottom:16px', 'remove oversized bottom dock page padding'],
  ['header-track-stat>span', 'compact stat icons'],
  ['class="header-track-stats"', 'compact tracking stats strip'],
  ['<!doctype html>', 'HTML5 document'],
  ['<html lang="bn">', 'Bangla language metadata'],
  ['name="viewport"', 'mobile viewport'],
  ['class="site-header"', 'professional site header'],
  ['position:sticky;top:0;z-index:1400', 'sticky header stays above map'],
  ['is-scrolled', 'compact sticky header on scroll'],
  ['position:sticky!important', 'sticky compact top header'],
  ['Cross-device responsive refinement', 'cross-device responsive stylesheet'],
  ['position:sticky!important;inset-block-start:0', 'persistent sticky header across device sizes'],
  ['grid-template-columns:minmax(0,1fr)', 'tablet single-column workspace'],
  ['height:56dvh', 'mobile dynamic viewport map sizing'],
  ['orientation:landscape', 'short landscape device optimization'],
  ['prefers-reduced-motion:reduce', 'reduced motion accessibility support'],
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
  ['c.accuracy>50', 'poor-quality GPS fixes are rejected above 50m accuracy'],
  ['timestamp<=lastAcceptedTimestamp', 'duplicate or out-of-order GPS timestamps are rejected'],
  ['positionWindow.length>3', 'GPS smoothing uses a bounded three-fix window'],
  ['timestamp-fix.timestamp)<=3000', 'GPS smoothing excludes fixes older than three seconds'],
  ['Math.min(55,Math.max(18,reportedSpeed*2+8))', 'GPS route jump filter uses a bounded plausible-speed threshold'],
  ['id="trackStart"', 'tracking start control'],
  ['id="trackStop"', 'tracking stop control'],
  ['id="headerTrackStats"', 'live tracking metrics in sticky header'],
  ['id="headerTrackTime"', 'elapsed tracking time display'],
  ['id="headerTrackPoints"', 'accepted GPS point count display'],
  ['id="headerTrackDistance"', 'cumulative GPS distance display'],
  ["m.toFixed(1)+' মি · '+(m/1000).toFixed(3)+' কিমি · '+(m*3.280839895).toFixed(1)+' ফুট'", 'live tracking distance displayed simultaneously in meters kilometers and feet'],
  ['header-track-distance', 'responsive three-unit tracking distance display'],
  ["function haversine(", 'GPS route segment distance calculation'],
  ["function totalDistance()", 'manual measurement distance aggregation'],
  ["function areaSquareMeters()", 'land area calculation'],
  ["function fuseGpsPosition(", 'GPS position smoothing'],
  ["function persistPlots()", 'saved plot persistence with storage error handling'],
  ["function renderSavedPlots()", 'saved plot list rendering'],
  ["navigator.geolocation.getCurrentPosition", 'one-time GPS location retrieval'],
  ["navigator.geolocation.watchPosition", 'continuous GPS position stream'],
  ["navigator.geolocation.clearWatch", 'GPS watch cleanup on stop'],
  ["document.getElementById('loadBoundaries').addEventListener", 'administrative boundary loading action'],
  ["document.getElementById('clearBoundaries').addEventListener", 'administrative boundary clearing action'],
  ["document.getElementById('savePlot').addEventListener", 'save plot action'],
  ["document.getElementById('exportPlots').addEventListener", 'saved plots export action'],
  ["document.getElementById('export').addEventListener", 'GeoJSON export action'],
  ["document.getElementById('import').addEventListener", 'GeoJSON import action'],
  ["document.getElementById('placeSearch').addEventListener", 'map place search submission'],
  ["document.getElementById('copyCoordinates').addEventListener", 'coordinate copy action'],
  ["document.getElementById('mapFullscreen').addEventListener", 'map fullscreen action'],

  ['function formatTrackDuration()', 'tracking elapsed time formatter'],
  ['function updateHeaderTrackStats()', 'sticky header live metrics updater'],
  ['setInterval(updateTrackPanel,1000)', 'one-second live tracking clock'],
  ['trackElapsedMs+=Date.now()-trackStartedAt', 'tracking time pauses accurately when stopped'],
  ['function haversine(', 'distance calculation'],
  ['function areaSquareMeters(', 'area calculation'],
  ['id="distance"', 'distance tool'],
  ['id="area"', 'land area tool'],
  ['id="undo"', 'undo measurement control'],
  ['id="clear"', 'clear measurement control'],
  ['id="export"', 'GeoJSON export'],
  ['id="import"', 'GeoJSON import'],
  ['id="clearImported"', 'clear imported GeoJSON control'],
  ["document.getElementById('clearImported').addEventListener", 'clear imported GeoJSON action'],
  ["importedLayers.forEach(layer=>{if(map.hasLayer(layer))map.removeLayer(layer)})", 'remove imported layers from map'],
  ["importedFeatures.length=0", 'clear imported features from export collection'],
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


// Structural integrity: every static getElementById reference must resolve in the page.
const ids = new Set([...html.matchAll(/\\bid=["']([^"']+)["']/g)].map(match => match[1]));
const referencedIds = new Set([...html.matchAll(/getElementById\\(['"]([^'"]+)['"]\\)/g)].map(match => match[1]));
for (const id of referencedIds) {
  assert.ok(ids.has(id), 'JavaScript references missing HTML element: ' + id);
}
assert.equal(ids.size, [...ids].length, 'HTML element IDs must be unique');

// Exercise the real distance and area functions extracted from the application script.
function extractFunction(source, name) {
  const marker = 'function ' + name + '(';
  const start = source.indexOf(marker);
  assert.ok(start >= 0, 'Application function exists: ' + name);
  const open = source.indexOf('{', start);
  let depth = 0, quote = null, escaped = false;
  for (let i = open; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { quote = ch; continue; }
    if (ch === '{') depth++;
    if (ch === '}' && --depth === 0) return source.slice(start, i + 1);
  }
  throw new Error('Could not extract function: ' + name);
}
const vm = require('node:vm');
const appScript = html.slice(scriptStart + 8, scriptEnd);
const mathContext = { points: [] };
vm.createContext(mathContext);
vm.runInContext(extractFunction(appScript, 'haversine'), mathContext);
vm.runInContext(extractFunction(appScript, 'areaSquareMeters'), mathContext);
const oneDegreeMillimeter = mathContext.haversine({lat:0,lng:0},{lat:0,lng:0.001});
assert.ok(Math.abs(oneDegreeMillimeter - 111.195) < 0.5, 'Haversine distance is accurate for a known 0.001° segment');
mathContext.points = [{lat:0,lng:0},{lat:0,lng:0.001},{lat:0.001,lng:0.001},{lat:0.001,lng:0}];
const squareArea = mathContext.areaSquareMeters();
assert.ok(squareArea > 12_000 && squareArea < 12_500, 'Area calculation returns expected square area near equator');
mathContext.points = [{lat:0,lng:0},{lat:0,lng:0.001}];
assert.equal(mathContext.areaSquareMeters(), 0, 'Area calculation requires at least three points');
assert.ok(html.includes('MAX_FILE_BYTES=10*1024*1024'), 'GeoJSON import enforces a 10 MB file limit');
assert.ok(html.includes('MAX_FEATURES=5000'), 'GeoJSON import enforces a feature-count limit');

console.log('GeoMap Bangladesh functional logic checks passed (distance, area, DOM references, GeoJSON limits).');

const geometryContext = {};
vm.createContext(geometryContext);
for (const name of ['validPosition', 'validLine', 'validRing', 'validGeoJSONGeometry', 'validGeoJSONFeature']) {
  vm.runInContext(extractFunction(appScript, name), geometryContext);
}
const validPolygon = {type:'Polygon',coordinates:[[[90,23],[90.001,23],[90.001,23.001],[90,23.001],[90,23]]]};
assert.equal(geometryContext.validGeoJSONFeature({type:'Feature',properties:{},geometry:validPolygon}), true, 'Valid GeoJSON polygon is accepted');
assert.equal(geometryContext.validGeoJSONGeometry({type:'Point',coordinates:[181,23]}), false, 'Longitude outside WGS84 range is rejected');
assert.equal(geometryContext.validGeoJSONGeometry({type:'Point',coordinates:[90,91]}), false, 'Latitude outside WGS84 range is rejected');
assert.equal(geometryContext.validGeoJSONGeometry({type:'LineString',coordinates:[[90,23]]}), false, 'LineString with fewer than two positions is rejected');
assert.equal(geometryContext.validGeoJSONGeometry({type:'Polygon',coordinates:[[[90,23],[90.001,23],[90,23.001]]]}), false, 'Unclosed or undersized polygon ring is rejected');
assert.equal(geometryContext.validGeoJSONGeometry({type:'GeometryCollection',geometries:[]}), false, 'Empty GeometryCollection is rejected');
assert.equal(geometryContext.validGeoJSONFeature({type:'Feature',properties:[],geometry:validPolygon}), false, 'Non-object GeoJSON properties are rejected');

const datelinePoints = [{lat:10,lng:179.9},{lat:10,lng:-179.9},{lat:10.1,lng:-179.9},{lat:10.1,lng:179.9}];
mathContext.points = datelinePoints;
const datelineArea = mathContext.areaSquareMeters();
assert.ok(datelineArea > 200_000_000 && datelineArea < 300_000_000, 'Area calculation handles polygons crossing the antimeridian');

const gpsContext = {positionWindow:[]};
vm.createContext(gpsContext);
vm.runInContext(extractFunction(appScript, 'fuseGpsPosition'), gpsContext);
gpsContext.positionWindow = [
  {lat:0,lng:179.9,accuracy:5,timestamp:1000},
  {lat:0,lng:-179.9,accuracy:5,timestamp:1000}
];
const datelineFix = gpsContext.fuseGpsPosition({lat:0,lng:-179.9},5,1000);
assert.ok(Math.abs(datelineFix.lng) > 179.8, 'GPS smoothing averages longitude across the antimeridian without jumping to Greenwich');
gpsContext.positionWindow = [
  {lat:23,lng:90,accuracy:5,timestamp:1000},
  {lat:23.1,lng:90.1,accuracy:5,timestamp:1000},
  {lat:23.2,lng:90.2,accuracy:5,timestamp:1000}
];
gpsContext.fuseGpsPosition({lat:23.4,lng:90.4},5,1000);
assert.equal(gpsContext.positionWindow.length,3, 'GPS smoothing window never exceeds three recent fixes');
gpsContext.positionWindow = [{lat:23,lng:90,accuracy:5,timestamp:1000}];
const recentOnlyFix = gpsContext.fuseGpsPosition({lat:23.01,lng:90.01},5,6000);
assert.ok(Math.abs(recentOnlyFix.lat-23.01)<1e-9, 'GPS smoothing drops stale fixes older than three seconds');

console.log('GeoMap Bangladesh advanced geospatial checks passed (GeoJSON geometry, WGS84 bounds, antimeridian area and GPS smoothing).');
