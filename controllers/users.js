import User from '../models/user.js'

export const renderRegister = (req, res) => res.render('users/register')

export const registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const newUser = new User({ email, username })
        const registeredUser = await User.register(newUser, password)
        req.login(registeredUser, err => {
            if (err) { return next(err) }
            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/campgrounds/page/1')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

export const renderLogin = (req, res) => res.render('users/login')

export const loginUser = (req, res) => {
    req.flash('success', 'Welcome back!')
    const redirectUrl = req.session.returnTo || '/campgrounds/page/1'
    delete req.session.returnTo
    res.redirect(redirectUrl)

}
export const logoutUser = (req, res, next) => {
    req.logout(err => err && next(err))
    req.flash('success', 'Bye')
    res.redirect('/campgrounds/page/1')
}