const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');
const checks = [
  [/<!doctype html>/i, 'HTML5 document declaration'],
  [/id="placeSearch"/, 'map place search form'],
  [/id="placeQuery"/, 'place and address search input'],
  [/nominatim[.]openstreetmap[.]org[/]search/, 'OpenStreetMap geocoding service'],
  [/L\.control\.scale/, 'map scale ruler'],
  [/id="coordinateReadout"/, 'map coordinate readout'],
  [/id="copyCoordinates"/, 'copy map coordinates control'],
  [/basemaps[.]cartocdn[.]com[/]light_all/, 'light map layer'],
  [/basemaps[.]cartocdn[.]com[/]dark_all/, 'dark map layer'],
  [/gpsAccuracy/, 'GPS accuracy radius'],
  [/position:sticky/, 'sticky navigation header'],
  [/class="app-nav"/, 'separate workspace navigation'],
  [/data-view="gps"/, 'GPS workspace navigation'],
  [/data-view="tracking"/, 'live tracking workspace navigation'],
  [/data-view="measure"/, 'measurement workspace navigation'],
  [/data-view="geojson"/, 'GeoJSON workspace navigation'],
  [/id="gpsPanel"/, 'independent GPS panel'],
  [/id="trackingPanel"/, 'independent tracking panel'],
  [/id="measurePanel"/, 'independent measurement panel'],
  [/id="geojsonPanel"/, 'independent GeoJSON panel'],
  [/aria-current="page"/, 'accessible active navigation state'],
  [/<html lang="bn">/, 'Bangla document language'],
  [/name="viewport"/, 'responsive viewport'],
  [/id="map"/, 'map container'],
  [/class="map-shell"/, 'premium map workspace'],
  [/id="zoomIn"/, 'map zoom-in control'],
  [/id="zoomOut"/, 'map zoom-out control'],
  [/id="mapFullscreen"/, 'map fullscreen control'],
  [/hero-pills/, 'feature highlights'],
  [/--shadow:/, 'premium dashboard design tokens'],
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
  [/function handleTrackPosition[(]/, 'validated GPS position processing'],
  [/c[.]accuracy>100/, 'low-accuracy GPS fix rejection'],
  [/timestamp-lastAcceptedTimestamp/, 'GPS timestamp based speed calculation'],
  [/step[/]elapsed>45/, 'GPS jump and impossible-speed filtering'],
  [/noiseFloor/, 'GPS jitter filtering'],
  [/lastAcceptedAccuracy/, 'reported GPS accuracy tracking'],
  [/lastCompassAt/, 'fresh compass heading preference'],
  [/function fuseGpsPosition[(]/, 'accuracy-weighted GPS position fusion'],
  [/positionWindow\.length>5/, 'bounded recent GPS fix window'],
  [/Math[.]exp[(]-age[/]8[)]/, 'time-decayed GPS measurement weighting'],
  [/c[.]accuracy>100/, 'reject very low-quality GPS measurements'],
  [/timestamp>now[+]5000/, 'reject future-dated GPS fixes'],
  [/positionWindow=\[\]/, 'reset GPS fusion state for new tracking session'],
  [/Number\.isFinite\(c\.speed\)/, 'use device-reported GPS speed when available'],

  [/GPS নির্ভুলতা:/, 'live GPS accuracy display'],
  [/গতি:/, 'live speed display'],
  [/trackDistance/, 'live distance tracking'],
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
