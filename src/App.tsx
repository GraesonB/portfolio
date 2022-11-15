import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import MainCanvas from './components/MainCanvas'

export default function App() {
  
  return (
    <div className="flex justify-center items-center w-full h-screen border">
      
      <div className="flex flex-column border w-full md:w-11/12 lg:w-4/5 h-full flex-col">
        <h1 className='border text-center'>HELLO WORLD</h1>
        <MainCanvas />
      </div>

    </div>
  )
}