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

        mongoose.connect('mongodb://softwareA:EstoSeVaADescontrolar!@34.134.68.224:27017/testBitacora?authSource=admin');
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

        it('Nueva bitacora', function(done) {
            var newBitacora = new Bitacora({
                editorial:"editorial 1",
                operacion:"nuevo libro"
            });
        
            newBitacora.save(done);
        });
    });

    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
        });
    });

});
