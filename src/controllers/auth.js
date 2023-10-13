import { validateUserCredentials } from "../models/userCredentials.js"
import { authenticateUser } from "../services/auth.js"
import { handleError } from "../utils/errorHandle.js"

const login = async (req, res) => {
    try {
        const result = validateUserCredentials(req.body)
        if (!result.success) {
            res.status(400).json({ error: result.error })
            return
        }
        
        const authResult = await authenticateUser(result.data.email, result.data.password)
        if (!authResult.found) {
            res.status(401).json({ message: "Credenciales inválidas" })
            return
        }
        res.status(200).json({ token: authResult.token, user: authResult.user })

    } catch (error) {
        handleError(res, 'ERROR_LOGIN')
    }
}

export { login }
