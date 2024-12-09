const express = require("express")
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("./config")

function authMiddleware(req, res, next){
    const tokenHeader = req.headers.authorization

    if(!tokenHeader || !tokenHeader.startsWith("Bearer ")){
        res.status(403).json({
            message: "Cannot recognize logged user"
        })
    }

    const tokenArray = tokenHeader.split(" ")
    const token = tokenArray[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        
        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({
            message: "Somthing is wrong"
        });
    }
}

module.exports = authMiddleware