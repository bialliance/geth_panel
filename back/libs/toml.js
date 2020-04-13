module.exports = {
    stringify(data) {
        var ret = ""
        for (var k in data) {
            ret += "[" + k + "]\n"
            ret += this.serialize_section(data[k])
        }
        return ret
    },

    serialize_section(data) {
        var ret = ""
        for (var k in data) {
            ret += k + ' = ' + this.serialize_section2(data[k]) + '\n'
        }
        return ret + '\n'
    },

    serialize_section2(v, section) {
        switch (typeof (v)) {
            case "number":
                return v

            case "string":
                return '"' + v + '"'

            case "object":
                if (Array.isArray(v)) {
                    return '[' + v.map(s => this.serialize_section2(s)).join(',') + ']'
                }
                else {
                    return null
                }
        }
    }
}