import {db} from "../firebase/config.js"
import { comparePassword } from "../utils/passwordHandle.js"
import { generateToken } from "../utils/jwtHandle.js"

const authenticateUser = async (email, password) => {
    try {
        const userCollection = db.collection("user")
        const snapshot = await userCollection.where("email", "==", email).get()

        //NO EXISTE EL USUARIO EN BASE AL CORREO
        if (snapshot.empty) {
            return { found: false }
        }

        const userDoc = snapshot.docs[0]
        const id = userDoc.id
        const userData = userDoc.data()

        const passwordMatch = await comparePassword(password, userData.password)
        if (passwordMatch) {
            delete userData.password
            const token = generateToken(id)
            const userWithId = { id, ...userData };
            return { found: true, token, user: userWithId }
        } else {
            return { found: false }
        }

    } catch (error) {
        console.error("Error al autenticar el usuario:", error)
        throw error
    }
};

export { authenticateUser }