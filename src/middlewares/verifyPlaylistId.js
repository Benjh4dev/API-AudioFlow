import { validPlaylist } from "../services/playlist.js"
import { handleError} from '../utils/errorHandle.js'


const verifyPlaylistId = async (req, res, next) => {
    try {
        const playlist_id = req.params.playlistId
        const response = await validPlaylist(playlist_id)
        if (!response) {
            res.status(404)
            res.send({ message: `La playlist de ID: ${playlist_id} no se encontró` })
            return
        }
        next()
    } catch (error) {
        console.error(error)
        handleError(res, 'ERROR_DELETING_PLAYLIST')
    }
}
export { verifyPlaylistId}
