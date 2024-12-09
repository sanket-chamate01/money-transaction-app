const express = require("express")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("./config")

function authMiddleware(req, res, next){
    const tokenHeader = req.headers.authorization

    if(!tokenHeader || !tokenHeader.startsWith('Bearer ')){
        res.status(403).json({
        })
    }

    const tokenArray = tokenHeader.split(" ")
    const token = tokenArray[1]
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(!err){
            req.userId = decoded.userId
            next()
        }else{
            res.status(403).json({})
        }
    })
}

module.exports = authMiddleware