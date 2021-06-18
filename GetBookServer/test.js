const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;

const bookSchema = new Schema({
    id: { type: String },
    title: { type: String },
    coverPage: { type: String },
    description: { type: String },
    price: { type: Number },
    units: { type: Number },
    author: { type: String },
    catepory:[ { type: String }]
});

const Book = mongoose.model('Book',bookSchema);

describe('Database Tests', function() {

    //Antes de iniciar el test se realiza una conexión a la base de datos
    before(function (done) {

        mongoose.connect('mongodb://softwareA:EstoSeVaADescontrolar!@34.134.68.224:27017/sa-database?authSource=admin');
        mongoose.set('useNewUrlParser', true );
        mongoose.set('useUnifiedTopology', true );

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database!');
            done();
        });
    });


    describe('Test Database', function() {

        it('Debe retornar los datos de la base de datos', function(done) {
            Book.find(function (err, books){
                if(err) {throw err;}
                if(books.length === 0) {throw new Error('No data!');}
                done();
            });
        });

    });

    //Termina la conexion y elimina la base de datos
    after(function(done){
        mongoose.connection.close(done);
    });

});
