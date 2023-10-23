import { db } from "../firebase/config.js"
import { uploadToStorage } from "../utils/storageHandle.js"

const insertSong = async ({ name, audio_file, cover_art, duration, artist }) => {
    console.log(audio_file , cover_art)
    const [coverURL, audioURL] = await Promise.all([
        uploadToStorage(cover_art),
        uploadToStorage(audio_file)
    ])

    const song = {
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

const getAllSongs = async () => {
    try {
      const songsCollection = db.collection("song");
      const snapshot = await songsCollection.get();
  
      if (snapshot.empty) {
        console.log("No se encontraron canciones.");
        return [];
      }
  
      const songs = [];
      snapshot.forEach(doc => {
        songs.push({ id: doc.id, ...doc.data() });
      });
  
      console.log("Canciones recuperadas con éxito.");
      return songs;
    } catch (error) {
      console.error("Error al obtener las canciones de la base de datos:", error);
      throw error;
    }
  };
  

export { insertSong, getAllSongs }