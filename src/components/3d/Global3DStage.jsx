import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Wifi, Signal, Battery } from 'lucide-react';

import TodayCalorieScreen from '../PhoneScreens/TodayCalorieScreen';
import LunchLogScreen from '../PhoneScreens/LunchLogScreen';
import ConnectedHealthScreen from '../PhoneScreens/ConnectedHealthScreen';
import ChatScreen from '../PhoneScreens/ChatScreen';
import WorkoutDetailScreen from '../PhoneScreens/WorkoutDetailScreen';
import InsightsScreen from '../PhoneScreens/InsightsScreen';
import ResetStudioScreen from '../PhoneScreens/ResetStudioScreen';

/**
 * 3D Smartphone Model rendered in React Three Fiber with metallic glass chassis,
 * specular rim lights, and dynamic scroll-driven 3D rotation & floating motion.
 */
function Phone3DModel({ scrollProgress, mousePos }) {
  const groupRef = useRef();
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  // Screen mapping based on scroll progress zones
  const screens = [
    { component: <TodayCalorieScreen />, time: '02:14', battery: '76%' },     // Section 1 & 2
    { component: <LunchLogScreen />, time: '11:42', battery: '100%' },       // Section 3
    { component: <ConnectedHealthScreen />, time: '02:22', battery: '77%' }, // Section 4
    { component: <ChatScreen />, time: '03:18', battery: '77%' },            // Section 5
    { component: <WorkoutDetailScreen />, time: '03:07', battery: '77%' },   // Section 6
    { component: <InsightsScreen />, time: '02:22', battery: '77%' },        // Section 7
    { component: <ResetStudioScreen activeTab="Unwind" />, time: '16:00', battery: '92%' }, // Section 8
    { component: <InsightsScreen />, time: '02:22', battery: '77%' },        // Section 9
    { component: <LunchLogScreen />, time: '11:42', battery: '100%' },       // Section 10
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const scroll = scrollProgress.current;

    // Calculate active screen index based on scroll position
    const screenIdx = Math.min(screens.length - 1, Math.floor(scroll * screens.length));
    if (screenIdx !== activeScreenIndex) {
      setActiveScreenIndex(screenIdx);
    }

    // Scroll-driven 3D rotation angles (Oryzo.ai style centerpiece rotation)
    const targetRotX = Math.sin(scroll * Math.PI * 4) * 0.12 + (mousePos.current.y * -0.05);
    const targetRotY = -0.2 + Math.sin(scroll * Math.PI * 3) * 0.35 + (mousePos.current.x * 0.08);
    const targetRotZ = Math.cos(scroll * Math.PI * 2) * 0.04;

    // Floating Z-depth oscillation
    const breathY = Math.sin(time * 1.2) * 0.08;
    const breathX = Math.cos(time * 0.9) * 0.04;
    const breathZ = Math.sin(time * 0.8) * 0.06;

    // Target positions
    const targetX = (window.innerWidth < 1024 ? 0 : 2.8) + breathX;
    const targetY = (window.innerWidth < 1024 ? -0.5 : 0) + breathY;
    const targetZ = (window.innerWidth < 1024 ? -1.5 : 0) + breathZ;

    // Buttery smooth lerp interpolation
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05;

    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.z += (targetRotZ - groupRef.current.rotation.z) * 0.05;
  });

  const activeScreen = screens[activeScreenIndex] || screens[0];

  return (
    <group ref={groupRef} position={[2.8, 0, 0]}>
      {/* 3D Lighting Setup */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 8, 10]} color="#FFFFFF" intensity={2.2} />
      <directionalLight position={[-6, -4, -5]} color="#C084FC" intensity={2.8} />
      <pointLight position={[0, 4, 3]} color="#51E3DA" intensity={2.0} distance={10} />

      {/* 3D Metallic Phone Outer Chassis Mesh */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.5, 5.0, 0.22]} />
        <meshPhysicalMaterial
          color="#161B2E"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* 3D Glass Screen Bevel Border */}
      <mesh position={[0, 0, 0.115]}>
        <planeGeometry args={[2.42, 4.92]} />
        <meshPhysicalMaterial
          color="#080B18"
          roughness={0.1}
          metalness={0.2}
          transmission={0.1}
          transparent
          opacity={0.98}
        />
      </mesh>

      {/* HTML Screen Content overlay calibrated at distanceFactor=3.65 */}
      <Html
        transform
        position={[0, 0, 0.12]}
        distanceFactor={3.65}
        className="select-none pointer-events-auto"
      >
        <div className="relative mx-auto w-[290px] sm:w-[320px] h-[580px] sm:h-[620px] select-none group transition-transform duration-300 hover:scale-[1.015]">
          {/* Volumetric Rim Light Halo */}
          <div className="absolute -inset-5 bg-gradient-to-tr from-purple-600/35 via-cyan-400/30 to-teal-300/25 rounded-[56px] blur-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          {/* Phone Frame */}
          <div className="relative w-full h-full bg-[#161B2E] p-2.5 rounded-[46px] border border-slate-700/80 flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Volume Buttons */}
            <div className="absolute -left-[5px] top-24 w-[4px] h-10 bg-slate-700 rounded-l-md"></div>
            <div className="absolute -left-[5px] top-36 w-[4px] h-10 bg-slate-700 rounded-l-md"></div>

            {/* Power Button */}
            <div className="absolute -right-[5px] top-28 w-[4px] h-14 bg-slate-700 rounded-r-md"></div>

            {/* Specular Edge Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-40 rounded-[46px]"></div>

            {/* Inner Screen */}
            <div className="relative w-full h-full bg-[#080B18] rounded-[38px] overflow-hidden border border-slate-800 flex flex-col justify-between">
              {/* Status Bar */}
              <div className="bg-black/90 text-white px-5 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-mono tracking-tighter shrink-0 z-30">
                <span className="font-medium text-slate-200">{activeScreen.time}</span>

                <div className="flex items-center gap-1.5">
                  <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-black border border-slate-800 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-indigo-900 rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <Signal className="w-3 h-3" aria-hidden="true" />
                  <Wifi className="w-3 h-3" aria-hidden="true" />
                  <span className="text-[9px] font-semibold text-teal-400">{activeScreen.battery}</span>
                  <Battery className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </div>

              {/* Main Screen Content */}
              <div className="flex-1 overflow-hidden relative">
                {activeScreen.component}
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

export default function Global3DStage() {
  const scrollProgress = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-20">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Phone3DModel scrollProgress={scrollProgress} mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
