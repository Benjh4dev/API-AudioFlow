import { Router } from "express";
import { addUser, updateUser, getUser, deleteUser, getUsers } from "../controllers/user.js"
import { checkJwt } from "../middlewares/session.js"
import { verifyUserId } from "../middlewares/verifyUserId.js"
const router = Router()

router.get('/:id', getUser)
router.get('/', checkJwt, getUsers)
router.post('/', addUser)
router.patch('/:id', checkJwt, verifyUserId, updateUser)
router.delete('/:id', deleteUser)

export { router }