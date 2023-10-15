import { Router } from "express";
import { addUser, updatePassword, getUser, deleteUser, getUsers, updateProfilePicture, updateEmail } from "../controllers/user.js"
import { checkJwt } from "../middlewares/session.js"
import { verifyUserId } from "../middlewares/verifyUserId.js"
import multer from 'multer';
const upload = multer();
const router = Router()

router.get('/:id', getUser)
router.get('/', checkJwt, getUsers)
router.post('/', addUser)
router.patch('/:id/upload', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        console.log(req.file)
        next()
    })
}, updateProfilePicture)
router.patch('/:id/changeEmail', checkJwt, verifyUserId, updateEmail)
router.patch('/:id/changePassword', checkJwt, verifyUserId, updatePassword)
router.delete('/:id', deleteUser)

export { router }