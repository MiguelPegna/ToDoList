//Modulos
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const sesion = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Inicializacion de express
const app = express();
require('./config/passport');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

//middlewares
app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));
app.use(sesion({
    secret: 'hswd74',
    resave: true,
    saveUninitialized: true
}));

//Inicia passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//variables globales
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user||null;
    next();
});

//routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//exportar app
module.exports = app;