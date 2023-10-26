import { validateSong } from "../models/song.js"
import { z } from "zod"
import { uploadToStorage } from "../utils/storageHandle.js"
import { insertSong, fetchSongs, fetchUserSongs } from "../services/song.js"
import { handleError } from "../utils/errorHandle.js"

const addSong = async (req, res) => {
  try {
    const { name, artist, duration } = req.body
    const user_id = req.params.id 
    const cover_art = req.files['cover_art'][0]
    const audio_file = req.files['audio_file'][0]
    console.log(name, cover_art, audio_file)

    const song = await insertSong({ name, audio_file, cover_art, duration, artist, user_id })
    res.status(201)
    res.json({song})
    
  } catch (error) {
    handleError(res, 'ERROR_ADD_SONG')
  }
    
}

const getSongs = async (req, res) => {
  try {
    const songs = await fetchSongs();
    if (songs.length == 0) return res.status(404).send("No hay canciones en el sistema");
    else {
      res.status(201);
      res.json(songs);
    }
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

export { addSong, getSongs, getUserSongs } 