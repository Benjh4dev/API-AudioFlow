import { getPlaylistById } from "../services/playlist.js"
const verifyPlaylistId = async (req, res, next) => {
    try {
        const playlist_id = req.params.playlistId
        const response = await getPlaylistById(playlist_id)
        if (!response.found) {
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
