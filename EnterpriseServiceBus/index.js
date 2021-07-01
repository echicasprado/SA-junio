const express = require('express')
const app = express()
const port = 2345
const cors = require('cors')

const { switchBus, defaultLogin } = require('./src/lib')

app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World! => Enterprise Service Bus!')
})

app.get('/switch',  switchBus)
app.get('/Login',   defaultLogin)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})