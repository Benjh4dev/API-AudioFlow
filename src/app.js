import express from 'express'
import cors from 'cors'
import "dotenv/config"
import {router} from "../src/routes/index.js"
import { corsMiddleware } from './middlewares/cors.js'
import { cascadeDelete } from './utils/cascadeDeleteHandle.js'

const app = express()

app.use(corsMiddleware()) 
app.use(express.json())
app.disable('x-powered-by')
app.use('/api', router)

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get('/', async (req, res) => {
    res.send( "Welcome to Audiflow API"  );
});



export default app