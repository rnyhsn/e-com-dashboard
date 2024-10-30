"use client";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";


const CategorySection = ({categories}: {categories: any}) => {
    const [open, setOpen] = useState(false);
  return (
    <div className="">
      <div className="flex items-center justify-between gap-6 cursor-pointer bg-primary text-white py-3 px-8">
        <div className="flex gap-3 items-center font-bold" onClick={()=> setOpen(prev => !prev)}>
            <FaBars size="20" />
            <span>All Departments</span>
        </div>
        <IoIosArrowDown />
      </div>
      <div className={`flex flex-col gap-4  ${open && "py-4 px-6 border border-gray-200 "}`}>
       {
        open && categories.map((category: any) => (
            <span className="cursor-pointer" key={category.name}> {category.name} </span>
        ))
       }
      </div>
    </div>
  )
}

export default CategorySection
