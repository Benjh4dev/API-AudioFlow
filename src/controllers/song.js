import { validateSong } from "../models/song.js"
import { z } from "zod"
import { uploadToStorage } from "../utils/storageHandle.js"
import { insertSong, fetchSongs, fetchUserSongs, deleteById } from "../services/song.js"
import { handleError } from "../utils/errorHandle.js"

const addSong = async (req, res) => {
  try {
    const { name, artist, duration } = req.body
    const user_id = req.params.id 
    const cover_art = req.files['cover_art'][0]
    const audio_file = req.files['audio_file'][0]

    const song = await insertSong({ name, audio_file, cover_art, duration, artist, user_id })
    res.status(201)
    res.json({song})
    
  } catch (error) {
    handleError(res, 'ERROR_ADD_SONG')
  }
    
}

const getSongs = async (req, res) => {
  try {
    const songs = await fetchSongs()
    res.status(200)
    res.send({songs})
  } catch (error) {
    handleError(res, 'ERROR_FETCHING_SONGS');
  };
};

const getUserSongs = async (req, res) => {
  try {
    const user_id = req.params.id
    const userSongs = await fetchUserSongs(user_id)
    if (userSongs.length == 0) return res.status(404).send("El usuario no tiene canciones")
    else {
      res.status(201)
      res.json(userSongs)
    }
  } catch (error) {
    handleError(res, 'ERROR_FETCHING_USER_SONGS')
  };
};

const deleteSong = async (req, res) => {
  try {
    
    const song_id = req.params.id
    const user_id = req.user.id 
    const response = await deleteById(user_id, song_id)
    if(!response.found){
      res.status(404)
      res.send({message: "La canción no se encontró"})
      return
    }
    if(!response.valid){
      res.status(401)
      res.send({message: "No tienes permiso para eliminar esta canción"})
      return
    }    
    res.status(200)
    res.send({message: "La canción se eliminó con éxito de id: " + song_id})

    

  } catch (error) {
    handleError(res, 'ERROR_DELETING_SONG')
  }
}

export { addSong, getSongs, getUserSongs, deleteSong } 