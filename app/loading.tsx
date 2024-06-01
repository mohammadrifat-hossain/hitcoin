import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen w-full bg-white flex items-center justify-center'>
      <Image src={'https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif'} alt='Loading' height={1000} width={1000}/>
    </div>
  )
}

export default Loading
