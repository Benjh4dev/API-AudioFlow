import { z } from "zod"
import { validatePlaylist } from "../models/playlist.js"
import { insertPlaylist, fetchPlaylists, fetchUserPlaylists, deleteById } from "../services/playlist.js"
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
        if (userPlaylists.length == 0) return res.status(404).send("El usuario no tiene playlist")
        else {
            res.status(201)
            res.json(userPlaylists)
        }
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

export { addPlaylist, getPlaylists, getUserPlaylists, deletePlaylist }