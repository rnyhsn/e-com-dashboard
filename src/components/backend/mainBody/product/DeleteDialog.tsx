import { deleteProductImage } from '@/utils/actions/product';
import { deleteImage } from '@/utils/services/uploadImage';
import React from 'react'

const DeleteDialog = ({show, setShow, publicKey, url}: {show: boolean, setShow: (value: boolean) => void, publicKey: string, url: string}) => {
    const deleteImageWithId = async (signal: boolean) => {
        if(signal) {
            try {
                await deleteProductImage(url, publicKey);
            } catch (error) {
                console.log(error);
            }
            setShow(false);
        } else {
            setShow(false);
        }
    }
  return (
    <div className={`w-[400px] h-[180px] fixed bg-slate-600 ${show ? "top-[40%]" : "-top-[15%]"} left-[60%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-md transition-all duration-500`}>
        <div className="flex flex-col gap-5 items-center justfy-center py-10">
            <h2 className="text-2xl text-center">You want to delete the Product Image?</h2>
            <div className="flex gap-5 text-sm">
            <button className="px-5 py-2 rounded-md bg-blue-500" onClick={()=> deleteImageWithId(true)} >Yes</button>
            <button className="px-5 py-2 rounded-md bg-red-500" onClick={()=> deleteImageWithId(false)} >No</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteDialog
