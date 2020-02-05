var EC = require('elliptic').ec;
var BN = require('bn.js');
var ec = new EC('secp256k1');
const keccak256 = require('js-sha3').keccak256;
const cryptoRandomString = require('crypto-random-string')

module.exports = {

    /** Получить данные для создания кошелька в ETH */
    generate(){
        var rnd = cryptoRandomString({length: 64})
        var G = ec.g; // Generator point
        var pk = new BN(rnd, 16)
        // console.log("PK::"+pk.toString('hex'))
        // console.log(pk.toString('hex'))
        var pubPoint = G.mul(pk); // EC multiplication to determine public point
        var x = pubPoint.getX().toBuffer(); //32 bit x co-ordinate of public point
        var y = pubPoint.getY().toBuffer(); //32 bit y co-ordinate of public point 
        var publicKey =Buffer.concat([x,y])
        // console.log("public key::"+publicKey.toString('hex'))
        const address = keccak256(publicKey) // keccak256 hash of  publicKey
        const buf2 = Buffer.from(address, 'hex');
        // console.log("Ethereum Adress:::"+"0x"+buf2.slice(-20).toString('hex')) // take lat 20 bytes as ethereum adress

        return {
            privateKey: rnd,
            publicKey: publicKey.toString('hex'),
            address: buf2.slice(-20).toString('hex')
        }

        // return data
    }
}