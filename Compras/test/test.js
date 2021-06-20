var assert = require('assert')
const fetch = require("node-fetch")

var url = 'http://0.0.0.0:3000/api/compra';
var data = {"producto":[{"nombre": "cirque du freak",
"precio": 200}],
"usuario": {"nombre": "glendyco"}};
var data2 = 400;

describe('Prueba json',async function() {
    it('Debe recibir una lista y un string en formato json', async function() {

        fetch(url, { 
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
        }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => assert.equal(response,true));
      
    })
})


describe('Prueba json2',async function() {
    it('Si no recibe un json devuelve error', async function() {

        fetch(url, { 
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data2), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
        }
  }).then(res => res.json())
  .catch( response => assert.equal(response,true))
  .then(error => console.error('Error:', error));
      
    })
})


