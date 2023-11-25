import { Router } from "express";
import { checkJwt } from "../middlewares/session.js"
import { verifyUserId } from "../middlewares/verifyUserId.js"
import { addPlaylist, getPlaylists, getUserPlaylists, deletePlaylist, addSongToPlaylist, getPlaylist } from "../controllers/playlist.js";
import { verifyPlaylistId } from "../middlewares/verifyPlaylistId.js";
import { verifySongId } from "../middlewares/verifySongId.js";

const router = Router()

router.post('/:id', checkJwt, verifyUserId, addPlaylist)
router.delete('/:id', checkJwt, deletePlaylist, verifyUserId)

router.get('/', getPlaylists)

router.get('/:playlistId', verifyPlaylistId, getPlaylist)
router.get('/user/:id', checkJwt, getUserPlaylists)

//VerifyPlaylist y verifySongId validar que la id del usuario sea el del token
router.post('/:playlistId/:songId', checkJwt, verifyPlaylistId, verifySongId, addSongToPlaylist)

export { router }