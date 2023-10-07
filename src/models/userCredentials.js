import { z } from 'zod';

const userCredentialsModel = z.object({
    email: z.string({
        message: 'El correo electrónico es requerido'
    }).email({
        message: 'El correo electrónico no es válido'
    }).max(254, {
        message: 'El correo electrónico debe tener menos de 254 caracteres'
    }),
    password: z.string().min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    }).max(64, {
        message: 'La contraseña debe tener menos de 64 caracteres'
    })
})


const validateUserCredentials = (object) => {
    return userCredentialsModel.safeParse(object)
}


export { userCredentialsModel, validateUserCredentials }