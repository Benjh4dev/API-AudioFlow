import express from 'express'
import cors from 'cors'
import "dotenv/config"
import {router} from "../src/routes/index.js"

const app = express()

app.use(cors()) 
app.use(express.json())
app.use('/api', router)

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
    res.json({ message: '¡Hola, mundo!' });
});



export default app