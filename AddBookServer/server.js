var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
    mongoose = require('mongoose'),
    Book = require('./models/book'),
    bodyParser = require('body-parser');

const mongoUrl = 'mongodb://softwareA:EstoSeVaADescontrolar!@34.134.68.224:27017/book';

mongoose.connect(mongoUrl,{useNewParser:true,useUnifiedTopology:true})
    .then(db => console.log('DB is connected to', db.connect.host))
    .catch(err => {console.log('------------ Error ----------'); console.error(err); });

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

var route = require('./routes/route');
route(app);
    
app.listen(port);

console.log(`Escuchando en puerto ${port}`);
