import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'

import MainSphere from './components/MainSphere'
import SideBar from './components/SideBar'

type MousePosition = {
  clientX: number,
  clientY: number
}

export default function App() {
  // mouse stuff
  const [mousePos, setMousePos] = useState<[number, number]>([0,0])
  const handleMouseMove = (e: MousePosition) => {
    setMousePos([e.clientX - (window.innerWidth / 2), -(e.clientY - (window.innerHeight / 2))]);
  }
  window.addEventListener('mousemove', handleMouseMove);
  
  return (

    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex justify-center items-center text-[2.5rem] sm:text-6xl lg:text-6xl 2xl:text-8xl w-full md:w-11/12 lg:w-4/5 h-full flex-col flex-wrap">
        <div className="w-[24rem] h-[24rem] sm:w-[32rem] sm:h-[32rem] lg:w-[32rem] lg:h-[32rem] 2xl:w-[48rem] 2xl:h-[48rem] absolute mix-blend-difference">
          <Canvas camera={{position: [0,0,50], fov: 10}}>
            <MainSphere desiredRotation={[0,0,0]} mousePos={mousePos} position={[0,0,0]} radius={3}  />
          </Canvas>
        </div>
        <h1 className='text-center font-thin text-[#CDF5F0]'>GRAESON<b>BERGEN</b></h1>
        <h1 className="text-xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-thin text-[#CDF5F0] mt-1 sm:mt-0">full stack developer</h1>
      </div>
      <SideBar />
    </div>
  )
}