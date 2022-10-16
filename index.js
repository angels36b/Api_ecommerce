const express = require('express')//importamos la libreria express
const app = express() //iniciamos libreria en una constante
const router = require('./routes') //importamos las rutas

// app.use(router)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//
app.use(router)

//levantamos el servimor
app.listen(3000, (error) =>{
    error ? console.log(error) : console.log('Server running')
})