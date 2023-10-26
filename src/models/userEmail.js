import { z } from 'zod';

const userEmailModel = z.object({
    email: z.string({
        required_error: "El correo electrónico es requerido",
        invalid_type_error: "El correo electrónico debe ser un texto",
    }).email({
        message: 'El correo electrónico no es válido'
    }).max(254, {
        message: 'El correo electrónico debe tener menos de 254 caracteres'
    }),
    password: z.string({
        required_error: "La contraseña actual es requerida",
        invalid_type_error: "La contraseña actual debe ser un texto",
    }).min(1, {
        message: "La contraseña actual es requerida"
    })
})

const validateUserEmail = (object) => {
    return userEmailModel.safeParse(object)
}

export { userEmailModel, validateUserEmail }