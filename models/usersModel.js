const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema(
    {
        userId:Number,
        fullname: String,
        actions : Number,
    }
)


const User = mongoose.model('user',usersSchema,'users')
module.exports = User