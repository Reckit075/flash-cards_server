import users from '../data.mjs'
import User from '../models/User.mjs'
import generateRegisterCode from '../utils/generateRegisterCode.mjs'
import Mailer from '../utils/Mailer.mjs'
import usersRegisterCodes from '../usersRegisterCodes.mjs'
import {emailPassword,emailLogin} from '../secret/gmail_data.mjs'

const mailer = new Mailer(
    "smtp.gmail.com",
    587,
    emailLogin,
    emailPassword,
)

export const users_get_all = async (req, res) => {
    try {
        const users = await User.find()
        res.json({ users })
    }
    catch (error) {
        console.error(error)
        res.statusCode = 500
        res.json({ error: error.toString() })
    }
}

export const users_get_one = (req, res) => {
    try {
        const { id } = req.params
        res.statusCode = 200
        User
            .findOne({_id:id})
            .then(user =>{
                if(user) res.json({succes:true,user,message:'znaleziono uzytkownika'})
                else res.json({ succes: false, message: 'Nie znaleziono uzytkownika' })
            })
    }
    catch (error) {
        console.error(error)
        res.statusCode = 500
        res.json({ error: error.toString() })
    }
}

export const users_post_login = (req, res) => {
    try {
        const { username, password } = req.body

        User
            .findOne({ username })
            .then(user => {
                if (user && user.password == password) {
                    const token = user.generateAuthToken()
                    res.json({ succes: true, token, user, message: "Zalogowano pomyślnie" })
                } else if (user && user.password != password) {
                    res.json({ succes: false, message: "Niepoprawne hasło" })
                } else {
                    res.json({ succes: false, message: 'Użytkownik nie istnieje' })
                }
            })
    }
    catch (error) {
        console.error(error)
        res.statusCode = 500
        res.json({ error: error.toString() })
    }
}

export const users_post_code = (req, res) => {
    try {
        const code = req.body.code

        const userRegisterCode = usersRegisterCodes.find(u => u.code == code)
        if (!userRegisterCode) {
            res.statusCode = 200
            res.json({ succes: false, message: "Kod jest błędny" })
            return
        }

        const user = new User({
            username: userRegisterCode.username,
            password: userRegisterCode.password,
            email: userRegisterCode.email
        })

        user
            .save()
            .then(user => {
                res.statusCode = 200
                res.json({ succes: true, message: "Utworzono uzytkownika", user })
            })
    } catch (error) {
        console.error(error)
        res.statusCode = 500
        res.json({ error: error.toString() })
    }
}

export const users_post_register = async (req, res) => {
    try {
        const { username, password, email } = req.body

        User
            .find({ username })
            .then(async users => {
                if (users.length > 0) {
                    res.statusCode = 200
                    res.json({ succes: false, message: "Użytkownik już istnieje" })
                } else {

                    let code = generateRegisterCode()

                    const exist = usersRegisterCodes.find(u => u.code == code) !== undefined ? true : false;

                    while (exist) {
                        code = generateRegisterCode()
                    }

                    const emailSender = "testtest8395@gmail.com"
                    const emailRecipient = email
                    const emailTopic = "Kod aktywacyjny"
                    const emailMessage = "Kod aktywacyjny: " + code
                    const result = await mailer.sendEmail(emailSender, emailRecipient, emailTopic, emailMessage)

                    const userRegisterCode = {
                        username, password, email, code
                    }
                    usersRegisterCodes.push(userRegisterCode)
                    res.json({ succes: true, message: "Wysłano kod" })
                }
            })
    } catch (error) {
        console.error(error)
        res.statusCode = 500
        res.json({ error: error.toString() })
    }
}

export const users_post_checkIsAdmin = (req,res) =>{
    try{
        console.log('sprawdzanie admina')
    } catch (error) {
        console.error(error)
        res.statusCode = 403
        res.json({ error: error.toString() })
    }
}

export const users_post_adminPanel = (req,res) =>{
    try{
        console.log('user_post_adminPanel correct')
    } catch (error) {
        console.error(error)
        res.statusCode = 200
        res.json({ error: error.toString() })
    }
}