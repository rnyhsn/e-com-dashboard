"use client";
import React, { ChangeEvent, useState } from 'react'
import { MdCloudUpload } from 'react-icons/md'
import SubmitBtn from '../SubmitBtn'
import RichTextEditor from '../RichTextInput';
import ProductImage from './ProductImage';
import { createProduct } from '@/utils/actions/product';
import { toast } from 'react-toastify';
import { redirectTo } from '@/utils/services/services';


const colors = [
    {
        title: "Red",
        value: 'RED'
    },
    {
        title: "Black",
        value: 'BLACK'
    },
    {
        title: "Blue",
        value: 'BLUE'
    },
    {
        title: "White",
        value: 'WHITE'
    },
    {
        title: "Others",
        value: "OTHERS"
    }
]

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];


const AddProductForm = ({categories}: {categories: {}[]}) => {
    
    const [description, setDescription] = useState<string>("");
    const [tagGuide, setTagGuide] = useState(false)
    // const [selectedFiles, setSelectedFiles] = useState<{file: File, url: string}[]>([]);
    const [allowedFiles, setAllowedFiles] = useState<{file: File, url: string}[]>([]);
    const [notAllowedFiles, setNotAllowedFiles] = useState<{file: File, url: string}[]>([]);
    const [loading, setLoading] = useState(false);
    const handleImages =async (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            let files = e.target.files;
            let url: string;
            for(let i = 0; i < files.length; i++) {
                url = await URL.createObjectURL(files[i]);
                // setSelectedFiles(prev => [...prev, {file: files[i], url}])
                if(files[i].type.startsWith('image/') && files[i].size < 4*1024*1024) {
                    setAllowedFiles(prev => [...prev, {file: files[i], url}]);
                } else {
                    setNotAllowedFiles(prev => [...prev, {file: files[i], url}])
                }
            }
        }
    }
   
    const handleRemoveFiles = async (url: string, setFiles: (prev: (item: {file: File,url: string}[]) => {file: File, url: string}[]) => void) => {
        setFiles( files => files.filter(file => file.url !== url))
    }
  

    const handleProductSubmitForm = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        formData.append('description', description);
        allowedFiles.forEach((file) => {
            formData.append('uploadedFiles', file.file);
        })
        try {
            setLoading(true);
            const resp = await createProduct(formData);
            if(resp.success) {
                toast.success(resp.message);
                redirectTo("/dashboard/product")
            } else {
                toast.error(resp.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
        
    }

   
  return (
    <form onSubmit={handleProductSubmitForm}  className="p-8 bg-bgLightSecondary dark:bg-bgDarkSecondary rounded-md w-full flex flex-col gap-3">
       <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="">Name  <span className="text-red-600 text-xl">*</span> </label>
                <input type="text" name="name" required className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
            </div> 
            <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="">Category <span className="text-red-600 text-xl">*</span></label>
                <select name="category" required className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none">
                <option value=""> Choose a category </option>
            {
                categories.map((category: any) => (
                    <option value={category._id} key={category.slug}> {category?.name} </option>
                ))
            }
                </select>
            </div> 
       </div> 
       <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="">Price <span className="text-red-600 text-xl">*</span></label>
                <input type="text" name="price" required className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
            </div> 
            <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="">Selling Price</label>
                <input type="text" name="sellingPrice" className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
            </div> 
       </div> 
       <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="">Stock <span className="text-red-600 text-xl">*</span></label>
                <input type="text" name="stock" required className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
            </div> 
            <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="">SKU</label>
                <input type="text" name="sku" className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
            </div> 
       </div> 
      
       <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="">Short Description</label>
                <textarea  name="shortDesc" className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
            </div> 
            <div className="flex flex-col gap-1 w-1/2">
                <label>Tags</label>
                <textarea  name="tags" onFocus={()=> setTagGuide(true)} onBlur={()=> setTagGuide(false)}   className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
                {
                    tagGuide && (
                        <p className="text-blue-500"> Put a comma after each tag </p>
                    )
                }
            </div> 
       </div>

       <div className="flex gap-5 w-full mb-5">
            <div className="flex flex-col w-1/2">
                <label htmlFor="">Colors</label>
                <div className="flex items-center gap-5 py-2">
                {
                    colors.map((color) => (
                    <label htmlFor={color.title} key={color.value}>
                        <input type="checkbox" name="colors" id={color.title} value={color.value} /> <span > {color.title} </span>
                    </label>
                    ))
                }
                    
                </div>
            </div> 
            <div className="flex flex-col w-1/2">
                <label htmlFor="">Sizes</label>
                <div className="flex items-center gap-5 py-2">
                {
                    sizes.map((size) => (
                    <label htmlFor={size} key={size}>
                        <input type="checkbox"name="sizes" value={size} id={size} /> {size}
                    </label>
                    ))
                }
                </div>
                
            </div> 
       </div>
     
       <div className="flex gap-5 w-full">
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="">Description</label>
                {/* <textarea  name="description" className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none h-[180px]" /> */}
                <RichTextEditor setDescription={setDescription} description={description} />
                <input type="hidden" value={description} name="description" />
            
            </div> 
            
       </div> 
       <div className="flex gap-5 w-full mt-5">
            <div className="flex flex-col gap-1 w-1/2">
                <label htmlFor="">Upload Images</label>
                <div className="border-2 border-blue-300 rounded-md w-full cursor-pointer">
                <label htmlFor="files">
                <MdCloudUpload className="text-4xl font-bold mx-auto text-blue-300 w-full hover:bg-blue-300 hover:text-black transition-c" />
                <input type="file" className="hidden"  multiple onChange={handleImages}  name="files" id="files" />
                </label>
                </div>
                
                <SubmitBtn text="Create Product" disabled={notAllowedFiles.length > 0} loading={loading} />
            </div>
         
               
                <div className="flex flex-col gap-1 w-1/2">
                    <label htmlFor="">Uploaded Images</label>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                    {
                    allowedFiles.map((item, index) => (
                        <ProductImage item={item} key={index} onClick={()=> handleRemoveFiles(item.url, setAllowedFiles)} />
                    ))
                    }
                    {
                        notAllowedFiles.map((item, index) => (
                            <ProductImage item={item} key={index} notAllowed={true} onClick={()=>handleRemoveFiles(item.url, setNotAllowedFiles)} />
                        ))
                    }
                        
                    </div>
                    <p className="text-red-600">
                    {notAllowedFiles.length > 0 && "File type png, jpg & jpeg are allowed and file size must not exceed 4MB"}
                    </p>
                </div> 
        
       </div> 
    </form>
  )
}

export default AddProductForm
