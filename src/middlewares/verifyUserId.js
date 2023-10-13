
const verifyUserId = (req, res, next) => {
    try {
      const userIdFromToken = req.user.id 
      const userIdFromRequest = req.params.id 
  
      if (!userIdFromToken || !userIdFromRequest) {
        res.status(401)
        return res.send({ message: 'No se entregan los parametros' })
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