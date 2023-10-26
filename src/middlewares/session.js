import { verifyToken } from "../utils/jwtHandle.js"

const checkJwt = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization || ""
        if(bearerToken == "") {
            res.status(401)
            res.send({message: "Token not found"})
        }
        const token = bearerToken.split(" ")[1]
        const decoded = verifyToken(`${token}`)
        if(!decoded) {
            res.status(401)
            res.send({message: "Invalid token"})
        }
        req.user = decoded
        next()
        
    } catch (error) {
        res.status(401)
        console.error(error)
        res.send({message: error.message})
    }
}

export { checkJwt }
