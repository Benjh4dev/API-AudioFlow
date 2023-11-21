import { z } from 'zod';

const playlistModel = z.object({
    name: z.string({
        required_error: "El nombre de la playlist es requerido",
        invalid_type_error: "El nombre de la playlist debe ser un texto",
    }).min(1, {
        message: "El nombre de la playlist debe tener al menos 1 caracter"
    }).max(45, {
        message: 'La nombre de la playlist debe tener un máximo de 45 caracteres'
    }),
})


const validatePlaylist = (object) => {
    return playlistModel.safeParse(object)
}


export { playlistModel, validatePlaylist }