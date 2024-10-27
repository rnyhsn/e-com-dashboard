"use client";
import { useState } from "react";
import { RiMenuUnfold4Line } from "react-icons/ri";
import { RiMenuUnfold3Line2 } from "react-icons/ri";

const MenuSwipe = () => {
    const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div onClick={()=> setShowSidebar(prev => !prev)} className="text-2xl cursor-pointer ">
    {
        showSidebar ? (<RiMenuUnfold4Line  />) : (<RiMenuUnfold3Line2  />)
    }
    </div>
  )
}

export default MenuSwipe
