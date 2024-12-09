const zod = require("zod")

const signUpValidation = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

const signInValidation = zod.object({
    username: zod.string().email(),
    password: zod.email()
})

const updateValidation = zod.object({
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
    password: zod.string().optional()
})

module.exports = {
    signInValidation,
    signUpValidation,
    updateValidation
}