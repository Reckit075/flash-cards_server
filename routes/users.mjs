import express from 'express'
import { users_get_all, users_get_one, users_post_register, users_post_login, users_post_code, users_post_checkIsAdmin, users_post_adminPanel } from '../controlers/users.mjs'
import { dataBase_post_deleteAll } from '../controlers/dataBase.mjs'
import auth from '../utils/auth.mjs'
import adminAuth from '../utils/adminAuth.mjs'

const router = express.Router()

// router.get("/all", auth, adminAuth, users_get_all)
router.get("/all", auth, users_get_all)

router.get("/one/:id", users_get_one)

// "/all?name=Maciej&surname=Kowalski"
// req.query {name:"Jacek",surname:"Kowalski" }
// "/one/12"
// req.params {id: 12}

router.post("/register", users_post_register)

router.post('/login', users_post_login)

router.post('/code', users_post_code)

router.post('/checkIsadmin', users_post_checkIsAdmin)

router.post('/adminPanel', users_post_adminPanel)

router.post('/deleteDataBase', dataBase_post_deleteAll)



export default router