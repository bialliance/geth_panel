const express = require('express')
const Wallet = require('./libs/wallet')
const conf = require('./conf')
const cors = require('cors')


var geth = require('./libs/geth')
gg = new geth(conf.geth)

// console.log(gg)
// gg.clear()

// var n = gg.create_node()
// console.log(n)
// const g = require('./rpc/node')
// var info = g.create({ name: "testnode1" })
// g.load()
// gg.load()
gg.start_all_nodes()



// console.log(gg.procs[n.address])

// console.log(info)
// return




var app = new express()
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    req.geth = gg
    next()
})

app.use('/api', require('./routes/node'))



app.post('/rpc', (req, res) => {
    // Тут вся обработка JSON-RPC
    if (!req.body || !req.body.func)
        return res.send({ success: false, error: "Func not defined" })

    var [mod, func] = req.body.func.split('.')
    var module = require('./rpc/' + mod)
    var ret = module[func](req.body.args)

    res.send(ret)
})

// var ki = Wallet.generate()





// var ge = require('./bia_geth/wallet')

// var ki = ge.gen_wallet_data()
// console.log(ki)
app.listen(3000)
return


var EC = require('elliptic').ec;
var BN = require('bn.js');
var ec = new EC('secp256k1');
const keccak256 = require('js-sha3').keccak256;
// var privateKey=Buffer.alloc(32, 0);
// privateKey[31]=1;

var G = ec.g; // Generator point
var pk = new BN('9999999999999999999999999999999999999999999999999999999999999999', 16); // private key as big number
console.log("PK::" + pk.toString('hex'))
console.log(pk.toString('hex'))
var pubPoint = G.mul(pk); // EC multiplication to determine public point
var x = pubPoint.getX().toBuffer(); //32 bit x co-ordinate of public point
var y = pubPoint.getY().toBuffer(); //32 bit y co-ordinate of public point 
var publicKey = Buffer.concat([x, y])
console.log("public key::" + publicKey.toString('hex'))
const address = keccak256(publicKey) // keccak256 hash of  publicKey
const buf2 = Buffer.from(address, 'hex');
console.log("Ethereum Adress:::" + "0x" + buf2.slice(-20).toString('hex')) // take lat 20 bytes as ethereum adress




return 0
const cp = require('child_process')

var ls = cp.spawnSync("./geth/geth.exe", ['--datadir', 'ddd', 'account', 'new', '--password', 'pass']) // --datadir ddd exec ""')
var adr = ls.output.filter(x => x != null && x.toString().startsWith('Address'))
console.log(adr.toString())

// console.log(ls.output[1].toString()) //[ls.output.length - 1].toString())
// setTimeout(() => ls.kill('SIGINT'), 3000)


return

const fs = require('fs')
const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 512 });

const text = 'Hello RSA!';
const encrypted = key.encrypt(text, 'base64');
var k = key.exportKey('private')

console.log(k)

console.log('encrypted: ', encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);


fs.writeFileSync('sync.txt', 'asdasda')


// Создать файл genesis с параметрами
function create_genesis(params) {

}


// Создать ноду (папку с данными и параметры)
function create_node() {

}


// Создать кластер нод (ноды, файл ссылок на кластер, genesis)
function create_cluster() {

}

// Копировать существующий БЧ (папку дата), и создать новый кластер из него (не связанный с основным)
function create_sidechain() {

}