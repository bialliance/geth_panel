module.exports = function(res){
    var ret = {
        ok(data){
            res.send({success: true, data: data})
        },

        error(error){
            res.send({success: false, error: error})
        }
    }

    return ret
}