"use server";

import { deleteImage, uploadImage } from "../services/uploadImage";
import { slugify } from "../services/createSlug";
import { Product } from "../models/product";
import { redirectTo, revalidate } from "../services/services";


export const createProduct = async (formData: FormData) => {
    const {name, category, price, sellingPrice, stock,  sku, shortDesc, tags, description,} = Object.fromEntries(formData);

    const uploadedFiles = formData.getAll('uploadedFiles');
    const colors = formData.getAll('colors');
    const sizes = formData.getAll('sizes');
    const allTags = tags.toString().split(",").map(item => item.trim());
    try {
        let images_public_id: string[] = [];
        let images: string[] = [];
        // await uploadedFiles.forEach(async (file) => {
        //     const resp: any = await uploadImage(file as File, 'product')
        //     console.log(resp);
        //     images_public_id.push(resp?.public_id);
        //     images.push(resp?.secure_url);
        // })

        for(let i = 0; i < uploadedFiles.length; i++) {
            const resp: any = await uploadImage(uploadedFiles[i] as File, 'product');
            images.push(resp?.secure_url);
            images_public_id.push(resp?.public_id);
        }

        const data = {
            name,
            slug: slugify(name.toString()),
            category,
            price: Number(price),
            sellingPrice: Number(sellingPrice),
            stock: Number(stock),
            shortDesc,
            sku,
            description,
            colors,
            sizes,
            tags: allTags,
            images_public_id,
            images
        }

        await Product.create(data);
        
       return {
        success: true,
        message: "Product created successfully",
       }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}





export const getProducts = async () => {
    try {
        let products = await Product.find().populate('category').lean();

        products = products.map((product: any) => ({...product, _id: String(product._id)}))

        if(products.length === 0) {
            return {
                success: false,
                statusCode: 404,
                message: "No Product was Added"
            }
        }

        return {
            success: true,
            message: "Success",
            payload: products
        }
    } catch (error: any) {
       return {
        success: false,
        message: error.message
       }
    }
}



export const getProduct = async (slug: string) => {
    try {
        const product = await Product.findOne({slug}).lean();
        if(!product) {
            return {
                success: false,
                statusCode: 404,
                message: "Product not found",
            }
        }

        return {
            success: true,
            message: "Product found",
            payload: product
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message 
        }
    }
}



export const updateProduct = async (formData: FormData) => {
    const {id, name, category, price, sellingPrice, stock, sku, shortDesc, description} = Object.fromEntries(formData);
    const colors = formData.getAll('colors');
    const sizes = formData.getAll('sizes');
    const files = formData.getAll('uploadedFiles');
    try {
        let images: string[] = [];
        let images_public_id: string[] = [];
        for(let i = 0; i < files.length; i++) {
            const resp: any = await uploadImage(files[i] as File, 'product');
            images.push(resp.secure_url);
            images_public_id.push(resp.public_id);
        }
        
        await Product.findByIdAndUpdate(id, {
            name,
            category,
            price,
            sellingPrice,
            stock,
            sku,
            shortDesc,
            description,
            sizes,
            colors,
            $push: {
                images: { $each: [...images] },
                images_public_id: { $each: [...images_public_id] }
            }

            
        })
        return {
            success: true,
            message: "Product Updated successfully"
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
    
}



export const deleteProduct = async (prev: {success: boolean|string, message: string}, formData: FormData) => {
    try {
        const id = formData.get('id');
        console.log(id);
        const product = await Product.findById(id);
        if(product) {
            if(product.images_public_id.length > 0) {
                for(let i = 0; i < product.images_public_id.length; i++) {
                    await deleteImage(product.images_public_id[i]);
                }
            }
            await Product.findByIdAndDelete(id);
        } else {
            throw new Error("Product not found");
        }
        // return {
        //     success: true,
        //     message: "Product deleted successfully"
        // }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
    revalidate("/dashboard/product");
    redirectTo("/dashboard/product");
}

export const deleteProductImage = async (url: string, publicKey: string) => {
        try {
            console.log(url, publicKey);

            const product = await Product.findOneAndUpdate({
                images: url,
                images_public_id: publicKey
            },
            {
                $pull: {
                    images: url,
                    images_public_id: publicKey
                }
            }, {
                new: true
            }
        )
        if(product) {
            await deleteImage(publicKey);
        }
            // console.log(product);
            // await deleteImage(publicKey);
        } catch (error) {
            
        }

        revalidate(`/dashboard/product/update`)
        
}