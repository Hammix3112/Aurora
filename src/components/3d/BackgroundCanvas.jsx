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

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x030509, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030509, 0.018);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 60);

    let W = window.innerWidth, H = window.innerHeight;

    const PALETTE = [
      new THREE.Color(0x3d8bff), // electric blue
      new THREE.Color(0x33d6e0), // cyan
      new THREE.Color(0x8a5cf6), // violet
      new THREE.Color(0x6a3ff0), // purple
      new THREE.Color(0xe9f1ff), // soft white
    ];

    // Groups
    const gStars = new THREE.Group();
    const gDust = new THREE.Group();
    const gNebula = new THREE.Group();
    const gAurora = new THREE.Group();
    const gStreams = new THREE.Group();
    [gStars, gDust, gNebula, gAurora, gStreams].forEach((g) => scene.add(g));

    const parallax = { stars: 0.4, dust: 1.2, nebula: 0.8, aurora: 2.0, streams: 3.2 };
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const handleMouseMove = (e) => {
      mouse.tx = (e.clientX / W) * 2 - 1;
      mouse.ty = (e.clientY / H) * 2 - 1;
    };
    const handleTouchMove = (e) => {
      if (!e.touches.length) return;
      mouse.tx = (e.touches[0].clientX / W) * 2 - 1;
      mouse.ty = (e.touches[0].clientY / H) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Stars
    const countStars = 2200;
    const posStars = new Float32Array(countStars * 3);
    const rndStars = new Float32Array(countStars * 2);
    for (let i = 0; i < countStars; i++) {
      const r = 300 + Math.random() * 500;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      posStars[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posStars[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posStars[i * 3 + 2] = r * Math.cos(phi) - 200;
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

    // Dust
    const countDust = 900;
    const posDust = new Float32Array(countDust * 3);
    const rndDust = new Float32Array(countDust * 3);
    for (let i = 0; i < countDust; i++) {
      posDust[i * 3] = (Math.random() - 0.5) * 140;
      posDust[i * 3 + 1] = (Math.random() - 0.5) * 90;
      posDust[i * 3 + 2] = (Math.random() - 0.5) * 60;
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
          gl_PointSize = aRnd.x * (60.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vec3(0.55, 0.75, 1.0), a * vA * 0.35);
        }`,
    });
    gDust.add(new THREE.Points(geoDust, matDust));

    // Nebula
    const nebulaMats = [];
    const nebulaConfigs = [
      { z: -90, s: 140, color: PALETTE[2], opac: 0.16 },
      { z: -70, s: 110, color: PALETTE[0], opac: 0.12 },
    ];
    nebulaConfigs.forEach((cfg, idx) => {
      const geo = new THREE.PlaneGeometry(cfg.s, cfg.s * 0.6, 1, 1);
      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: cfg.color },
          uOpac: { value: cfg.opac },
          uSeed: { value: idx * 11.7 },
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
          uniform float uTime, uOpac, uSeed;
          uniform vec3 uColor;
          void main(){
            vec2 p = vUv * 3.0;
            float n = fbm(vec3(p * 1.4, uTime * 0.02 + uSeed));
            n = smoothstep(0.05, 0.75, n);
            float edge = smoothstep(0.0, 0.35, vUv.x) * smoothstep(1.0, 0.65, vUv.x);
            edge *= smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
            gl_FragColor = vec4(uColor, n * edge * uOpac);
          }`,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((idx - 0.5) * 40, (idx - 0.5) * 14, cfg.z);
      gNebula.add(mesh);
      nebulaMats.push(mat);
    });

    const auroraMats = [];
    const waveMats = [];

    // Particle field - Optimized from 11000 to 5500 for 50% lower vertex shader overhead
    const countField = 5500;
    const posField = new Float32Array(countField * 3);
    const rndField = new Float32Array(countField * 3);
    const colField = new Float32Array(countField * 3);
    for (let i = 0; i < countField; i++) {
      posField[i * 3] = (Math.random() - 0.5) * 220;
      posField[i * 3 + 1] = (Math.random() - 0.5) * 140;
      posField[i * 3 + 2] = (Math.random() - 0.5) * 160 - 20;
      rndField[i * 3] = 0.4 + Math.random() * 2.2;
      rndField[i * 3 + 1] = Math.random() * Math.PI * 2;
      rndField[i * 3 + 2] = 0.3 + Math.random() * 1.4;
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      colField[i * 3] = c.r;
      colField[i * 3 + 1] = c.g;
      colField[i * 3 + 2] = c.b;
    }
    const geoField = new THREE.BufferGeometry();
    geoField.setAttribute('position', new THREE.BufferAttribute(posField, 3));
    geoField.setAttribute('aRnd', new THREE.BufferAttribute(rndField, 3));
    geoField.setAttribute('aColor', new THREE.BufferAttribute(colField, 3));
    const matField = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute vec3 aRnd;
        attribute vec3 aColor;
        varying vec3 vColor;
        varying float vA;
        uniform float uTime;
        void main(){
          vColor = aColor;
          vec3 p = position;
          p.z += sin(uTime * 0.05 + aRnd.y) * 4.0;
          vA = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * aRnd.z + aRnd.y));
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aRnd.x * (220.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        varying vec3 vColor;
        varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          a = pow(a, 1.6);
          gl_FragColor = vec4(vColor, a * vA * 0.9);
        }`,
    });
    gStreams.add(new THREE.Points(geoField, matField));

    // Post-processing setup
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
        uBloomStrength: { value: 0.9 },
        uVignette: { value: 0.55 },
        uAberration: { value: 0.0016 },
        uGrain: { value: 0.035 },
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

    let rtScene;
    let rtBrightA;
    let rtBrightB;
    let rtBrightC;

    function buildTargets() {
      if (rtScene) rtScene.dispose();
      if (rtBrightA) rtBrightA.dispose();
      if (rtBrightB) rtBrightB.dispose();
      if (rtBrightC) rtBrightC.dispose();
      const dpr = Math.min(renderer.getPixelRatio(), 1.5);
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

    // IntersectionObserver to pause rendering when offscreen
    let isIntersecting = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (canvas) observer.observe(canvas);

    const startTime = performance.now();
    let frameId = null;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Skip render passes if off-screen or tab hidden
      if (!isIntersecting || document.hidden) return;

      const t = (performance.now() - startTime) * 0.001;

      matStars.uniforms.uTime.value = t;
      matDust.uniforms.uTime.value = t;
      nebulaMats.forEach((m) => (m.uniforms.uTime.value = t));
      auroraMats.forEach((m) => (m.uniforms.uTime.value = t));
      waveMats.forEach((m) => (m.uniforms.uTime.value = t));
      matField.uniforms.uTime.value = t;
      compositeMat.uniforms.uTime.value = t;

      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gStars.position.x = mouse.x * parallax.stars;
      gStars.position.y = -mouse.y * parallax.stars;
      gDust.position.x = mouse.x * parallax.dust;
      gDust.position.y = -mouse.y * parallax.dust;
      gNebula.position.x = mouse.x * parallax.nebula;
      gNebula.position.y = -mouse.y * parallax.nebula;
      gAurora.position.x = mouse.x * parallax.aurora;
      gAurora.position.y = -mouse.y * parallax.aurora;
      gStreams.position.x = mouse.x * parallax.streams;
      gStreams.position.y = -mouse.y * parallax.streams;

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
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0 pointer-events-none" />;
}
