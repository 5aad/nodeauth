const mongoose = require ('mongoose')

const schema = new mongoose.Schema({
    
        user:String
    
})
const session = mongoose.model('sessions', schema);

module.exports = session;