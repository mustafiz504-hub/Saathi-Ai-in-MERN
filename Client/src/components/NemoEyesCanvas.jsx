/**
 * NemoEyesCanvas — Canvas-based animated robot eyes for Nemo AI
 * Ported directly from nemo_eyes_demo.html
 *
 * Usage: <NemoEyesCanvas emotion="neutral" size="md" />
 *
 * Emotions: neutral, happy, glee, sad, worried, angry, furious,
 *           surprised, sleepy, focused, confused, love,
 *           suspicious, skeptic, awe, scared
 */

import { useEffect, useRef } from "react";

// ── Constants ──────────────────────────────────────────────────────────────────
const CYAN        = "#00E5CC";
const SCREEN_BG   = "#0A0E0F";
const LOVE_COLOR  = "#FF5098";

const EMOTIONS = {
  neutral:    { l: {},                          r: {} },
  happy:      { l: { shape: "hbot" },           r: { shape: "hbot" },           glow: "rgba(0,229,204,0.6)" },
  glee:       { l: { shape: "hbot", sy: 1.3, ty: -3 }, r: { shape: "hbot", sy: 1.3, ty: -3 }, glow: "rgba(0,229,204,0.7)", pd: { dy: -4, s: 1.1 } },
  sad:        { l: { shape: "htop", rot: -8, sy: 0.85 }, r: { shape: "htop", rot: 8, sy: 0.85 }, pd: { dy: 3, s: 0.9 } },
  worried:    { l: { rot: 14, sy: 0.82 },       r: { rot: -14, sy: 0.82 },      pd: { dy: 2, s: 0.85 } },
  angry:      { l: { shape: "htop", rot: -22, sy: 0.65 }, r: { shape: "htop", rot: 22, sy: 0.65 }, glow: "rgba(255,60,30,0.5)", pd: { dy: 3, s: 0.7 } },
  furious:    { l: { shape: "htop", rot: -32, sy: 0.5, ty: 4 }, r: { shape: "htop", rot: 32, sy: 0.5, ty: 4 }, glow: "rgba(255,40,10,0.55)", pd: { dy: 5, s: 0.65 } },
  surprised:  { l: { sy: 1.35, rx: 11 },        r: { sy: 1.35, rx: 11 },        pd: { s: 1.2 } },
  sleepy:     { l: { sy: 0.35, ty: 9 },         r: { sy: 0.35, ty: 9 },         pd: { dy: 6, s: 0.55 } },
  focused:    { l: { sy: 0.75, rx: 3 },         r: { sy: 0.75, rx: 3 },         glow: "rgba(0,229,204,0.55)", pd: { s: 1.05 } },
  confused:   { l: { rot: 16, sy: 0.88 },       r: { sy: 1.12, rot: 0 },        pd: { dx: 3, s: 0.9 } },
  love:       { l: { shape: "heart" },           r: { shape: "heart" },          glow: "rgba(255,80,140,0.55)" },
  suspicious: { l: { sy: 0.45, ty: 7, rot: -6 }, r: { sy: 0.82, rot: 0 },      pd: { dx: -4, dy: 3, s: 0.8 } },
  skeptic:    { l: { sy: 0.6, rot: 6 },         r: { sy: 0.6, rot: -6 },        pd: { s: 0.82 } },
  awe:        { l: { sy: 1.4, rx: 13 },         r: { sy: 1.4, rx: 13 },         glow: "rgba(0,229,204,0.65)", pd: { dy: -2, s: 1.3 } },
  scared:     { l: { sy: 1.2, ty: -4, rx: 11 }, r: { sy: 1.2, ty: -4, rx: 11 }, glow: "rgba(120,80,255,0.5)", pd: { dx: -3, dy: -2, s: 0.68 } },
};

const SIZES = {
  sm: { face: 88,  ew: 22, eh: 16, gap: 10, pr: 5,  br: 18 },
  md: { face: 180, ew: 48, eh: 35, gap: 20, pr: 10, br: 40 },
  lg: { face: 240, ew: 64, eh: 48, gap: 28, pr: 14, br: 52 },
};

// ── Canvas helpers ─────────────────────────────────────────────────────────────
function roundRect(ctx, x, y, w, h, r) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawEye(ctx, cx, cy, w, h, cfg, isBlinking, floatY) {
  const { shape, sy = 1, ty = 0, rot = 0, rx = 6 } = cfg;
  const finalSY = isBlinking ? 0.06 : sy;
  const finalTY = isBlinking ? cy * 0.9 : ty;

  ctx.save();
  ctx.translate(cx, cy + floatY);
  ctx.rotate((rot * Math.PI) / 180);
  ctx.scale(1, finalSY);
  ctx.translate(0, finalTY / finalSY);

  const ew2 = w / 2, eh2 = h / 2;

  if (shape === "heart") {
    ctx.beginPath();
    const s = Math.min(w, h) * 0.8;
    ctx.moveTo(0, s * 0.28);
    ctx.bezierCurveTo(0, -s * 0.08, -s * 0.55, -s * 0.42, -s * 0.5, -s * 0.12);
    ctx.bezierCurveTo(-s * 0.55, -s * 0.52, -s * 0.02, -s * 0.52, 0, -s * 0.08);
    ctx.bezierCurveTo(s * 0.02, -s * 0.52, s * 0.55, -s * 0.52, s * 0.5, -s * 0.12);
    ctx.bezierCurveTo(s * 0.55, -s * 0.42, 0, -s * 0.08, 0, s * 0.28);
    ctx.closePath();
    ctx.fillStyle = LOVE_COLOR;
    ctx.fill();
    ctx.restore();
    return;
  }

  ctx.beginPath();
  roundRect(ctx, -ew2, -eh2, w, h, rx);
  if (shape === "hbot") {
    ctx.save(); ctx.clip();
    ctx.fillStyle = CYAN;
    ctx.fillRect(-ew2, -eh2, w, eh2);
    ctx.restore();
  } else if (shape === "htop") {
    ctx.save(); ctx.clip();
    ctx.fillStyle = CYAN;
    ctx.fillRect(-ew2, 0, w, eh2);
    ctx.restore();
  } else {
    ctx.fillStyle = CYAN;
    ctx.fill();
  }
  ctx.restore();
}

