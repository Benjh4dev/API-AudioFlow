import { z } from "zod"
import { validatePlaylist } from "../models/playlist.js"
import { insertPlaylist, fetchPlaylists, fetchUserPlaylists, deleteById, getPlaylist, addSongToAPlaylist, deleteSongToAPlaylist } from "../services/playlist.js"
import { handleError } from "../utils/errorHandle.js"


const addPlaylist = async (req, res) => {
    try {

        const { name } = req.body
        const user_id = req.params.id

        const result = validatePlaylist(req.body)
        let hasErrors = !result.success
        const errorIssues = result.error ? [...result.error.issues] : []
        if (hasErrors) {
            res.status(400)
            res.send(result.error);
            return
        }

        const playlist = await insertPlaylist({ name, user_id })
        res.status(201)
        res.json({ playlist })

    } catch (error) {  
        console.log(error)
        handleError(res, 'ERROR_ADD_PLAYLIST')
    }
}

const getPlaylists = async (req, res) => {
    try {   
        const playlists = await fetchPlaylists()
        console.log(playlists)
        res.status(200)
        res.send({ playlists }) 

    } catch (error) {
        console.log(error)
        handleError(res, 'ERROR_FETCHING_PLAYLISTS');
    }
}

const getUserPlaylists = async (req, res) => {
    try {
        const user_id = req.params.id
        const userPlaylists = await fetchUserPlaylists(user_id)
        
        res.status(200)    
        res.json( userPlaylists )
    } catch (error) {
        handleError(res, 'ERROR_FETCHING_USER_PLAYLISTS')
    }
}

const deletePlaylist = async (req, res) => {
    try {
        const playlist_id = req.params.id
        const user_id = req.user.id
        const response = await deleteById(user_id, playlist_id)
        console.log(response)
        if(!response.found){
            res.status(404)
            res.send({message: "La playlist no se encontró"})
            return
        }
        if(!response.valid){
            res.status(401)
            res.send({message: "No tienes permiso para eliminar esta playlist"})
            return
        }
        res.status(200)
        res.send({message: "La playlist se eliminó con éxito de id: " + playlist_id})
    } catch (error) {
        console.error(error);
        handleError(res, 'ERROR_DELETING_PLAYLIST')
    }
}

const addSongToPlaylist = async (req, res) => {
    try {
        const playlist_id = req.params.playlistId
        const song_id = req.params.songId
        const song = req.song
        const response = await addSongToAPlaylist(playlist_id, song_id, song)
        if(response.alreadyExit){
            res.status(400)
            res.send({message: "La cancion ya se encuentra en la playlist"})
            return
        }
        
        if(response.valid){
            res.status(201)
            res.send({message: "La cancion se agregó a la playlist"})
            return
        }
        res.status(400)
        res.send({message: "Ocurrió un error al agregar la cancion a la playlist"})

        
    } catch (error) {
        console.error(error);
        handleError(res, 'ERROR_DELETING_PLAYLIST')
    }
}

const deleteSongToPlaylist = async (req, res) => {
    try {
        const playlist_id = req.params.playlistId
        const song_id = req.params.songId
        const response = await deleteSongToAPlaylist(playlist_id, song_id)
        if(!response.valid){
            res.status(404)
            res.send({ message: `La cancion de ID: ${song_id} no se encontró en la playlist de ID: ${playlist_id}` })
            return
        }
        res.status(200)
        res.send({message: `La cancion de ID: ${song_id} se eliminó de la playlist de ID: ${playlist_id}` })
        
        
    } catch (error) {
        console.error(error);
        handleError(res, 'ERROR_DELETING_PLAYLIST')
    }
}

const getPlaylistById = async (req, res) => {
    try {
        const playlist_id = req.params.playlistId
        const playlist = await getPlaylist(playlist_id)
        res.status(200)
        res.json(playlist)
    } catch (error) {
        handleError(res, 'ERROR_FETCHING_PLAYLIST')
    }
};

export { addPlaylist, getPlaylists, getUserPlaylists, deletePlaylist, addSongToPlaylist, getPlaylistById, deleteSongToPlaylist }