import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';
import vertexShader from '../shaders/main_sphere/vertex.glsl';
import fragmentShader from '../shaders/main_sphere/fragment.glsl';

export default function MainCanvas() {

  return(
    <div className="border-red-700 w-screen h-screen border absolute">
      <Canvas>
        <mesh>
          <icosahedronGeometry args={[2,20]} />
          <shaderMaterial args={[{
            uniforms: {},
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
          }]} />
        </mesh>
      </Canvas>
    </div>
  )
}