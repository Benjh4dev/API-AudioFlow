import { handleError } from '../utils/errorHandle.js'
import { validateUser } from '../models/user.js'
import { insertUser, isEmailRegistered } from '../services/user.js'

const getUser = (req, res) => {
    try {
        throw new Error('error')
    } catch (e) {
        handleError(res, 'ERROR_GET_USER' ) 
    }
}

const getUsers = (req, res) => {
    try {
        throw new Error('error')
    } catch (e) {
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
        const userAlreadyExists = await isEmailRegistered(result.data.email)
        console.log(userAlreadyExists)
        if (userAlreadyExists) {
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

const updateUser = (req, res) => {
    try {
        throw new Error('error')
    } catch (e) {
        handleError(res, 'ERROR_UPDATE_USER') 
    }
}

const deleteUser = (req, res) => {
    try {
        throw new Error('error')
    } catch (error) {
        handleError(res, 'ERROR_DELETE_USER') 
    }
}

export { getUser, getUsers, addUser, updateUser, deleteUser }