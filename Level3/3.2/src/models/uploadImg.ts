import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: 'dduzmrxe4',
    api_key: '179739283727672',
    api_secret: 'OkPbqHR4I_nb5-_Ff60o3ChaNuQ',
    secure: true
});

export function cloudinaryUpload(file: any) {
    cloudinary.uploader
        .upload(file,
            {
                folder: 'books',
                resource_type: 'image',
                use_filename: true,
                unique_filename: false,
                overwrite: true
            })
        .then(result => console.log(result.secure_url))
        .catch(error => console.log(error))
}

// cloudinary.uploader
//     .upload('./frontend/books-page/books-page_files/22.jpg',
//         {
//             folder: 'books',
//             resource_type: 'image',
//             use_filename: true,
//             unique_filename: false,
//             overwrite: true
//         })
//     .then(result => console.log('success', JSON.stringify(result, null, 2)))
//     .catch(error => console.log(error))