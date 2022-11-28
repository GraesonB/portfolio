import { Canvas } from "@react-three/fiber";
import MainSphereMesh from "./MainSphereMesh";

export default function MainSphere() {
  return (
    <Canvas camera={{position: [0,0,50], fov: 10}}>
      <MainSphereMesh canvasPos={[0,0]} desiredRotation={[0,0,0]} position={[0,0,0]} radius={3}  />
    </Canvas>
  );
}