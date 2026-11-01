/**
 * 漢字の海: wires Ocean + Painter to the canvas.
 *
 * URL options:
 *   ?theme=night|paper   夜の海 (default) / 和紙の原稿用紙
 *   ?sharks=4            0–8 sharks
 *   ?cell=18             cell size in CSS px (default: from the window)
 *   ?seed=1234           reproducible run
 *   ?record=1            exactly one 1/60 s step per frame (steady capture)
 * Keys: T theme, Space pause. Click: splash. Pointer: fish shy away.
 */
import { loadFont } from "./glyphs.js";
import { Ocean, SPECIES } from "./ocean.js";
import { Painter, THEMES } from "./painter.js";
import { clamp, makeRandom } from "./util.js";

const STEP = 1 / 60;
const MAX_STEPS = 4;

const params = new URLSearchParams(location.search);
const intParam = (name, fallback) => {
  const v = Number.parseInt(params.get(name) ?? "", 10);
  return Number.isFinite(v) ? v : fallback;
};

const canvas = document.querySelector("canvas");
let themeName = params.get("theme") in THEMES ? params.get("theme") : "night";
const fixedCell = params.has("cell") ? clamp(intParam("cell", 18), 10, 48) : 0;
const record = params.get("record") === "1";
const seed = intParam("seed", Math.floor(Math.random() * 1e9));
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

document.documentElement.dataset.theme = themeName;
const fontOk = await loadFont(SPECIES.map((s) => s.glyph));
if (!fontOk) console.warn("[漢字の海] web font unavailable; using the system Mincho");

const ocean = new Ocean(makeRandom(seed), clamp(intParam("sharks", 4), 0, 8));
const painter = new Painter(canvas, themeName);

let paused = false;
let raf = 0;
let last = 0;
let acc = 0;

function resize() {
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const cell = fixedCell || clamp(Math.round(Math.min(rect.width, rect.height) / 56), 12, 24);
  painter.resize(rect.width, rect.height, cell, dpr);
  ocean.resize(rect.width, rect.height, cell);
  if (reducedMotion.matches || paused) drawStill();
}

function drawStill() {
  // Let the schools form before showing a single frame.
  while (ocean.time < 4) ocean.step(STEP);
  painter.render(ocean, STEP);
}

function frame(now) {
  if (record) {
    ocean.step(STEP);
    painter.render(ocean, STEP);
  } else {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    acc += dt;
    let steps = 0;
    while (acc >= STEP && steps < MAX_STEPS) {
      ocean.step(STEP);
      acc -= STEP;
      steps++;
    }
    if (steps === MAX_STEPS) acc = 0;
    painter.render(ocean, dt);
  }
  raf = requestAnimationFrame(frame);
}

function schedule() {
  cancelAnimationFrame(raf);
  if (paused || document.hidden || reducedMotion.matches) return;
  last = performance.now();
  raf = requestAnimationFrame(frame);
}

function localPoint(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return { x, y, inside: x >= 0 && y >= 0 && x <= rect.width && y <= rect.height };
}

addEventListener("pointermove", (e) => {
  const p = localPoint(e);
  Object.assign(ocean.pointer, { x: p.x, y: p.y, active: p.inside && e.pointerType !== "touch" });
}, { passive: true });
addEventListener("pointerdown", (e) => {
  const p = localPoint(e);
  if (p.inside && !reducedMotion.matches) ocean.splash(p.x, p.y);
}, { passive: true });
document.documentElement.addEventListener("pointerleave", () => (ocean.pointer.active = false));
addEventListener("blur", () => (ocean.pointer.active = false));
addEventListener("keydown", (e) => {
  if (e.key === "t" || e.key === "T") {
    themeName = themeName === "night" ? "paper" : "night";
    document.documentElement.dataset.theme = themeName;
    painter.setTheme(themeName);
    if (paused || reducedMotion.matches) painter.render(ocean, 0);
  } else if (e.key === " ") {
    e.preventDefault();
    paused = !paused;
    schedule();
  }
});
document.addEventListener("visibilitychange", schedule);
reducedMotion.addEventListener("change", () => (reducedMotion.matches ? drawStill() : schedule()));
new ResizeObserver(resize).observe(canvas);

resize();
schedule();

// Hooks for scripted checks and frame capture.
window.kanjiSea = {
  ocean,
  painter,
  seed,
  fontOk,
  advance(frames) {
    for (let k = 0; k < frames; k++) ocean.step(STEP);
    painter.render(ocean, STEP);
  },
};
