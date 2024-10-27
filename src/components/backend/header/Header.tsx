import React from 'react'
import MenuSwipe from './MenuSwipe'
import SearchBox from './SearchBox'
import { IoIosArrowDown, IoIosNotificationsOutline } from "react-icons/io";
import Profile from './Profile';
import ThemeIcon from './ThemeIcon';


const Header = () => {
  return (
    <div className="flex justify-between w-full">
      {/* Lef side search bar section */}
      <div className="flex gap-4 items-center">
        <MenuSwipe />
        <SearchBox />
      </div>
      <div className="flex items-center gap-4">
        <ThemeIcon />
        <div className="relative">
            <IoIosNotificationsOutline className="text-2xl cursor-pointer" />
            <div className="absolute w-4 h-4 rounded-full text-black -right-1 -top-1 text-xs bg-btnBg flex items-center justify-center">0</div>
        </div>
        <Profile />
      </div>
     
    </div>
  )
}

export default Header
