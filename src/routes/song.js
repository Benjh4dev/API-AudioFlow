import { Router } from "express"
import {addSong} from "../controllers/song.js"
import { checkJwt } from "../middlewares/session.js"
import { verifyUserId } from "../middlewares/verifyUserId.js"
const router = Router()
import { verifyAudioAndCoverArtFiles } from "../middlewares/verifyAudioandCoverArtFile.js"
import { checkTypes } from "../middlewares/checkType.js"

router.post('/', verifyAudioAndCoverArtFiles, checkTypes ,addSong)

export { router }