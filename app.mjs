import express from 'express'
import cors from 'cors'
import usersRouter from './routes/users.mjs'
import flashCardsRouter from './routes/flashCards.mjs'
import connectionDB from './DB/connection.mjs'

import User from './models/User.mjs'

const port = 3001
const app = express()

connectionDB()

app.use(cors())
app.use(express.json())
const auth = (req,res, next) =>{
    next()
}

app.get("/",auth, (req,res)=>{
    res.send(`<h1>Strona główna - ${req.username}</h1>`)
})

app.get("/find", async (req,res)=>{
    const users = await User.find()
    console.log(users)
})


app.use("/users", usersRouter)

app.use('/flashCards', flashCardsRouter)


app.use((req,res)=>{
    res.status(404).send('cant find this page')
})


app.listen(port, () => {
    console.log("Serwer " + port)
})