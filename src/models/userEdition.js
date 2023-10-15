import { z } from 'zod';

const userEditionPasswordModel = z.object({
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

const validateUserEditionPassword = (object) => {
    return userEditionPasswordModel.safeParse(object)
}

export { userEditionPasswordModel, validateUserEditionPassword }