"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavLink = ({item}: { item: { title: string, path: string, icon: React.ReactNode}}) => {
    const pathname = usePathname();
    
  return (
    <Link href={item.path} className={`px-4 py-2 rounded-md flex items-center gap-3 text-lg hover:bg-[#A9DFD8] hover:text-slate-800 ${(pathname === item.path) && "bg-btnBg text-slate-800 font-semibold"}`}> <span className="text-xl"> {item.icon}</span>  <span> {item.title} </span> </Link>
  )
}

export default NavLink
