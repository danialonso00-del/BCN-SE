import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three';

/**
 * Abstract stadium in linework: rising seating tiers, radial rakers, a ring of
 * columns and a cantilevered roof, with the pitch and a single "lap" marker in
 * burgundy. Lines only, so it reads as an architectural drawing, not a model.
 */

const BLUE = new Color('#5C8BD6');
const BLUE_DEEP = new Color('#2B5DA8');
const WHITE = new Color('#DCE6F2');
const BURGUNDY = new Color('#E2366E');

const SEG = 128;

function ellipse(rx: number, rz: number, y: number, seg = SEG) {
  const pts: number[] = [];
  for (let i = 0; i < seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    pts.push(Math.cos(a) * rx, y, Math.sin(a) * rz);
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pts, 3));
  return g;
}

function segments(pairs: number[]) {
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(pairs, 3));
  return g;
}

export type StadiumHandle = { start(): void; stop(): void; dispose(): void; renderOnce(): void };

export function mountStadium(canvas: HTMLCanvasElement): StadiumHandle {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 100);
  const target = new Vector3(0, 0.9, 0);

  const stadium = new Group();
  scene.add(stadium);
  const disposables: { dispose(): void }[] = [];
  const mat = (color: Color, opacity: number) => {
    const m = new LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
    disposables.push(m);
    return m;
  };
  const add = <T extends LineLoop | LineSegments | Mesh>(obj: T) => {
    disposables.push(obj.geometry);
    stadium.add(obj);
    return obj;
  };

  // Seating tiers: ellipses stepping outwards and upwards.
  const TIERS = 9;
  const tier = (k: number) => ({ rx: 3.3 + k * 0.38, rz: 2.15 + k * 0.33, y: 0.12 + k * 0.24 });
  for (let k = 0; k < TIERS; k++) {
    const t = tier(k);
    const strong = k === 0 || k === 4 || k === TIERS - 1;
    add(new LineLoop(ellipse(t.rx, t.rz, t.y), mat(strong ? WHITE : BLUE, strong ? 0.5 : 0.28)));
  }

  // Rakers: radial lines running up the bowl.
  const RAKERS = 56;
  const rakers: number[] = [];
  const inner = tier(0);
  const outer = tier(TIERS - 1);
  for (let i = 0; i < RAKERS; i++) {
    const a = (i / RAKERS) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    rakers.push(c * inner.rx, inner.y, s * inner.rz, c * outer.rx, outer.y, s * outer.rz);
  }
  add(new LineSegments(segments(rakers), mat(BLUE_DEEP, 0.55)));

  // Columns and cantilever roof.
  const ROOF_Y = outer.y + 1.05;
  const roofOuter = { rx: outer.rx + 0.25, rz: outer.rz + 0.25 };
  const roofInner = { rx: outer.rx - 1.55, rz: outer.rz - 1.3 };
  const roof: number[] = [];
  const COLS = 40;
  for (let i = 0; i < COLS; i++) {
    const a = (i / COLS) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    // column
    roof.push(c * roofOuter.rx, outer.y - 0.6, s * roofOuter.rz, c * roofOuter.rx, ROOF_Y, s * roofOuter.rz);
    // cantilever truss
    roof.push(c * roofOuter.rx, ROOF_Y, s * roofOuter.rz, c * roofInner.rx, ROOF_Y + 0.22, s * roofInner.rz);
    roof.push(c * roofOuter.rx, outer.y + 0.35, s * roofOuter.rz, c * roofInner.rx, ROOF_Y + 0.22, s * roofInner.rz);
  }
  add(new LineSegments(segments(roof), mat(BLUE, 0.32)));
  add(new LineLoop(ellipse(roofOuter.rx, roofOuter.rz, ROOF_Y), mat(WHITE, 0.45)));
  add(new LineLoop(ellipse(roofInner.rx, roofInner.rz, ROOF_Y + 0.22), mat(WHITE, 0.7)));

  // Pitch.
  const W = 2.5;
  const D = 1.5;
  const pitch = [
    -W, 0, -D, W, 0, -D,
    W, 0, -D, W, 0, D,
    W, 0, D, -W, 0, D,
    -W, 0, D, -W, 0, -D,
    0, 0, -D, 0, 0, D,
  ];
  add(new LineSegments(segments(pitch), mat(BURGUNDY, 0.85)));
  add(new LineLoop(ellipse(0.42, 0.42, 0, 48), mat(BURGUNDY, 0.85)));
  // Running track around the pitch.
  add(new LineLoop(ellipse(2.95, 1.9, 0.02), mat(BURGUNDY, 0.35)));
  add(new LineLoop(ellipse(3.12, 2.03, 0.02), mat(BURGUNDY, 0.22)));

  // Lap marker.
  const markerMat = new MeshBasicMaterial({ color: BURGUNDY });
  disposables.push(markerMat);
  const marker = add(new Mesh(new SphereGeometry(0.06, 16, 12), markerMat));

  // Sizing.
  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(() => {
    resize();
    if (!running) renderOnce();
  });
  ro.observe(canvas);
  resize();

  // Pointer tilt, eased.
  let tx = 0;
  let ty = 0;
  let px = 0;
  let py = 0;
  const onPointer = (e: PointerEvent) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  let running = false;
  let raf = 0;
  let last = performance.now();
  let t = 0;

  const draw = () => {
    px += (tx - px) * 0.04;
    py += (ty - py) * 0.04;
    stadium.rotation.y = t * 0.06 + px * 0.25;
    const lap = t * 0.35;
    marker.position.set(Math.cos(lap) * 3.03, 0.06, Math.sin(lap) * 1.96);
    camera.position.set(0, 6.6 - py * 0.6, 11.5);
    camera.lookAt(target);
    renderer.render(scene, camera);
  };

  const loop = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += dt;
    draw();
    raf = requestAnimationFrame(loop);
  };

  function renderOnce() {
    t = 0.9;
    draw();
  }

  return {
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    },
    renderOnce,
    dispose() {
      this.stop();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
