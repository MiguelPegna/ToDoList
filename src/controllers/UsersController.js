const Users = {};
const User = require('../models/User');
const passport = require('passport');

//formulario de registro usuario
Users.formNewUser = (req, res) => {
    res.render('users/signup');
}

//formulario de login 
Users.formLogin = (req, res) => {
    res.render('users/login');
}

//add user a la DB
Users.insertUser = async(req, res) => {
    const {nombre, email, password, passwordC} = req.body;
    const errors = [];
    if(!nombre){
        errors.push({text: 'Escribe tu nombre'});
    }
    if(!email){
        errors.push({text: 'Escribe un email'});
    }
    if(!password){
        errors.push({text: 'Escribe una contraseña'});
    }
    if(password != passwordC){
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if(password.length < 4){
        errors.push({text: 'La contraseña debe tener más de 4 caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, nombre, email, password});
    }
    else{
        //verificar email existente en DB
        const emailUser = await User.isThisEmailInUse(email);
        if(!emailUser){
            errors.push({text: 'Email en uso prueba iniciando sesión'});
            return res.render('users/signup', {errors});
        }
        const newUser = new User({nombre, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Cuenta creada exitosamente Inicia sesión:)');
        res.redirect('/login');
    }
}

//Inicio de sesion
Users.signin = passport.authenticate('local',{
    successRedirect: '/notas',
    failureRedirect: '/login',
    failureFlash: true
});

//cierre de sesion
Users.signout = (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to log out')
            }
            else {
                res.redirect('/');
            }
        });
    }
    else{
        res.end()
    }
}

module.exports = Users;