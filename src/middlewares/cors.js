import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:3002',
  'http://localhost:5173',
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => (req, res, next) =>
  cors({
    origin: (origin, callback) => {
      console.log('Request Origin:', origin)

      if (acceptedOrigins.includes(origin)) {
        console.log('Allowed Origin')
        return callback(null, true)
      }

      const error = new Error('Not allowed by CORS policy: Origin not in the list of accepted origins')
      error.status = 401
      error.errorCode = 'CORS_ERROR'

      return callback(error)
    },
  })(req, res, (err) => {
    
    if (err) {
      console.error('Error en CORS:', err.message)
      res.status(401).json({ error: err.message, errorCode: err.errorCode || 'UNKNOWN_ERROR' })
    } else {
      next()
    }
  });




  