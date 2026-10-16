// Generates public/map/dots.svg (a dot-matrix map of Europe, North Africa and the
// Middle East from Natural Earth data — public domain, via the world-atlas package)
// and src/data/map.json (dimensions, projected city positions, distance).
// Run with: npm run build:map
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';
import { geoMercator, geoContains, geoDistance } from 'd3-geo';

const require = createRequire(import.meta.url);
const load = (f) => JSON.parse(readFileSync(require.resolve(`world-atlas/${f}`), 'utf8'));

const landTopo = load('land-50m.json');
const countriesTopo = load('countries-50m.json');
const land = feature(landTopo, landTopo.objects.land);
const countries = feature(countriesTopo, countriesTopo.objects.countries).features;
const spain = countries.find((c) => c.id === '724');
const uae = countries.find((c) => c.id === '784');

// Real city-centre coordinates [lon, lat]
const CITIES = {
  barcelona: [2.1734, 41.3851],
  dubai: [55.2708, 25.2048],
};

const W = 1400;
const BOUNDS = { type: 'MultiPoint', coordinates: [[-26, 4], [76, 62]] };
const projection = geoMercator().fitWidth(W, BOUNDS);
const [, top] = projection([-26, 62]);
const [, bottom] = projection([76, 4]);
projection.translate([projection.translate()[0], projection.translate()[1] - top]);
const H = Math.round(bottom - top);

const STEP = 8;
const rowH = STEP * Math.sqrt(3) / 2; // hexagonal packing
// Each group is one path of zero-length segments drawn with round caps.
// Consecutive dots on a row are written as relative moves to keep the file tiny.
const groups = { land: [], spain: [], uae: [] };
const last = { land: null, spain: null, uae: null };
let count = { land: 0, spain: 0, uae: 0 };
let row = 0;
for (let y = STEP / 2; y < H; y += rowH, row++) {
  for (let x = row % 2 ? STEP : STEP / 2; x < W; x += STEP) {
    const ll = projection.invert([x, y]);
    if (!geoContains(land, ll)) continue;
    const key = geoContains(spain, ll) ? 'spain' : geoContains(uae, ll) ? 'uae' : 'land';
    const prev = last[key];
    groups[key].push(prev && prev.row === row ? `m${+(x - prev.x).toFixed(1)} 0h0` : `M${+x.toFixed(1)} ${+y.toFixed(1)}h0`);
    last[key] = { x, row };
    count[key]++;
  }
}

const cities = Object.fromEntries(
  Object.entries(CITIES).map(([k, ll]) => {
    const [x, y] = projection(ll);
    return [k, { lon: ll[0], lat: ll[1], x: +x.toFixed(1), y: +y.toFixed(1) }];
  }),
);

const distanceKm = Math.round(geoDistance(CITIES.barcelona, CITIES.dubai) * 6371.0088);

const dot = STEP * 0.42;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
  `<g fill="none" stroke-linecap="round" stroke-width="${dot.toFixed(2)}">` +
  `<path stroke="#4A78BE" stroke-opacity=".78" d="${groups.land.join('')}"/>` +
  `<path stroke="#E0245E" d="${groups.spain.join('')}"/>` +
  `<path stroke="#9DBDF0" d="${groups.uae.join('')}"/>` +
  `</g></svg>`;

mkdirSync(new URL('../public/map/', import.meta.url), { recursive: true });
mkdirSync(new URL('../src/data/', import.meta.url), { recursive: true });
writeFileSync(new URL('../public/map/dots.svg', import.meta.url), svg);
writeFileSync(new URL('../src/data/map.json', import.meta.url), JSON.stringify({ width: W, height: H, cities, distanceKm }, null, 2));
console.log({ W, H, count, bytes: svg.length, cities, distanceKm });