function drawFace(canvas, emotion, sz, blink, floatY) {
  const s = SIZES[sz] || SIZES.md;
  canvas.width  = s.face;
  canvas.height = s.face;
  const ctx = canvas.getContext("2d");
  const cfg = EMOTIONS[emotion] || EMOTIONS.neutral;
  const glow = cfg.glow || "rgba(0,229,204,0.22)";

  // Face background
  const rg = ctx.createRadialGradient(s.face / 2, s.face * 0.4, 0, s.face / 2, s.face / 2, s.face * 0.7);
  rg.addColorStop(0, "#141C1E");
  rg.addColorStop(1, SCREEN_BG);
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, 0, 0, s.face, s.face, s.br);
  ctx.closePath();
  ctx.fillStyle = rg;
  ctx.fill();

  // Outer glow ring
  ctx.shadowColor  = glow;
  ctx.shadowBlur   = 28;
  ctx.strokeStyle  = glow.replace(/[\d.]+\)$/, "0.4)");
  ctx.lineWidth    = 1.5;
  ctx.stroke();
  ctx.shadowBlur   = 0;
  ctx.restore();

  // Scan lines + top sheen
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, 0, 0, s.face, s.face, s.br);
  ctx.clip();
  ctx.globalAlpha = 0.045;
  for (let i = 0; i < s.face; i += 4) {
    ctx.fillStyle = CYAN;
    ctx.fillRect(0, i, s.face, 0.8);
  }
  ctx.globalAlpha = 1;
  const sg = ctx.createLinearGradient(0, 0, 0, s.face * 0.45);
  sg.addColorStop(0, "rgba(255,255,255,0.055)");
  sg.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sg;
  ctx.fillRect(0, 0, s.face, s.face * 0.45);
  ctx.restore();

  // Eye positions
  const eyeY = s.face * 0.5;
  const lx   = s.face / 2 - s.gap / 2 - s.ew / 2;
  const rx2  = s.face / 2 + s.gap / 2 + s.ew / 2;

  // Glow behind eyes
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.shadowColor = CYAN;
  ctx.shadowBlur  = 18;
  drawEye(ctx, lx,  eyeY, s.ew, s.eh, cfg.l, blink, floatY);
  drawEye(ctx, rx2, eyeY, s.ew, s.eh, cfg.r, blink, floatY);
  ctx.restore();

  // Eyes main
  ctx.save();
  ctx.shadowColor = CYAN;
  ctx.shadowBlur  = 10;
  drawEye(ctx, lx,  eyeY, s.ew, s.eh, cfg.l, blink, floatY);
  drawEye(ctx, rx2, eyeY, s.ew, s.eh, cfg.r, blink, floatY);
  ctx.restore();

  // Specular highlights
  if (!blink) {
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle   = "white";
    const hl = (ex) => {
      ctx.beginPath();
      ctx.ellipse(ex - s.ew * 0.15, eyeY + floatY - s.eh * 0.25, s.ew * 0.1, s.eh * 0.08, 0, 0, Math.PI * 2);
      ctx.fill();
    };
    hl(lx);
    hl(rx2);
    ctx.restore();
  }
}

// ── React component ────────────────────────────────────────────────────────────
export function NemoEyesCanvas({ emotion = "neutral", size = "md" }) {
  const canvasRef  = useRef(null);
  const stateRef   = useRef({ emotion, size, isBlinking: false, floatT: 0 });
  const blinkTimer = useRef(null);
  const animFrame  = useRef(null);

  // Keep latest props in ref without restarting the loop
  useEffect(() => {
    stateRef.current.emotion = emotion;
    stateRef.current.size    = size;
  }, [emotion, size]);

  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 3800 + Math.random() * 3000;
      clearTimeout(blinkTimer.current);
      blinkTimer.current = setTimeout(() => {
        stateRef.current.isBlinking = true;
        setTimeout(() => {
          stateRef.current.isBlinking = false;
          scheduleBlink();
        }, 170);
      }, delay);
    };

    const loop = () => {
      stateRef.current.floatT += 0.013;
      const fy = Math.sin(stateRef.current.floatT) * 3.5;
      const canvas = canvasRef.current;
      if (canvas) {
        drawFace(canvas, stateRef.current.emotion, stateRef.current.size, stateRef.current.isBlinking, fy);
      }
      animFrame.current = requestAnimationFrame(loop);
    };

    scheduleBlink();
    loop();

    return () => {
      clearTimeout(blinkTimer.current);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  const s = SIZES[size] || SIZES.md;

  return (
    <canvas
      ref={canvasRef}
      width={s.face}
      height={s.face}
      style={{ display: "block", borderRadius: s.br }}
    />
  );
}

export default NemoEyesCanvas;
