import Link from 'next/link';
import React from 'react'
import { FaUsers } from "react-icons/fa";
import { IoCashOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <div className='fixed bottom-0 left-0 w-full flex items-center justify-center px-2 md:px-5 bg-transparent'>
      <div className='max-w-[600px] boxshadow w-full p-2 rounded-[10px] flex items-center justify-evenly text-white'>
        <Link href={'/reffer'} className='flex flex-col items-center justify-center cursor-pointer group'>
          <FaUsers className='text-3xl' />
          <p className='text-sm opacity-60 font-extralight group-hover:opacity-100 transition'>Reffer</p>
        </Link>
        <Link href={'withdraw'} className='flex flex-col items-center justify-center cursor-pointer group'>
          <IoCashOutline className='text-3xl' />
          <p className='text-sm opacity-60 font-extralight group-hover:opacity-100 transition'>Withdraw</p>
        </Link>
      </div>
    </div>
  )
}

export default Footer
