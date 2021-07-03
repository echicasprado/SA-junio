const express = require('express')
const app = express()
const port = 2345
const cors = require('cors')
var bodyParser = require('body-parser')

const { switchBus, defaultLogin, defaultRegistro, defaultCatalogo,  defaultCrearProducto } = require('./src/lib')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World! => Enterprise Service Bus!')
})

app.post('/switch',  switchBus)
app.post('/Login',   defaultLogin)
app.post('/Registro',   defaultRegistro)
// app.post('/Compras',   defaultCompras)
app.post('/Catalogo',   defaultCatalogo)
app.post('/CrearProducto',   defaultCrearProducto)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})