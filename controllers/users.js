const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to TechBlog!');
            res.redirect('/posts');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = async (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/posts';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        req.flash('success', 'Goodbye!');
        res.redirect('/posts');
    })
}