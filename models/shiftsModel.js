const mongoose = require('mongoose')

const shiftsSchema = new mongoose.Schema(
    {
        date: Date,
        start : Number,
        end: Number
    }
)


const Shift = mongoose.model('shift',shiftsSchema,'shifts')
module.exports = Shift