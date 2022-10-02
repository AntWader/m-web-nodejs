import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'dduzmrxe4',
    api_key: '179739283727672',
    api_secret: 'OkPbqHR4I_nb5-_Ff60o3ChaNuQ',
    secure: true
});

export async function cloudinaryUpload(filepath: string) {
    try {
        let result = await cloudinary.uploader
            .upload(filepath,
                {
                    folder: 'books',
                    resource_type: 'image',
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true
                })

        return result
    } catch (e) {
        console.log(e);
    }
}
