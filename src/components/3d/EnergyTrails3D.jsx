import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Commit 5: Intelligent Energy Connection System
 * Smooth CatmullRomCurve3 paths connecting each floating widget to the phone with traveling pulses & mouse control point inertia.
 */
export default function EnergyTrails3D({ mousePosition, onPhoneRipple }) {
  const pulse1Ref = useRef();
  const pulse2Ref = useRef();
  const pulse3Ref = useRef();
  const pulse4Ref = useRef();

  const tube1Ref = useRef();
  const tube2Ref = useRef();
  const tube3Ref = useRef();
  const tube4Ref = useRef();

  // Target phone screen contact point inside 3D world space
  const phoneContact = useMemo(() => new THREE.Vector3(2.0, 0.0, 0.12), []);

  // Pre-allocated Vector3 objects to prevent GC thrashing
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  // 4 Unique Non-Symmetrical CatmullRomCurve3 Paths
  const rawCurves = useMemo(() => {
    // 1. Meal Widget Trail (Top Left to Phone)
    const c1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.7, 1.8, 1.6),
      new THREE.Vector3(-0.4, 1.3, 1.0),
      new THREE.Vector3(0.8, 0.6, 0.5),
      phoneContact,
    ]);

    // 2. Sleep Widget Trail (Center Left to Phone)
    const c2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.4, 0.6, 0.9),
      new THREE.Vector3(-0.2, 0.4, 0.7),
      new THREE.Vector3(0.9, 0.2, 0.4),
      phoneContact,
    ]);

    // 3. Recovery Widget Trail (Lower Left to Phone)
    const c3 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.5, -0.6, 0.2),
      new THREE.Vector3(-0.3, -0.3, 0.2),
      new THREE.Vector3(0.8, -0.1, 0.1),
      phoneContact,
    ]);

    // 4. Workout Widget Trail (Foreground Lower Left to Phone)
    const c4 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.3, -1.8, 2.2),
      new THREE.Vector3(-0.1, -1.0, 1.4),
      new THREE.Vector3(1.0, -0.4, 0.7),
      phoneContact,
    ]);

    return [c1, c2, c3, c4];
  }, [phoneContact]);

  // Subtle Trail Material (Opacity 0.12, Cyan/Purple Additive Blending)
  const trailMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#51E3DA',
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  const trailMaterialPurple = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#C084FC',
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Mouse subtle influence on curve control points (subtle physical inertia)
    const mouseX = (mousePosition?.current?.x || 0) * 0.12;
    const mouseY = (mousePosition?.current?.y || 0) * 0.08;

    // Pulse progress parameters (different speeds, random phase offsets)
    const p1 = (time * 0.32 + 0.1) % 1;
    const p2 = (time * 0.42 + 0.35) % 1;
    const p3 = (time * 0.38 + 0.65) % 1;
    const p4 = (time * 0.48 + 0.85) % 1;

    // Update Pulse 1 (Meal)
    if (pulse1Ref.current) {
      rawCurves[0].getPointAt(p1, tempVec);
      tempVec.x += mouseX * 0.5;
      tempVec.y += mouseY * 0.5;
      pulse1Ref.current.position.copy(tempVec);
      const scale1 = 1.0 + Math.sin(time * 5.0) * 0.25;
      pulse1Ref.current.scale.set(scale1, scale1, scale1);

      if (p1 > 0.94 && onPhoneRipple) onPhoneRipple(0);
    }

    // Update Pulse 2 (Sleep)
    if (pulse2Ref.current) {
      rawCurves[1].getPointAt(p2, tempVec);
      tempVec.x += mouseX * 0.4;
      tempVec.y += mouseY * 0.4;
      pulse2Ref.current.position.copy(tempVec);
      const scale2 = 1.0 + Math.sin(time * 4.5 + 1.0) * 0.25;
      pulse2Ref.current.scale.set(scale2, scale2, scale2);

      if (p2 > 0.94 && onPhoneRipple) onPhoneRipple(1);
    }

    // Update Pulse 3 (Recovery)
    if (pulse3Ref.current) {
      rawCurves[2].getPointAt(p3, tempVec);
      tempVec.x += mouseX * 0.3;
      tempVec.y += mouseY * 0.3;
      pulse3Ref.current.position.copy(tempVec);
      const scale3 = 1.0 + Math.sin(time * 5.2 + 2.0) * 0.25;
      pulse3Ref.current.scale.set(scale3, scale3, scale3);

      if (p3 > 0.94 && onPhoneRipple) onPhoneRipple(2);
    }

    // Update Pulse 4 (Workout)
    if (pulse4Ref.current) {
      rawCurves[3].getPointAt(p4, tempVec);
      tempVec.x += mouseX * 0.6;
      tempVec.y += mouseY * 0.6;
      pulse4Ref.current.position.copy(tempVec);
      const scale4 = 1.0 + Math.sin(time * 4.8 + 3.0) * 0.25;
      pulse4Ref.current.scale.set(scale4, scale4, scale4);

      if (p4 > 0.94 && onPhoneRipple) onPhoneRipple(3);
    }
  });

  return (
    <group>
      {/* Subtle Curved Energy Trail Meshes */}
      {rawCurves.map((curve, idx) => (
        <mesh key={idx} material={idx % 2 === 0 ? trailMaterial : trailMaterialPurple}>
          <tubeGeometry args={[curve, 44, 0.014, 6, false]} />
        </mesh>
      ))}

      {/* Traveling Energy Light Pulses */}
      <mesh ref={pulse1Ref}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#51E3DA" transparent opacity={0.9} />
      </mesh>

      <mesh ref={pulse2Ref}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#C084FC" transparent opacity={0.9} />
      </mesh>

      <mesh ref={pulse3Ref}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#2DD4BF" transparent opacity={0.9} />
      </mesh>

      <mesh ref={pulse4Ref}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}
