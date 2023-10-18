import { z } from 'zod';

const songModel = z.object({
    name: z.string({
        required_error: "El nombre de la canción es requerido",
        invalid_type_error: "El nombre de la canción debe ser un texto",
    }).max(45, {
        message: 'La canción debe tener un máximo de 45 caracteres'
    })
})


const validateSong = (object) => {
    return songModel.safeParse(object)
}


export { songModel, validateSong }