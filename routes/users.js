import express from 'express'
const router = express.Router()
import passport from 'passport'
import { loginUser, logoutUser, registerUser, renderLogin, renderRegister } from '../controllers/users.js'
import catchAsync from '../utilities/catchAsync.js'

router.route('/register')
    .get(renderRegister)
    .post(catchAsync(registerUser))

router.route('/login')
    .get(renderLogin)
    .post(passport.authenticate('local',
        { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), loginUser)

router.get('/logout', logoutUser)

export default router