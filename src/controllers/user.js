import { z } from 'zod';
import { handleError } from '../utils/errorHandle.js'
import { validateUser } from '../models/user.js'
import { validateUserEditionPassword } from '../models/userEdition.js';
import { validateUserEmail } from '../models/userEmail.js';
import { insertUser, removeUser, getUserById, verifyUsername, verifyEmail, updateProfilePic, updatePasswordService, updateEmailService, checkEmailForEdit } from '../services/user.js'
import { comparePassword } from '../utils/passwordHandle.js';
import { verifyType} from '../utils/imageHandle.js';
import { uploadToStorage } from '../utils/storageHandle.js';

const getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userData = await getUserById(userId)
        if(!userData) {
            res.status(404).json({ message: "Usuario no encontrado." })
            return;
        }
        res.status(200).json(userData)
    } catch (error) {
        console.log(error.message)
        handleError(res, 'ERROR_GET_USER_BY_ID')
    }
}

const getUsers = (req, res) => {
    try {
        throw new Error('error')
    } catch (error) {
        handleError(res,  'ERROR_GET_USERS') 
    }
}

const addUser = async (req, res) => {
    try {
        const result = validateUser(req.body)

        let hasErrors = !result.success
        const errorIssues = result.error ? [...result.error.issues] : []

        if(req.body.username) {
            const usernameExists = await verifyUsername(req.body.username)
            if (usernameExists) {
                const usernameError = {
                    code: z.ZodIssueCode.custom,
                    path: ['username'],
                    message: 'El nombre de usuario ya está registrado'
                };
                errorIssues.push(usernameError)
                hasErrors = true
            }
        }

        if(req.body.email) {
            const emailExists = await verifyEmail(req.body.email)
            if (emailExists) {
                const emailError = {
                    code: z.ZodIssueCode.custom,
                    path: ['email'],
                    message: 'El correo electrónico ya está registrado'
                };
                errorIssues.push(emailError)
                hasErrors = true
            }
        }

        if (hasErrors) {
            res.status(400)
            res.send({ error: new z.ZodError(errorIssues) });
            return
        }

        const user = await insertUser(result.data)
        res.status(201)
        res.send({user: user})
    } catch (error) {
        console.log(error)
        handleError(res, 'ERROR_ADD_USER') 
    }
}


const updatePassword = async (req, res) => {
    try {
        const userId = req.params.id
        const result = validateUserEditionPassword(req.body)

        let hasErrors = !result.success
        const errorIssues = result.error ? [...result.error.issues] : []

        const findUser = await getUserById(userId);
        const verifyCurrentPassword = await comparePassword(req.body.currentPassword, findUser.password);

        if (!verifyCurrentPassword) {
            const currentPasswordError = {
                code: z.ZodIssueCode.custom,
                path: ['currentPassword'],
                message: 'La contraseña actual es incorrecta'
            };
            errorIssues.push(currentPasswordError)
            hasErrors = true;
        }

        if(req.body.password !== req.body.confirmPassword) {
            const passwordError = {
                code: z.ZodIssueCode.custom,
                path: ['confirmPassword'],
                message: 'Las contraseñas no coinciden'
            };
            errorIssues.push(passwordError)
            hasErrors = true;
        }

        if (hasErrors) {
            res.status(400)
            res.send({ error: new z.ZodError(errorIssues) })
            return
        }

        const user = await updatePasswordService(userId, result.data.password)
        res.status(201)
        res.send({user: user})

    } catch (error) {
        console.log(error)
        handleError(res, 'ERROR_UPDATE_USER')
    }
}

const updateEmail = async (req, res) => {  
    try {
        const userId = req.params.id
        const result = validateUserEmail(req.body)

        let hasErrors = !result.success
        const errorIssues = result.error ? [...result.error.issues] : []
        
        if(req.body.email) {
            const emailExists = await checkEmailForEdit(userId, req.body.email)
            if (emailExists) {
                const emailError = {
                    code: z.ZodIssueCode.custom,
                    path: ['email'],
                    message: 'El correo electrónico ya está registrado'
                };
                errorIssues.push(emailError)
                hasErrors = true;
            }
        }
        
        const findUser = await getUserById(userId)
        if(req.body.password) {
            console.log(req.body.password)
            const verifyCurrentPassword = await comparePassword(req.body.password, findUser.password)
            if (!verifyCurrentPassword) {
                const currentPasswordError = {
                    code: z.ZodIssueCode.custom,
                    path: ['password'],
                    message: 'La contraseña actual es incorrecta'
                };
                errorIssues.push(currentPasswordError)
                hasErrors = true;
            }
        }
        
        if (hasErrors) {
            res.status(400)
            res.send({ error: new z.ZodError(errorIssues) })
            return
        }

        const user = await updateEmailService(userId, result.data.email)
        res.status(201)
        res.send({user: user})

    } catch (error) {
        console.log(error)
        handleError(res, 'ERROR_UPDATE_USER')
    }
}


const updateProfilePicture = async (req, res) => {
    try {
        console.log(req.body)
        const userId = req.params.id
        const userData = await getUserById(userId)

        if(!userData) {
            res.status(404).json({ message: "Usuario no encontrado." })
            return;
        }

        if(!userId){
            res.status(404).send({error: 'El usuario no ha sido encontrado.'})
        }
        console.log(req.file)
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó un archivo' })
        }
        
        const valid = await verifyType(req.file)
        console.log(valid)

        if(!valid.ok) {
            return res.status(400).json({ error: 'Tipo de archivo inválido, solo se aceptan jpeg, jpg o png.' })
        }

        const imageUrl = await uploadToStorage(req.file)

        const user = await updateProfilePic(userId, imageUrl)
        const userWithId = {
            ...user,
            id: userId
        }

        res.status(200).json({ userWithId })
    } catch (error) {
        console.error('Error al procesar la solicitud:', error)
        res.status(500).json({ error: 'Error al subir el archivo' })
    }
};


const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id

        const isUser = await removeUser(userId)
        if (!isUser) {
            res.status(404).json({ message: "Usuario no encontrado." })
            return
        }
    
        res.status(200).json({ message: "Usuario eliminado con éxito." })
    } catch (error) {
        console.error(error.message)
        handleError(res, 'ERROR_DELETE_USER')
    }
}

export { getUser, getUsers, addUser, updatePassword, deleteUser, updateProfilePicture, updateEmail }