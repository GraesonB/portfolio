import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useEffect, useRef } from 'react';
import { Mesh, Vector2 } from 'three';
import vertexShader from '../shaders/main_sphere/vertex.glsl';
import fragmentShader from '../shaders/main_sphere/fragment.glsl';

type SphereProps = {
  rotation: [number, number, number],
  mousePos: [number, number]
}

export default function MainSphere({rotation, mousePos}: SphereProps) {
  const sphereRef = useRef<Mesh>(null);
  const [totalTime, setTotalTime] = useState(0);
  const [lastTick, setLastTick] = useState(Date.now());

  

  useFrame(() => {
    setTotalTime(totalTime + (Date.now() - lastTick) / 1000) // Total elapsed time in seconds
    if (sphereRef.current) {
      //@ts-ignore
      sphereRef.current.material.uniforms.time.value = totalTime;
    }
    setLastTick(Date.now());
  })

  return(
    <mesh ref={sphereRef} rotation={rotation}>
      <icosahedronGeometry args={[11,100]} />
      <shaderMaterial args={[{
        uniforms: {
          time: {value: 0.0},
          mousePos: {value: new Vector2(mousePos[0], mousePos[1])},
          fresnelMod: {value: 5.0}
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      }]} />
    </mesh>
)
}