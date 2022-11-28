import { Canvas } from '@react-three/fiber';
import { useRef, useContext } from 'react';
import ButtonPlane from './ButtonPlane';
import { MousePosContext } from '../contexts/MousePosContext';
import elemCenter from '../helpers/elem-center'

type ButtonProps = {
  text: String
}

export default function Button({ text }: ButtonProps) {
  const planeRef = useRef(null);

  const mousePos = useContext(MousePosContext);

  const debug = () => {
    //@ts-ignore
    
    const coords = elemCenter(planeRef.current);

    console.log(`button coords: ${coords[0]}, ${coords[1]}`);
  }

  window.addEventListener('mousemove', debug);

  return (
    <div className="flex justify-center items-center m-16 p-2 w-64 border-[#CDF5F0]">
      <div ref={planeRef} className="absolute border h-24">
        <Canvas camera={{position: [0,0,50], fov: 10}}>
            <ButtonPlane  position={[0,0,0]} height={9} width={40}  />
        </Canvas>
      </div>
    </div>
  );
}

// on select pan a big vertical bar from right to left and make the background colour of that div the same as the regular background and put it overtop of my name