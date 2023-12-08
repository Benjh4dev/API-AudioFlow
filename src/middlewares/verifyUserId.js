import {getUserById} from '../services/user.js'

const verifyUserId = async (req, res, next) => {
    try {
      const userIdFromToken = req.user.id 
      const userIdFromRequest = req.params.id 
  
      if (!userIdFromToken || !userIdFromRequest) {
        res.status(401)
        return res.send({ message: 'No estás autorizado para realizar esta acción' })
      }

      const user = await getUserById(userIdFromRequest);
      if (!user) {
      res.status(404);
      return res.send({ message: 'Usuario no encontrado' });
      }
  
      if (userIdFromToken !== userIdFromRequest) {
        return res.status(403).json({ message: 'No estás autorizado para realizar esta acción' })
      }
  
      next()
    } catch (error) {
      return res.status(400).json({ message: error.message || 'Error en la validación del ID' })
    }
}
  
export { verifyUserId }