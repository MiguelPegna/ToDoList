const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nombre:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true, lowercase: true},
    password:{type:String, required:true}
    //fecha: {type:Date, default:Date.now} 
},{timestamps: true,
    versionKey: false});

//encriptar password
UserSchema.methods.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

//comparar password para iniciar sesion
UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

//verificar si el email registrado esta ya en uso
UserSchema.statics.isThisEmailInUse = async function(email){
    if(!email) throw new Error('Email invalido');
    try{
        const userMail = await this.findOne({email});
        if(userMail) return false
        return true;
    } catch (error){
        console.log('error interno vale vrgui', error.message);
        return false;
    }
}

module.exports = mongoose.model('User', UserSchema);