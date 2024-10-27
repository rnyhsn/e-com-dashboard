import cloudinary from "./cloudinary"


export const uploadImage = async (file: File | null, folder: 'category' | 'product') => {
    if(!file) return;
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
        await cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder
            },
            async (error, result) => {
                if(error) {
                    reject(error);
                }
                resolve(result);
            }
        ).end(bytes);
    })
}


export const deleteImage = async (public_id: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await cloudinary.uploader.destroy(public_id);
            console.log(result);
            resolve(result);
        } catch (error: any) {   
            reject(error.message);
        }
    })
}