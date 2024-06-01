import React from 'react'
import { FaTrophy } from "react-icons/fa";


const League = ({trophy}:{trophy: number}) => {
  return (
    <div className='mt-5'>
      {(trophy < 100 && (
        <p className="flex items-center gap-2 text-white font-bold text-xl">
          <FaTrophy className="text-[#CD7F32] text-3xl" /> Bronze
        </p>
      )) ||
        ((trophy >= 100 && trophy < 500) && (
          <p className="flex items-center gap-2 text-white font-bold text-xl">
            <FaTrophy className="text-[#C0C0C0] text-3xl" /> Silver
          </p>
        )) ||
        ((trophy >= 500 && trophy < 1000) && (
          <p className="flex items-center gap-2 text-white font-bold text-xl">
            <FaTrophy className="text-[#FFD700] text-3xl" /> Gold
          </p>
        )) || 
        ((trophy >= 1000 ) && (
          <p className="flex items-center gap-2 text-white font-bold text-xl">
            <FaTrophy className="text-[#4ee2ec] text-3xl" /> Diamond
          </p>
        ))
        }
    </div>
  )
}

export default League
