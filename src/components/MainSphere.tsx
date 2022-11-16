import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useEffect, useRef } from 'react';
import { Mesh, Vector2 } from 'three';
import vertexShader from '../shaders/main_sphere/vertex.glsl';
import fragmentShader from '../shaders/main_sphere/fragment.glsl';

type MousePosition = {
  clientX: number,
  clientY: number
}

export default function MainSphere() {
  const sphereRef = useRef<Mesh>(null);
  const [totalTime, setTotalTime] = useState(0);
  const [lastTick, setLastTick] = useState(Date.now());
  const [mousePos, setMousePos] = useState([0,0])

  useFrame(() => {
    setTotalTime(totalTime + (Date.now() - lastTick) / 1000) // Total elapsed time in seconds
    if (sphereRef.current) {
      //@ts-ignore
      sphereRef.current.material.uniforms.time.value = totalTime;
    }

    setLastTick(Date.now());
  })

  const handleMouseMove = (e: MousePosition) => {
    setMousePos([e.clientX - (window.innerWidth / 2), -(e.clientY - (window.innerHeight / 2))]);
  }

  window.addEventListener('mousemove', handleMouseMove);

  return(
    <mesh ref={sphereRef} rotation={[1, 0, 0]}>
      <icosahedronGeometry args={[8,50]} />
      <shaderMaterial args={[{
        uniforms: {
          time: {value: 0.0},
          mousePos: {value: new Vector2(mousePos[0], mousePos[1])}
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      }]} />
    </mesh>
)
}