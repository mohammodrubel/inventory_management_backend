import express from 'express'
import { registrationController } from '../controller/auth_Controller'

const router = express.Router()

router.post('/register',registrationController.newUserRegister)
router.get('/users',registrationController.getAllUsers)
router.post('/login',registrationController.loginUser)
router.post('/refresh-token',registrationController.refreshTokenControler)

export const Auth = router