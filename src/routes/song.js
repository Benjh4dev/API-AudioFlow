import { Router } from "express"
import {addSong, getSongs, getUserSongs } from "../controllers/song.js"
import { checkJwt } from "../middlewares/session.js"
import { verifyUserId } from "../middlewares/verifyUserId.js"
const router = Router()
import { verifyAudioAndCoverArtFiles } from "../middlewares/verifyAudioandCoverArtFile.js"
import { checkTypes } from "../middlewares/checkType.js"

router.post('/:id', checkJwt, verifyUserId, verifyAudioAndCoverArtFiles, checkTypes , addSong)
router.get('/:id', checkJwt, getUserSongs)
router.get('/', getSongs)

export { router }