import express from 'express'
import usersRouter from './routes/users.router.js'
import productRouter from './routes/products.router.js'
import { __dirname } from './utils.js'

console.log('__dirname', __dirname + '/public')


const app = express()

//
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// public
app.use('/static', express.static(__dirname + '/public'))
// routes
app.use('/api/users', usersRouter)
app.use('/api/products', productRouter)

app.listen(8080, () => {
    console.log('Escuchando puerto 8080')
})