import { Router } from "express";
import { checkJwt } from "../middlewares/session.js"
import { verifyUserId } from "../middlewares/verifyUserId.js"
import { addPlaylist, getPlaylists, getUserPlaylists, deletePlaylist } from "../controllers/playlist.js";
import { checkTypes } from "../middlewares/checkType.js";

const router = Router()

//el post, no necesita la función de checkTypes, ya que no se sube ningun archivo
router.post('/:id', checkJwt, verifyUserId, addPlaylist)
router.get('/:id', checkJwt, getUserPlaylists)
router.get('/', getPlaylists)
//el delete no se implementará, en caso de implementarse, se debe usar el checkJwt y el verifyUserId
router.delete('/:id', checkJwt, deletePlaylist)

export { router }