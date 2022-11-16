import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import reactLogo from './assets/react.svg'
import './App.css'
import MainSphere from './components/MainSphere'

export default function App() {
  
  return (

    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-screen h-screen absolute mix-blend-difference bg-[#0A0F14] ">
        <Canvas camera={{position: [0,0,25]}}>
          <MainSphere />
        </Canvas>
      </div>
      <div className="flex justify-center text-8xl flex-column w-full md:w-11/12 lg:w-4/5 h-full flex-col">
        <h1 className='text-center font-thin text-[#DCE6D2]'>GRAESON<b>BERGEN</b></h1>
      </div>

    </div>
  )
}