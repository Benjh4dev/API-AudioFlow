import { db } from "../firebase/config.js"
import admin from 'firebase-admin'
import { formatTimestamp } from "../utils/dateFormation.js"

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
/*
const fetchPlaylists = async () => {
    try {
        const playlistCollection = db.collection("playlist");
        const snapshot = await playlistCollection.get();

        if (snapshot.empty) {
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
*/
const fetchPlaylists = async () => {
    try {
        const playlistCollection = db.collection("playlist")
        const snapshot = await playlistCollection.get()

        if (snapshot.empty) {
            console.log("No se encontraron playlists.")
            return []
        }

        const playlists = []
        for (const doc of snapshot.docs) {
            const playlistData = doc.data()
            const songsSnapshot = await db.collection('playlist').doc(doc.id).collection('songs').orderBy('addedAt', 'asc').limit(1).get()
            const hasSongs = !songsSnapshot.empty
            const image = hasSongs ? songsSnapshot.docs[0].data().coverURL : ""
            playlists.push({
                id: doc.id,
                ...playlistData,
                image: image
            })
        }
        return playlists
    } catch (error) {
        console.error("Error al obtener las playlists de la base de datos:", error)
        throw error
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
        if (!playlist.exists) {
            return { found: false, valid: false }
        }
        if (playlist.data().user_id != user_id) {
            return { found: true, valid: false }
        }
        const songs = await playlist.ref.collection('songs').get()
        if (!songs.empty) {
            await Promise.all(songs.docs.map(songDoc => songDoc.ref.delete()))
        }
        await db.collection('playlist').doc(playlist_id).delete()
        return { found: true, valid: true }

    } catch (error) {
        console.error("Error al eliminar la playlist de la base de datos:", error);
        throw error;
    }
}

const addSongToAPlaylist = async (playlist_id, song_id, song) => {
    try {
        const playlistRef = db.collection('playlist').doc(playlist_id)
        const verify = await playlistRef.collection('songs').doc(song_id).get()
        if (verify.exists) {
            return { alreadyExit: true, valid: true }
        }
        else {
            const fullSong = {
                ...song,
                addedAt: admin.firestore.FieldValue.serverTimestamp()
            }
            await playlistRef.collection('songs').doc(song_id).set(fullSong)
            return { valid: true, alreadyExit: false }
        }

    } catch (error) {
        console.error("Error al agregar canción a la playlist:", error);
        throw error;
    }
};

const deleteSongToAPlaylist = async (playlist_id, song_id) => {
    try {
        const playlistRef = db.collection('playlist').doc(playlist_id)
        const verify = await playlistRef.collection('songs').doc(song_id).get()
        if (verify.exists) {
            await playlistRef.collection('songs').doc(song_id).delete()
            return { valid: true }
        }
        else {
            return { valid: false }
        }

    } catch (error) {
        console.error("Error al elimnar canción a la playlist:", error);
        throw error;
    }
}

const getPlaylistById = async (playlist_id, user_id) => {
    try {
        const playlistSnapshot = await db.collection('playlist').doc(playlist_id).get()

        if (playlistSnapshot.exists) {
            if (playlistSnapshot.data().user_id != user_id) {
                return { found: true, valid: false }
            }
            else {
                return {
                    found: true,
                    valid: true
                };

            }

        } else {
            console.log("Playlist not found.")
            return { found: false, valid: false }
        }
    } catch (error) {
        console.error("Error retrieving playlist from the database:", error)
        throw error
    }

};

const getPlaylist = async (playlist_id) => {
    try {
        const playlistSnapshot = await db.collection('playlist').doc(playlist_id).get()

        if (playlistSnapshot.exists) {
            const playlistData = playlistSnapshot.data()
            const songsSnapshot = await db.collection('playlist').doc(playlist_id).collection('songs').orderBy('addedAt', 'asc').get();
            const songsArray = []

            songsSnapshot.forEach((songDoc) => {
                const songData = songDoc.data()
                const formattedDate = formatTimestamp(songData.addedAt);
                songsArray.push({
                    id: songDoc.id,
                    ...songData,
                    addedAt: formattedDate
                });
            });
            const image = songsArray.length > 0 ? songsArray[0].coverURL : ""

            return {
                found: true,
                playlist: {
                    ...playlistData,
                    image: image,
                    songs: songsArray
                },
                valid: true
            };

        } else {
            console.log("Playlist not found.")
            return { found: false, valid: false }
        }
    } catch (error) {
        console.error("Error retrieving playlist from the database:", error)
        throw error
    }
};

const validPlaylist = async (playlist_id) => {
    try {
        const playlistSnapshot = await db.collection('playlist').doc(playlist_id).get()
        if (playlistSnapshot.exists) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error("Error retrieving playlist from the database:", error)
        throw error
    }
}

export { insertPlaylist, fetchPlaylists, deleteById, fetchUserPlaylists, getPlaylistById, getPlaylist, addSongToAPlaylist, validPlaylist, deleteSongToAPlaylist }