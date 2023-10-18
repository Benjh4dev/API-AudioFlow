import {db} from "../firebase/config.js"
import { hashPassword } from "../utils/passwordHandle.js";

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
    delete user.password; 
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
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error)
    throw error
  }
}

const updatePasswordService = async (userId, password) => {
  try {
    const userRef = db.collection('user').doc(userId)
    const hashedPassword = await hashPassword(password)

    await userRef.update({password: hashedPassword})
    const userSnapshot = await userRef.get()
    const userData = userSnapshot.data()
    delete userData.password
    return userData
  } catch (error) {
    console.log("Error al editar el usuario:", error)
    throw error
  }
}

const updateEmailService = async (userId, email) => {
  try {
    const userRef = db.collection('user').doc(userId)

    await userRef.update({email})
    const userSnapshot = await userRef.get()
    const userData = userSnapshot.data()
    delete userData.password
    return userData
  } catch (error) {
    console.log("Error al editar el usuario:", error)
    throw error
  }
};

const updateProfilePic = async (userId, picture_url) => {
  try {
    const userRef = db.collection('user').doc(userId)
    await userRef.update({picture_url})
    const userSnapshot = await userRef.get()
    const userData = userSnapshot.data()
    delete userData.password
    return userData
  } catch (error) {
    console.log("Error al editar el usuario:", error)
    throw error
  }
}

const getUserById = async (userId) => {
  try {
    const userDoc = await db.collection("user").doc(userId).get()
    return userDoc.data()
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
}

const checkEmailForEdit = async (userId, email) => {
  try {
    const userCollection = db.collection("user");

    const emailQuerySnapshot = await userCollection.where("email", "==", email).get();

    if (!emailQuerySnapshot.empty) {
      const usersWithSameEmail = emailQuerySnapshot.docs.filter(doc => doc.id !== userId)
      return usersWithSameEmail.length > 0
    }

    return false
  } catch (error) {
    console.error("Error al verificar el correo electrónico en la base de datos durante la edición:", error)
    throw error
  }
}



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



export { insertUser, removeUser, verifyUsername, verifyEmail, getUserById, checkEmailForEdit, updateProfilePic, updatePasswordService, updateEmailService }