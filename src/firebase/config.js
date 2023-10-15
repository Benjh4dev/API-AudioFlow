import { config } from 'dotenv';

import { initializeApp, applicationDefault } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"
 
// CONFIGURACION DE FIREBASE PARA LA BASE DE DATOS USANDO MODO ADMIN
initializeApp({
  credential: applicationDefault(),
  storageBucket: "gs://audioflow-8f509.appspot.com"
});

const db = getFirestore();
const storage = getStorage()
export { db , storage }
