import { verifyToken } from "../utils/jwtHandle.js"

const checkJwt = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization || ""
        const token = bearerToken.split(" ")[1]
        console.log("token es: ", token)
        const decoded = verifyToken(`${token}`)
        if(!decoded) {
            res.status(401)
            res.send({message: "Invalid token"})
        }
        console.log("el id del user es: ", decoded.id)
        next()
        
    } catch (error) {
        res.status(401)
        console.error(error)
        res.send({message: "Invalid session"})
    }
}

export { checkJwt }
