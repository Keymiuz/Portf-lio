'use client';

import { type ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  maxTilt?: number;
};

export function TiltCard({
  children,
  className = '',
  innerClassName = '',
  maxTilt = 8
}: TiltCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, { stiffness: 180, damping: 18, mass: 0.4 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 180, damping: 18, mass: 0.4 });
  const smoothGlareOpacity = useSpring(glareOpacity, { stiffness: 180, damping: 18, mass: 0.4 });

  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18), transparent 32%)`;

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;

    rotateX.set((py - 0.5) * maxTilt);
    rotateY.set((0.5 - px) * maxTilt);
    glareX.set(px * 100);
    glareY.set(py * 100);
    glareOpacity.set(1);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
    glareX.set(50);
    glareY.set(50);
  }

  return (
    <div
      className={`relative [perspective:1400px] ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
    >
      <motion.div
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d'
        }}
        className={`relative h-full will-change-transform ${innerClassName}`.trim()}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
          style={{ background: glare, opacity: smoothGlareOpacity }}
        />
        {children}
      </motion.div>
    </div>
  );
}
