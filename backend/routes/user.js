const express = require("express")
const { userValidation } = require("../types")
const { UserTable } = require("../db")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
const JWT_SECRET = require("../config")

userRouter.post("/signUp", async (req, res) => {
    const createUser = req.body
    const parseUser = userValidation.safeParse(createUser)

    if(!parseUser.success){
        res.status(411).json({
            message: "Wrong Inputs"
        })
    }
    const previosUser = UserTable.findOne({username: createUser.username})

    if(previosUser._id){
        res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await UserTable.create({
        username: createUser.username,
        firstname: createUser.firstname,
        lastname: createUser.lastname,
        password: createUser.password
    }) // or UserTable.create({createUser})
    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET)
    res.json({
        message: "User created successfully",
        jsonToken: token
    })
})

userRouter.post("/signIn", (req, res) => {
    
})

userRouter.post("/update", (req, res) => {
    
})

module.exports = userRouter