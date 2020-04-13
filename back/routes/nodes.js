const app = new require('express').Router()
const ret = require('../libs/ret')
const axios = require('axios')

app.get('/nodes/:id', (req, res) => {
    ret(res).ok(req.geth.dump.nodes.filter(x => x.wallet.address == req.params.id)[0])
})

app.get('/nodes', (req, res) => {
    ret(res).ok(req.geth.dump.nodes)
})

app.post('/nodes', (req, res) => {
    ret(res).ok(req.geth.create_node())
})

app.put('/nodes', (req, res) => {
    ret(res).ok(req.geth.dump.nodes)
})

app.delete('/nodes', (req, res) => {
    ret(res).ok(req.geth.dump.nodes)
})



app.post('/nodes/:id/rpc', (req, res) => {
    var n = req.geth.node(req.params.id)
    console.log(n)
    axios.post('http://localhost:' + n.rpcport, req.body.json)
        .then(r => ret(res).ok(r.data))
        .catch(ex => ret(res).error(ex))

})

module.exports = app