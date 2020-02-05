// const wallet = require('../libs/wallet')
const geth = require('../libs/geth')
const conf = require('../conf')

module.exports = {
    create(args){        
        this.geth = new geth(conf.geth);
        return this.geth.create_node(args.name)
    }
}