var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
    mongoose = require('mongoose'),
    

app.listen(port);

console.log(`Escuchando en puerto ${port}`);
