import { Canvas } from '@react-three/fiber';
import MainSphere from './MainSphere'

type ButtonProps = {
  text: String
}

export default function Button({ text }: ButtonProps) {

  return (
    <div className="flex justify-center items-center m-8 p-2 w-64 border-[#CDF5F0]">
        <a className='block hover:text-[#8FABA8] font-thin text-[#CDF5F0] text-5xl pb-3'>{text}</a>
    </div>
  );
}