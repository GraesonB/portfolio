import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import MainSphereMesh from "./MainSphereMesh";

import elemCenter from "../../helpers/elem-center"

export default function MainSphere() {
  const sphereRef = useRef(null);
  const [center, setCenter] = useState<[number, number]>([0,0]);


  useEffect(() => {
    if (sphereRef.current !== null) setCenter(elemCenter(sphereRef.current));
  }, [sphereRef]);

  const resize = () => {
    if (sphereRef.current !== null) setCenter(elemCenter(sphereRef.current));
  } 
  window.addEventListener('resize', resize);

  return (
    <div ref={sphereRef} className='w-full h-full'>
      <Canvas camera={{position: [0,0,50], fov: 10}}>
        <MainSphereMesh center={center} desiredRotation={[0,0,0]} position={[0,0,0]} radius={3}  />
      </Canvas>
    </div>
  );
}