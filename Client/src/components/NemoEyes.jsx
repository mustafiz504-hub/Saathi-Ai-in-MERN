/**
 * NemoEyes — Animated robotic eye system for AI companions
 * Inspired by Cozmo/Vector-style expressions
 *
 * Usage:
 *   <NemoEyes emotion="happy" size="md" />
 *
 * Available emotions:
 *   neutral, happy, glee, sad, worried, angry, furious,
 *   surprised, sleepy, focused, confused, love, blink,
 *   suspicious, skeptic, awe, scared
 *
 * To add a new emotion:
 *   1. Add a key to the EMOTIONS object below
 *   2. Define left/right eye shapes (shape, scaleY, translateY, rotate)
 *   3. Optionally define pupil offsets (dx, dy, scale)
 *   4. Optionally set glowColor for the face screen
 */

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const COLORS = {
  eyeCyan: "#00E5CC",
  eyeGlow: "rgba(0,229,204,0.55)",
  eyeGlowSoft: "rgba(0,229,204,0.18)",
  screenBg: "#0A0E0F",
  faceBg: "#111618",
  faceHighlight: "rgba(255,255,255,0.035)",
  glowLove: "rgba(255,80,140,0.5)",
  glowAngry: "rgba(255,60,40,0.45)",
  glowScared: "rgba(120,80,255,0.4)",
};

// ─── Eye shape library ────────────────────────────────────────────────────────
// Each eye: { shape, scaleY, translateY, rotate, rx, ry, pupil: {dx,dy,scale} }
// shape: 'rect' | 'arch' | 'half-top' | 'half-bottom' | 'heart' | 'swirl'
const EYE_DEFAULTS = { scaleY: 1, translateY: 0, rotate: 0, rx: 6, ry: 6 };

const EMOTIONS = {
  neutral: {
    left:  { ...EYE_DEFAULTS },
    right: { ...EYE_DEFAULTS },
  },
  happy: {
    left:  { ...EYE_DEFAULTS, shape: "half-bottom", scaleY: 1.1 },
    right: { ...EYE_DEFAULTS, shape: "half-bottom", scaleY: 1.1 },
    glowColor: COLORS.eyeGlow,
  },
  glee: {
    left:  { ...EYE_DEFAULTS, shape: "half-bottom", scaleY: 1.3, translateY: -3 },
    right: { ...EYE_DEFAULTS, shape: "half-bottom", scaleY: 1.3, translateY: -3 },
    pupil: { dx: 0, dy: -4, scale: 1.1 },
    glowColor: COLORS.eyeGlow,
  },
  sad: {
    left:  { ...EYE_DEFAULTS, shape: "half-top", rotate: -8, scaleY: 0.9 },
    right: { ...EYE_DEFAULTS, shape: "half-top", rotate: 8, scaleY: 0.9 },
    pupil: { dx: 0, dy: 3, scale: 0.9 },
  },
  worried: {
    left:  { ...EYE_DEFAULTS, rotate: 12, scaleY: 0.85 },
    right: { ...EYE_DEFAULTS, rotate: -12, scaleY: 0.85 },
    pupil: { dx: 0, dy: 2, scale: 0.85 },
  },
  angry: {
    left:  { ...EYE_DEFAULTS, shape: "half-top", rotate: -20, scaleY: 0.7 },
    right: { ...EYE_DEFAULTS, shape: "half-top", rotate: 20, scaleY: 0.7 },
    pupil: { dx: 0, dy: 2, scale: 0.75 },
    glowColor: COLORS.glowAngry,
  },
  furious: {
    left:  { ...EYE_DEFAULTS, shape: "half-top", rotate: -30, scaleY: 0.55, translateY: 4 },
    right: { ...EYE_DEFAULTS, shape: "half-top", rotate: 30, scaleY: 0.55, translateY: 4 },
    pupil: { dx: 0, dy: 4, scale: 0.7 },
    glowColor: COLORS.glowAngry,
  },
  surprised: {
    left:  { ...EYE_DEFAULTS, scaleY: 1.35, rx: 10, ry: 10 },
    right: { ...EYE_DEFAULTS, scaleY: 1.35, rx: 10, ry: 10 },
    pupil: { dx: 0, dy: 0, scale: 1.2 },
  },
  sleepy: {
    left:  { ...EYE_DEFAULTS, scaleY: 0.42, translateY: 8 },
    right: { ...EYE_DEFAULTS, scaleY: 0.42, translateY: 8 },
    pupil: { dx: 0, dy: 5, scale: 0.6 },
  },
  focused: {
    left:  { ...EYE_DEFAULTS, scaleY: 0.78, rx: 4 },
    right: { ...EYE_DEFAULTS, scaleY: 0.78, rx: 4 },
    pupil: { dx: 0, dy: 0, scale: 1.05 },
    glowColor: COLORS.eyeGlow,
  },
  confused: {
    left:  { ...EYE_DEFAULTS, rotate: 15, scaleY: 0.9 },
    right: { ...EYE_DEFAULTS, scaleY: 1.1, rotate: 0 },
    pupil: { dx: 2, dy: 0, scale: 0.9 },
  },
  love: {
    left:  { ...EYE_DEFAULTS, shape: "heart" },
    right: { ...EYE_DEFAULTS, shape: "heart" },
    glowColor: COLORS.glowLove,
  },
  blink: {
    left:  { ...EYE_DEFAULTS, scaleY: 0.08, translateY: 12 },
    right: { ...EYE_DEFAULTS, scaleY: 0.08, translateY: 12 },
  },
  suspicious: {
    left:  { ...EYE_DEFAULTS, scaleY: 0.5, translateY: 6, rotate: -5 },
    right: { ...EYE_DEFAULTS, scaleY: 0.85, rotate: 0 },
    pupil: { dx: -4, dy: 3, scale: 0.8 },
  },
  skeptic: {
    left:  { ...EYE_DEFAULTS, scaleY: 0.65, rotate: 5 },
    right: { ...EYE_DEFAULTS, scaleY: 0.65, rotate: -5 },
    pupil: { dx: 0, dy: 0, scale: 0.85 },
  },
  awe: {
    left:  { ...EYE_DEFAULTS, scaleY: 1.4, rx: 12, ry: 12 },
    right: { ...EYE_DEFAULTS, scaleY: 1.4, rx: 12, ry: 12 },
    pupil: { dx: 0, dy: -2, scale: 1.3 },
    glowColor: COLORS.eyeGlow,
  },
  scared: {
    left:  { ...EYE_DEFAULTS, scaleY: 1.2, translateY: -4, rx: 10, ry: 10 },
    right: { ...EYE_DEFAULTS, scaleY: 1.2, translateY: -4, rx: 10, ry: 10 },
    pupil: { dx: -3, dy: -2, scale: 0.7 },
    glowColor: COLORS.glowScared,
  },
};

