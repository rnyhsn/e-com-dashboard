"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import DeleteDialog from './DeleteDialog'

const UploadedImageCard = ({img}: {img: {url: string, publicKey: string}}) => {
    const [show, setShow] = useState(false);

    const handleDialogBox = () => {
        setShow(true);
        
    }
  return (
    <div className={`relative h-[100px] shrink-0`}>
        <DeleteDialog show={show} setShow={setShow} publicKey={img.publicKey} url={img.url} />
        <Image src={img.url} fill alt="" className="object-cover" />
        <div className="absolute w-5 h-5 bg-red-600 text-white rounded-full cursor-pointer flex items-center justify-center -top-2 -right-2 font-bold hover:bg-red-400">
            <RxCross2 size={12} onClick={handleDialogBox}  />
        </div>
    </div>
  )
}

export default UploadedImageCard
