import { db } from "../firebase/config.js"
import { cascadeDelete } from "../utils/cascadeDeleteHandle.js"
import { uploadToStorage } from "../utils/storageHandle.js"

const insertSong = async ({ name, audio_file, cover_art, duration, artist, user_id }) => {
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
        return [];
      }
  
      const songs = [];
      snapshot.forEach(doc => {
        songs.push({ id: doc.id, ...doc.data() });
      });
  
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
      return [];
    }

    const userSongs = [];
    snapshot.forEach(doc => {
      userSongs.push({ id: doc.id, ...doc.data() });
    });

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
    /* VERSION ANTIGUA, ESTÁ FUNCIONANDO PERFECTAMENTE, SIN EMBARGO, SE OPTÓ POR LA NUEVA VERSIÓN PERO ESTÁ SIN TESTEAR
    await db.collection('song').doc(song_id).delete()
    await cascadeDelete(song_id)
    */
    const deleteSongPromise = db.collection('song').doc(song_id).delete()
    const cascadeDeletePromise = cascadeDelete(song_id)
    await Promise.all([deleteSongPromise, cascadeDeletePromise])
    return {found: true, valid: true}
    
  } catch (error) {
    console.error("Error al eliminar la cancion de la base de datos:", error)
    throw error
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
    console.error("Error al obtener la canción de la base de datos:", error)
    throw error
  }
}



export { insertSong, fetchSongs, fetchUserSongs, deleteById, getById }