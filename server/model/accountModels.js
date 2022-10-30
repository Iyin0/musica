const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const accountSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    username: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
        type: Buffer,
    },

}, { timestamps: true })


// static signup method
accountSchema.statics.signup = async function (first_name, last_name, username, email, password) {

    // validation

    if (!first_name || !last_name || !email || !password) throw Error("All fields must be filled")

    if (!validator.isEmail(email)) throw Error("Email not valid")

    if (!validator.isStrongPassword(password)) throw Error("Password not strong enough")

    const exists = await this.findOne({ email })

    if (exists) throw Error("Email already exists")

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    if (!username) username = first_name

    const user = await this.create({ first_name, last_name, username, email, password: hash })

    return user

}

// static login method 
accountSchema.statics.login = async function (email, password) {

    // validation

    if (!email || !password) throw Error("All fields must be filled")

    const user = await this.findOne({ email })

    if (!user) throw Error("Incorrect email")

    const match = await bcrypt.compare(password, user.password)

    if (!match) throw Error("Incorrect password")

    return user


}

module.exports = mongoose.model('Account', accountSchema)