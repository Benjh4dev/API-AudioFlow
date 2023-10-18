import { storage } from '../firebase/config.js'

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

export { uploadToStorage }