const axios = require('axios').default;

var loginG10 = async (req, res) => {
    console.log('grupo 10')
   
    let newData = {email: req.body.user, password: req.body.password}
    console.log('data10 -> ', newData)

    axios.post(`http://3.15.230.185:3000/login/login`, newData)
    .then(function (response) {
        console.log(response.data)
        res.send(JSON.stringify(response.data));
    }).catch(function (error) {
        res.send(error.message);
    });

}

var CryptoJS = require('crypto-js');
var tokenFromUI = "SA-Encryption";

function decryptUsingAES256(tokenFromUI, encrypted) {
    let _key = CryptoJS.enc.Utf8.parse(tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(tokenFromUI);

    return CryptoJS.AES.decrypt(
    encrypted, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
}

module.exports = { loginG10 }