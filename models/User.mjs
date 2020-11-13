import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import keys from '../secret/keys.mjs'
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    }
})

userSchema.methods.generateAuthToken = function() {
    const {_id} = this
    const token = jwt.sign({_id}, keys.key, {expiresIn: "1d"})
    return token
}

const User = mongoose.model("User", userSchema)

export default User