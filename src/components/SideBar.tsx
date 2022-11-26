import { Canvas } from '@react-three/fiber'
import MainSphere from './MainSphere'
import Button from './Button'

export default function SideBar() {
  return (
    <div className='flex flex-col justify-center absolute xl:w-2/5 h-full self-end invisible lg:visible'>
      <div className="w-full h-full absolute mix-blend-difference">
        {/* <Canvas camera={{position: [0,0,50], fov: 10}}>
          <MainSphere desiredRotation={[0,0,0]} mousePos={[0,0]} position={[6.5,0,0]} radius={8}  />
        </Canvas> */}
      </div>
      <ul className='flex flex-col justify-center items-center w-full h-full p-16 top-0 z-10'>
        <Button text={'projects'} />
        <Button text={'contact'} />
        <Button text={'resume'} />
      </ul>
    </div>
  );
}