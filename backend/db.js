const mongoose = require("mongoose")

mongoose.connect('')

const user = mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    firstname: {
        type:String,
        required: true
    },
    lastname: {
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