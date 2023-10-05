import { config } from 'dotenv';

import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
 
// CONFIGURACION DE FIREBASE PARA LA BASE DE DATOS USANDO MODO ADMIN
initializeApp({
  credential: applicationDefault(),
  
});

const db = getFirestore();
export default db;
