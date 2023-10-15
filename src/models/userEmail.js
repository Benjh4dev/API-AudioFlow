import { z } from 'zod';

const userEmailModel = z.object({
    email: z.string({
        required_error: "El correo es requerido",
        invalid_type_error: "El correo debe ser un texto",
    }).email({
        message: 'El correo electrónico no es válido'
    }).max(254, {
        message: 'El correo electrónico debe tener menos de 254 caracteres'
    })
})

const validateUserEmail = (object) => {
    return userEmailModel.safeParse(object)
}

export { userEmailModel, validateUserEmail }