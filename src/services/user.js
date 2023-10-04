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

export { insertUser, isEmailRegistered }
