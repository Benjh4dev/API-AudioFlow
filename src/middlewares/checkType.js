import { verifyType } from "../utils/imageHandle.js"
import z from 'zod'
import { fileTypeFromBuffer } from "file-type"
import { handleError } from "../utils/errorHandle.js"

const checkTypes = async (req, res, next) => {   
    try {
        const coverArt = req.files['cover_art'][0]
        const valid = await verifyType(coverArt)
        let hasErrors = false
        const errorIssues =  []

        if(!valid.ok) {
            const emailError = {
                code: z.ZodIssueCode.custom,
                path: ['cover_art'],
                message: 'Tipo de archivo inválido, solo se aceptan jpeg, jpg o png'
            };
            errorIssues.push(emailError)
            hasErrors = true;
        }

        const audioFile = req.files['audio_file'][0]
        const audioType = await fileTypeFromBuffer(audioFile.buffer)
        
        if(!audioType || (audioType.mime !== 'audio/vnd.wave' && audioType.mime !== 'audio/mpeg')) {
            const emailError = {
                code: z.ZodIssueCode.custom,
                path: ['audio_file'],
                message: 'Tipo de archivo inválido, solo se aceptan mp3 o wav'
            };
            errorIssues.push(emailError)
            hasErrors = true;
        }

        const nombreOriginal = audioFile.originalname.toLowerCase()
        const extensionOriginal = nombreOriginal.split('.').pop()

        if(extensionOriginal !== audioType.ext) {
            const emailError = {
                code: z.ZodIssueCode.custom,
                path: ['audio_file'],
                message: 'Se ha malformado el archivo de audio, por favor, intente nuevamente'
            };
            errorIssues.push(emailError)
            hasErrors = true;
        }

        if (hasErrors) {
            res.status(400)
            res.send({ error: new z.ZodError(errorIssues) })
            return
        }

        console.log("ta weno mi papu")
        next()
    } catch (error) {
        handleError(res, 'ERROR_UPLOAD_FILE')
    }
}

export { checkTypes }