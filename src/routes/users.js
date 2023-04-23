const {Router} = require('express');
const {formNewUser, formLogin, insertUser, signin, signout} = require('../controllers/UsersController');
const router = Router();

//enviar al formulario registro de usuario
router.get('/signup', formNewUser);

//enviar a formulario inicio de sesion
router.get('/login', formLogin);

//add nuevo user a la DB
router.post('/users/save', insertUser);

//autenticar usuario
router.post('/users/login', signin);

//cerrar sesion
router.get('/users/logout', signout);

module.exports = router;