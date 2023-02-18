import { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'

import elemCenter from './helpers/elem-center'

import MainSphere from './components/MainSphere/MainSphere'
import SideBar from './components/SideBar'
import { MousePosContext } from './contexts/MousePosContext'

type MousePosition = {
  clientX: number,
  clientY: number
}

export default function App() {
  // mouse stuff
  const [mousePos, setMousePos] = useState<[number, number]>([0,0])
  const handleMouseMove = (e: MousePosition) => {
    //console.log(`mouse coords: ${e.clientX}, ${e.clientY}`)
    //setMousePos([e.clientX - (window.innerWidth / 2), -(e.clientY - (window.innerHeight / 2))]);
    setMousePos([e.clientX, e.clientY]);
  }
  window.addEventListener('mousemove', handleMouseMove);

  
  return (
    <MousePosContext.Provider value={mousePos}>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className="flex justify-center items-center text-[2.5rem] sm:text-6xl lg:text-6xl 2xl:text-8xl w-full md:w-11/12 lg:w-4/5 h-full flex-col flex-wrap">
          <div className="w-[24rem] h-[24rem] sm:w-[32rem] sm:h-[32rem] lg:w-[32rem] lg:h-[32rem] 2xl:w-[48rem] 2xl:h-[48rem] absolute mix-blend-difference">
                <MainSphere />
          </div>
          <h1 className='text-center font-thin text-[#CDF5F0]'>GRAESON<b>BERGEN</b></h1>
          <h1 className="text-xl sm:text-4xl lg:text-4xl 2xl:text-5xl font-thin text-[#CDF5F0] mt-1 sm:mt-0">full stack developer</h1>
        </div>
        {/* <SideBar /> */}
      </div>
    </MousePosContext.Provider>
  )
}