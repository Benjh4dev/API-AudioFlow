import { Router } from "express";
import { checkJwt } from "../middlewares/session.js"
import { verifyUserId } from "../middlewares/verifyUserId.js"
import { addPlaylist, getPlaylist, getUserPlaylist, deletePlaylist } from "../controllers/playlist.js";
import { checkTypes } from "../middlewares/checkType.js";

const router = Router()

//el post, no necesita la función de checkTypes, ya que no se sube ningun archivo
router.post('/:id', checkJwt, verifyUserId, addPlaylist)
router.get('/:id', checkJwt, getUserPlaylist)
router.get('/', getPlaylist)
//el delete no se implementará, en caso de implementarse, se debe usar el checkJwt y el verifyUserId
router.delete('/:id', checkJwt, deletePlaylist)

export { router }