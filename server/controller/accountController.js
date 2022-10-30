const Account = require('../model/accountModels')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: '3d' })
}

exports.signupUser = async (req, res) => {
    const { first_name, last_name, username, email, password } = req.body

    try {
        const user = await Account.signup(first_name, last_name, username, email, password)
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await Account.login(email, password)
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// exports.deleteUser = (req, res) => {
//     res.json({ message: "Delete user" })
// }

// exports.updateUser = (req, res) => {
//     res.json({ message: "Update user" })
// }

// exports.getAllUser = (req, res) => {
//     res.json({ message: "Get All users" })
// }