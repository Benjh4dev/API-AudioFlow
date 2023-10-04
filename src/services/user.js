import db from "../firebase/config.js"
import { hashPassword } from "../utils/passwordHash.js";

const insertUser = async ({ username, email, password, picture_url }) => {
  try {
    const userCollection = db.collection("user")
    const hashedPassword = await hashPassword(password)

    const newUser = {
      username,
      email,
      password: hashedPassword,
      picture_url: ""
    };

    const docRef = await userCollection.add(newUser);
    const user = { id: docRef.id, ...newUser }
   
    console.log("Usuario agregado con ID: ", docRef.id)
    return user;
  } catch (error) {
    console.error("Error al agregar el usuario a la base de datos:", error)
    throw error
  }
};

const isEmailRegistered = async (email) => {
  try {
    const userCollection = db.collection("user")
    const querySnapshot = await userCollection.where("email", "==", email).get()

    return !querySnapshot.empty
  } catch (error) {
    console.error("Error al verificar el correo electrónico en la base de datos:", error)
    throw error
  }
};

const getUserById = async (userId) => {
  try {
    const userDoc = await db.collection("user").doc(userId).get()
    
    if (userDoc.exists) {
      console.log("Usuario encontrado:", userDoc.data())
      return userDoc.data();
    } else {
      throw new Error("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

export { insertUser, isEmailRegistered, getUserById }
