import { handleError } from '../utils/errorHandle.js'

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
        throw new Error('error')
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