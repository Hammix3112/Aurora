import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import Aurora3DBackground from './Aurora3DBackground';
import Phone3D from './Phone3D';
import Widgets3D from './Widgets3D';
import EnergyTrails3D from './EnergyTrails3D';

/**
 * CameraRig - Non-stop idle cinematic camera drift, mouse 3D parallax, and scroll Z push-in
 */
function CameraRig({ mousePosition, scrollY }) {
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Continuous Non-Stop Idle Camera Drift
    const idleX = Math.sin(time * 0.35) * 0.18 + Math.cos(time * 0.15) * 0.08;
    const idleY = Math.cos(time * 0.25) * 0.12 + Math.sin(time * 0.4) * 0.06;
    const idleZ = Math.sin(time * 0.2) * 0.1;

    // 2. Mouse Parallax Influence
    const mouseX = mousePosition.current.x * 0.85;
    const mouseY = mousePosition.current.y * 0.55;

    // 3. Scroll-Driven Z-Axis Push-In
    const scrollZ = Math.min(2.0, (scrollY / 500) * 2.0);

    // Compute Target Positions
    const targetX = idleX + mouseX;
    const targetY = idleY + mouseY;
    const targetZ = 10.0 - scrollZ + idleZ;

    // Smooth Lerp Interpolation
    state.camera.position.x += (targetX - state.camera.position.x) * 0.035;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.035;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.035;

    // Focus Target LookAt
    const lookTargetX = mousePosition.current.x * 0.3;
    const lookTargetY = mousePosition.current.y * 0.2;
    state.camera.lookAt(lookTargetX, lookTargetY, 0);
  });

  return null;
}

/**
 * Refined Scene Lighting Architecture
 */
function SceneLighting() {
  return (
    <group>
      <hemisphereLight
        skyColor="#51E3DA"
        groundColor="#050711"
        intensity={0.6}
      />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 3, -2]}
        color="#51E3DA"
        intensity={2.5}
      />
      <directionalLight
        position={[-4, -2, -2]}
        color="#C084FC"
        intensity={2.2}
      />
    </group>
  );
}

/**
 * Optimized Master WebGL Canvas Component
 */
export default function HeroCanvas3D() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [rippleActive, setRippleActive] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const rippleTimeoutRef = useRef(null);

  const handlePhoneRipple = useCallback(() => {
    setRippleActive(true);
    if (rippleTimeoutRef.current) clearTimeout(rippleTimeoutRef.current);
    rippleTimeoutRef.current = setTimeout(() => {
      setRippleActive(false);
    }, 200);
  }, []);

  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = window.innerWidth < 768;
      const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
      setIsLowPower(isMobile || isLowMemory);
    };
    checkPerformance();

    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('resize', checkPerformance, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkPerformance);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (rippleTimeoutRef.current) clearTimeout(rippleTimeoutRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        className="w-full h-full"
      >
        <color attach="background" args={['#050711']} />
        <CameraRig mousePosition={mousePosition} scrollY={scrollY} />
        <SceneLighting />

        {/* Background */}
        <Aurora3DBackground />

        {/* Energy Trails */}
        <EnergyTrails3D mousePosition={mousePosition} onPhoneRipple={handlePhoneRipple} />

        {/* 3D Floating Information Widgets */}
        <Widgets3D />

        {/* 3D Phone Centerpiece */}
        <Phone3D mousePosition={mousePosition} rippleActive={rippleActive} />

        {/* High-Performance Post-Processing (Skipped on low power devices for maximum FPS & high Lighthouse TBT score) */}
        {!isLowPower && (
          <EffectComposer multisampling={0} disableNormalPass>
            <Bloom
              luminanceThreshold={0.88}
              intensity={0.3}
              mipmapBlur
            />
            <Vignette
              offset={0.35}
              darkness={0.4}
              blendFunction={BlendFunction.NORMAL}
            />
            <Noise
              opacity={0.02}
              blendFunction={BlendFunction.OVERLAY}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
