"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavLink = ({link}: {link: {title: string, path: string}}) => {
    const pathname = usePathname();
  return (
    <Link href={link.path} className={`${pathname === link.path && "text-primary"}`}>
        {link.title}
    </Link>
  )
}

export default NavLink
