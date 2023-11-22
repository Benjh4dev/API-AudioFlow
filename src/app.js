import express from 'express'
import cors from 'cors'
import "dotenv/config"
import {router} from "../src/routes/index.js"
import { corsMiddleware } from './middlewares/cors.js'

const app = express()

app.use(corsMiddleware()) 
app.use(express.json())
app.disable('x-powered-by')
app.use('/api', router)

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
    res.json({ message: '¡Hola, mundo! x3'  });
});



export default app