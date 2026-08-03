import * as THREE from 'three';

/**
 * GLSL Shader for Layered Horizontal Electromagnetic Silk Plasma Ribbons
 * Eliminates all radial/tunnel convergence. Creates calm, luxury horizontal plasma light streams.
 */
export const AuroraShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#51E3DA') }, // Cyan / Teal
    uColor2: { value: new THREE.Color('#C084FC') }, // Purple / Violet
    uColor3: { value: new THREE.Color('#38BDF8') }, // Electric Blue
    uOpacity: { value: 0.35 },
    uSpeed: { value: 0.4 },
    uFilamentDensity: { value: 16.0 },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uSpeed;
    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vWorldPosition;

    // GLSL 3D Simplex Noise for smooth, organic horizontal ribbon flexing
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      float t = uTime * uSpeed;

      // Gentle horizontal wave deformation (NO radial/tunnel math)
      float noiseVal = snoise(vec3(pos.x * 0.08, pos.y * 0.15, t * 0.25));
      float gentleFlex = sin(pos.x * 0.15 + t * 0.6) * 0.8;

      pos.y += gentleFlex * 0.4;
      pos.z += noiseVal * 1.2;
      vElevation = pos.z;

      vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
      vWorldPosition = worldPosition.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uSpeed;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uOpacity;
    uniform float uFilamentDensity;

    varying vec2 vUv;
    varying float vElevation;
    varying vec3 vWorldPosition;

    void main() {
      float t = uTime * uSpeed;

      // Smooth horizontal electromagnetic color transition
      float colorMix = sin(vUv.x * 3.14159 * 0.8 + t * 0.3) * 0.5 + 0.5;
      vec3 color = mix(uColor1, uColor2, colorMix);
      color = mix(color, uColor3, sin(vUv.y * 3.14159 + t * 0.2) * 0.5 + 0.5);

      // Parallel silk filament lines running horizontally along the ribbon length
      float filaments = pow(abs(sin(vUv.y * uFilamentDensity + vElevation * 1.2 + t * 1.1)), 3.8);
      color += vec3(0.35, 0.65, 0.95) * filaments * 0.5;

      // Gentle horizontal fading at left and right screen borders
      float fadeX = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
      float fadeY = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
      float alpha = fadeX * fadeY * (uOpacity + filaments * 0.25);

      gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.65));
    }
  `,
};
