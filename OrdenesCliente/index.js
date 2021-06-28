var express  = require("express"),
    app      = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose');
var cors = require('cors')
 
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

var models = require('./models/orden')(app, mongoose);
var Ordenes = require('./controllers/orden');

router.get('/', function(req, res) {
   res.send("Hello World!");
});

app.use(router);

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://softwareA:EstoSeVaADescontrolar!@34.134.68.224:27017/sa-database?authSource=admin', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});


//API 

app.route('/OrdenesCliente')
  .post(Ordenes.findOrdenes);
