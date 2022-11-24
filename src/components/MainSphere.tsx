import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useEffect, useRef } from 'react';
import { Mesh, Vector2, Vector3 } from 'three';

import vertexShader from '../shaders/main_sphere/vertex.glsl';
import fragmentShader from '../shaders/main_sphere/fragment.glsl';
import { lerpVec } from '../curves/lerp';
import smoothStep from '../curves/smooth-step';

type SphereProps = {
  desiredRotation: [number, number, number],
  mousePos: [number, number],
  position: [number, number, number]

}

const animationLength = 2;

export default function MainSphere({desiredRotation, mousePos, position}: SphereProps) {
  const sphereRef = useRef<Mesh>(null);
  const [totalTime, setTotalTime] = useState(0);
  const [lastTick, setLastTick] = useState(Date.now());

  const [currentRotation, setCurrentRotation] = useState([1,0.5,0]);
  const [fromRotation, setFromRotation] = useState(currentRotation);
  const [toRotation, setToRotation] = useState(currentRotation);
  const [rotating, setRotating] = useState(false); // animation boolean flag
  

  useFrame(() => {
    const elapsedSeconds = (Date.now() - lastTick) / 1000;
    setTotalTime(totalTime + (elapsedSeconds));
    if (sphereRef.current) {
      //@ts-ignore
      sphereRef.current.material.uniforms.time.value = totalTime;
      sphereRef.current.position.setX(position[0]);
      sphereRef.current.position.setY(position[1]);

      if (currentRotation != desiredRotation && !rotating) {
        setRotating(true);
        setToRotation(desiredRotation);
        setFromRotation(currentRotation);
      }

      
    }

    setLastTick(Date.now());
  })

  return(
    <mesh ref={sphereRef}>
      <icosahedronGeometry args={[3,150]} />
      <shaderMaterial args={[{
        uniforms: {
          time: {value: 0.0},
          mousePos: {value: new Vector2(mousePos[0], mousePos[1])},
          fresnelMod: {value: 2.5},
          rotation: {value: new Vector3(...currentRotation)}
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      }]} />
    </mesh>
)
}