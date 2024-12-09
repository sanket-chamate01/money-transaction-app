const zod = require("zod")

const userValidation = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

module.exports = {
    userValidation
}