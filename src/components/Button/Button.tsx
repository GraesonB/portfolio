import { Canvas } from '@react-three/fiber';
import { useRef, useContext, useEffect, useState } from 'react';
import ButtonMesh from './ButtonMesh';
import { MousePosContext } from '../../contexts/MousePosContext';
import elemCenter from '../../helpers/elem-center'

type ButtonProps = {
  text: String
}

export default function Button({ text }: ButtonProps) {
  const planeRef = useRef(null);
  const [center, setCenter] = useState<[number, number]>([0,0]);

  const mousePos = useContext(MousePosContext);

  
  useEffect(() => {
    if (planeRef.current !== null) setCenter(elemCenter(planeRef.current));
  }, [planeRef]);

  const resize = () => {
    if (planeRef.current !== null) setCenter(elemCenter(planeRef.current));
  } 
  window.addEventListener('resize', resize);
  
  return (
    <div className="flex justify-center items-center m-16 p-2 w-64 border-[#CDF5F0]">
      <div ref={planeRef} className="absolute h-24 border">
        <Canvas camera={{position: [0,0,100], fov: 10}}>
            <ButtonMesh center={center} position={[0,0,0]} height={9} width={40}  />
        </Canvas>
         {/* <a className='block hover:text-[#8FABA8] font-thin text-[#CDF5F0] text-5xl pb-3'>{text}</a> */}
      </div>
    </div>
  );
}

// on select pan a big vertical bar from right to left and make the background colour of that div the same as the regular background and put it overtop of my name