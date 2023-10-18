import { validateSong } from "../models/song.js"
import { z } from "zod"
import { uploadToStorage } from "../utils/storageHandle.js"
import { insertSong } from "../services/song.js"
import { handleError } from "../utils/errorHandle.js"

const addSong = async (req, res) => {
  try {
    const { name } = req.body
    const cover_art = req.files['cover_art'][0]
    const audio_file = req.files['audio_file'][0]
    console.log(name, cover_art, audio_file)

    const song = await insertSong({ name, audio_file, cover_art })
    res.status(201)
    res.json({song})

    
  } catch (error) {
    handleError(res, 'ERROR_ADD_SONG')
  }
    
}

export { addSong } 