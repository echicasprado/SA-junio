var express  = require("express"),
    app      = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose');
var cors = require('cors')

var nodemailer = require('nodemailer');
 
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

var models = require('./models/usuarios')(app, mongoose);
var Usuarios = require('./controllers/usuarios');

router.get('/', function(req, res) {
   res.send("Hello World!");
});

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'sagrupo11@gmail.com',
      pass: 'SAGrupo11?'
  }
});

var mail_option = {
  from: 'BookSA <sagrupo11@gmail.com>',
  to: 'glendyco@gmail.com',
  subject: 'Activacion cuenta',
  text: 'Bienvenido'
}


const recursive = function () {


  transport.sendMail(mail_option, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    return info.messageId;
  });



  setTimeout(recursive,20000);
}
recursive();