import multer from 'multer'
import { handleError } from '../utils/errorHandle.js'
const upload = multer()

const uploadMiddleware = (req, res, next) => {
    
    try {
        upload.single('file')(req, res, (err) => {
            if (err) {
              console.log(err)
              return res.status(400).json({ error: 'No se incluye el campo file en la petición' })
            }
        
            const contentType = req.get('content-type')
            console.log(contentType)
            const type = contentType.split(';')[0]
        
            if (type !== 'multipart/form-data') {
              return res.status(400).json({ error: 'Invalid request format. Must be multipart/form-data.' })
            }
        
            if (!req.file) {
              return res.status(400).json({ error: 'Missing file field in the request.' });
            }
      
            next();
        })
    } catch (error) {
        handleError(res, 'ERROR_UPLOAD_FILE')
    }
}


export { uploadMiddleware }