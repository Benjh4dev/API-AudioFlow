import { db } from "../firebase/config.js"

const insertPlaylist = async ({ name, user_id }) => {
    const userDoc = await db.collection('user').doc(user_id).get()

    const playlist = {
        name,
        user_id,
        username: userDoc.data().username,
        image: '',
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

const addSongToAPlaylist = async (playlist_id, song_id, song) => {
    try {
        //console.log(playlist_id, song_id, song)
        const playlistRef = db.collection('playlist').doc(playlist_id)
        await playlistRef.collection('songs').doc(song_id).set(song)
        return {valid: true}

    } catch (error) {
        console.error("Error al agregar canción a la playlist:", error);
        throw error;
    }
};

const getPlaylistById = async (playlist_id) => {
    try {
        const playlistSnapshot = await db.collection('playlist').doc(playlist_id).get()

        if (playlistSnapshot.exists) {
            const playlistData = playlistSnapshot.data()

            const songsSnapshot = await db.collection('playlist').doc(playlist_id).collection('songs').get();
            const songsArray = []

            songsSnapshot.forEach((songDoc) => {
                const songData = songDoc.data()
                songsArray.push({ id: songDoc.id, ...songData
                });
            });

            return {
                found: true,
                playlist: {
                    ...playlistData,
                    songs: songsArray
                }
            };
        } else {
            console.log("Playlist not found.")
            return { found: false }
        }
    } catch (error) {
        console.error("Error retrieving playlist from the database:", error)
        throw error
    }
};

export { insertPlaylist, fetchPlaylists, deleteById, fetchUserPlaylists, getPlaylistById, addSongToAPlaylist }