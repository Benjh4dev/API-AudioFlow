import {getById} from '../services/song.js'
const verifySongId = async (req, res, next) => {
    try {
        const song_id = req.params.songId
        const response = await getById(song_id)
        if (!response.found) {
            res.status(404)
            res.send({ message: `La cancion de ID: ${song_id} no se encontró` })
            return
        }
        req.song = response.song
        next()
    } catch (error) {
        console.error(error)
        handleError(res, 'ERROR_DELETING_PLAYLIST')
    }
}

export { verifySongId}