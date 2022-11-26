import { Canvas } from '@react-three/fiber';
import MainSphere from './MainSphere'

type ButtonProps = {
  text: String
}

export default function Button({ text }: ButtonProps) {

  return (
    <div className="flex justify-center items-center m-8 p-2 w-64">
      <div className="w-1/2 h-20 absolute mix-blend-difference rounded-xl">
        {/* <Canvas camera={{position: [0,0,30], fov: 10}}>
          <MainSphere desiredRotation={[0,0,0]} mousePos={[0,0]} position={[0,0,0]} radius={1.4}  />
        </Canvas> */}
      </div>
        <a className='block hover:text-[#8FABA8] font-thin text-[#CDF5F0] text-5xl z-10 top-0 pb-3 mix-blend-difference'>{text}</a>
    </div>
  );
}