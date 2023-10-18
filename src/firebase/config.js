import { config } from 'dotenv';

import { initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import admin from 'firebase-admin';
import { getStorage } from "firebase-admin/storage"
 
const storageURL = process.env.STORAGE_URL
// CONFIGURACION DE FIREBASE PARA LA BASE DE DATOS USANDO MODO ADMIN
initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: storageURL
});

const db = getFirestore();
const storage = getStorage()
export { db , storage }
