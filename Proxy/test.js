// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const chai = require('chai');
// const expect = chai.expect;

// const bookSchema = new Schema({
//     id: { type: mongoose.Schema.Types.ObjectId },
//     title: { type: String },
//     coverPage: { type: String },
//     description: { type: String },
//     price: { type: Number },
//     units: { type: Number },
//     author: { type: String },
//     catepory:[ { type: String }]
// });

// const Book = mongoose.model('Book',bookSchema);

// describe('Database Tests', function() {

//     //Antes de iniciar el test se realiza una conexión a la base de datos
//     before(function (done) {

//         mongoose.connect('mongodb://softwareA:EstoSeVaADescontrolar!@34.134.68.224:27017/testBook?authSource=admin');
//         mongoose.set('useNewUrlParser', true );
//         mongoose.set('useUnifiedTopology', true );

//         const db = mongoose.connection;
//         db.on('error', console.error.bind(console, 'connection error'));
//         db.once('open', function() {
//             console.log('We are connected to test database!');
//             done();
//         });
//     });


//     describe('Test Database', function() {

//         it('Nuevo libro', function(done) {
//             var newBook = new Book({
//                 title: "Hombre de maiz",
//                 coverPage:"imagen en base 64",
//                 description: "Libro escrito para el presidente de Guatemala",
//                 price:200,
//                 units:1000,
//                 author:"Miguel Angel Asturias",
//                 category:["historia","Guatemala"]
//             });
        
//             newBook.save(done);
//         });
//     });

//     //Termina la conexion y elimina la base de datos
//     after(function(done){
//         mongoose.connection.db.dropDatabase(function(){
//             mongoose.connection.close(done);
//         });
//     });

// });
