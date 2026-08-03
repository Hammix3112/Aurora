import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

/**
 * Commit 4: 3D Holographic Glass Information Widgets
 * Suspended in air at distinct Z-depths with independent breathing, rotation, drift physics, and subtle local atmosphere illumination.
 * (No connection lines, no particles, no post-processing).
 */
export default function Widgets3D() {
  const mealRef = useRef();
  const sleepRef = useRef();
  const recoveryRef = useRef();
  const workoutRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Meal Logged Widget (Near Top, Foreground Z: 1.6) - Independent slow breathing & rotation
    if (mealRef.current) {
      mealRef.current.position.y = 1.8 + Math.sin(time * 1.1) * 0.14;
      mealRef.current.position.x = -0.9 + Math.cos(time * 0.8) * 0.06;
      mealRef.current.rotation.z = Math.sin(time * 0.7) * 0.03;
    }

    // 2. Sleep Window Widget (Center, Mid Depth Z: 0.9) - Independent horizontal drift & rotation
    if (sleepRef.current) {
      sleepRef.current.position.x = -0.6 + Math.cos(time * 0.9) * 0.12;
      sleepRef.current.position.y = 0.6 + Math.sin(time * 1.2) * 0.10;
      sleepRef.current.rotation.z = Math.cos(time * 0.8) * 0.025;
    }

    // 3. Recovery Widget (Below, Background Z: 0.2) - Independent tiny circular 3D orbit
    if (recoveryRef.current) {
      recoveryRef.current.position.x = -0.7 + Math.sin(time * 0.7) * 0.09;
      recoveryRef.current.position.y = -0.6 + Math.cos(time * 0.7) * 0.09;
      recoveryRef.current.rotation.z = Math.sin(time * 0.5) * 0.02;
    }

    // 4. Workout Widget (Lower Left, Closer to Camera Z: 2.2) - Independent Z-depth movement
    if (workoutRef.current) {
      workoutRef.current.position.y = -1.8 + Math.sin(time * 1.0) * 0.12;
      workoutRef.current.position.z = 2.2 + Math.sin(time * 1.3) * 0.16;
      workoutRef.current.rotation.z = Math.sin(time * 0.9) * 0.035;
    }
  });

  return (
    <group position={[-0.8, 0, 0]}>
      {/* 3D Widget 1: MEAL LOGGED - Near Top, Foreground (Z: 1.6) */}
      <group ref={mealRef} position={[-0.9, 1.8, 1.6]}>
        <pointLight color="#C084FC" intensity={0.9} distance={4} />
        <Html transform distanceFactor={3.6} className="select-none pointer-events-auto">
          <div class="flex items-center gap-3 bg-slate-900/80 border border-white/20 p-2.5 rounded-2xl shadow-2xl backdrop-blur-xl group hover:border-purple-400/50 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-purple-400/40 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80"
                alt="Meal"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-300 font-grotesk block">
                MEAL LOGGED
              </span>
              <span class="text-sm font-bold text-white font-mono">12:41</span>
            </div>
          </div>
        </Html>
      </group>

      {/* 3D Widget 2: SLEEP WINDOW - Center, Mid Depth (Z: 0.9) */}
      <group ref={sleepRef} position={[-0.6, 0.6, 0.9]}>
        <pointLight color="#818CF8" intensity={0.8} distance={4} />
        <Html transform distanceFactor={3.6} className="select-none pointer-events-auto">
          <div class="flex items-center gap-3 bg-slate-900/80 border border-white/20 p-2.5 rounded-2xl shadow-2xl backdrop-blur-xl group hover:border-indigo-400/50 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-slate-950/80 border border-indigo-500/30 p-2 flex items-end justify-center gap-0.5">
              <div class="w-1 h-3 bg-purple-500 rounded-sm"></div>
              <div class="w-1 h-6 bg-purple-400 rounded-sm"></div>
              <div class="w-1 h-4 bg-indigo-400 rounded-sm"></div>
              <div class="w-1 h-7 bg-purple-300 rounded-sm"></div>
            </div>
            <div>
              <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-300 font-grotesk block">
                SLEEP WINDOW
              </span>
              <span class="text-sm font-bold text-white font-mono">7h 33m</span>
            </div>
          </div>
        </Html>
      </group>

      {/* 3D Widget 3: RECOVERY - Below, Background (Z: 0.2) */}
      <group ref={recoveryRef} position={[-0.7, -0.6, 0.2]}>
        <pointLight color="#2DD4BF" intensity={0.8} distance={4} />
        <Html transform distanceFactor={3.6} className="select-none pointer-events-auto">
          <div class="flex items-center gap-3 bg-slate-900/80 border border-white/20 p-2.5 rounded-2xl shadow-2xl backdrop-blur-xl group hover:border-teal-400/50 transition-all duration-300">
            <div class="relative w-10 h-10 flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90">
                <circle cx="20" cy="20" r="16" stroke="currentColor" stroke-width="3" class="text-slate-800" fill="transparent" />
                <circle cx="20" cy="20" r="16" stroke="#2DD4BF" stroke-width="3" stroke-dasharray="100" stroke-dashoffset="10" stroke-linecap="round" fill="transparent" />
              </svg>
              <span class="absolute text-[9px] font-bold text-white">90%</span>
            </div>
            <div>
              <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-300 font-grotesk block">
                RECOVERY
              </span>
              <span class="text-xs text-teal-300 font-medium">On track</span>
            </div>
          </div>
        </Html>
      </group>

      {/* 3D Widget 4: WORKOUT - Lower Left, Closer to Camera (Z: 2.2) */}
      <group ref={workoutRef} position={[-0.5, -1.8, 2.2]}>
        <pointLight color="#38BDF8" intensity={0.9} distance={4} />
        <Html transform distanceFactor={3.6} className="select-none pointer-events-auto">
          <div class="bg-slate-900/80 border border-white/20 p-3 rounded-2xl shadow-2xl backdrop-blur-xl space-y-1 w-44 group hover:border-cyan-400/50 transition-all duration-300">
            <div>
              <span class="text-[9px] uppercase tracking-widest font-semibold text-slate-300 font-grotesk block">
                WORKOUT
              </span>
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-white font-mono">18:02</span>
                <span class="text-xs text-purple-300 font-medium">Strength</span>
              </div>
            </div>
            <div class="w-full h-6 pt-1">
              <svg class="w-full h-full" viewBox="0 0 150 25" fill="none">
                <path d="M0,20 Q20,5 45,15 T90,3 T135,14 T150,8" stroke="#38BDF8" stroke-width="2" fill="none" />
                <circle cx="45" cy="15" r="2.5" fill="#38BDF8" />
                <circle cx="90" cy="3" r="2.5" fill="#C084FC" />
              </svg>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
