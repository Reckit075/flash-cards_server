import express from 'express'
import { flashCards_post_createOne,flashCards_get_byType } from '../controlers/flashCards.mjs'

const router = express.Router()

router.get('/getByType',flashCards_get_byType)

router.post('/createOne',flashCards_post_createOne)


export default router