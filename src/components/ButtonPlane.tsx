import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useEffect, useRef, useContext } from 'react';
import { Mesh, Vector2, Vector3 } from 'three';

import { MousePosContext } from '../contexts/MousePosContext';

import vertexShader from '../shaders/button_plane/vertex.glsl';
import fragmentShader from '../shaders/button_plane/fragment.glsl';
import { lerpVec } from '../curves/lerp';
import smoothStep from '../curves/smooth-step';

type ButtonPlaneProps = {
  position: [number, number, number],
  height: number,
  width: number
}

export default function ButtonPlane({position, height, width}: ButtonPlaneProps) {
  const planeRef = useRef<Mesh>(null);
  const [totalTime, setTotalTime] = useState(0);
  const [lastTick, setLastTick] = useState(Date.now());
  const mousePos = useContext(MousePosContext);

  const [currentRotation, setCurrentRotation] = useState([1,0.5,0]);
  const [mouseDistance, setMouseDistance] = useState(Math.sqrt(mousePos[0]**2 + mousePos[1]**2));

  useFrame(() => {
    const elapsedSeconds = (Date.now() - lastTick) / 1000;
    setTotalTime(totalTime + (elapsedSeconds));
    setMouseDistance((Math.abs(mousePos[0]) + Math.abs(mousePos[1])) / 500)
    if (planeRef.current) {
      //@ts-ignore
      planeRef.current.material.uniforms.time.value = totalTime;
      //@ts-ignore
      planeRef.current.material.uniforms.mousePullStrength.value = mouseDistance >= 1? 1: mouseDistance;
    }

    setLastTick(Date.now());
  })

  return(
    <mesh ref={planeRef}>
      <planeGeometry args={[width,height,4,4]} />
      <shaderMaterial args={[{
        uniforms: {
          time: {value: 0.0},
          mousePos: {value: new Vector2(mousePos[0], mousePos[1])},
          mousePullStrength: {value: mouseDistance >= 1? 1: mouseDistance}
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      }]} />
    </mesh>
  )
}