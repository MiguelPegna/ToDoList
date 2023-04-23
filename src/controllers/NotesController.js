const Notes = {};
const Note = require('../models/Note');

//formulario crear nota
Notes.formNewNote = (req, res) => {
    res.render('notes/new-note');
}

//add nueva nota a la DB
Notes.insertNewNote = async(req, res) => {
    const {titulo, descripcion} = req.body;
    const errors = [];
    if(!titulo){
        errors.push({text: 'Escribe un titulo de nota'});
    }
    if(!descripcion){
        errors.push({text: 'Escribe una descripción'});
    }
    if(errors.length > 0){
        res.render('notes/new-note', {errors, titulo, descripcion});
    }
    else{
        const newNote = new Note({titulo, descripcion});
        newNote.user = req.user._id;
        await newNote.save();
        req.flash('success_msg', 'Nota creada exitosamente :)');
        res.redirect('/notas');
    }
}

//Mostar notas del usuario
Notes.showNotes = async(req, res) => {
    //const notes = await Note.find().lean().sort({createdAT: 'desc'});
    const notes = await Note.find({user: req.user._id}).lean().sort({fecha:-1});
    res.render('notes/show-notes', {notes});
}

//formulario de editar nota
Notes.formEditNote = async(req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', {note});
}

//actualizar nota
Notes.updateNote = async(req, res) => {
    const {titulo, descripcion} = req.body;
    const errors = [];
    if(!titulo){
        errors.push({text: 'Escribe un titulo de nota'});
    }
    if(!descripcion){
        errors.push({text: 'Escribe una descripción'});
    }
    if(errors.length > 0){
        const note = await Note.findById(req.params.id).lean();
        res.render('notes/edit-note', {note, errors, titulo, descripcion});
    }
    else{
        await Note.findByIdAndUpdate(req.params.id, {titulo, descripcion}).lean();
        req.flash('success_msg', 'Nota editada exitosamente :)');
        res.redirect('/notas');
    }
}

//estado de nota
Notes.changeState = async(req, res)=>{
    const note = await Note.findById(req.params.id).lean();
    if(note.estado){
        const noteFalse = !note.estado;
        await Note.findByIdAndUpdate(req.params.id, {estado: noteFalse}).lean();
        req.flash('success_msg', 'La nota ha cambiado a tarea hecha');
        res.redirect('/notas');
        //console.log(noteFalse);
    }
    if(!note.estado){
        const noteTrue = !note.estado;
        await Note.findByIdAndUpdate(req.params.id, {estado: noteTrue}).lean();
        req.flash('success_msg', 'La nota ha cambiado a tarea pendiente');
        res.redirect('/notas');
        //console.log(noteTrue);
    }
}

//borrar nota
Notes.dropNote = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota eliminada exitosamente :)');
    res.redirect('/notas');
}

module.exports = Notes;