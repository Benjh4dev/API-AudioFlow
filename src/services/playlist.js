import { db } from "../firebase/config.js"
import { uploadToStorage } from "../utils/storageHandle.js"

const insertSong = async ({ name, audio_file, cover_art, duration, artist, user_id }) => {
    console.log(audio_file , cover_art)
    const [coverURL, audioURL] = await Promise.all([
        uploadToStorage(cover_art),
        uploadToStorage(audio_file)
    ])

    const song = {
        user_id,
        name,
        coverURL,
        audioURL,
        artist,
        duration
    }

    const docRef = await db.collection('song').add(song)
    const songWithID = { id: docRef.id, ...song }

    console.log("Canción agregada con ID: ", docRef.id)
    return songWithID
}




export { insertSong }