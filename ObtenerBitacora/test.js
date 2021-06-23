const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;

const bitacoraSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    editorial: String,
    fecha: { type: Date, default: Date.now},
    operacion: String
});

const Bitacora = mongoose.model('Bitacora',bitacoraSchema);

describe('Database Tests', function() {

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

        it('Obtener bitacora', function(done) {
            Bitacora.find(function (err, bitacora){
                if(err) {throw err; }
                if(bitacora.length == 0) { throw new Error('No data!');}
                done();
            });
        });
    });

    after(function(done){
        mongoose.connection.close(done);
    });

});
