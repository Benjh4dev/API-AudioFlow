import db from "../firebase/config.js"
import { hashPassword } from "../utils/passwordHash.js";


const insertUser = async ({ username, email, password }) => {
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

const removeUser = async (userId) => {
  try {
    const userDocRef = db.collection("user").doc(userId);
    const userDoc = await userDocRef.get()

    if (userDoc.exists) {
      await userDocRef.delete()
      console.log("Usuario eliminado:", userId)
    } else {
      throw { message: "Usuario no encontrado", statusCode: 404 };
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error)
    throw error
  }
}

const updateUser = async (userId, updates) => {
  try {
    console.log("WIP: updateUser")
  } catch (error) {
    console.log("Error al editar el usuario:", error);
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const userDoc = await db.collection("user").doc(userId).get()
    
    if (userDoc.exists) {
      const userData = userDoc.data()
      delete userData.password; 
      console.log("Usuario encontrado:", userDoc.data())
      return userData
    } else {
      throw { message: "Usuario no encontrado", statusCode: 404 };
    }
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

const verifyEmail = async (email) => {
  try {
    const userCollection = db.collection("user")
    const querySnapshot = await userCollection.where("email", "==", email).get()

    return !querySnapshot.empty
  } catch (error) {
    console.error("Error al verificar el correo electrónico en la base de datos:", error)
    throw error
  }
};

const verifyUsername = async (username) => {
  try {
    const userCollection = db.collection("user")
    const querySnapshot = await userCollection.where("username", "==", username).get()

    return !querySnapshot.empty
  } catch (error) {
    console.error("Error al verificar el nombre de usuario en la base de datos:", error)
    throw error
  }
}



export { insertUser, removeUser, verifyUsername, verifyEmail, getUserById }