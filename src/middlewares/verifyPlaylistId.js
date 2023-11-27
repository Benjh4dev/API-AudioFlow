import { getPlaylistById } from "../services/playlist.js"
const verifyPlaylistId = async (req, res, next) => {
    try {
        const playlist_id = req.params.playlistId
        const userId = req.user.id
        console.log(userId)
        const response = await getPlaylistById(playlist_id, userId)
        if (!response.found) {
            res.status(404)
            res.send({ message: `La playlist de ID: ${playlist_id} no se encontró` })
            return
        }
        if (!response.valid) {
            res.status(403)
            res.send({ message: `La playlist de ID: ${playlist_id} no pertenece al usuario` })
            return
        }

        next()
    } catch (error) {
        console.error(error)
        handleError(res, 'ERROR_DELETING_PLAYLIST')
    }
}
export { verifyPlaylistId}
