"use client";
import { createCategory } from '@/utils/actions/category';
import Image from 'next/image';

import { MdCloudUpload } from "react-icons/md";
import SubmitBtn from '../SubmitBtn';
import { ChangeEvent, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';
import { redirectTo } from '@/utils/services/services';




const CategoryAddForm = () => {
   
    const initialState: any = {
        success: "",
        message: ""
    }
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [uploadWarning, setUploadWarning] = useState("");
    const [state, formAction] = useFormState(createCategory, initialState)

    const handeImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const file = e.target.files[0];
            console.log(file);
            if(file.size > 4*1024*1024) {
                setUploadWarning("File size must not exceed 4MB");
            } else {
                if(file.type.startsWith("image/")) {
                    setImagePreviewUrl(URL.createObjectURL(file));
                    setUploadWarning("");
                } else {
                    setUploadWarning("Only png, jpg, jpeg file types are allowed")
                }
            }
           
        }
    }

    useEffect(() => {
        if(state.success) {
            toast.success(state.message);
            // router.push("/dashboard/category");
            // revalidate("/dashboard/category");
            redirectTo("/dashboard/category");
        }
        if(state.success === false) {
            toast.error(state.message);
        }
        
    }, [state]);

 
  return (
    <form action={formAction} className="p-8 bg-bgLightSecondary dark:bg-bgDarkSecondary rounded-md w-full flex gap-10">
    <div className="flex-[2.5] flex flex-col gap-4">
        <div className="flex flex-col gap-1">
            <label htmlFor="">Name</label>
            <input type="text" name="name" required className="py-1.5 px-4 rounded-md bg-bgLightPrimary dark:bg-bgDarkPrimary outline-none"  />
        </div>
        {/* <div className="flex flex-col gap-1">
            <label htmlFor="">Category Slug</label>
            <div className="flex gap-1 items-center py-1.5 px-4 rounded-md bg-bgLightPrimary dark:bg-bgDarkPrimary ">
                <input type="text" id="slug" name="slug" className="flex-1 bg-inherit outline-none" />
                <label htmlFor="slug">
                <BsArrowCounterclockwise className="ml-2 cursor-pointer" />
                </label>
            </div>
        </div> */}
        <div className="flex flex-col gap-1">
            <label htmlFor="">Description</label>
            <div className="flex gap-1 items-center py-1.5 px-4 rounded-md bg-bgLightPrimary dark:bg-bgDarkPrimary ">
                <textarea name="description" required className="flex-1 bg-inherit outline-none h-[150px]" />
            </div>
        </div>
        <SubmitBtn text="Create Category" />
    </div>
    <div className="flex-1 flex flex-col items-end">
        <div className="relative w-full h-[220px] bg-white">
        {
            imagePreviewUrl ? (
                <Image src={imagePreviewUrl} alt="" className="object-cover" fill />
            ) : (
                <h2 className="text-4xl text-center font-bold text-gray-400 flex items-center justify-center h-full">Upload Image</h2>
            )
        } 
        </div>
        <p className="text-red-600 font-semibold text-sm mt-2">
        {
            uploadWarning && uploadWarning
        }
        </p>
        <div className="flex w-full mt-5">
            <label htmlFor="file" className="border-2 border-blue-300 rounded-md w-full cursor-pointer">
                <MdCloudUpload className="text-4xl font-bold mx-auto text-blue-300 w-full hover:bg-blue-300 hover:text-black transition-c" />
            </label>
            <input type="file" id="file" name="file" onChange={handeImageChange} className="py-1.5 hidden px-4 rounded-md bg-bgLightPrimary dark:bg-bgDarkPrimary outline-none"  />           
        </div>
      
    </div>
    </form>
  )
}

export default CategoryAddForm
