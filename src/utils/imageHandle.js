import { validateBufferMIMEType } from "validate-image-type"
import { storage } from '../firebase/config.js';

const verifyType = async (file) => {
    
    const valid = await validateBufferMIMEType(file.buffer, {
        allowMimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
    })
    console.log(valid)
    return valid
}

const uploadToStorage = async (file) => {
    try { 
        const bucket = storage.bucket()
        const fileUpload = bucket.file(file.originalname)
        const fileBuffer = file.buffer
        await fileUpload.save(fileBuffer, {
            metadata: {
                contentType: file.mimetype,
            },
        })
        const [url] = await fileUpload.getSignedUrl({
            action: 'read', 
            expires: '01-01-2500',
        })
        return url
    } catch (error) {
        console.error('Error al subir el archivo:', error);
        throw error;
    }
};

export { verifyType, uploadToStorage }
