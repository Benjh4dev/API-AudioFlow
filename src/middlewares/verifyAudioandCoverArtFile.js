import multer from "multer"
import z from 'zod'
import { handleError } from '../utils/errorHandle.js'
import { validateSong } from "../models/song.js"

const upload = multer()

const verifyAudioAndCoverArtFiles = (req, res, next) => {
  try {
    upload.fields([{ name: 'audio_file', maxCount: 1 }, { name: 'cover_art', maxCount: 1 }])(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: 'Error al subir archivos: ' + err.message })
      }

      const contentType = req.get('content-type')
      const type = contentType.split(';')[0]

      if (type !== 'multipart/form-data') {
        return res.status(400).json({ error: 'Formato de solicitud inválido. Debe ser multipart/form-data.' })
      }

      const result = validateSong(req.body)
      let hasErrors = !result.success
      const errorIssues = result.error ? [...result.error.issues] : []

      if (!req.files['audio_file']) {
        const emailError = {
          code: z.ZodIssueCode.custom,
          path: ['audio_file'],
          message: 'El archivo audio_file es obligatorio'
        };
        errorIssues.push(emailError)
        hasErrors = true;
      }

      if (!req.files['cover_art']) {
        const emailError = {
          code: z.ZodIssueCode.custom,
          path: ['cover_art'],
          message: 'El archivo cover_art es obligatorio'
        };
        errorIssues.push(emailError)
        hasErrors = true;
      }

      if(hasErrors) {
        res.status(400)
        res.send({ error: new z.ZodError(errorIssues) })
        return
      }

      next()
    });
  } catch (error) {
    handleError(res, 'ERROR_UPLOAD_FILE')
  }
};

export { verifyAudioAndCoverArtFiles }
