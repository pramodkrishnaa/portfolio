"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Slow flowing field, tinted with the world accent. Deliberately subtle.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec2 uRes;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i+vec2(0,0)), hash(i+vec2(1,0)), u.x),
               mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    uv.x *= uRes.x / uRes.y;
    float t = uTime * 0.04;
    float f = fbm(uv * 2.4 + vec2(t, -t*0.6));
    f = fbm(uv * 2.0 + f * 1.5 + vec2(t*0.8, t));
    float glow = smoothstep(0.35, 0.95, f);
    vec3 col = uColor * glow * 0.5;
    // vignette toward edges so the center stays clean for text
    float vig = smoothstep(1.1, 0.2, length(vUv - 0.5));
    gl_FragColor = vec4(col * vig, glow * 0.5 * vig);
  }
`;

function Field({ color }: { color: string }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color) },
    uRes: { value: new THREE.Vector2(1, 1) },
  });

  useFrame((state, delta) => {
    uniforms.current.uTime.value += delta;
    const { width, height } = state.size;
    uniforms.current.uRes.value.set(width, height);
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
      />
    </ScreenQuad>
  );
}

export default function ShaderHero({ color = "#5b8dff" }: { color?: string }) {
  return (
    <Canvas
      className="!absolute inset-0"
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <Field color={color} />
    </Canvas>
  );
}
