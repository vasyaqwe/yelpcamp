import * as dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') dotenv.config()
import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo';
import flash from 'connect-flash'
import moment from 'moment'
import connectDB from './db.js'
import methodOverride from 'method-override'
import path from 'path'
import campgroundRoutes from './routes/campgrounds.js'
import reviewRoutes from './routes/reviews.js'
import userRoutes from './routes/users.js'
import ejsMate from 'ejs-mate'
import AppError from './utilities/AppError.js'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from './models/user.js'
import { fileURLToPath } from 'url'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
connectDB()
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(mongoSanitize())

const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'secret'
    }
})
app.use(session({
    store,
    name: 'session',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(helmet.dnsPrefetchControl())
app.use(helmet.expectCt())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.originAgentCluster())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.moment = moment;
    next()
})
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)
app.use('/', userRoutes)

app.get('/', (req, res) => {
    res.render('home')
})
app.all('*', (req, res, next) => {
    next(new AppError('Page not found', 404))
})
app.use((err, req, res, next) => {
    const { status = 505, message = 'Something went wrong..' } = err
    const returnToUrl = req.session.returnTo || '/campgrounds/page/1'
    res.status(status).req.flash('error', message)
    return res.redirect(returnToUrl)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`SERVING ON PORT ${port}`)
})