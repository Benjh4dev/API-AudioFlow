import { z } from 'zod';

const userEditionsModel = z.object({
    email: z.string({
        required_error: "El correo es requerido",
        invalid_type_error: "El correo debe ser un texto",
    }).email({
        message: 'El correo electrónico no es válido'
    }).max(254, {
        message: 'El correo electrónico debe tener menos de 254 caracteres'
    }),
    password: z.string({
        required_error: "La contraseña es requerida",
        invalid_type_error: "La contraseña debe ser un texto"
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    }).max(64, {
        message: 'La contraseña debe tener menos de 64 caracteres'
    }),
    confirmPassword: z.string({
        required_error: "La confirmación de contraseña es requerida",
        invalid_type_error: "La confirmación de contraseña debe ser un texto"
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    }).max(64, {
        message: 'La contraseña debe tener menos de 64 caracteres'
    })
})

const validateUserEdition = (object) => {
    return userEditionsModel.safeParse(object)
}

export { userEditionsModel, validateUserEdition }