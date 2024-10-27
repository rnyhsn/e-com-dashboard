"use client";
import React, { ChangeEvent, useEffect, useState } from 'react'
import SubmitBtn from '../SubmitBtn'
import { MdCloudUpload } from 'react-icons/md'
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { updateCategory } from '@/utils/actions/category';
import ItemNotFound from '../ItemNotFound';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { redirectTo } from '@/utils/services/services';


const UpdateCategoryForm = ({category}: {category: {name: string, slug: string, description: string, image: string}}) => {
    const router = useRouter();
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [imageUploadWarning, setImageUploadWarning] = useState("");
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            const file = e.target.files[0];
            if(file.size > 2*1024*1024 || !file.type.startsWith("image/")) {
                setImageUploadWarning("File size does not exceed 2MB and png, jpg & jpeg file are allowed only");
            } else {
                setImagePreviewUrl(URL.createObjectURL(file));
                setImageUploadWarning("");
            }
        }
    }
    console.log(imagePreviewUrl);
    const initialState: any = {
        success: "",
        message: ""
    }
    const [state, formAction] = useFormState(updateCategory, initialState)

    // console.log(state);
    if(!state?.success && state?.statusCode === 404) {
        return <ItemNotFound message={state.message} />
    }

   
   
    useEffect(() => {
        if(state?.success === false) {
            toast.error(state.message);
        }
    
        if(state?.success) {
            toast.success(state.message);
            redirectTo("/dashboard/category");
        }
    }, [state]);


  return (
    <form action={formAction} className="p-8 bg-bgLightSecondary dark:bg-bgDarkSecondary rounded-md w-full flex gap-10">
    <div className="flex-[2.5] flex flex-col gap-4">
        <div className="flex flex-col gap-1">
            <label htmlFor="">Name</label>
            <input type="text" name="name" placeholder={category.name} className="py-1.5 px-4 rounded-md bg-bgLightPrimary dark:bg-bgDarkPrimary outline-none"  />
            <input type="hidden" name="slug" value={category.slug} />

        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="">Description</label>
            <div className="flex gap-1 items-center py-1.5 px-4 rounded-md bg-bgLightPrimary dark:bg-bgDarkPrimary ">
                <textarea name="description" placeholder={category.description} className="flex-1 bg-inherit outline-none h-[150px]" />
            </div>
        </div>
        <SubmitBtn text="Update Category" />
    </div>
    <div className="flex-1 flex flex-col items-end">
        <div className="relative w-full h-[220px] bg-white">
        {
            category.image ? (
                <Image src={imagePreviewUrl || category.image} alt="" fill className="object-cover" />
            ) : (
                <h2 className="text-4xl text-center font-bold text-gray-400 flex items-center justify-center h-full">Upload Image</h2>
            )
        }
         
        </div>
        <p className="text-red-600 font-semibold text-sm mt-2">
        { imageUploadWarning && imageUploadWarning }
        </p>
        <div className="flex w-full mt-5">
            <label htmlFor="file" className="border-2 border-blue-300 rounded-md w-full cursor-pointer">
                <MdCloudUpload className="text-4xl font-bold mx-auto text-blue-300 w-full hover:bg-blue-300 hover:text-black transition-c" />
            </label>
            <input type="file" id="file" name="file" onChange={handleImageChange} className="py-1.5 hidden px-4 rounded-md bg-bgLightPrimary dark:bg-bgDarkPrimary outline-none"  />           
        </div>
      
    </div>
    </form>
  )
}

export default UpdateCategoryForm
