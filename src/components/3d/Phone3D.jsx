import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import TodayCalorieScreen from '../PhoneScreens/TodayCalorieScreen';
import { Wifi, Signal, Battery } from 'lucide-react';
import * as THREE from 'three';

/**
 * Hero Smartphone 3D Component calibrated for 100% exact visual size parity with PhoneMockup (320px x 620px)
 */
export default function Phone3D({ mousePosition, rippleActive }) {
  const phoneGroupRef = useRef();
  const glassWaveRef = useRef();
  const waveProgressRef = useRef(0);

  useFrame((state) => {
    if (!phoneGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Gentle organic breathing motion (Damped lerp to avoid scroll/frame jitter)
    const breathY = Math.sin(time * 0.7) * 0.04;
    const breathX = Math.cos(time * 0.5) * 0.02;
    const breathZ = Math.sin(time * 0.4) * 0.03;

    // Controlled mouse rotation (Subtle inertia)
    const mouseRotX = Math.min(0.05, Math.max(-0.05, (mousePosition?.current?.y || 0) * -0.04));
    const mouseRotY = Math.min(0.05, Math.max(-0.05, (mousePosition?.current?.x || 0) * 0.04));

    // Target rotation angles
    const targetRotX = 0.04 + Math.sin(time * 0.4) * 0.01 + mouseRotX;
    const targetRotY = -0.15 + Math.cos(time * 0.5) * 0.012 + mouseRotY;
    const targetRotZ = Math.sin(time * 0.6) * 0.006;

    // Buttery smooth lerp interpolation with 0.025 damping
    phoneGroupRef.current.position.x += (3.1 + breathX - phoneGroupRef.current.position.x) * 0.025;
    phoneGroupRef.current.position.y += (0.0 + breathY - phoneGroupRef.current.position.y) * 0.025;
    phoneGroupRef.current.position.z += (0.0 + breathZ - phoneGroupRef.current.position.z) * 0.025;

    phoneGroupRef.current.rotation.x += (targetRotX - phoneGroupRef.current.rotation.x) * 0.025;
    phoneGroupRef.current.rotation.y += (targetRotY - phoneGroupRef.current.rotation.y) * 0.025;
    phoneGroupRef.current.rotation.z += (targetRotZ - phoneGroupRef.current.rotation.z) * 0.025;

    // 2. Pulse Glass Wave Reaction
    if (glassWaveRef.current) {
      if (rippleActive) {
        waveProgressRef.current = 1.0;
      }
      if (waveProgressRef.current > 0.01) {
        waveProgressRef.current *= 0.82;
        glassWaveRef.current.material.opacity = waveProgressRef.current * 0.45;
        glassWaveRef.current.scale.setScalar(1.0 + (1.0 - waveProgressRef.current) * 0.6);
      } else {
        glassWaveRef.current.material.opacity = 0;
      }
    }
  });

  return (
    <group ref={phoneGroupRef} position={[3.1, 0, 0]} rotation={[0.04, -0.15, 0]}>
      {/* Cyan Rim Light */}
      <directionalLight position={[-3.5, 2.5, -1.0]} color="#51E3DA" intensity={3.2} />

      {/* Purple Rim Light */}
      <directionalLight position={[3.5, -2.5, -1.0]} color="#C084FC" intensity={2.8} />

      {/* Top Frame Highlight */}
      <pointLight position={[0.0, 3.2, 1.8]} color="#FFFFFF" intensity={1.6} distance={8} />

      {/* Pulse Wave Ring */}
      <mesh ref={glassWaveRef} position={[0, 0, 0.114]}>
        <ringGeometry args={[0.3, 0.9, 32]} />
        <meshBasicMaterial color="#51E3DA" transparent opacity={0} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* HTML Phone Mockup Component calibrated to distanceFactor=3.65 for exact 1-to-1 visual parity with PhoneMockup */}
      <Html
        transform
        position={[0, 0, 0.12]}
        distanceFactor={3.65}
        className="select-none pointer-events-auto"
      >
        <div className="relative mx-auto w-[290px] sm:w-[320px] h-[580px] sm:h-[620px] select-none group transition-transform duration-300 hover:scale-[1.015]">
          {/* Outer Volumetric Aurora Rim Light Halo */}
          <div className="absolute -inset-5 bg-gradient-to-tr from-purple-600/30 via-cyan-400/25 to-teal-300/20 rounded-[56px] blur-2xl opacity-85 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          {/* Phone Case Frame (#161B2E case matching lower section PhoneMockup with zero ground shadow) */}
          <div className="relative w-full h-full bg-[#161B2E] p-2.5 rounded-[46px] border border-slate-700/80 flex flex-col justify-between overflow-hidden">
            {/* Left Side Volume Buttons */}
            <div className="absolute -left-[5px] top-24 w-[4px] h-10 bg-slate-700 rounded-l-md"></div>
            <div className="absolute -left-[5px] top-36 w-[4px] h-10 bg-slate-700 rounded-l-md"></div>

            {/* Right Side Power Button */}
            <div className="absolute -right-[5px] top-28 w-[4px] h-14 bg-slate-700 rounded-r-md"></div>

            {/* Dynamic Glass Specular Edge Reflection Highlights */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent pointer-events-none z-40 rounded-[46px]"></div>
            <div className="absolute inset-[1px] border border-white/10 rounded-[45px] pointer-events-none z-40"></div>

            {/* Inner Screen Container */}
            <div className="relative w-full h-full bg-[#080B18] rounded-[38px] overflow-hidden border border-slate-800 flex flex-col justify-between">
              {/* Status Bar */}
              <div className="bg-black/90 text-white px-5 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-mono tracking-tighter shrink-0 z-30">
                <span className="font-medium text-slate-200">02:14</span>

                {/* Top Punch Hole Camera & Speaker */}
                <div className="flex items-center gap-1.5">
                  <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-black border border-slate-800 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-indigo-900 rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <Signal className="w-3 h-3" aria-hidden="true" />
                  <Wifi className="w-3 h-3" aria-hidden="true" />
                  <span className="text-[9px] font-semibold text-teal-400">76%</span>
                  <Battery className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </div>

              {/* Main Phone Content Screen */}
              <div className="flex-1 overflow-hidden relative">
                <TodayCalorieScreen />
              </div>

              {/* Android Navigation Bar */}
              <div className="bg-black/95 py-1.5 px-8 flex items-center justify-between text-slate-500 shrink-0 z-30 border-t border-slate-900">
                <button type="button" aria-label="Navigate Back" className="hover:text-white transition-colors">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                </button>
                <button type="button" aria-label="Navigate Home" className="hover:text-white transition-colors">
                  <div className="w-3 h-3 rounded-full border-2 border-current"></div>
                </button>
                <button type="button" aria-label="Recent Applications" className="hover:text-white transition-colors">
                  <div className="w-3 h-3 border-2 border-current rounded-sm"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}
