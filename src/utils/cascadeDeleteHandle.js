import { db } from "../firebase/config.js"
import admin from 'firebase-admin'

const cascadeDelete = async (song_id) => {
  const playlistsQuerySnapshot = await db.collection('playlist').get();

  await Promise.all(playlistsQuerySnapshot.docs.map(async (playlistDoc) => {
    const playlistRef = playlistDoc.ref

    const songsQuerySnapshot = await playlistRef.collection('songs').where(admin.firestore.FieldPath.documentId(), '==', song_id).get()
    
    if (!songsQuerySnapshot.empty) {
      await Promise.all(songsQuerySnapshot.docs.map(songDoc => songDoc.ref.delete()))
    }
  }));   
}



export { cascadeDelete }
