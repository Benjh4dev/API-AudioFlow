import { z } from 'zod';

const userCredentialsModel = z.object({
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
    })
})

const validateUserCredentials = (object) => {
    return userCredentialsModel.safeParse(object)
}

export { userCredentialsModel, validateUserCredentials }