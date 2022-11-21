import { useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import reactLogo from './assets/react.svg'
import './App.css'
import MainSphere from './components/MainSphere'

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

  // rotation
  const [sphereRotation, setSphereRotation] = useState<[number, number, number]>([0,0,0]);
  
  return (

    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-screen h-screen absolute mix-blend-difference bg-[#0A0F14] ">
        <Canvas camera={{position: [0,0,65], fov: 10}}>
          <MainSphere desiredRotation={sphereRotation} mousePos={mousePos}  />
        </Canvas>
      </div>
      <div className="flex justify-center items-center text-7xl w-full md:w-11/12 lg:w-4/5 h-full flex-col flex-wrap">
        <h1 className='text-center absolute font-thin text-[#DCE6D2]'>GRAESON<b>BERGEN</b></h1>
      </div>
      <ul className='flex flex-col justify-center items-end text-5xl absolute w-full md:w-11/12 lg:w-4/5 h-full self-end'>
        <h3 className='text-center hover:text-slate-900 font-thin text-[#DCE6D2] mb-10 mt-10'>projects</h3>
        <h3 className='text-center hover:text-slate-900 font-thin text-[#DCE6D2] mb-10 mt-10'>contact</h3>
        <h3 className='text-center hover:text-slate-900 font-thin text-[#DCE6D2] mb-10 mt-10'>resume</h3>
      </ul>
    </div>
  )
}