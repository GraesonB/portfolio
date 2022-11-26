type ButtonProps = {
  text: String
}

export default function Button(props: ButtonProps) {
  return (
    <h3 className='text-center hover:text-[#8FABA8] font-thin text-[#CDF5F0] mb-10 mt-10'>{props.text}</h3>
  );
}