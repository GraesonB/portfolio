import { Canvas } from '@react-three/fiber'
import MainSphere from './MainSphere'
import Button from './Button'

export default function SideBar() {
  return (
    <div className='flex flex-col justify-center text-5xl absolute xl:4/5 h-full self-end invisible lg:visible'>
      <div className="w-full h-full absolute mix-blend-difference">
        {/* <Canvas camera={{position: [0,0,50], fov: 10}}>
          <MainSphere desiredRotation={[0,0,0]} mousePos={[0,0]} position={[5,0,0]} radius={8}  />
        </Canvas> */}
      </div>
      <ul className='w-full h-full p-16'>
        <Button text={'projects'} />
        <Button text={'contact'} />
        <Button text={'resume'} />
      </ul>
    </div>
  );
}