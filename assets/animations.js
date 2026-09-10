// Two decorative canvases, ported from the original design with the maths untouched.
//  - helix:    376 points that form a double helix, dissolve into noise, and re-form; follows the pointer, scatters on click
//  - backdrop: one faint tilted orbit with a slow accent marker and trail
// Colours come from the CSS variables --ink / --accent (hex values); call refreshColors() after a theme change.
const Animations = (() => {
  const colors = { ink: '#17171a', accent: '#4a44a6' };
  const refreshColors = () => {
    const cs = getComputedStyle(document.documentElement);
    for (const k in colors) colors[k] = cs.getPropertyValue('--' + k).trim() || colors[k];
  };
  const rgb = hex => {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.replace(/./g, c => c + c) : h.slice(0, 6), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const hexA = (hex, a) => `rgba(${rgb(hex)},${a})`;
  const mixA = (a, b, w, alpha) => {
    const A = rgb(a), B = rgb(b);
    return `rgba(${A.map((v, i) => Math.round(v + (B[i] - v) * w))},${alpha})`;
  };
  // size the canvas backing store to its CSS box; returns the CSS size
  const fitCanvas = (cv, ctx, maxDpr) => {
    const dpr = Math.min(devicePixelRatio || 1, maxDpr);
    const w = cv.clientWidth, h = cv.clientHeight;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return [w, h];
  };

  function startBackdrop(cv, speed) {
    const ctx = cv.getContext('2d');
    let w = 0, h = 0, last = 0, t = 0;
    const fit = () => { [w, h] = fitCanvas(cv, ctx, 1.5); };
    fit();
    addEventListener('resize', fit, { passive: true });

    const loop = now => {
      requestAnimationFrame(loop);
      if (document.hidden || !w || !h || now - last < 40) return;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      t += dt * speed();

      ctx.clearRect(0, 0, w, h);
      const rx = Math.max(w, h) * 0.46, ry = Math.max(w, h) * 0.3;
      ctx.save();
      ctx.translate(w * 0.5, h * 0.5);
      ctx.rotate(-0.22);

      // the path
      ctx.strokeStyle = hexA(colors.ink, 0.08);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, 6.2832);
      ctx.stroke();

      // trail, then the marker
      const a = t * 0.035;             // one turn ≈ 3 minutes
      const TRAIL = 0.5, grad = 18;
      for (let i = grad; i >= 1; i--) {
        ctx.strokeStyle = hexA(colors.accent, 0.3 * Math.pow(1 - i / grad, 1.6));
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, a - TRAIL * (i / grad), a - TRAIL * ((i - 1) / grad));
        ctx.stroke();
      }
      ctx.fillStyle = hexA(colors.accent, 0.55);
      ctx.beginPath();
      ctx.arc(Math.cos(a) * rx, Math.sin(a) * ry, 3, 0, 6.2832);
      ctx.fill();
      ctx.restore();
    };
    requestAnimationFrame(loop);
  }

  function startHelix(cv, speed) {
    const ctx = cv.getContext('2d');
    let w = 0, h = 0, t = 0;
    const cam = { yaw: 0.35, pitch: -0.08, tYaw: 0.35, tPitch: -0.08 };

    // Every state — each structure and the noise cloud between them — is a target
    // in the same coordinate space. Transitions always ease from where the points
    // currently are, so a click never teleports anything.
    const COUNT = 376;
    let sd = 11;
    const rnd = () => { sd = (sd * 1103515245 + 12345) % 2147483648; return sd / 2147483648; };

    let variant = 0;
    const buildHelix = () => {
      const out = [];
      variant += 1;
      const TURNS = 2.2 + 0.35 * Math.sin(variant * 1.7);
      const twist = variant * 0.9;
      const SEG = 140;
      for (let s2 = 0; s2 < 2; s2++) {
        for (let i = 0; i < SEG; i++) {
          const u = i / (SEG - 1), a = u * Math.PI * 2 * TURNS + s2 * Math.PI + twist;
          out.push([Math.cos(a), (u - 0.5) * 3.9, Math.sin(a), s2]);
        }
      }
      for (let i = 0; i < 24; i++) {
        const u = i / 23, a = u * Math.PI * 2 * TURNS + twist;
        for (let k = 1; k < 5; k++) {
          const f = k / 5;
          out.push([Math.cos(a) * (1 - 2 * f), (u - 0.5) * 3.9, Math.sin(a) * (1 - 2 * f), 2]);
        }
      }
      return out;
    };
    const buildNoise = prev => {
      const out = [];
      for (let i = 0; i < COUNT; i++) {
        out.push([(rnd() - 0.5) * 2.6, (rnd() - 0.5) * 3.4, (rnd() - 0.5) * 2.6, prev[i % prev.length][3]]);
      }
      return out;
    };

    const from = new Float32Array(COUNT * 3), to = new Float32Array(COUNT * 3), cur = new Float32Array(COUNT * 3);
    const kindFrom = new Uint8Array(COUNT), kindTo = new Uint8Array(COUNT);
    const settleFrom = new Float32Array(COUNT), settleCur = new Float32Array(COUNT);
    const blend = new Float32Array(COUNT), delay = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) delay[i] = rnd();

    let phase = 'shape';          // 'shape' | 'noise'
    let trStart = 0, trDur = 3.4, holdUntil = 0;
    const hold = 2.6;

    const setTarget = data => {
      for (let i = 0; i < COUNT; i++) {
        const src = data[i % data.length];
        from[i * 3] = cur[i * 3]; from[i * 3 + 1] = cur[i * 3 + 1]; from[i * 3 + 2] = cur[i * 3 + 2];
        to[i * 3] = src[0]; to[i * 3 + 1] = src[1]; to[i * 3 + 2] = src[2];
        // whatever the point looks like right now becomes the start of the next blend
        settleFrom[i] = settleCur[i];
        kindFrom[i] = kindTo[i];
        kindTo[i] = src[3];
      }
    };

    // seed: start scattered, resolve into the first structure
    const seed = buildNoise(buildHelix());
    for (let i = 0; i < COUNT; i++) {
      cur[i * 3] = seed[i][0]; cur[i * 3 + 1] = seed[i][1]; cur[i * 3 + 2] = seed[i][2];
      kindFrom[i] = kindTo[i] = seed[i][3];
    }
    setTarget(buildHelix());

    const advance = (now, forced) => {
      if (phase === 'shape') {
        setTarget(buildNoise(buildHelix()));
        phase = 'noise';
        trDur = forced ? 0.4 : 2.6;   // a click resolves in ~1.5s, the idle cycle keeps its slow pace
      } else {
        setTarget(buildHelix());
        phase = 'shape';
        trDur = forced ? 0.5 : 3.4;
      }
      trStart = now;
      holdUntil = 0;
    };
    cv.addEventListener('pointerdown', () => advance(t, true));

    const proj = new Float32Array(COUNT * 4);
    const order = Array.from({ length: COUNT }, (_, i) => i);

    const fit = () => { [w, h] = fitCanvas(cv, ctx, 2); };
    fit();
    new ResizeObserver(fit).observe(cv);

    addEventListener('pointermove', e => {
      const r = cv.getBoundingClientRect();
      cam.tYaw = 0.35 + ((e.clientX - r.left) / r.width - 0.5) * 1.5;
      cam.tPitch = -0.08 + ((e.clientY - r.top) / r.height - 0.5) * 0.55;
    }, { passive: true });

    const draw = () => {
      requestAnimationFrame(draw);
      if (document.hidden || !w || !h) return;
      t += 0.0045 * speed();
      cam.yaw += (cam.tYaw + t * 0.22 - cam.yaw) * 0.045;
      cam.pitch += (cam.tPitch - cam.pitch) * 0.045;

      const S = Math.min(w, h), R = S * 0.215, D = S * 2.8;
      const ox = w * 0.5, oy = h * 0.47;
      const cyw = Math.cos(cam.yaw), s1 = Math.sin(cam.yaw);
      const cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);

      let gp = Math.max(0, Math.min(1, (t - trStart) / trDur));
      if (gp >= 1) {
        if (!holdUntil) holdUntil = t + (phase === 'shape' ? hold : 0.9);
        else if (t > holdUntil) { advance(t, false); gp = 0; }
      }

      for (let i = 0; i < COUNT; i++) {
        // stagger keeps the cloud from moving as one rigid block
        const local = Math.max(0, Math.min(1, (gp - delay[i] * 0.35) / 0.65));
        const e = local < 0.5 ? 2 * local * local : 1 - Math.pow(-2 * local + 2, 2) / 2;
        const bx = from[i * 3] + (to[i * 3] - from[i * 3]) * e;
        const by = from[i * 3 + 1] + (to[i * 3 + 1] - from[i * 3 + 1]) * e;
        const bz = from[i * 3 + 2] + (to[i * 3 + 2] - from[i * 3 + 2]) * e;
        cur[i * 3] = bx; cur[i * 3 + 1] = by; cur[i * 3 + 2] = bz;
        let x = bx, y = by, z = bz;
        const loose = settleFrom[i] + ((phase === 'shape' ? 1 : 0) - settleFrom[i]) * e;
        const wobble = 1 - loose;
        if (wobble > 0.001) {
          const ph2 = i * 0.7;
          x += Math.sin(t * 0.9 + ph2) * 0.06 * wobble;
          y += Math.cos(t * 0.75 + ph2 * 1.3) * 0.07 * wobble;
          z += Math.sin(t * 0.85 + ph2 * 0.6) * 0.06 * wobble;
        }
        const X = x * R, Y = y * R, Z = z * R;
        const x1 = X * cyw - Z * s1, z1 = X * s1 + Z * cyw;
        const y2 = Y * cp - z1 * sp, z2 = Y * sp + z1 * cp;
        const k = D / (D + z2);
        proj[i * 4] = ox + x1 * k;
        proj[i * 4 + 1] = oy + y2 * k;
        proj[i * 4 + 2] = k;
        // 1 = sitting in a structure, 0 = loose in the cloud. Interpolated from the
        // value the point already had, so a mid-transition click cannot pop.
        settleCur[i] = settleFrom[i] + ((phase === 'shape' ? 1 : 0) - settleFrom[i]) * e;
        proj[i * 4 + 3] = settleCur[i];
        blend[i] = e;
      }
      order.sort((m, n) => proj[m * 4 + 2] - proj[n * 4 + 2]);

      ctx.clearRect(0, 0, w, h);
      for (let n = 0; n < order.length; n++) {
        const i = order[n];
        const k = proj[i * 4 + 2], e = proj[i * 4 + 3];
        const d = Math.max(0, Math.min(1, (k - 0.72) / 0.5));
        const bl = blend[i];
        const kf = kindFrom[i], kt = kindTo[i];
        const sizeOf = kd => (kd === 2 ? 0.5 : 0.9) + d * (kd === 2 ? 1.2 : 2.2);
        const alphaOf = kd => (kd === 2 ? 0.08 : 0.14) + d * (kd === 2 ? 0.28 : 0.5);
        const rad = (sizeOf(kf) + (sizeOf(kt) - sizeOf(kf)) * bl) * (0.62 + e * 0.55);
        const aBase = alphaOf(kf) + (alphaOf(kt) - alphaOf(kf)) * bl;
        const accentW = (kf === 1 ? 1 - bl : 0) + (kt === 1 ? bl : 0);
        ctx.fillStyle = mixA(colors.ink, colors.accent, accentW, aBase * (0.5 + e * 0.5));
        ctx.beginPath();
        ctx.arc(proj[i * 4], proj[i * 4 + 1], rad, 0, 6.2832);
        ctx.fill();
      }
    };
    draw();
  }

  return {
    refreshColors,
    start(helixCanvas, backdropCanvas, speed) {
      refreshColors();
      if (helixCanvas) startHelix(helixCanvas, speed);
      if (backdropCanvas) startBackdrop(backdropCanvas, speed);
    },
  };
})();
