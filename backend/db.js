const mongoose = require("mongoose")

mongoose.connect('')

const user = mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
})

const UserTable = mongoose.model('users', user)

module.exports = {
    UserTable
}