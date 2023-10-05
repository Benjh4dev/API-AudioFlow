import { handleError } from '../utils/errorHandle.js'
import { validateUser } from '../models/user.js'
import { insertUser, removeUser, getUserById, verifyUsername, verifyEmail } from '../services/user.js'

const getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userData = await getUserById(userId)

        res.status(200).json(userData);
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
        if (!result.success) {
            res.status(400)
            res.send({error: result.error})
            return
        }
        const usernameExists = await verifyUsername(result.data.username)

        if (usernameExists) {
            res.status(400)
            res.send({error: 'El nombre de usuario ya está registrado'})
            return
        }
        const emailExists = await verifyEmail(result.data.email)

        if (emailExists) {
            res.status(400)
            res.send({error: 'El correo electrónico ya está registrado'})
            return
        }
        const user = await insertUser(result.data)

        res.status(201)
        res.send({user: user})
    } catch (e) {
        console.log(e)
        handleError(res, 'ERROR_ADD_USER') 
    }
}

const updateUser = async (req, res) => {
    try {
        console.log("WIP: updateUser");

    } catch (error) {
        console.log(error);
        handleError(res, 'ERROR_UPDATE_USER');
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        await removeUser(userId);

        res.status(200).json({ message: "Usuario eliminado con éxito." });
    } catch (error) {
        console.error(error.message);
        handleError(res, 'ERROR_DELETE_USER');
    }
}

export { getUser, getUsers, addUser, updateUser, deleteUser }