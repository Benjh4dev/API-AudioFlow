import { z } from 'zod';

const userModel = z.object({
    username: z.string().min(3, {
        message: 'El nombre de usuario debe tener al menos 3 caracteres'
    }).max(15, {
        message: 'El nombre de usuario debe tener menos de 15 caracteres'
    }),
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


const validateUser = (object) => {
    return userModel.safeParse(object)
}


export { userModel, validateUser }