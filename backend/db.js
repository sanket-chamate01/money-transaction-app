const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://sanket:sanket@cohort.bq8x5.mongodb.net/money-transfer')

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

const account = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const AccountTable = mongoose.model('account', account)

module.exports = {
    UserTable,
    AccountTable
}