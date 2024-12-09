const express = require("express")
const mainRouter = require("./routes/index")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1", mainRouter)
// /api/v1/user/signin
// /api/v1/account/transaction

app.listen(3000, () => {
    console.log("App listening on port 3000")
})