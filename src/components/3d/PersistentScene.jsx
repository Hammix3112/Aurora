import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NOISE_GLSL = `
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  float fbm(vec3 p){
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++){
      v += a * snoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }
`;

export default function PersistentScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x030509, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030509, 0.015);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 50);

    let W = window.innerWidth, H = window.innerHeight;

    // Palette Definition
    const PALETTE = [
      new THREE.Color(0x3d8bff), // electric blue
      new THREE.Color(0x33d6e0), // cyan
      new THREE.Color(0x8a5cf6), // violet
      new THREE.Color(0xd4f933), // lime
      new THREE.Color(0xe9f1ff), // soft white
    ];

    // Groups
    const gStars = new THREE.Group();
    const gDust = new THREE.Group();
    const gNebula = new THREE.Group();
    const gGeometry = new THREE.Group();
    const gStreams = new THREE.Group();
    [gStars, gDust, gNebula, gGeometry, gStreams].forEach((g) => scene.add(g));

    // Mouse Tracking
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollYProgress = 0;

    const handleMouseMove = (e) => {
      mouse.tx = (e.clientX / W) * 2 - 1;
      mouse.ty = (e.clientY / H) * 2 - 1;
    };
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollYProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 1. Starfield (2,200 Stars)
    const countStars = 2200;
    const posStars = new Float32Array(countStars * 3);
    const rndStars = new Float32Array(countStars * 2);
    for (let i = 0; i < countStars; i++) {
      const r = 250 + Math.random() * 450;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      posStars[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posStars[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posStars[i * 3 + 2] = r * Math.cos(phi) - 150;
      rndStars[i * 2] = 0.6 + Math.random() * 1.6;
      rndStars[i * 2 + 1] = Math.random() * Math.PI * 2;
    }
    const geoStars = new THREE.BufferGeometry();
    geoStars.setAttribute('position', new THREE.BufferAttribute(posStars, 3));
    geoStars.setAttribute('aRnd', new THREE.BufferAttribute(rndStars, 2));
    const matStars = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute vec2 aRnd;
        varying float vTwinkle;
        uniform float uTime;
        void main(){
          vTwinkle = 0.5 + 0.5 * sin(uTime * 0.8 + aRnd.y * 6.0);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aRnd.x * (200.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying float vTwinkle;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d) * vTwinkle;
          gl_FragColor = vec4(vec3(0.85, 0.92, 1.0), a * 0.85);
        }`,
    });
    gStars.add(new THREE.Points(geoStars, matStars));

    // 2. Ambient Dust (900 Particles)
    const countDust = 900;
    const posDust = new Float32Array(countDust * 3);
    const rndDust = new Float32Array(countDust * 3);
    for (let i = 0; i < countDust; i++) {
      posDust[i * 3] = (Math.random() - 0.5) * 160;
      posDust[i * 3 + 1] = (Math.random() - 0.5) * 120;
      posDust[i * 3 + 2] = (Math.random() - 0.5) * 80;
      rndDust[i * 3] = 0.3 + Math.random() * 0.7;
      rndDust[i * 3 + 1] = Math.random() * Math.PI * 2;
      rndDust[i * 3 + 2] = 0.2 + Math.random() * 0.5;
    }
    const geoDust = new THREE.BufferGeometry();
    geoDust.setAttribute('position', new THREE.BufferAttribute(posDust, 3));
    geoDust.setAttribute('aRnd', new THREE.BufferAttribute(rndDust, 3));
    const matDust = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute vec3 aRnd;
        varying float vA;
        uniform float uTime;
        void main(){
          vec3 p = position;
          p.y += sin(uTime * aRnd.z + aRnd.y) * 3.0;
          p.x += cos(uTime * aRnd.z * 0.7 + aRnd.y) * 2.0;
          vA = 0.4 + 0.4 * sin(uTime * 1.3 + aRnd.y);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aRnd.x * (70.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vec3(0.6, 0.8, 1.0), a * vA * 0.4);
        }`,
    });
    gDust.add(new THREE.Points(geoDust, matDust));

    // 3. GLSL Procedural Nebula
    const nebulaMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: PALETTE[2] },
        uOpac: { value: 0.15 },
        uScroll: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader:
        NOISE_GLSL +
        `
        varying vec2 vUv;
        uniform float uTime, uOpac, uScroll;
        uniform vec3 uColor;
        void main(){
          vec2 p = vUv * 3.0 + vec2(0.0, uScroll * 2.0);
          float n = fbm(vec3(p * 1.4, uTime * 0.03));
          n = smoothstep(0.05, 0.75, n);
          float edge = smoothstep(0.0, 0.35, vUv.x) * smoothstep(1.0, 0.65, vUv.x);
          edge *= smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
          gl_FragColor = vec4(uColor, n * edge * uOpac);
        }`,
    });
    const nebulaGeo = new THREE.PlaneGeometry(160, 100);
    const nebulaMesh = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebulaMesh.position.set(0, 0, -80);
    gNebula.add(nebulaMesh);

    // 4. 3D Floating Glass & Wireframe Geometry Objects (Oryzo.ai Style)
    const objects = [];

    // Object A: Hero Wireframe Octahedron
    const geoOct = new THREE.OctahedronGeometry(6, 0);
    const matOctWire = new THREE.MeshBasicMaterial({ color: 0x8a5cf6, wireframe: true, transparent: true, opacity: 0.4 });
    const matOctSolid = new THREE.MeshPhysicalMaterial({ color: 0x3d8bff, roughness: 0.2, transmission: 0.8, thickness: 1.5, transparent: true, opacity: 0.3 });
    const meshOct = new THREE.Mesh(geoOct, matOctWire);
    const meshOctSolid = new THREE.Mesh(geoOct, matOctSolid);
    meshOct.add(meshOctSolid);
    meshOct.position.set(-18, 12, -10);
    gGeometry.add(meshOct);
    objects.push({ mesh: meshOct, rotX: 0.005, rotY: 0.008, scrollTarget: 0.0, scale: 1 });

    // Object B: Section 4 Connected Health Holographic Cube
    const geoCube = new THREE.BoxGeometry(7, 7, 7);
    const matCubeWire = new THREE.MeshBasicMaterial({ color: 0x33d6e0, wireframe: true, transparent: true, opacity: 0.45 });
    const meshCube = new THREE.Mesh(geoCube, matCubeWire);
    meshCube.position.set(22, -25, -15);
    gGeometry.add(meshCube);
    objects.push({ mesh: meshCube, rotX: 0.007, rotY: 0.006, scrollTarget: 0.35, scale: 1 });

    // Object C: Section 6 Workout Torus Knot
    const geoKnot = new THREE.TorusKnotGeometry(4.5, 1.2, 100, 16);
    const matKnot = new THREE.MeshPhysicalMaterial({ color: 0xc084fc, roughness: 0.1, transmission: 0.85, thickness: 2.0, transparent: true, opacity: 0.5, wireframe: true });
    const meshKnot = new THREE.Mesh(geoKnot, matKnot);
    meshKnot.position.set(-20, -60, -12);
    gGeometry.add(meshKnot);
    objects.push({ mesh: meshKnot, rotX: 0.009, rotY: 0.005, scrollTarget: 0.6, scale: 1 });

    // Object D: Section 8 Reset Studio Breathing Torus Ring
    const geoRing = new THREE.TorusGeometry(8, 1.2, 32, 100);
    const matRing = new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true, transparent: true, opacity: 0.4 });
    const meshRing = new THREE.Mesh(geoRing, matRing);
    meshRing.position.set(0, -90, -10);
    gGeometry.add(meshRing);
    objects.push({ mesh: meshRing, rotX: 0.004, rotY: 0.01, scrollTarget: 0.8, scale: 1 });

    // Object E: Section 10 Final CTA Converging Glass Icosahedron
    const geoIco = new THREE.IcosahedronGeometry(7, 1);
    const matIco = new THREE.MeshBasicMaterial({ color: 0xd4f933, wireframe: true, transparent: true, opacity: 0.45 });
    const meshIco = new THREE.Mesh(geoIco, matIco);
    meshIco.position.set(18, -125, -8);
    gGeometry.add(meshIco);
    objects.push({ mesh: meshIco, rotX: 0.006, rotY: 0.007, scrollTarget: 0.95, scale: 1 });

    // 5. Post-Processing Setup
    const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const quadScene = new THREE.Scene();
    let quadMesh = null;

    const brightMat = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: null }, uThreshold: { value: 0.35 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy,0.0,1.0); }`,
      fragmentShader: `
        varying vec2 vUv; uniform sampler2D tDiffuse; uniform float uThreshold;
        void main(){
          vec3 c = texture2D(tDiffuse, vUv).rgb;
          float l = dot(c, vec3(0.299,0.587,0.114));
          float w = smoothstep(uThreshold, uThreshold + 0.25, l);
          gl_FragColor = vec4(c * w, 1.0);
        }`,
    });

    const blurMat = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        uDir: { value: new THREE.Vector2(1, 0) },
        uRes: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy,0.0,1.0); }`,
      fragmentShader: `
        varying vec2 vUv; uniform sampler2D tDiffuse; uniform vec2 uDir; uniform vec2 uRes;
        void main(){
          vec2 texel = uDir / uRes;
          vec4 sum = vec4(0.0);
          float weights[5];
          weights[0]=0.227027; weights[1]=0.1945946; weights[2]=0.1216216; weights[3]=0.054054; weights[4]=0.016216;
          sum += texture2D(tDiffuse, vUv) * weights[0];
          for (int i = 1; i < 5; i++){
            float fi = float(i);
            sum += texture2D(tDiffuse, vUv + texel * fi) * weights[i];
            sum += texture2D(tDiffuse, vUv - texel * fi) * weights[i];
          }
          gl_FragColor = sum;
        }`,
    });

    const compositeMat = new THREE.ShaderMaterial({
      uniforms: {
        tScene: { value: null },
        tBloom: { value: null },
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(1, 1) },
        uBloomStrength: { value: 0.85 },
        uVignette: { value: 0.55 },
        uAberration: { value: 0.0014 },
        uGrain: { value: 0.03 },
      },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy,0.0,1.0); }`,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D tScene, tBloom;
        uniform float uTime, uBloomStrength, uVignette, uAberration, uGrain;
        uniform vec2 uRes;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453 + uTime); }
        vec3 aces(vec3 x){
          float a=2.51, b=0.03, c=2.43, d=0.59, e=0.14;
          return clamp((x*(a*x+b))/(x*(c*x+d)+e), 0.0, 1.0);
        }
        void main(){
          vec2 uv = vUv;
          vec2 caOff = (uv - 0.5) * uAberration;
          float r = texture2D(tScene, uv + caOff).r;
          float g = texture2D(tScene, uv).g;
          float b = texture2D(tScene, uv - caOff).b;
          vec3 base = vec3(r,g,b);
          vec3 bloom = texture2D(tBloom, uv).rgb;
          vec3 color = base + bloom * uBloomStrength;

          float d = distance(uv, vec2(0.5));
          float vig = smoothstep(0.85, uVignette, d);
          color *= (1.0 - vig * 0.55);

          color = aces(color * 1.05);
          color = pow(color, vec3(1.0/2.2));

          float grain = (hash(uv * uRes) - 0.5) * uGrain;
          color += grain;

          gl_FragColor = vec4(color, 1.0);
        }`,
    });

    let rtScene, rtBrightA, rtBrightB, rtBrightC;

    function buildTargets() {
      if (rtScene) rtScene.dispose();
      if (rtBrightA) rtBrightA.dispose();
      if (rtBrightB) rtBrightB.dispose();
      if (rtBrightC) rtBrightC.dispose();
      const dpr = renderer.getPixelRatio();
      const fullW = Math.max(2, Math.floor(W * dpr));
      const fullH = Math.max(2, Math.floor(H * dpr));
      const halfW = Math.max(2, Math.floor(fullW / 2));
      const halfH = Math.max(2, Math.floor(fullH / 2));
      const opts = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat };
      rtScene = new THREE.WebGLRenderTarget(fullW, fullH, opts);
      rtBrightA = new THREE.WebGLRenderTarget(halfW, halfH, opts);
      rtBrightB = new THREE.WebGLRenderTarget(halfW, halfH, opts);
      rtBrightC = new THREE.WebGLRenderTarget(halfW, halfH, opts);
      blurMat.uniforms.uRes.value.set(halfW, halfH);
      compositeMat.uniforms.uRes.value.set(fullW, fullH);
    }

    function fullscreenPass(material, target) {
      if (!quadMesh) {
        quadMesh = new THREE.Mesh(quadGeo, material);
        quadScene.add(quadMesh);
      } else {
        quadMesh.material = material;
      }
      renderer.setRenderTarget(target);
      renderer.render(quadScene, quadCam);
    }

    function renderComposited() {
      renderer.setRenderTarget(rtScene);
      renderer.render(scene, camera);

      brightMat.uniforms.tDiffuse.value = rtScene.texture;
      fullscreenPass(brightMat, rtBrightA);

      blurMat.uniforms.tDiffuse.value = rtBrightA.texture;
      blurMat.uniforms.uDir.value.set(1, 0);
      fullscreenPass(blurMat, rtBrightB);

      blurMat.uniforms.tDiffuse.value = rtBrightB.texture;
      blurMat.uniforms.uDir.value.set(0, 1);
      fullscreenPass(blurMat, rtBrightC);

      blurMat.uniforms.tDiffuse.value = rtBrightC.texture;
      blurMat.uniforms.uDir.value.set(1, 0);
      fullscreenPass(blurMat, rtBrightB);

      blurMat.uniforms.tDiffuse.value = rtBrightB.texture;
      blurMat.uniforms.uDir.value.set(0, 1);
      fullscreenPass(blurMat, rtBrightC);

      compositeMat.uniforms.tScene.value = rtScene.texture;
      compositeMat.uniforms.tBloom.value = rtBrightC.texture;
      if (quadMesh) quadMesh.material = compositeMat;
      renderer.setRenderTarget(null);
      renderer.render(quadScene, quadCam);
    }

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      buildTargets();
    };

    window.addEventListener('resize', resize);
    resize();

    const clock = new THREE.Clock();
    let frameId = null;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      matStars.uniforms.uTime.value = t;
      matDust.uniforms.uTime.value = t;
      nebulaMat.uniforms.uTime.value = t;
      nebulaMat.uniforms.uScroll.value = scrollYProgress;
      compositeMat.uniforms.uTime.value = t;

      // Mouse Parallax Lerp
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // 3D Camera Travel Driven by Scroll
      const targetCamY = -scrollYProgress * 135;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.x = mouse.x * 2.5;
      camera.rotation.z = mouse.x * 0.02;

      // Rotate 3D Geometry Objects
      objects.forEach((obj) => {
        obj.mesh.rotation.x += obj.rotX;
        obj.mesh.rotation.y += obj.rotY;
        
        // Gentle pulse breathing
        if (obj.mesh === meshRing) {
          const pulse = 1 + Math.sin(t * 1.5) * 0.08;
          obj.mesh.scale.set(pulse, pulse, pulse);
        }
      });

      gStars.position.y = camera.position.y * 0.9;
      gDust.position.y = camera.position.y * 0.8;
      nebulaMesh.position.y = camera.position.y * 0.95;

      renderComposited();
    };

    animate();

    const handleVisibilityChange = () => {
      if (document.hidden && frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
      } else if (!document.hidden && frameId === null) {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full block z-0 pointer-events-none" />;
}
