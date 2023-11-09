import { config } from 'dotenv';
import { initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import admin from 'firebase-admin';
import { getStorage } from "firebase-admin/storage"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const credentialsPath = join(__dirname, 'credentials.json');

console.log(credentialsPath)
const storageURL = process.env.STORAGE_URL
// CONFIGURACION DE FIREBASE PARA LA BASE DE DATOS USANDO MODO ADMIN
initializeApp({
  credential: admin.credential.cert(credentialsPath),
  storageBucket: storageURL
});

const db = getFirestore();
const storage = getStorage()
export { db , storage }
