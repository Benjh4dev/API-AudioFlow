import { validatePlaylist } from "../models/playlist.js"
import { z } from "zod"
import { uploadToStorage } from "../utils/storageHandle.js"
import { insertPlaylist, fetchPlaylist, fetchUserPlaylist } from "../services/playlist.js"
import { handleError } from "../utils/errorHandle.js"

const addPlaylist = async (req, res) => {
    try {
        const { name } = req.body
        //falta hacer la comporbación del name, usando el validatePlaylist
        const user_id = req.params.id
        //la playlist solo contiene el nombre, sin covert_art
        const covert_art = req.files['cover_art'][0]
        console.log(name, covert_art)

        const playlist = await insertPlaylist({ name, covert_art, user_id })
        res.status(201)
        res.json({ playlist })

    } catch (error) {  
        handleError(res, 'ERROR_ADD_PLAYLIST')
    }
}

const getPlaylist = async (req, res) => {
    try {   
        const playlist = await fetchPlaylist()
        console.log(playlist)
        res.status(200)
        res.send({ playlist }) 

    } catch (error) {
        console.log(error)
        handleError(res, 'ERROR_FETCHING_PLAYLIST');
    }
}

const getUserPlaylist = async (req, res) => {
    try {
        const user_id = req.params.id
        const userPlaylist = await fetchUserPlaylist(user_id)
        if (userPlaylist.length == 0) return res.status(404).send("El usuario no tiene playlist")
        else {
            res.status(201)
            res.json(userPlaylist)
        }
    } catch (error) {
        handleError(res, 'ERROR_FETCHING_USER_PLAYLIST')
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

export { addPlaylist, getPlaylist, getUserPlaylist, deletePlaylist }