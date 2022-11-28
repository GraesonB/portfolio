import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useEffect, useRef, useContext } from 'react';
import { Mesh, Vector2, Vector3 } from 'three';

import { MousePosContext } from '../../contexts/MousePosContext';
import vertexShader from '../../shaders/main_sphere/vertex.glsl';
import fragmentShader from '../../shaders/main_sphere/fragment.glsl';
import { lerpVec } from '../../curves/lerp';
import smoothStep from '../../curves/smooth-step';

type SphereProps = {
  desiredRotation: [number, number, number],
  canvasPos: [number, number]
  position: [number, number, number],
  radius: number
}

export default function MainSphereMesh({canvasPos, desiredRotation, position, radius}: SphereProps) {
  const sphereRef = useRef<Mesh>(null);
  const [totalTime, setTotalTime] = useState(0);
  const [lastTick, setLastTick] = useState(Date.now());

  const mousePos = useContext(MousePosContext);
  const [mousePosRel, setMousePosRel] = useState<[number, number]>([(mousePos[0]- canvasPos[0]), -(mousePos[1] - canvasPos[1])]);

  const [currentRotation, setCurrentRotation] = useState([1,0.5,0]);
  const [mouseDistance, setMouseDistance] = useState(Math.sqrt(mousePosRel[0]**2 + mousePosRel[1]**2));


  useFrame(() => {
    const elapsedSeconds = (Date.now() - lastTick) / 1000;
    setTotalTime(totalTime + (elapsedSeconds));
    setMouseDistance((Math.abs(mousePosRel[0]) + Math.abs(mousePosRel[1])) / 500);
    setMousePosRel([(mousePos[0]- canvasPos[0]), -(mousePos[1] - canvasPos[1])]);
    if (sphereRef.current) {
      //@ts-ignore
      sphereRef.current.material.uniforms.time.value = totalTime;
      //@ts-ignore
      sphereRef.current.material.uniforms.mousePullStrength.value = mouseDistance >= 1? 1: mouseDistance;

      sphereRef.current.position.setX(position[0]);
      sphereRef.current.position.setY(position[1]);
    }

    setLastTick(Date.now());
  })

  return(
    <mesh ref={sphereRef}>
      <icosahedronGeometry args={[radius,100]} />
      <shaderMaterial args={[{
        uniforms: {
          time: {value: 0.0},
          mousePos: {value: new Vector2(mousePosRel[0], mousePosRel[1])},
          mousePullStrength: {value: mouseDistance >= 1? 1: mouseDistance},
          fresnelMod: {value: 2.5},
          rotation: {value: new Vector3(...currentRotation)}
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      }]} />
    </mesh>
  )
}