var axios = require('axios')

module.exports = class {
    constructor() {
        this.conf = require('./conf')
    }

    token() {
        return localStorage.getItem('token')
    }

    set_token(jwt) {
        if (jwt)
            localStorage.setItem('token', jwt)
        else
            localStorage.removeItem('token')
    }

    headers() {
        return this.token() ? { Authorization: 'Bearer ' + this.token() } : {}
    }

    wrap(ax) {
        return ax
            .then(res => {               
                if (!res.data.success) {
                    window.console.log('res', res.data)
                    throw res.data.error
                }
                return res
            })
            .catch(ex => {
                if (ex.response && ex.response.status == 403) {
                    this.emit('403')
                }
                else
                    throw ex
            })
    }

    get(url) {
        return this.wrap(axios.get(this.conf.url + url, { headers: this.headers() }))
    }

    post(url, args) {
        return this.wrap(axios.post(this.conf.url + url, args, { headers: this.headers() }))
    }

    put(url, args) {
        return this.wrap(axios.put(this.conf.url + url, args, { headers: this.headers() }))
    }

    delete(url) {
        return this.wrap(axios.delete(this.conf.url + url, { headers: this.headers() }))
    }
}