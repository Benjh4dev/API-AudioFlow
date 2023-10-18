import * as mm from 'music-metadata';
async function calcularDuracionEnSegundos(audioBuffer, mimeType) {
    try {
      const metadata = await mm.parseBuffer(audioBuffer, mimeType)
      const duracionEnSegundos = Math.floor(metadata.format.duration)
  
      return duracionEnSegundos
    } catch (error) {
      console.error('Error al calcular la duración del archivo de audio:', error)
      throw error
    }
}

export { calcularDuracionEnSegundos }