import { Canvas } from "@react-three/fiber";
import { ShaderMaterial } from "@react-three/fiber";

export default function MainCanvas() {
  return(
    <div className="border-red-700 w-screen h-screen border absolute">
      <Canvas>
        <mesh>
          <icosahedronGeometry args={[2,50]} />
          <shaderMaterial />
        </mesh>
      </Canvas>
    </div>
  )
}