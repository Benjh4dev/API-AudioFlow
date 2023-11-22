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

const fetchSongs = async () => {
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

const fetchUserSongs = async (user_id) => {
  try {
    const songsCollection = db.collection("song");
    const snapshot = await songsCollection.where("user_id", "==", user_id).get();

    if (snapshot.empty) {
      console.log("No se encontraron canciones del usuario.");
      return [];
    }

    const userSongs = [];
    snapshot.forEach(doc => {
      userSongs.push({ id: doc.id, ...doc.data() });
    });

    console.log("Canciones del usuario recuperadas con éxito.");
    return userSongs;
  } catch (error) {
    console.error("Error al obtener las canciones de la base de datos:", error);
    throw error;
  }
};
  
const deleteById = async (user_id, song_id) => {
  try {
    const song = await db.collection('song').doc(song_id).get()
    if(!song.exists) {
      return {found : false, valid: false}
    }
    if(song.data().user_id != user_id) {
      return {found: true, valid: false}
    }
    await db.collection('song').doc(song_id).delete()
    return {found: true, valid: true}
    
  } catch (error) {
    console.error("Error al eliminar la cancion de la base de datos:", error);
    throw error;
  }
}

const getById = async (song_id) => {
  try {
    const song = await db.collection('song').doc(song_id).get()
    if (!song.exists) {
      return { found: false }
    }
    return { found: true, song: song.data() }
  } catch (error) {
    console.error("Error al obtener la canción de la base de datos:", error);
    throw error;
  }
}



export { insertSong, fetchSongs, fetchUserSongs, deleteById, getById }