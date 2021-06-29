var express = require('express'),
    app = express(),
    port = process.env.PORT || 3490,
    bodyParser = require('body-parser');

var cors = require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var route = require('./routes/route');
route(app);

app.listen(port, function() {
  console.log(`Node server running on http://localhost:${port}`);
});
