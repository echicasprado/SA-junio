const express = require('express');
const app = express();
var cors = require('cors')
 
app.use(cors())
require('./database');

//Convierte los datos que recibe el servidor 
app.use(express.json()); 

app.use('/api',require('./routes/index'))

app.listen(3000);
console.log('Server on port',3000);
