import { z } from 'zod';

const userEditionPasswordModel = z.object({
    currentPassword: z.string({
        required_error: "La contraseña actual es requerida",
        invalid_type_error: "La contraseña actual debe ser un texto"
    }).min(6, {
        message: 'La contraseña actual debe tener al menos 6 caracteres'
    }).max(64, {
        message: 'La contraseña actual debe tener menos de 64 caracteres'
    }),
    password: z.string({
        required_error: "La contraseña nueva es requerida",
        invalid_type_error: "La contraseña nueva debe ser un texto"
    }).min(6, {
        message: 'La contraseña nueva debe tener al menos 6 caracteres'
    }).max(64, {
        message: 'La contraseña nueva debe tener menos de 64 caracteres'
    }),
    confirmPassword: z.string({
        required_error: "La confirmación de contraseña es requerida",
        invalid_type_error: "La confirmación de contraseña debe ser un texto"
    }).min(6, {
        message: 'La contraseña nueva debe tener al menos 6 caracteres'
    }).max(64, {
        message: 'La contraseña nueva debe tener menos de 64 caracteres'
    })
})

const validateUserEditionPassword = (object) => {
    return userEditionPasswordModel.safeParse(object)
}

export { userEditionPasswordModel, validateUserEditionPassword }