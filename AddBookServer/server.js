var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
    mongoose = require('mongoose'),
    Book = require('./models/book'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect = ('')
    

app.listen(port);

console.log(`Escuchando en puerto ${port}`);
