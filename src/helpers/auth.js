const helpers= {};

helpers.inSession =(req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Acceso Denegado Biatch');
    res.redirect('/login');
};

module.exports = helpers;