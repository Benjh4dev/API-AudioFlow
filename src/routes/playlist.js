import { Router } from "express";
import { checkJwt } from "../middlewares/session.js"
import { verifyUserId } from "../middlewares/verifyUserId.js"
import { addPlaylist, getPlaylists, getUserPlaylists, deletePlaylist, addSongToPlaylist, getPlaylistById, deleteSongToPlaylist } from "../controllers/playlist.js";
import { verifyPlaylistId } from "../middlewares/verifyPlaylistId.js";
import { verifyPlaylistIdToken } from "../middlewares/verifyPlaylistIdToken.js";
import { verifySongId } from "../middlewares/verifySongId.js";

const router = Router()

router.post('/:id', checkJwt, verifyUserId, addPlaylist)
router.delete('/:id', checkJwt, deletePlaylist, verifyUserId)

router.get('/', getPlaylists)

router.get('/:playlistId', getPlaylistById)
router.get('/user/:id', checkJwt, getUserPlaylists)

//RUTA AGREGAR CANCIÓN A PLAYLIST
router.post('/:playlistId/:songId', checkJwt, verifyPlaylistIdToken, verifySongId, addSongToPlaylist)
//RUTA ELIMINAR CANCIÓN DE PLAYLIST
router.delete('/:playlistId/:songId', checkJwt, verifyPlaylistIdToken, deleteSongToPlaylist)

export { router }