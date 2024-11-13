const mongoose = require('mongoose')

const departmentsSchema = new mongoose.Schema(
    {
        name: String,
        manager:String
    }
)


const Department = mongoose.model('department',departmentsSchema,'departments')
module.exports = Department