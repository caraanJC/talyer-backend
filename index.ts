import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello World'
    })
})

app.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`)
})