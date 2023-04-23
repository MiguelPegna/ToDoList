const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = new Schema({
    titulo:{type:String, required:true},
    descripcion:{type:String, required:true},
    fecha: {type:Date, default:Date.now},
    estado:{type: Boolean, default:true},
    user:{type:String}
    //
},{timestamps: true,
    versionKey: false});

module.exports = mongoose.model('Note', NoteSchema);