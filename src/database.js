const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/notesDB',{
    //seCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useFindAndModify: false
}).then(db=> console.log('DB conexion exitosa')).catch(err=>console.error(err));
