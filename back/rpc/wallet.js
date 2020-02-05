const wallet = require('../libs/wallet')

module.exports = {
    generate(){
        return wallet.generate()
    },

    create(args){
        console.log(args)
    }
}