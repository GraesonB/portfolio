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
  const [sphereRotation, setSphereRotation] = useState<[number, number, number]>([1.5,0,0]);
  
  return (

    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-screen h-screen absolute mix-blend-difference bg-[#0A0F14] ">
        <Canvas camera={{position: [0,0,12]}}>
          <MainSphere desiredRotation={sphereRotation} mousePos={mousePos}  />
        </Canvas>
      </div>
      <div className="flex justify-center text-8xl flex-column w-full md:w-11/12 lg:w-4/5 h-full flex-col flex-wrap">
        {/* <h1 className='text-center font-thin text-[#DCE6D2]'>GRAESON<b>BERGEN</b></h1> */}
      </div>

    </div>
  )
}