import { Canvas } from '@react-three/fiber';
import { useState, useEffect } from 'react';

const vertex: string = `
varying vec3 vNormal;

void main() {	
    vec3 localPosition = vec3(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(localPosition, 1.0);

    vNormal = (modelMatrix * vec4(normal, 0.0)).xyz; // normals in world space
  
}
`;

const fragment: string = `
varying vec3 vNormal;

void main() {
    gl_FragColor = vec4(vNormal, 1.0);
}
`;

export default function MainCanvas() {
  const [vertexShader, setVertexShader] = useState('void main() {}');
  const [fragmentShader, setFragmentShader] = useState('void main() {}');

  useEffect(()=> {
    async function setShaders() {
      const vsh = await fetch('./shaders/vertex.glsl');
      setVertexShader(await vsh.text());
      const fsh = await fetch('./shaders/fragment.glsl');
      setFragmentShader(await fsh.text());
    } 

  }, [])

  return(
    <div className="border-red-700 w-screen h-screen border absolute">
      <Canvas>
        <mesh>
          <icosahedronGeometry args={[2,50]} />
          <shaderMaterial args={[{
            uniforms: {},
            vertexShader: vertex,
            fragmentShader: fragment
          }]} />
        </mesh>
      </Canvas>
    </div>
  )
}