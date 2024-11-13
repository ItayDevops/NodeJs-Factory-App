const mongoose = require('mongoose')

const employeesSchema = new mongoose.Schema(
    {
        firstname: String,
        lastname : String,
        startyear: Number,
        departmentId:String
    }
)


const Employee = mongoose.model('employee',employeesSchema,'employees')
module.exports = Employee