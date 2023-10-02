import { Router } from "express";
import { addUser, updateUser, getUser, deleteUser, getUsers } from "../controllers/user.js";
const router = Router()

router.get('/:id', getUser)
router.get('/', getUsers)
router.post('/', addUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export { router }