"use client";
import { ThemeContext } from '@/utils/providers/Theme'
import React, { useContext } from 'react'
import { AiOutlineMoon } from 'react-icons/ai'
import { IoSunnyOutline } from 'react-icons/io5'

const ThemeIcon = () => {
  
  const theme = useContext(ThemeContext);
  console.log(theme)
  return (
    <div>
    {
      theme?.theme === 'light' ? (
        <AiOutlineMoon className="text-2xl cursor-pointer" onClick={()=> theme?.toggle()} />
      ) : (
        <IoSunnyOutline className="text-2xl cursor-pointer" onClick={()=> theme?.toggle()} />
      )
    }
    </div>
  )
}

export default ThemeIcon
