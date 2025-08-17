import React from 'react'

function Button(props) {
    const {text,func,funct}=props
  return (
     <button onClick={func} className='px-8 mx-auto py-4 border-[2px] bg-slate-950 border-blue-400 border-solid rounded-md blueShadow duration-200'>
        <p>{text}</p>
        </button>
  )
}

export default Button
