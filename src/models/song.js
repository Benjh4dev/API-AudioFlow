import { z } from 'zod';

const songModel = z.object({
    name: z.string({
        required_error: "El nombre de la canción es requerido",
        invalid_type_error: "El nombre de la canción debe ser un texto",
    }).min(1, {
        message: "La canción debe tener al menos 1 caracter"
    }).max(45, {
        message: 'La canción debe tener un máximo de 45 caracteres'
    }),
    artist: z.string({
        required_error: "El nombre del artista es requerido",
        invalid_type_error: "El nombre del artista debe ser un texto",
    }).min(1, {
        message: "La canción debe tener al menos 1 caracter"
    })
    .max(45, {
        message: 'El nombre del artista debe tener un máximo de 45 caracteres'
    }),
})


const validateSong = (object) => {
    return songModel.safeParse(object)
}


export { songModel, validateSong }