import {Router} from 'express'
import {contactUs } from '../controllers/publicController.js'


const router = Router()

router.post('/contactus', contactUs)

export {router as publicRoute}