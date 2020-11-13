import express from 'express'
import { flashCards_post_createOne,flashCards_get_all } from '../controlers/flashCards.mjs'

const router = express.Router()

router.get('/all',flashCards_get_all)

router.post('/createOne',flashCards_post_createOne)


export default router