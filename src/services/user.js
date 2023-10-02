import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import bcrypt from "bcrypt";
import db from "../firebase/config.js"

const insertUser = async ({username, email, password}) => {
    try {
        const userCollection = collection(db, "user")
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = {
          username,
          email,
          password: hashedPassword,
        }
    
        const docRef = await addDoc(userCollection, newUser)
        const user = { id: docRef.id, ...newUser }
    
        console.log("Usuario agregado con ID: ", docRef.id)
    
        return user
      } catch (error) {
        console.error("Error al agregar el usuario a la base de datos:", error)
        return error; 
      }
}

const isEmailRegistered = async (email) => {
    try {
        const userCollection = collection(db, "user");
    
        const q = query(userCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);
    
        return !querySnapshot.empty;
      } catch (error) {
        console.error("Error al verificar el correo electrónico en la base de datos:", error);
        throw error;
      }
}

export { insertUser, isEmailRegistered }