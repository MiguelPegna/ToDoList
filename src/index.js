const app = require('./server');
require('./database');
//server escuchando
app.listen(app.get('port'), ()=>{
    console.log('servidor activo en puerto:', app.get('port'), 'biatch', );
});