import { db } from "../firebase/config.js"

const insertPlaylist = async ({ name, user_id }) => {
    const playlist = {
        name,
        user_id,
        timestamp: new Date(),
    }
    const docRef = await db.collection('playlist').add(playlist)
    const playlistWithID = { id: docRef.id, ...playlist }
    console.log("Playlist agregada con ID: ", docRef.id)
    return playlistWithID
}

const fetchPlaylists = async () => { 
    try{
        const playlistCollection = db.collection("playlist");
        const snapshot = await playlistCollection.get();

        if(snapshot.empty){
            console.log("No se encontraron playlists.");
            return [];
        }
        const playlists = [];
        snapshot.forEach(doc => {
            playlists.push({ id: doc.id, ...doc.data() });
        });
        console.log("Playlists recuperadas con éxito.");
        return playlists;
    } catch (error) {
        console.error("Error al obtener las playlist de la base de datos:", error);
        throw error;
      }
}

const fetchUserPlaylists = async (user_id) => {
    try {
        const playlistCollection = db.collection("playlist");
        const snapshot = await playlistCollection.where("user_id", "==", user_id).get();
        if (snapshot.empty) {
            console.log("No se encontraron playlists del usuario.");
            return [];
        }

        const userPlaylists = [];
        snapshot.forEach(doc => {
            userPlaylists.push({ id: doc.id, ...doc.data() });
        });

        console.log("Playlists del usuario recuperadas con éxito.");
        return userPlaylists;
    } catch (error) {
        console.error("Error al obtener las playlist de la base de datos:", error);
        throw error;
    
    }
 }

const deleteById = async (user_id, playlist_id) => {
    try {
        const playlist = await db.collection('playlist').doc(playlist_id).get()
        if(!playlist.exists) {
            return {found : false, valid: false}
        }
        if (playlist.data().user_id != user_id) {
            return {found: true, valid: false}
        }
        await db.collection('playlist').doc(playlist_id).delete()
        return {found: true, valid: true}

    } catch (error) {
        console.error("Error al eliminar la playlist de la base de datos:", error);
        throw error;
    }
}
  
export { insertPlaylist, fetchPlaylists, deleteById, fetchUserPlaylists }