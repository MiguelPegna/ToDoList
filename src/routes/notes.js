const {Router} = require('express');
const {formNewNote, insertNewNote, showNotes, formEditNote, updateNote, changeState, dropNote} = require('../controllers/NotesController');
const router = Router();
const {inSession} = require('../helpers/auth');

//enviar al form de nueva nota
router.get('/notas/add', inSession, formNewNote);

//add nueva nota a la DB
router.post('/notas/save', inSession, insertNewNote);

//Consultar las notas de usuario
router.get('/notas', inSession, showNotes);

//formulario editar nota
router.get('/notas/edit/:id', inSession, formEditNote);

//actualizar nota
router.put('/notas/update/:id', inSession, updateNote);

//cambiar estado de tarea
router.get('/notas/done/:id', inSession, changeState);

//eliminar nota
router.delete('/notas/delete/:id', inSession, dropNote);

module.exports = router;