// ─── Size presets ──────────────────────────────────────────────────────────────
const SIZES = {
  sm: { face: 120, eyeW: 32, eyeH: 24, gap: 14, pupilR: 7, screenPad: 18 },
  md: { face: 180, eyeW: 48, eyeH: 36, gap: 20, pupilR: 10, screenPad: 26 },
  lg: { face: 240, eyeW: 64, eyeH: 48, gap: 28, pupilR: 14, screenPad: 34 },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Renders a single eye on an SVG canvas */
function Eye({ config, w, h, pupilR, isBlinking, transitionMs = 280 }) {
  const cx = w / 2;
  const cy = h / 2;
  const { scaleY = 1, translateY = 0, rotate = 0, shape, rx = 6, ry = 6 } = config;
  const { pupil = { dx: 0, dy: 0, scale: 1 } } = config;

  const clipId = useRef(`clip-${Math.random().toString(36).slice(2)}`).current;
  const finalScaleY = isBlinking ? 0.07 : scaleY;
  const finalTranslateY = isBlinking ? cy * 0.85 : translateY;

  const style = {
    transition: `all ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    transformOrigin: `${cx}px ${cy}px`,
    transform: `rotate(${rotate}deg) translateY(${finalTranslateY}px) scaleY(${finalScaleY})`,
  };

  // Pupil position (not affected by scaleY trick — positioned independently)
  const px = cx + (pupil.dx || 0);
  const py = cy + (pupil.dy || 0);
  const pr = pupilR * (pupil.scale || 1);

  const renderEyeShape = () => {
    if (shape === "half-bottom") {
      // Arc open upward — happy/gleeful look
      const d = `M ${cx - w / 2} ${cy} Q ${cx} ${cy - h * 0.9} ${cx + w / 2} ${cy} Z`;
      return (
        <>
          <defs>
            <clipPath id={clipId}>
              <rect x={cx - w / 2} y={0} width={w} height={cy} />
            </clipPath>
          </defs>
          <rect
            x={cx - w / 2} y={cy - h / 2}
            width={w} height={h}
            rx={rx} ry={ry}
            fill={COLORS.eyeCyan}
            clipPath={`url(#${clipId})`}
          />
        </>
      );
    }

    if (shape === "half-top") {
      // Arc open downward — sad/angry brow line
      return (
        <>
          <defs>
            <clipPath id={clipId}>
              <rect x={cx - w / 2} y={cy} width={w} height={cy + h} />
            </clipPath>
          </defs>
          <rect
            x={cx - w / 2} y={cy - h / 2}
            width={w} height={h}
            rx={rx} ry={ry}
            fill={COLORS.eyeCyan}
            clipPath={`url(#${clipId})`}
          />
        </>
      );
    }

    if (shape === "heart") {
      const s = Math.min(w, h) * 0.85;
      return (
        <path
          d={`M ${cx} ${cy + s * 0.3}
              C ${cx} ${cy - s * 0.1}, ${cx - s * 0.6} ${cy - s * 0.4}, ${cx - s * 0.55} ${cy - s * 0.15}
              C ${cx - s * 0.6} ${cy - s * 0.55}, ${cx - s * 0.05} ${cy - s * 0.55}, ${cx} ${cy - s * 0.1}
              C ${cx + s * 0.05} ${cy - s * 0.55}, ${cx + s * 0.6} ${cy - s * 0.55}, ${cx + s * 0.55} ${cy - s * 0.15}
              C ${cx + s * 0.6} ${cy - s * 0.4}, ${cx} ${cy - s * 0.1}, ${cx} ${cy + s * 0.3} Z`}
          fill={COLORS.glowLove.replace("rgba(255,80,140,0.5)", "#FF5098")}
          stroke="none"
        />
      );
    }

    // Default: rounded rect
    return (
      <rect
        x={cx - w / 2} y={cy - h / 2}
        width={w} height={h}
        rx={rx} ry={ry}
        fill={COLORS.eyeCyan}
      />
    );
  };

  return (
    <svg width={w + 12} height={h + 24} style={{ overflow: "visible" }}>
      {/* Outer glow bloom */}
      <ellipse
        cx={cx + 6} cy={cy + 12}
        rx={w * 0.72} ry={h * 0.6}
        fill={COLORS.eyeGlowSoft}
        style={{ filter: "blur(6px)", ...style, transition: style.transition }}
      />
      {/* Eye body */}
      <g style={style}>
        {renderEyeShape()}
      </g>
      {/* Pupil — only on normal rect eyes, hides for special shapes */}
      {!shape && !isBlinking && (
        <circle
          cx={px + 6} cy={py + 12}
          r={pr * 0.45}
          fill={COLORS.screenBg}
          style={{
            transition: `all ${transitionMs}ms ease`,
            opacity: scaleY < 0.3 ? 0 : 0.7,
          }}
        />
      )}
      {/* Specular highlight */}
      {!isBlinking && (
        <ellipse
          cx={cx + 6 - w * 0.16} cy={cy + 12 - h * 0.22}
          rx={w * 0.12} ry={h * 0.09}
          fill="rgba(255,255,255,0.35)"
          style={{ opacity: scaleY < 0.3 ? 0 : 1, transition: `opacity ${transitionMs}ms ease` }}
        />
      )}
    </svg>
  );
}

