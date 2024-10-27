"use client";
import { MdCloudUpload } from 'react-icons/md'
import SubmitBtn from '../SubmitBtn'
import { ChangeEvent, useEffect, useState } from 'react';
import ProductImage from './ProductImage';
import DeleteDialog from './DeleteDialog';
import UploadedImageCard from './UploadedImageCard';
import RichTextEditor from '../RichTextInput';
import { updateProduct } from '@/utils/actions/product';
import { toast } from 'react-toastify';
import { redirectTo, revalidate } from '@/utils/services/services';

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

const UpdateProductForm = ({categories, product}: {categories: any, product: any}) => {
    // console.log(product.colors);
    const [selectedColors, setSelectedColors] = useState<string[]>(product.colors);
    const [selectedSizes, setSelectedSizes] = useState<string[]>(product.sizes);
    const [description, setDescription] = useState(product.description);
    const [allowedFiles, setAllowedFiles] = useState<{file: File, url: string}[]>([]);
    const [notAllowedFiles, setNotAllowedFiles] = useState<{file: File, url: string}[]>([]);
    const [loading, setLoading] = useState(false);
    

    const handleShowImages = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0) {
            let files = e.target.files;
            for(let i = 0; i < files.length; i++) {
                let url = URL.createObjectURL(files[i]);
                if(files[i].type.startsWith('image/') && files[i].size < 4*1024*1024) {
                    setAllowedFiles(prev => [...prev, {file: files[i], url}]);
                } else {
                    setNotAllowedFiles(prev => [...prev, {file: files[i], url}]);
                }
            }
        }
    }

    const handleSelectedValues = (value: string, setValues: (prev: (prev: string[]) => string[]) => void) => {
        setValues(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    }
    
    const handleRemoveFiles = (url: string, setFiles: (prev: (prev: {file: File, url: string}[]) => {file: File, url: string}[]) => void) => {
            setFiles(prev => prev.filter(item => item.url !== url));
    }


   

    const submitFormData = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);   
        for(let i = 0; i < allowedFiles.length; i++) {
            formData.append("uploadedFiles", allowedFiles[i].file);
        }
        formData.append('description', description);
        try {
            setLoading(true);
            const resp = await updateProduct(formData);
            if(resp.success) {
                toast.success(resp.message);
                revalidate("/dashboard/product");
                redirectTo("/dashboard/product");
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

  return (
    <form onSubmit={submitFormData} className="p-8 bg-bgLightSecondary dark:bg-bgDarkSecondary rounded-md w-full flex flex-col gap-2">
   
    <div className="flex gap-5 w-full">
         <div className="flex flex-col gap-1 w-1/2">
            <input type="hidden" name="id" value={product._id} />
             <label htmlFor="">Name</label>
             <input type="text" name="name" value={product.name} className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
         </div> 
         <div className="flex flex-col gap-1 w-1/2">
             <label htmlFor="">Category</label>
             <select name="category" required className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none"> 
            {
                categories?.map((category: any, index: number) => (
                    <option value={category._id} selected={category._id === product.category}> {category.name} </option>
                ))
            }
             </select>
         </div> 
    </div> 
    <div className="flex gap-5 w-full">
         <div className="flex flex-col gap-1 w-1/2">
             <label htmlFor="">Price</label>
             <input type="text" name="price" value={product.price}  className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
         </div> 
         <div className="flex flex-col gap-1 w-1/2">
             <label htmlFor="">Selling Price</label>
             <input type="text" name="sellingPrice" value={product.sellingPrice} className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
         </div> 
    </div> 
    <div className="flex gap-5 w-full">
         <div className="flex flex-col gap-1 w-1/2">
             <label htmlFor="">Stock</label>
             <input type="text" name="stock" value={product.stock}  className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
         </div> 
         <div className="flex flex-col gap-1 w-1/2">
             <label htmlFor="">SKU</label>
             <input type="text" name="sku" value={product.sku} className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
         </div> 
    </div> 
   
    <div className="flex gap-5 w-full">
         <div className="flex flex-col gap-1 w-1/2">
             <label htmlFor="">Short Description</label>
             <input type="text" name="shortDesc" value={product.shortDesc} className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
         </div> 
         <div className="flex flex-col gap-1 w-1/2">
             <label htmlFor="">Tags</label>
             <input type="text" name="tags" value={product.tags} className="py-2 bg-bgLightPrimary dark:bg-bgDarkPrimary rounded-sm px-4 outline-none" />
         </div> 
    </div>
    <div className="flex gap-5 w-full mb-5">
            <div className="flex flex-col w-1/2">
                <label htmlFor="">Colors</label>
                <div className="flex items-center gap-5 py-2">
                {
                    colors.map((color) => {
                        
                        return  (
                            <label htmlFor={color.title} key={color.value}>
                                <input type="checkbox" checked={selectedColors.includes(color.value)} onClick={()=> handleSelectedValues(color.value, setSelectedColors)}   name="colors" id={color.title} value={color.value} /> <span > {color.title} </span>
                            </label>
                            )
                    })
                }
                    
                </div>
            </div> 
            <div className="flex flex-col w-1/2">
                <label htmlFor="">Sizes</label>
                <div className="flex items-center gap-5 py-2">
                {
                    sizes.map((size) => {
                        
                        return (
                            <label htmlFor={size} key={size}>
                                <input type="checkbox" name="sizes" onChange={()=> handleSelectedValues(size, setSelectedSizes)} checked={selectedSizes.includes(size)}   value={size} id={size} /> {size}
                            </label>
                        )  
                    }
                )
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
         <div className="flex flex-col justify-end gap-1 w-1/2">
             <label htmlFor="">Upload Images</label>
             <div className="border-2 border-blue-300 rounded-md w-full cursor-pointer">
             <label htmlFor="files">
             <MdCloudUpload className="text-4xl font-bold mx-auto text-blue-300 w-full hover:bg-blue-300 hover:text-black transition-c" />
             <input type="file" className="hidden" onChange={handleShowImages} multiple  name="files" id="files" />
             </label>
             </div>
             
             <SubmitBtn text="Update Product" disabled={notAllowedFiles.length > 0} loading={loading} />
         </div> 
         <div className="flex flex-col gap-1 w-1/2">
             <label htmlFor="">Uploaded Images</label>
             <div className="grid grid-cols-4 gap-2 mt-2">
            {
                product.images.map((image:string, index: number) => (
                    <UploadedImageCard img={{url: image, publicKey:product.images_public_id[index]}}/>
                ))
            }
            {
                allowedFiles.map((item, index) => (
                    <ProductImage item={item} key={index} onClick={()=> handleRemoveFiles(item.url, setAllowedFiles)} />
                ))
            }
            {
                notAllowedFiles.map((item, index) => (
                    <ProductImage item={item} key={index} notAllowed={true} onClick={()=> handleRemoveFiles(item.url, setNotAllowedFiles)} />
                ))
            }
             </div>
            <p className="text-red-600"> {notAllowedFiles.length > 0 && "File type png, jpg & jpeg are allowed and size must not exceed 4MB"} </p>
         </div> 
    </div> 
 </form>
  )
}

export default UpdateProductForm
