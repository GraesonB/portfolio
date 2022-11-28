import { Canvas } from "@react-three/fiber";
import { useState, useEffect, useRef } from "react";
import MainSphereMesh from "./MainSphereMesh";

import elemCenter from "../../helpers/elem-center"

export default function MainSphere() {
  const sphereCanvasRef = useRef(null);
  const [sphereCanvasCenter, setSphereCanvasCenter] = useState<[number, number]>([0,0]);


  useEffect(() => {
    if (sphereCanvasRef.current !== null) setSphereCanvasCenter(elemCenter(sphereCanvasRef.current));
  }, [sphereCanvasRef]);

  const resize = () => {
    if (sphereCanvasRef.current !== null) setSphereCanvasCenter(elemCenter(sphereCanvasRef.current));
  } 
  window.addEventListener('resize', resize);

  return (
    <div ref={sphereCanvasRef} className='w-full h-full'>
      <Canvas camera={{position: [0,0,50], fov: 10}}>
        <MainSphereMesh canvasPos={sphereCanvasCenter} desiredRotation={[0,0,0]} position={[0,0,0]} radius={3}  />
      </Canvas>
    </div>
  );
}