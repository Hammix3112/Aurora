import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Center } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Pure 3D iPhone 15 Pro Showcase
 * - Front screen facing forward with Dynamic Island at top
 * - User's exact health app image (mobile-screen.png) right-side up on the front OLED display
 * - Triple camera module on the rear
 * - 360-degree interactive mouse/touch drag-to-rotate controls
 */
function ModelPhone({ mousePosition }) {
  const phoneGroupRef = useRef();
  const rotationGroupRef = useRef();

  // Drag-to-rotate state (Front screen facing straight forward)
  const isDragging = useRef(false);
  const previousPointerPosition = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0.02, y: 0.0 });
  const dragVelocity = useRef({ x: 0, y: 0 });

  // Load 3D GLTF Model & High-Resolution Mobile Screen Texture
  const { scene } = useGLTF('/models/phone.glb');
  const screenTexture = useTexture('/mobile-screen.png');

  // Configure texture properties for razor-sharp OLED display
  useEffect(() => {
    if (screenTexture) {
      screenTexture.colorSpace = THREE.SRGBColorSpace;
      screenTexture.generateMipmaps = true;
      screenTexture.minFilter = THREE.LinearMipmapLinearFilter;
      screenTexture.magFilter = THREE.LinearFilter;
      screenTexture.flipY = false;
      screenTexture.needsUpdate = true;
    }
  }, [screenTexture]);

  // Clone scene and calculate native dimensions & scale factor
  const { clonedScene, normalizedScale, isLyingFlat } = useMemo(() => {
    if (!scene) return { clonedScene: null, normalizedScale: 1, isLyingFlat: false };

    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);

    const lyingFlat = size.z > size.y;
    const maxDim = Math.max(size.x, size.y, size.z);

    // Target height in Three.js units: ~5.8 units
    const targetHeight = 5.8;
    const scaleFactor = maxDim > 0 ? targetHeight / maxDim : 1;

    // Apply titanium & glass materials to GLTF meshes
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material = child.material.clone();
          child.material.side = THREE.DoubleSide;

          const matName = child.material.name || '';
          // Hide stock wallpaper from Sketchfab
          if (matName === 'hiVunnLeAHkwGEo' || matName === 'jpGaQNgTtEGkTfo') {
            child.material.opacity = 0;
            child.material.transparent = true;
            child.material.depthWrite = false;
          } else if (child.material.metalness !== undefined) {
            child.material.metalness = Math.min(0.95, (child.material.metalness || 0.85) + 0.1);
            child.material.roughness = Math.max(0.18, (child.material.roughness || 0.3) * 0.8);
          }
        }
      }
    });

    return {
      clonedScene: clone,
      normalizedScale: scaleFactor,
      isLyingFlat: lyingFlat,
    };
  }, [scene]);

  // Pointer drag listeners for 360-degree rotation
  useEffect(() => {
    const handlePointerDown = (e) => {
      if (e.clientX > window.innerWidth * 0.4) {
        isDragging.current = true;
        previousPointerPosition.current = { x: e.clientX, y: e.clientY };
        dragVelocity.current = { x: 0, y: 0 };
      }
    };

    const handlePointerMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousPointerPosition.current.x;
      const deltaY = e.clientY - previousPointerPosition.current.y;

      const rotSpeed = 0.007;
      dragRotation.current.y += deltaX * rotSpeed;
      dragRotation.current.x += deltaY * rotSpeed;

      // Clamp vertical tilt
      dragRotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, dragRotation.current.x));

      dragVelocity.current = {
        x: deltaY * rotSpeed,
        y: deltaX * rotSpeed,
      };

      previousPointerPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  useFrame((state) => {
    if (!phoneGroupRef.current || !rotationGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Inertia & Damping when dragging ends
    if (!isDragging.current) {
      dragRotation.current.y += dragVelocity.current.y;
      dragRotation.current.x += dragVelocity.current.x;

      dragVelocity.current.x *= 0.92;
      dragVelocity.current.y *= 0.92;

      // Gentle idle floating when released
      if (Math.abs(dragVelocity.current.y) < 0.001 && Math.abs(dragVelocity.current.x) < 0.001) {
        const mouseParallaxX = (mousePosition?.current?.y || 0) * -0.10;
        const mouseParallaxY = (mousePosition?.current?.x || 0) * 0.14;

        const targetX = dragRotation.current.x + mouseParallaxX + Math.sin(time * 0.5) * 0.012;
        const targetY = dragRotation.current.y + mouseParallaxY + Math.cos(time * 0.4) * 0.015;

        rotationGroupRef.current.rotation.x += (targetX - rotationGroupRef.current.rotation.x) * 0.045;
        rotationGroupRef.current.rotation.y += (targetY - rotationGroupRef.current.rotation.y) * 0.045;
      } else {
        rotationGroupRef.current.rotation.x = dragRotation.current.x;
        rotationGroupRef.current.rotation.y = dragRotation.current.y;
      }
    } else {
      rotationGroupRef.current.rotation.x = dragRotation.current.x;
      rotationGroupRef.current.rotation.y = dragRotation.current.y;
    }

    // Organic floating breathing
    const breathY = Math.sin(time * 0.7) * 0.04;
    const breathX = Math.cos(time * 0.5) * 0.02;
    phoneGroupRef.current.position.x += (2.8 + breathX - phoneGroupRef.current.position.x) * 0.045;
    phoneGroupRef.current.position.y += (0.0 + breathY - phoneGroupRef.current.position.y) * 0.045;
  });

  if (!clonedScene) return null;

  // Screen plane size in Three.js scaled units
  const planeWidth = 2.52;
  const planeHeight = 5.42;

  return (
    <group ref={phoneGroupRef} position={[2.8, 0, 0]}>
      {/* Outer Subtle Ambient Glow */}
      <pointLight position={[0, 0, -1]} color="#C084FC" intensity={3.0} distance={6} />

      {/* Moveable 360-Degree Interactive Rotation Group */}
      <group ref={rotationGroupRef} rotation={[0.02, 0.0, 0]}>
        {/* Real 3D iPhone 15 Pro Chassis with Front Display Facing Forward */}
        <Center>
          <group
            scale={[normalizedScale, normalizedScale, normalizedScale]}
            rotation={isLyingFlat ? [-Math.PI / 2, 0, 0] : [0, 0, 0]}
          >
            {/* GLTF 3D Phone Model */}
            <primitive object={clonedScene} />

            {/* Right-Side-Up OLED Display Texture Mesh Placed Exactly on Front Display (Z: -0.15) */}
            {screenTexture && (
              <mesh position={[0, 0, -0.15 / normalizedScale]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[planeWidth / normalizedScale, planeHeight / normalizedScale]} />
                <meshBasicMaterial
                  map={screenTexture}
                  side={THREE.FrontSide}
                  toneMapped={false}
                />
              </mesh>
            )}
          </group>
        </Center>
      </group>
    </group>
  );
}

// Preload assets
useGLTF.preload('/models/phone.glb');
useTexture.preload('/mobile-screen.png');

export default function Phone3D(props) {
  return (
    <Suspense fallback={null}>
      <ModelPhone {...props} />
    </Suspense>
  );
}