/** Scan-line overlay for the robot screen */
function ScanLines({ size }) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.06 }}
      width={size} height={size}
    >
      {Array.from({ length: Math.floor(size / 4) }).map((_, i) => (
        <line
          key={i}
          x1={0} y1={i * 4}
          x2={size} y2={i * 4}
          stroke={COLORS.eyeCyan}
          strokeWidth={0.5}
        />
      ))}
    </svg>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

/**
 * NemoEyes
 * @param {string}  emotion    - One of the emotion keys (default: "neutral")
 * @param {string}  size       - "sm" | "md" | "lg" (default: "md")
 * @param {boolean} showFace   - Show the robot face housing (default: true)
 * @param {number}  blinkRate  - Average ms between auto-blinks (default: 4000)
 * @param {boolean} idle       - Enable floating idle animation (default: true)
 */
export function NemoEyes({
  emotion = "neutral",
  size = "md",
  showFace = true,
  blinkRate = 4000,
  idle = true,
}) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [floatOffset, setFloatOffset] = useState(0);
  const blinkTimeout = useRef(null);

  const cfg = EMOTIONS[emotion] || EMOTIONS.neutral;
  const s = SIZES[size] || SIZES.md;

  // Auto-blink at random intervals around blinkRate ± 1.5s
  const scheduleBlink = useCallback(() => {
    const delay = blinkRate + (Math.random() - 0.5) * 3000;
    blinkTimeout.current = setTimeout(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        scheduleBlink();
      }, 160);
    }, delay);
  }, [blinkRate]);

  useEffect(() => {
    scheduleBlink();
    return () => clearTimeout(blinkTimeout.current);
  }, [scheduleBlink]);

  // Subtle floating idle
  useEffect(() => {
    if (!idle) return;
    let frame;
    let t = 0;
    const tick = () => {
      t += 0.012;
      setFloatOffset(Math.sin(t) * 3.5);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [idle]);

  const glowColor = cfg.glowColor || COLORS.eyeGlowSoft;

  const eyeContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: s.gap,
    transform: `translateY(${floatOffset}px)`,
    transition: "transform 0.1s ease-out",
  };

  const eyes = (
    <div style={eyeContainerStyle}>
      <Eye
        config={cfg.left}
        w={s.eyeW} h={s.eyeH}
        pupilR={s.pupilR}
        isBlinking={isBlinking}
      />
      <Eye
        config={cfg.right}
        w={s.eyeW} h={s.eyeH}
        pupilR={s.pupilR}
        isBlinking={isBlinking}
      />
    </div>
  );

  if (!showFace) return eyes;

  return (
    <div
      style={{
        position: "relative",
        width: s.face,
        height: s.face,
        borderRadius: s.face * 0.22,
        background: `radial-gradient(ellipse at 50% 40%, #141C1E 0%, ${COLORS.screenBg} 80%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `
          0 0 0 2px rgba(255,255,255,0.06),
          0 0 0 4px rgba(0,0,0,0.8),
          0 0 30px 4px ${glowColor},
          0 8px 40px rgba(0,0,0,0.7),
          inset 0 1px 0 rgba(255,255,255,0.07)
        `,
        transition: "box-shadow 400ms ease",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Screen highlight sheen */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "45%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
        borderRadius: `${s.face * 0.22}px ${s.face * 0.22}px 0 0`,
        pointerEvents: "none",
      }} />
      <ScanLines size={s.face} />
      {eyes}
    </div>
  );
}

// ─── Demo app ─────────────────────────────────────────────────────────────────

const ALL_EMOTIONS = Object.keys(EMOTIONS).filter(e => e !== "blink");

export default function App() {
  const [active, setActive] = useState("neutral");
  const [size, setSize] = useState("md");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D1114",
      color: "#C8D8DB",
      fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
      gap: 40,
    }}>
      {/* Title */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: COLORS.eyeCyan, marginBottom: 8, opacity: 0.8 }}>
          NEMO AI COMPANION
        </div>
        <div style={{ fontSize: 26, fontWeight: 300, letterSpacing: 1, color: "#E8F4F6" }}>
          Eye Expression System
        </div>
      </div>

      {/* Main display */}
      <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
        <NemoEyes emotion={active} size={size} />

        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 180 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: COLORS.eyeCyan, marginBottom: 4 }}>EMOTION</div>
          <div style={{
            fontSize: 22, fontWeight: 500, color: "#E8F4F6",
            borderLeft: `2px solid ${COLORS.eyeCyan}`, paddingLeft: 12,
            transition: "all 300ms ease",
          }}>
            {active}
          </div>
          <div style={{ fontSize: 10, letterSpacing: 3, color: COLORS.eyeCyan, marginTop: 16, marginBottom: 4 }}>SIZE</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["sm", "md", "lg"].map(sz => (
              <button
                key={sz}
                onClick={() => setSize(sz)}
                style={{
                  padding: "4px 14px",
                  borderRadius: 4,
                  border: `1px solid ${size === sz ? COLORS.eyeCyan : "rgba(255,255,255,0.1)"}`,
                  background: size === sz ? `rgba(0,229,204,0.12)` : "transparent",
                  color: size === sz ? COLORS.eyeCyan : "#8AACB2",
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "inherit",
                  letterSpacing: 1,
                  transition: "all 200ms",
                }}
              >{sz}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Emotion grid */}
      <div style={{ width: "100%", maxWidth: 720 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: COLORS.eyeCyan, marginBottom: 16, textAlign: "center" }}>
          SELECT EXPRESSION
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
          gap: 10,
        }}>
          {ALL_EMOTIONS.map(em => (
            <button
              key={em}
              onClick={() => setActive(em)}
              style={{
                padding: "10px 6px",
                borderRadius: 10,
                border: `1px solid ${active === em ? COLORS.eyeCyan : "rgba(255,255,255,0.07)"}`,
                background: active === em
                  ? "rgba(0,229,204,0.1)"
                  : "rgba(255,255,255,0.025)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                transition: "all 200ms ease",
                outline: "none",
              }}
            >
              <NemoEyes emotion={em} size="sm" showFace={false} idle={false} blinkRate={99999} />
              <span style={{
                fontSize: 9,
                color: active === em ? COLORS.eyeCyan : "#607880",
                letterSpacing: 1,
                textTransform: "uppercase",
                fontFamily: "inherit",
              }}>{em}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code hint */}
      <div style={{
        borderRadius: 10,
        border: "1px solid rgba(0,229,204,0.15)",
        background: "rgba(0,229,204,0.04)",
        padding: "14px 20px",
        fontSize: 12,
        color: "#607880",
        fontFamily: "inherit",
        maxWidth: 420,
        lineHeight: 1.8,
        textAlign: "center",
      }}>
        <span style={{ color: COLORS.eyeCyan }}>{"<NemoEyes"}</span>
        {" emotion="}
        <span style={{ color: "#FFB347" }}>"{active}"</span>
        {" size="}
        <span style={{ color: "#FFB347 "}}>"{size}"</span>
        {" />"}
      </div>
    </div>
  );
}
