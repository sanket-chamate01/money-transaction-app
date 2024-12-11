const express = require("express")
const { signUpValidation, signInValidation, updateValidation } = require("../types")
const { UserTable, AccountTable } = require("../db")
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config")
const authMiddleware = require("../middleware")

const userRouter = express.Router()

userRouter.post("/signUp", async (req, res) => {
    const createUser = req.body
    const parseUser = signUpValidation.safeParse(createUser)

    if(!parseUser.success){
        return res.status(411).json({
            message: "Wrong Inputs"
        })
    }

    const previousUser = await UserTable.findOne({
        username: createUser.username
    })
    

    if(previousUser){
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const user = await UserTable.create({
        username: createUser.username,
        firstname: createUser.firstname,
        lastname: createUser.lastname,
        password: createUser.password // don't store password as it is, hash the password , add salt i.e. password + random samething then hash then as store in db
    }) // or UserTable.create({createUser})

    const token = jwt.sign({
        userId: user._id,
    }, JWT_SECRET)

    const userAccount = await AccountTable.create({
        userId: user._id,
        balance: 1 + Math.random() * 10000
    })

    res.json({
        message: "User created successfully",
        token: token
    })
})

userRouter.post("/signIn", async (req, res) => {
    const user = req.body;
    const parseUser = signInValidation.safeParse(user)

    if(!parseUser.success){
        return res.status(411).json({
            message: "Wrong Inputs"
        })
    }

    const previousUser = await UserTable.findOne({
        username: user.username,
        password: user.password
    })

    if(previousUser){
        const token = jwt.sign({
            userId: previousUser._id
        }, JWT_SECRET)
        
        res.status(200).json({
            token: token
        })
        return 
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

userRouter.put("/update", authMiddleware, async (req, res) => {
    const previousUser = req.body;
    const parseUser = updateValidation.safeParse(previousUser)

    if(!parseUser.success){
        return res.status(411).json({
            message: "Wrong Inputs"
        })
    }
    console.log(previousUser);
    console.log(req.userId)

    await UserTable.updateOne({
        _id: req.userId
    }, {
        $set: previousUser
    })

    res.json({
        message: "User information updated successfully"
    })
})

userRouter.get("/bulk", authMiddleware, async (req, res) => {
    const usersQuery = req.query.filter || "" 

    const id = req.userId;

    const users = await UserTable.find({
        $and: [
            {
                $or: [
                    { "firstname": { "$regex": usersQuery } },
                    { "lastname": { "$regex": usersQuery } }
                ]
            },
            {
                "_id": {
                    "$ne": id 
                }
            }
        ]
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })

})

userRouter.get("/currentUser", authMiddleware, async (req, res) => {
    const data = await UserTable.findOne({
        _id: req.userId
    })
    res.json({
        user: data
    })
})

module.exports = userRouter