const express = require("express")
const mongoose = require("mongoose")
const authMiddleware = require("../middleware")
const { AccountTable } = require("../db")

const accountRouter = express.Router()

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    const balance = await AccountTable.findOne({
        userId: req.userId
    })
    res.json({
        balance: balance
    })
})

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession()
    
    session.startTransaction()
    
    const transfer = req.body

    const fromAccount = await AccountTable.findOne({
        userId: req.userId
    }).session(session)

    if(!fromAccount || fromAccount.balance < transfer.amount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "Insufficient Balance"
        })
    }

    const toAccount = await AccountTable.findOne({
        userId: transfer.to
    }).session(session)

    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message: "Invalid Account"
        })
    }

    await AccountTable.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -transfer.amount
        }
    }).session(session)

    await AccountTable.updateOne({
        userId: transfer.to
    }, {
        $inc: {
            balance: transfer.amount
        }
    }).session(session)

    await session.commitTransaction()
    res.json({
        message: "Transfer Successful"
    })
})

module.exports = accountRouter