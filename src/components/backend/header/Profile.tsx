import Image from 'next/image'
import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import { RiUserSettingsLine } from 'react-icons/ri'
import { IoHelpCircleOutline } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'
import { auth, signOut } from '@/utils/services/auth'
import { redirectTo } from '@/utils/services/services'
  

const Profile = async () => {
  const session = await auth();
  console.log(session);
  const handleLogout = async () => {
    'use server';
    await signOut();
    // redirectTo('/login');
  }
  return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-1 cursor-pointer relative">
                <Image src="/myPic.jpg" alt="" width={32} height={32} className="rounded-full object-cover" />
                <IoIosArrowDown className={` font-bold transition-c`} />
            </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative right-10 bg-bgLightSecondary dark:bg-bgDarkSecondary">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                <Link href="/" className="flex items-center gap-2 text-txt-light-secondary dark:text-txt-dark-secondary hover:text-txt-light-primary dark:hover:text-txt-dark-primary"> <FaUser /> View Profile </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link href="/" className="flex items-center gap-2 text-txt-light-secondary dark:text-txt-dark-secondary hover:text-txt-light-primary dark:hover:text-txt-dark-primary"> <IoHelpCircleOutline /> Help Center </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                <form action={handleLogout} className="flex items-center gap-2 text-txt-light-secondary dark:text-txt-dark-secondary hover:text-txt-light-primary dark:hover:text-txt-dark-primary">
                  <button className="flex items-center gap-2">
                  <MdLogout /> Logout 
                  </button>
                </form>
                </DropdownMenuItem>
               
            </DropdownMenuContent>
        </DropdownMenu>
  )
}

export default Profile
