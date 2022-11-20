import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useEffect, useRef } from 'react';
import { Mesh, Vector2, Vector3 } from 'three';

import vertexShader from '../shaders/main_sphere/vertex.glsl';
import fragmentShader from '../shaders/main_sphere/fragment.glsl';
import { lerpVec } from '../curves/lerp';
import smoothStep from '../curves/smooth-step';

type SphereProps = {
  desiredRotation: [number, number, number],
  mousePos: [number, number]
}

const animationLength = 2;

export default function MainSphere({desiredRotation, mousePos}: SphereProps) {
  const sphereRef = useRef<Mesh>(null);
  const [totalTime, setTotalTime] = useState(0);
  const [lastTick, setLastTick] = useState(Date.now());
  const [rotatingTo, setRotatingTo] = useState<[number, number, number]>(desiredRotation);
  const [rotatingFrom, setRotatingFrom] = useState<[number, number, number]>(desiredRotation);
  const [animating, setAnimating] = useState(false);
  const [animationTimer, setAnimationTimer] = useState(0);

  

  useFrame(() => {
    const elapsedSeconds = (Date.now() - lastTick) / 1000;
    setTotalTime(totalTime + (elapsedSeconds));
    if (sphereRef.current) {
      const currentRotation = sphereRef.current.rotation.toArray();
      //@ts-ignore
      sphereRef.current.material.uniforms.time.value = totalTime;
      
    }

    setLastTick(Date.now());
  })

  return(
    <mesh ref={sphereRef}>
      <icosahedronGeometry args={[11,120]} />
      <shaderMaterial args={[{
        uniforms: {
          time: {value: 0.0},
          mousePos: {value: new Vector2(mousePos[0], mousePos[1])},
          fresnelMod: {value: 5.0},
          rotation: {value: new Vector3(1.0, 0.0, 1.0)}
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      }]} />
    </mesh>
)
}