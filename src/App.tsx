import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import reactLogo from './assets/react.svg'
import './App.css'
import MainSphere from './components/MainSphere'

export default function App() {
  
  return (

    <div className="flex justify-center items-center w-full h-screen">
      <div className="border-red-700 w-screen h-screen border absolute">
      <Canvas camera={{position: [0,0,25]}}>
        <MainSphere />
      </Canvas>
    </div>
      <div className="flex flex-column border w-full md:w-11/12 lg:w-4/5 h-full flex-col">
        <h1 className='text-center'>HELLO WORLD</h1>
      </div>

    </div>
  )
}