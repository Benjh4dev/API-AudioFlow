import { describe, it, expect } from "vitest"
import axios from 'axios'
import fs from 'fs';
import FormData from 'form-data';

describe("BASE NORMAL USER FLOW", () => {
    it("should pass", () => {
        expect(true).toBe(true)
    })

    const user = {
        "username": "vitest",
        "email": "test@vitest.com",
        "password": "12345678"
    }

    let token
    let user_id
    let playlist_id
    let song_id

    it('Petición a raíz de API"', async () => {  
        const response = await axios.get('http://localhost:3001')
        expect(response.data).toEqual('Welcome to Audiflow API webhook')
    })

    it("Registro de usuario al sistema", async () => {
        const response = await axios.post('http://localhost:3001/api/user', user);
        expect(response.status).toEqual(201)
        user_id = response.data.user.id
        expect(response.data.user.username).toEqual(user.username)
        expect(response.data.user.email).toEqual(user.email) 
    })

    it("Login de usuario en el sistema", async () => {
        const response = await axios.post('http://localhost:3001/api/auth', user)
        expect(response.status).toEqual(200)
        expect(response.data.token).toBeTruthy()
        token = response.data.token
        expect(response.data.user.username).toEqual(user.username)
        expect(response.data.user.email).toEqual(user.email)
        expect(response.data.player.user_id).toEqual(response.data.user.id)
    })

    it("Debería arrojar 401, al no enviar token en la petición", async () => {
        const cover = "./test/donde estaras.jpg"
        const song = "./test/Donde estarás.mp3"
        const formData = new FormData()
        formData.append('cover_art', fs.createReadStream(cover))
        formData.append('audio_file', fs.createReadStream(song))
        formData.append('name', 'Donde estaras')
        formData.append('artist', '3AM')
        const badToken = "badToken"
        const headers = {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${badToken}`,
        }
        try {
            const response = await axios.post(`http://localhost:3001/api/song/${user_id}`, formData, { headers });
            throw new Error('La petición debería haber fallado')
        } catch (error) {   
            expect(error.response.status).toEqual(401)
        }
        
    })

    it("Agregar canción al sistema", async () => {  
        const cover = "./test/donde estaras.jpg"
        const song = "./test/Donde estarás.mp3"
        const formData = new FormData()
        formData.append('cover_art', fs.createReadStream(cover))
        formData.append('audio_file', fs.createReadStream(song))
        formData.append('name', 'Donde estaras')
        formData.append('artist', '3AM')
        const headers = {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: `Bearer ${token}`,
        }
        const response = await axios.post(`http://localhost:3001/api/song/${user_id}`, formData, { headers })
        expect(response.status).toEqual(201)
        expect(response.data.song.name).toEqual("Donde estaras")
        expect(response.data.song.artist).toEqual("3AM")
        expect(response.data.song.user_id).toEqual(user_id)     
        song_id = response.data.song.id 
    })

    it("Agregar playlist al sistema", async () => {
        const response = await axios.post(`http://localhost:3001/api/playlist/${user_id}`, {
            "name": "Playlist de prueba",
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        expect(response.status).toEqual(201)
        playlist_id = response.data.playlist.id
    })

    it("Agregar canción a playlist", async () => {
        const response = await axios.post(`http://localhost:3001/api/playlist/${playlist_id}/${song_id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        expect(response.status).toEqual(201)
    })

    it("GET a la playlist y sus canciones", async () => {
        const response = await axios.get(`http://localhost:3001/api/playlist/${playlist_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        expect(response.status).toEqual(200)
        expect(response.data.playlist.id).toEqual(playlist_id)
        expect(response.data.playlist.name).toEqual("Playlist de prueba")
        expect(response.data.playlist.songs).toBeTruthy()
        expect(response.data.playlist.songs.length).toEqual(1)
        expect(response.data.playlist.songs[0].id).toEqual(song_id)
    })

    it("Eliminar canción de playlist", async () => {
        const response = await axios.delete(`http://localhost:3001/api/playlist/${playlist_id}/${song_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        expect(response.status).toEqual(200)
        expect(response.data.message).toEqual(`La cancion de ID: ${song_id} se eliminó de la playlist de ID: ${playlist_id}`)
    })

    it("GET a la playlist con la canción ya eliminada", async () => {
        const response = await axios.get(`http://localhost:3001/api/playlist/${playlist_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        expect(response.status).toEqual(200)
        expect(response.data.playlist.id).toEqual(playlist_id)
        expect(response.data.playlist.songs.length).toEqual(0)
    })

    it("Eliminar canción del sistema", async () => {
        const add = await axios.post(`http://localhost:3001/api/playlist/${playlist_id}/${song_id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        expect(add.status).toEqual(201)

        const response2 = await axios.get(`http://localhost:3001/api/playlist/${playlist_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        expect(response2.status).toEqual(200)
        expect(response2.data.playlist.id).toEqual(playlist_id)
        expect(response2.data.playlist.name).toEqual("Playlist de prueba")
        expect(response2.data.playlist.songs).toBeTruthy()
        expect(response2.data.playlist.songs.length).toEqual(1)
        expect(response2.data.playlist.songs[0].id).toEqual(song_id)

        const response = await axios.delete(`http://localhost:3001/api/song/${song_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        expect(response.status).toEqual(200)
        
        //Debe haber eliminado la canción de la playlist
        const playlist = await axios.get(`http://localhost:3001/api/playlist/${playlist_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        expect(playlist.status).toEqual(200)
        expect(playlist.data.playlist.id).toEqual(playlist_id)
        expect(playlist.data.playlist.songs.length).toEqual(0)
        
    }, 10000)

    it("Eliminar playlist del sistema", async () => {
        const response = await axios.delete(`http://localhost:3001/api/playlist/${playlist_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        expect(response.status).toEqual(200)
        expect(response.data.message).toEqual(`La playlist se eliminó con éxito de id: ${playlist_id}`)
    })

    it("Eliminar usuario del sistema", async () => {
        const response = await axios.delete(`http://localhost:3001/api/user/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        expect(response.status).toEqual(200)
        expect(response.data.message).toEqual("Usuario eliminado con éxito.")
    })
})    


