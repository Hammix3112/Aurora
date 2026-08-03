import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
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

    // 1. Continuous Non-Stop Idle Camera Drift (multi-frequency harmonic waves)
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

    // Smooth Lerp Interpolation for Physical Camera Weight & Inertia
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
 * Includes HemisphereLight, AmbientLight, 2 Rim Lights (Cyan & Purple)
 */
function SceneLighting() {
  return (
    <group>
      {/* 1. Hemisphere Light: Sky Cyan/Teal & Ground Deep Dark */}
      <hemisphereLight
        skyColor="#51E3DA"
        groundColor="#050711"
        intensity={0.6}
      />

      {/* 2. Soft Ambient Base Light Fill */}
      <ambientLight intensity={0.4} />

      {/* 3. Subtle Cyan Rim Light */}
      <directionalLight
        position={[4, 3, -2]}
        color="#51E3DA"
        intensity={2.5}
      />

      {/* 4. Subtle Purple Rim Light */}
      <directionalLight
        position={[-4, -2, -2]}
        color="#C084FC"
        intensity={2.2}
      />
    </group>
  );
}

/**
 * Commit 7: Master WebGL R3F Canvas Container with Cinematic Post-Processing Pipeline
 */
export default function HeroCanvas3D() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [rippleActive, setRippleActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rippleTimeoutRef = useRef(null);

  const handlePhoneRipple = useCallback(() => {
    setRippleActive(true);
    if (rippleTimeoutRef.current) clearTimeout(rippleTimeoutRef.current);
    rippleTimeoutRef.current = setTimeout(() => {
      setRippleActive(false);
    }, 200);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('resize', checkMobile);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (rippleTimeoutRef.current) clearTimeout(rippleTimeoutRef.current);
    };
  }, []);

  return (
    <div class="absolute inset-0 w-full h-full pointer-events-auto z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <color attach="background" args={['#050711']} />
        <CameraRig mousePosition={mousePosition} scrollY={scrollY} />
        <SceneLighting />

        {/* Frozen Background */}
        <Aurora3DBackground />

        {/* Intelligent Energy Connection Trails */}
        <EnergyTrails3D mousePosition={mousePosition} onPhoneRipple={handlePhoneRipple} />

        {/* 3D Floating Information Widgets */}
        <Widgets3D />

        {/* 3D Phone Centerpiece with Ripple Reaction */}
        <Phone3D mousePosition={mousePosition} rippleActive={rippleActive} />

        {/* Commit 7: Cinematic Post-Processing Pipeline (Disabled on mobile for 60 FPS performance) */}
        {!isMobile && (
          <EffectComposer multisampling={0}>
            {/* 1. Subtle High-Threshold Bloom */}
            <Bloom
              luminanceThreshold={0.85}
              intensity={0.35}
              levels={8}
              mipmapBlur
            />

            {/* 2. Soft Edge Falloff Vignette */}
            <Vignette
              offset={0.35}
              darkness={0.4}
              blendFunction={BlendFunction.NORMAL}
            />

            {/* 3. Micro Film Grain (Below 0.03 Opacity) */}
            <Noise
              opacity={0.025}
              blendFunction={BlendFunction.OVERLAY}
            />

            {/* 4. Almost Invisible Chromatic Aberration Edge Fringe */}
            <ChromaticAberration
              offset={[0.0006, 0.0006]}
              radialModulation={true}
              modulationOffset={0.5}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
