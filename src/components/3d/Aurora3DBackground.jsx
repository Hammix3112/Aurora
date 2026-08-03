import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Helper function creating a perfectly smooth borderless radial light gradient texture
 * Guarantees zero visible geometry edges!
 */
function createRadialTexture(colorHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  gradient.addColorStop(0, colorHex);
  gradient.addColorStop(0.3, colorHex.replace('1.0)', '0.5)'));
  gradient.addColorStop(0.7, colorHex.replace('1.0)', '0.12)'));
  gradient.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function Aurora3DBackground() {
  const dustRef = useRef();
  const starsRef = useRef();
  const cyanGlow1Ref = useRef();
  const cyanGlow2Ref = useRef();

  // Create smooth borderless radial textures
  const cyanTexture = useMemo(() => createRadialTexture('rgba(56, 189, 248, 1.0)'), []);
  const tealTexture = useMemo(() => createRadialTexture('rgba(81, 227, 218, 1.0)'), []);
  const purpleTexture = useMemo(() => createRadialTexture('rgba(192, 132, 252, 1.0)'), []);
  const violetTexture = useMemo(() => createRadialTexture('rgba(129, 140, 248, 1.0)'), []);

  // 1. Clustered Star Distribution (Clustered randomness with empty regions)
  const starPositions = useMemo(() => {
    const totalStars = 160;
    const pos = new Float32Array(totalStars * 3);

    // 4 Cluster Centers in 3D Space
    const clusters = [
      { x: 4.0, y: 2.5, z: -22, radius: 4.5 },
      { x: -3.5, y: 1.8, z: -26, radius: 5.0 },
      { x: 3.2, y: -2.0, z: -20, radius: 4.0 },
      { x: -2.0, y: -3.0, z: -25, radius: 3.5 },
    ];

    for (let i = 0; i < totalStars; i++) {
      const cluster = clusters[i % clusters.length];
      const r = Math.random() * cluster.radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = cluster.x + r * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = cluster.y + r * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 2] = cluster.z + (Math.random() - 0.5) * 6;
    }

    return pos;
  }, []);

  // 2. Very Subtle Floating Micro Dust Particles (Tiny, soft, barely visible)
  const dustPositions = useMemo(() => {
    const count = 280;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 1;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Micro dust slow drift
    if (dustRef.current) {
      dustRef.current.rotation.y = time * 0.003;
      dustRef.current.rotation.x = Math.sin(time * 0.002) * 0.01;
    }

    // Clustered star slow drift
    if (starsRef.current) {
      starsRef.current.rotation.z = time * 0.0008;
    }

    // Soft volumetric light breathing behind phone
    if (cyanGlow1Ref.current) {
      cyanGlow1Ref.current.material.opacity = 0.22 + Math.sin(time * 0.4) * 0.04;
    }
    if (cyanGlow2Ref.current) {
      cyanGlow2Ref.current.material.opacity = 0.15 + Math.cos(time * 0.3) * 0.03;
    }
  });

  return (
    <group>
      {/* Three.js Soft Atmospheric Haze */}
      <fog attach="fog" args={['#04060E', 7, 26]} />

      {/* OVERLAPPING VOLUMETRIC RADIAL LIGHT LAYERS (NO geometric edges, ZERO border outlines) */}

      {/* Behind Phone - Layer 1 (Near Z: -2.5) */}
      <mesh ref={cyanGlow1Ref} position={[3.2, 0.0, -2.5]}>
        <planeGeometry args={[9.5, 9.5]} />
        <meshBasicMaterial
          map={cyanTexture}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Behind Phone - Layer 2 (Mid Z: -4.5) */}
      <mesh ref={cyanGlow2Ref} position={[3.2, -0.2, -4.5]}>
        <planeGeometry args={[14.0, 14.0]} />
        <meshBasicMaterial
          map={tealTexture}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Behind Phone - Layer 3 (Deep Z: -7.5) */}
      <mesh position={[2.8, -0.5, -7.5]}>
        <planeGeometry args={[18.0, 18.0]} />
        <meshBasicMaterial
          map={violetTexture}
          transparent
          opacity={0.10}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Upper Right - Layer 1 (Near Z: -3.5) */}
      <mesh position={[4.5, 2.5, -3.5]}>
        <planeGeometry args={[8.5, 8.5]} />
        <meshBasicMaterial
          map={purpleTexture}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Upper Right - Layer 2 (Deep Z: -6.5) */}
      <mesh position={[4.5, 2.5, -6.5]}>
        <planeGeometry args={[13.0, 13.0]} />
        <meshBasicMaterial
          map={violetTexture}
          transparent
          opacity={0.09}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Clustered Star Distribution */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#FFFFFF" transparent opacity={0.55} />
      </points>

      {/* 4. Very Subtle Floating Micro Dust Particles */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dustPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#38BDF8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
