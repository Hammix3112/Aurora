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
    renderer.setClearColor(0x050711, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050711, 0.008);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 50);

    let W = window.innerWidth, H = window.innerHeight;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x8a5cf6, 2.5);
    dirLight1.position.set(30, 40, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x33d6e0, 2.0);
    dirLight2.position.set(-30, -40, 30);
    scene.add(dirLight2);

    // Groups
    const gStars = new THREE.Group();
    const gDust = new THREE.Group();
    const gNebula = new THREE.Group();
    const gGeometry = new THREE.Group();
    [gStars, gDust, gNebula, gGeometry].forEach((g) => scene.add(g));

    // Mouse & Scroll State
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

    // 1. Starfield (3,000 Bright Stars)
    const countStars = 3000;
    const posStars = new Float32Array(countStars * 3);
    const rndStars = new Float32Array(countStars * 2);
    for (let i = 0; i < countStars; i++) {
      const r = 200 + Math.random() * 400;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      posStars[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posStars[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posStars[i * 3 + 2] = r * Math.cos(phi) - 100;
      rndStars[i * 2] = 0.8 + Math.random() * 2.2;
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
          vTwinkle = 0.5 + 0.5 * sin(uTime * 1.2 + aRnd.y * 6.0);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aRnd.x * (240.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying float vTwinkle;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d) * vTwinkle;
          gl_FragColor = vec4(vec3(0.9, 0.95, 1.0), a * 0.95);
        }`,
    });
    gStars.add(new THREE.Points(geoStars, matStars));

    // 2. Ambient Floating Dust
    const countDust = 1200;
    const posDust = new Float32Array(countDust * 3);
    const rndDust = new Float32Array(countDust * 3);
    for (let i = 0; i < countDust; i++) {
      posDust[i * 3] = (Math.random() - 0.5) * 180;
      posDust[i * 3 + 1] = (Math.random() - 0.5) * 300;
      posDust[i * 3 + 2] = (Math.random() - 0.5) * 100;
      rndDust[i * 3] = 0.4 + Math.random() * 1.2;
      rndDust[i * 3 + 1] = Math.random() * Math.PI * 2;
      rndDust[i * 3 + 2] = 0.2 + Math.random() * 0.6;
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
          p.y += sin(uTime * aRnd.z + aRnd.y) * 4.0;
          p.x += cos(uTime * aRnd.z * 0.7 + aRnd.y) * 3.0;
          vA = 0.4 + 0.4 * sin(uTime * 1.5 + aRnd.y);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aRnd.x * (90.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vec3(0.65, 0.85, 1.0), a * vA * 0.6);
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
        uColor: { value: new THREE.Color(0x8a5cf6) },
        uOpac: { value: 0.25 },
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
          vec2 p = vUv * 3.0 + vec2(0.0, uScroll * 3.0);
          float n = fbm(vec3(p * 1.5, uTime * 0.04));
          n = smoothstep(0.05, 0.75, n);
          float edge = smoothstep(0.0, 0.35, vUv.x) * smoothstep(1.0, 0.65, vUv.x);
          edge *= smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
          gl_FragColor = vec4(uColor, n * edge * uOpac);
        }`,
    });
    const nebulaGeo = new THREE.PlaneGeometry(200, 400);
    const nebulaMesh = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebulaMesh.position.set(0, -100, -90);
    gNebula.add(nebulaMesh);

    // 4. DRAMATIC MASSIVE 3D OBJECTS (Oryzo.ai Centerpiece Level)
    const objects = [];

    // --- Object 1: Hero Section - Massive Dual Wireframe & Glowing Glass Octahedron ---
    const geoOct = new THREE.OctahedronGeometry(14, 0);
    const matOctWire = new THREE.MeshBasicMaterial({ color: 0xc084fc, wireframe: true, transparent: true, opacity: 0.6 });
    const matOctCore = new THREE.MeshPhysicalMaterial({
      color: 0x3d8bff,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      thickness: 3.0,
      transparent: true,
      opacity: 0.45,
    });
    const meshOctWire = new THREE.Mesh(geoOct, matOctWire);
    const meshOctCore = new THREE.Mesh(new THREE.OctahedronGeometry(9, 0), matOctCore);
    meshOctWire.add(meshOctCore);
    meshOctWire.position.set(-25, 10, -15);
    gGeometry.add(meshOctWire);
    objects.push({ mesh: meshOctWire, rotX: 0.006, rotY: 0.009, rotZ: 0.003 });

    // --- Object 2: Daily Read Section - Massive Translucent Glass Sphere with Inner Rings ---
    const geoSphere = new THREE.IcosahedronGeometry(13, 2);
    const matSphere = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      roughness: 0.15,
      transmission: 0.85,
      thickness: 2.5,
      transparent: true,
      opacity: 0.5,
      wireframe: true,
    });
    const meshSphere = new THREE.Mesh(geoSphere, matSphere);
    meshSphere.position.set(28, -35, -12);
    gGeometry.add(meshSphere);
    objects.push({ mesh: meshSphere, rotX: 0.005, rotY: 0.007, rotZ: 0.004 });

    // --- Object 3: Effortless Logging Section - Massive Dual Glass Torus Ring ---
    const geoTorus1 = new THREE.TorusGeometry(12, 1.8, 24, 80);
    const matTorus1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.55 });
    const meshTorus1 = new THREE.Mesh(geoTorus1, matTorus1);
    meshTorus1.position.set(-26, -80, -10);
    gGeometry.add(meshTorus1);
    objects.push({ mesh: meshTorus1, rotX: 0.008, rotY: 0.005, rotZ: 0.006 });

    // --- Object 4: Connected Health Section - Massive Holographic Cyber Cube ---
    const geoCube = new THREE.BoxGeometry(16, 16, 16);
    const matCube = new THREE.MeshBasicMaterial({ color: 0x2dd4bf, wireframe: true, transparent: true, opacity: 0.6 });
    const meshCube = new THREE.Mesh(geoCube, matCube);
    meshCube.position.set(26, -125, -12);
    gGeometry.add(meshCube);
    objects.push({ mesh: meshCube, rotX: 0.007, rotY: 0.009, rotZ: 0.005 });

    // --- Object 5: Ask Data Section - Glowing Glass Prism Dodecahedron ---
    const geoDodeca = new THREE.DodecahedronGeometry(13, 0);
    const matDodeca = new THREE.MeshPhysicalMaterial({
      color: 0xc084fc,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 2.8,
      transparent: true,
      opacity: 0.5,
      wireframe: true,
    });
    const meshDodeca = new THREE.Mesh(geoDodeca, matDodeca);
    meshDodeca.position.set(-25, -170, -10);
    gGeometry.add(meshDodeca);
    objects.push({ mesh: meshDodeca, rotX: 0.005, rotY: 0.008, rotZ: 0.004 });

    // --- Object 6: Workout Intelligence Section - Pulsating Glass Torus Knot ---
    const geoKnot = new THREE.TorusKnotGeometry(10, 2.5, 120, 20);
    const matKnot = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true, transparent: true, opacity: 0.55 });
    const meshKnot = new THREE.Mesh(geoKnot, matKnot);
    meshKnot.position.set(25, -215, -10);
    gGeometry.add(meshKnot);
    objects.push({ mesh: meshKnot, rotX: 0.009, rotY: 0.006, rotZ: 0.007 });

    // --- Object 7: Reset Studio Section - Breathing Concentric Portal Rings ---
    const geoRingBig = new THREE.TorusGeometry(18, 1.2, 16, 100);
    const matRingBig = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.5 });
    const meshRingBig = new THREE.Mesh(geoRingBig, matRingBig);
    meshRingBig.position.set(0, -260, -8);
    gGeometry.add(meshRingBig);
    objects.push({ mesh: meshRingBig, rotX: 0.004, rotY: 0.011, rotZ: 0.002 });

    // --- Object 8: Final CTA Section - Massive Converging Glass Icosahedron ---
    const geoFinal = new THREE.IcosahedronGeometry(18, 1);
    const matFinal = new THREE.MeshBasicMaterial({ color: 0xd4f933, wireframe: true, transparent: true, opacity: 0.6 });
    const meshFinal = new THREE.Mesh(geoFinal, matFinal);
    meshFinal.position.set(0, -310, -5);
    gGeometry.add(meshFinal);
    objects.push({ mesh: meshFinal, rotX: 0.006, rotY: 0.008, rotZ: 0.005 });

    // 5. Post-Processing Setup (ACES Bloom)
    const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const quadScene = new THREE.Scene();
    let quadMesh = null;

    const brightMat = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: { value: null }, uThreshold: { value: 0.3 } },
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
        uBloomStrength: { value: 1.1 },
        uVignette: { value: 0.5 },
        uAberration: { value: 0.0018 },
        uGrain: { value: 0.025 },
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
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      // CONTINUOUS DRAMATIC CAMERA TRAVEL IN 3D SPACE
      const targetCamY = -scrollYProgress * 320;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.position.x = mouse.x * 4.0;
      camera.rotation.z = mouse.x * 0.03;

      // Rotate 3D Objects
      objects.forEach((obj) => {
        obj.mesh.rotation.x += obj.rotX;
        obj.mesh.rotation.y += obj.rotY;
        obj.mesh.rotation.z += obj.rotZ;

        if (obj.mesh === meshRingBig) {
          const pulse = 1 + Math.sin(t * 2.0) * 0.12;
          obj.mesh.scale.set(pulse, pulse, pulse);
        }
      });

      gStars.position.y = camera.position.y * 0.92;
      gDust.position.y = camera.position.y * 0.85;

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
