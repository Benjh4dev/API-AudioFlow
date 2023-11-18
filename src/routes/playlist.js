import { Router } from "express";
import { checkJwt } from "../middlewares/session.js"
import { verifyUserId } from "../middlewares/verifyUserId.js"
import { addPlaylist, getPlaylist, getUserPlaylist, deletePlaylist } from "../controllers/playlist.js";
import { checkTypes } from "../middlewares/checkType.js";

const router = Router()

router.post('/:id', checkJwt, verifyUserId, checkTypes , addPlaylist)
router.get('/:id', checkJwt, getUserPlaylist)
router.get('/', getPlaylist)
router.delete('/:id', checkJwt, deletePlaylist)

export { router }