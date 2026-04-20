// skyline.ts

export interface WindowData {
  ox: number;
  oy: number;
  size: number;
  on: boolean;
  brightness: number;
  burstGroup: number;
  isStraggler: boolean;
  stragglerDelay: number;
}

export interface BuildingData {
  x: number;
  w: number;
  h: number;
  windows: WindowData[];
}

let _seed = 2026;
export function seededRandom() {
  _seed |= 0;
  _seed = (_seed + 0x6D2B79F5) | 0;
  let t = Math.imul(_seed ^ (_seed >>> 15), 1 | _seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function rand(min: number, max: number) {
  return seededRandom() * (max - min) + min;
}

export function buildSkylineData(): BuildingData[] {
  _seed = 2026;
  const vw = window.innerWidth;
  const isMobile = vw < 768;
  const isSmall = vw < 480;

  const maxH = isSmall ? 400 : isMobile ? 600 : 900;
  const minH = isSmall ? 80 : isMobile ? 120 : 160;
  const maxW = isSmall ? 35 : isMobile ? 50 : 75;
  const minW = isSmall ? 18 : isMobile ? 25 : 35;
  const gap = isSmall ? 3 : 4;

  const avgWidth = (maxW + minW) / 2 + gap;
  const count = Math.ceil(vw / avgWidth) + 2;

  const winSize = isSmall ? 4 : 6;
  const winGapX = isSmall ? 12 : 14;
  const winGapY = isSmall ? 18 : 22;

  const buildings: BuildingData[] = [];
  const totalEstWidth = count * avgWidth;
  const startX = Math.max(0, (vw - totalEstWidth) / 2);
  let x = startX;

  for (let i = 0; i < count; i++) {
    const normalizedPos = i / (count - 1);
    const distFromCenter = Math.abs(normalizedPos - 0.5) * 2;

    const heightCap = 0.25 + distFromCenter * 0.75;
    const effectiveMaxH = maxH * heightCap;

    const h = Math.floor(rand(minH, Math.max(minH, effectiveMaxH)));
    const w = Math.floor(rand(minW, maxW));

    const windows: WindowData[] = [];
    const cols = Math.floor((w - 8) / winGapX);
    const rows = Math.floor((h - 14) / winGapY);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (seededRandom() > 0.30) continue;

        const burstGroup = Math.floor(seededRandom() * 3);
        const isStraggler = seededRandom() < 0.04;

        windows.push({
          ox: 5 + c * winGapX,
          oy: 10 + r * winGapY,
          size: winSize,
          on: false,
          brightness: rand(0.5, 1),
          burstGroup,
          isStraggler,
          stragglerDelay: isStraggler ? rand(1.5, 4.0) : 0,
        });
      }
    }

    buildings.push({ x, w, h, windows });
    x += w + gap;
  }

  return buildings;
}

export function drawSkyline(canvas: HTMLCanvasElement, buildings: BuildingData[]) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const canvasH = Math.floor(vh * 0.9);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = vw * dpr;
  canvas.height = canvasH * dpr;
  canvas.style.width = vw + 'px';
  canvas.style.height = canvasH + 'px';

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, vw, canvasH);

  const bgColor = '#0a0a0a';

  for (const b of buildings) {
    const by = canvasH - b.h;

    ctx.fillStyle = bgColor;
    ctx.fillRect(b.x, by, b.w, b.h);

    ctx.strokeStyle = 'rgba(184, 41, 221, 0.08)';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(b.x + 0.5, by);
    ctx.lineTo(b.x + 0.5, canvasH);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(b.x + b.w - 0.5, by);
    ctx.lineTo(b.x + b.w - 0.5, canvasH);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(b.x, by + 0.5);
    ctx.lineTo(b.x + b.w, by + 0.5);
    ctx.stroke();

    for (const win of b.windows) {
      if (!win.on) continue;
      const wx = b.x + win.ox;
      const wy = by + win.oy;
      const color = `rgba(184, 41, 221, ${win.brightness})`;

      ctx.fillStyle = color;
      ctx.fillRect(wx, wy, win.size, win.size);
    }
  }
}

export function animateWindowsOn(canvas: HTMLCanvasElement, buildings: BuildingData[]) {
  const burstStartTimes = [0.3, 0.8, 1.4];
  const flickerDuration = 0.2;
  const startTime = performance.now();
  const burstState = [0, 0, 0];
  let allMainDone = false;
  let allStragglersDone = false;

  function frame() {
    const elapsed = (performance.now() - startTime) / 1000;

    if (!allMainDone) {
      allMainDone = true;
      for (let g = 0; g < 3; g++) {
        if (burstState[g] === 2) continue;

        if (burstState[g] === 0 && elapsed >= burstStartTimes[g]) {
          burstState[g] = 1;
        }

        if (burstState[g] === 1) {
          const flickerElapsed = elapsed - burstStartTimes[g];
          const flickerProgress = flickerElapsed / flickerDuration;

          if (flickerProgress >= 1) {
            burstState[g] = 2;
            for (const b of buildings) {
              for (const win of b.windows) {
                if (!win.isStraggler && win.burstGroup === g) win.on = true;
              }
            }
          } else {
            const step = Math.floor(flickerProgress * 5);
            const isOn = step % 2 === 0;
            for (const b of buildings) {
              for (const win of b.windows) {
                if (!win.isStraggler && win.burstGroup === g) win.on = isOn;
              }
            }
          }
        }

        if (burstState[g] !== 2) allMainDone = false;
      }
    }

    allStragglersDone = true;
    for (const b of buildings) {
      for (const win of b.windows) {
        if (!win.isStraggler) continue;
        if (win.on) continue;
        allStragglersDone = false;

        if (elapsed >= win.stragglerDelay) {
          const flickerElapsed = elapsed - win.stragglerDelay;
          const flickerProgress = flickerElapsed / 0.12;

          if (flickerProgress >= 1) {
            win.on = true;
          } else {
            const step = Math.floor(flickerProgress * 3);
            win.on = step % 2 === 0;
          }
        }
      }
    }

    drawSkyline(canvas, buildings);

    if (!allMainDone || !allStragglersDone) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}
