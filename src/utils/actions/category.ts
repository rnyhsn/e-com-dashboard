"use server";

import { connectToDB } from "../db";
import { Category } from "../models/category";
import { slugify } from "../services/createSlug";
import { deleteImage, uploadImage } from "../services/uploadImage";


export const createCategory = async (prevState: any, formData: FormData) => {
    const {name, description, file} = Object.fromEntries(formData);
    console.log(name, description);
    console.log("File", file);
    try {
        await connectToDB();
        const slug = slugify(name.toString());
        
        // console.log(file instanceof File);
        let image: any;
        if(file instanceof File && file.size > 0) {
            if(file.type.startsWith("image/")) {
                if(file.size > 2*1024*1024) {
                    throw new Error("File size must not exceed 2MB");
                }
                image = await uploadImage(file, "category");
            } else {
                throw new Error("File type png, jpg, jpeg are allowed only");
            }
           
        }
        console.log("Image:", image);
        
        console.log(image);
        const result = await Category.create({
            name,
            slug,
            description,
            image: image?.secure_url,
            image_public_id: image?.public_id
        });

        console.log(result);
        return {
            success: true,
            message: "Category Created successfully"
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}


export const getCategories = async () => {
    try {
        await connectToDB();
        const categories = await Category.find();

        return {
            success: true,
            message: "Categories Fetched",
            payload: categories
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}



export const getCategory = async (slug: string) => {
    try {
        await connectToDB();
        const result = await Category.findOne({slug});
        if(!result) {
            return {
                success: false,
                statusCode: 404,
                message: "Category not Found"
            }
        }
        return {
            success: true,
            message: "Category found",
            payload: result
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}


export const updateCategory = async (prevState: any, formData: FormData) => {
    const {name, description, file, slug} = Object.fromEntries(formData);
    console.log(name, description, slug);
    let image: any;
    try {
        await connectToDB();
        const category = await Category.findOne({slug});
        if(!category) {
            return {
                success: false,
                statusCode: 404,
                message: "Category not found"
            }
        }

        if(file instanceof File && file.size > 0) {
            if(!file.type.startsWith("image/")) {
                throw new Error("File type png, jpg & jpeg are allowed only");
            }

            if(file.size > 2*1024*1024) {
                throw new Error("File size does not exceed 2MB");
            }

            const image_public_id = category.image_public_id
            if(image_public_id) {
                const deleteResp = await deleteImage(image_public_id);
                console.log("Delete image info:", deleteResp);
            }

            image = await uploadImage(file, "category");
            console.log("image Info:", image);
        }

        const newSlug = slugify(name as string);
        const updatedFields: any = {
            name: name.toString(),
            slug: newSlug,
            image: image?.secure_url as string,
            image_public_id: image?.public_id as string,
            description: description.toString()
        }

        Object.keys(updatedFields).forEach((key) => updatedFields[key]  === '' && delete updatedFields[key]);

        await Category.findOneAndUpdate(
            {slug},
            updatedFields
        )

        return {
            success: true,
            message: "Category updated successfully"
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}


export const deleteCategory = async (prevState: any, formData: FormData) => {
    try {
        // const resp = await Category.findOneAndDelete({slug});
        const slug = formData.get('slug');

        const category = await Category.findOne({slug});
        console.log(category);
        if(!category) {
            return {
                success: false,
                statusCode: 404,
                message: "Category not found"
            }
        }

        if(category.image_public_id) {
            await deleteImage(category.image_public_id);
        }

        await Category.findOneAndDelete({slug});

        return {
            success: true,
            message: "Category deleted successfully"
        }
    } catch (error: any) {
        return {
            success: false,
            messsage: error.message
        }
    }
}