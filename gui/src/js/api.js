var axios = require('axios')

// MOC
axios = {
    post(){
        return new Promise((resolve) => {
            resolve({data: {"ok": "all ok"}})
        })
    }
}

module.exports = class {
    constructor(args){
        this.args = args
    }

    call(func, args){
        window.console.log(func, args)
        return axios.post(this.args.url, {func, args}).catch(ex => window.console.log(ex))
    }
}