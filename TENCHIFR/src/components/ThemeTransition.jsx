import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ThemeTransition({ transition, onComplete }) {
  if (!transition) return null;

  const { toDark, origin } = transition;

  const maxRadius = useMemo(() => {
    const x = origin?.x ?? (typeof window !== 'undefined' ? window.innerWidth - 60 : 300);
    const y = origin?.y ?? 44;
    const w = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;

    const cornerDistances = [
      Math.hypot(x, y),
      Math.hypot(w - x, y),
      Math.hypot(x, h - y),
      Math.hypot(w - x, h - y),
    ];
    return Math.max(...cornerDistances) + 60;
  }, [origin]);

  const particles = useMemo(() => {
    const count = 48;
    const darkPalettes = [
      { primary: '#00D2FF', secondary: '#0284C7', glow: '#38BDF8' },
      { primary: '#737FF2', secondary: '#4338CA', glow: '#818CF8' },
      { primary: '#A78BFA', secondary: '#6D28D9', glow: '#C084FC' },
      { primary: '#38BDF8', secondary: '#0369A1', glow: '#7DD3FC' },
      { primary: '#E0F2FE', secondary: '#0284C7', glow: '#BAE6FD' },
      { primary: '#67E8F9', secondary: '#0E7490', glow: '#A5F3FC' },
    ];
    const lightPalettes = [
      { primary: '#FCD34D', secondary: '#D97706', glow: '#FDE68A' },
      { primary: '#FB923C', secondary: '#C2410C', glow: '#FDBA74' },
      { primary: '#F59E0B', secondary: '#B45309', glow: '#FBBF24' },
      { primary: '#FB7185', secondary: '#BE123C', glow: '#FDA4AF' },
      { primary: '#FEF08A', secondary: '#CA8A04', glow: '#FEF9C3' },
      { primary: '#737FF2', secondary: '#4F46E5', glow: '#A5B4FC' },
    ];
    const palettes = toDark ? darkPalettes : lightPalettes;

    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 2 * Math.PI + (Math.random() - 0.5) * 0.35;
      const distance = 0.25 + Math.random() * 0.85;

      // Tiered splash sizes: Big droplets, medium splash drops, and accent beads
      let size;
      let isBig = false;
      if (i % 5 === 0) {
        // Mega splash droplets (26px to 46px)
        size = 26 + Math.random() * 20;
        isBig = true;
      } else if (i % 2 === 0) {
        // Medium splash droplets (14px to 24px)
        size = 14 + Math.random() * 10;
      } else {
        // Small splash beads (8px to 14px)
        size = 8 + Math.random() * 6;
      }

      const glow = isBig ? 18 + Math.random() * 14 : 10 + Math.random() * 8;
      const duration = 0.6 + Math.random() * 0.3;
      const delay = Math.random() * 0.08;
      const palette = palettes[Math.floor(Math.random() * palettes.length)];

      return {
        angle,
        distance,
        size,
        glow,
        duration,
        delay,
        isBig,
        primary: palette.primary,
        secondary: palette.secondary,
        glowColor: palette.glow,
      };
    });
  }, [toDark]);

  const originX = origin?.x ?? (typeof window !== 'undefined' ? window.innerWidth - 60 : 300);
  const originY = origin?.y ?? 44;

  return (
    <AnimatePresence>
      <motion.div
        key={transition.key}
        className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: 0.85, times: [0, 0.75, 1], ease: 'easeInOut' }}
        onAnimationComplete={onComplete}
      >
        {/* Expanding Realm Curtain */}
        <motion.div
          className="absolute inset-0"
          style={{
            willChange: 'clip-path',
            background: toDark
              ? 'radial-gradient(circle at center, rgba(10, 15, 30, 0.96) 0%, rgba(0, 0, 0, 0.98) 100%)'
              : 'radial-gradient(circle at center, rgba(255, 252, 245, 0.96) 0%, #F3EBDD 100%)',
          }}
          initial={{
            clipPath: `circle(0px at ${originX}px ${originY}px)`,
          }}
          animate={{
            clipPath: `circle(${maxRadius}px at ${originX}px ${originY}px)`,
          }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Luminous Shockwave Ring */}
        <motion.div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: originX,
            top: originY,
            width: maxRadius * 2,
            height: maxRadius * 2,
            willChange: 'transform, opacity',
            boxShadow: toDark
              ? '0 0 45px 12px rgba(0, 210, 255, 0.85), inset 0 0 30px 6px rgba(115, 127, 242, 0.7)'
              : '0 0 50px 14px rgba(251, 146, 60, 0.85), inset 0 0 35px 6px rgba(245, 235, 221, 0.8)',
            border: toDark
              ? '2.5px solid rgba(0, 210, 255, 0.95)'
              : '2.5px solid rgba(253, 186, 116, 0.95)',
          }}
          initial={{
            scale: 0,
            opacity: 1,
          }}
          animate={{
            scale: 1,
            opacity: [1, 0.85, 0],
          }}
          transition={{
            duration: 0.78,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Secondary Harmonic Wave Pulse */}
        <motion.div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: originX,
            top: originY,
            width: maxRadius * 1.6,
            height: maxRadius * 1.6,
            willChange: 'transform, opacity',
            boxShadow: toDark
              ? '0 0 25px 6px rgba(167, 139, 250, 0.6)'
              : '0 0 30px 8px rgba(244, 114, 182, 0.5)',
            border: toDark
              ? '1.5px solid rgba(167, 139, 250, 0.7)'
              : '1.5px solid rgba(251, 146, 60, 0.6)',
          }}
          initial={{
            scale: 0,
            opacity: 0.9,
          }}
          animate={{
            scale: 1,
            opacity: [0.9, 0.6, 0],
          }}
          transition={{
            duration: 0.7,
            delay: 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Dynamic Liquid Splash Droplets */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: originX,
              top: originY,
              width: p.size,
              height: p.size,
              marginLeft: -p.size / 2,
              marginTop: -p.size / 2,
              willChange: 'transform, opacity',
              background: `radial-gradient(circle at 32% 28%, #ffffff 0%, ${p.primary} 48%, ${p.secondary} 100%)`,
              boxShadow: `0 0 ${p.glow}px ${p.glowColor}, inset 0 2px 4px rgba(255, 255, 255, 0.75), 0 4px 14px rgba(0, 0, 0, 0.35)`,
              border: '1px solid rgba(255, 255, 255, 0.4)',
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0.1,
              opacity: 1,
            }}
            animate={{
              x: Math.cos(p.angle) * (maxRadius * p.distance),
              y: Math.sin(p.angle) * (maxRadius * p.distance),
              scale: [0.1, 1.45, 0],
              opacity: [1, 0.95, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              times: [0, 0.35, 1],
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
