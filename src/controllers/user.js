import { handleError } from '../utils/errorHandle.js'
import { validateUser } from '../models/user.js'
import { insertUser, removeUser, getUserById, verifyUsername, verifyEmail } from '../services/user.js'

const getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userData = await getUserById(userId)
        if(!userData) {
            res.status(404).json({ message: "Usuario no encontrado." });
            return;
        }
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

        let hasErrors = !result.success;
        const errorIssues = result.error ? [...result.error.issues] : [];

        if(req.body.username) {
            const usernameExists = await verifyUsername(req.body.username)
            if (usernameExists) {
                const usernameError = {
                    code: z.ZodIssueCode.custom,
                    path: ['username'],
                    message: 'El nombre de usuario ya está registrado'
                };
                errorIssues.push(usernameError);
                hasErrors = true;
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
                errorIssues.push(emailError);
                hasErrors = true;
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

        const isUser = await removeUser(userId);
        if (!isUser) {
            res.status(404).json({ message: "Usuario no encontrado." });
            return;
        }
    
        res.status(200).json({ message: "Usuario eliminado con éxito." });
    } catch (error) {
        console.error(error.message);
        handleError(res, 'ERROR_DELETE_USER');
    }
}

export { getUser, getUsers, addUser, updateUser, deleteUser }