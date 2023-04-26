const express = require('express');
const jwt = require('jsonwebtoken');
const noteModule = require('../models/NoteModel');
const auth = require('../middlewares/auth');
const noteRouter = express.Router()


//get request to get user notes from the database #login required
noteRouter.get('/usernotes', auth, async (req, res) => { 
    try {
        const notes = await noteModule.find({ user: req.user.id }) // getting data from database by using user id
        res.send(notes) //sending it as response
    }

    catch (err) {
        res.status(400).send(err)
    }
})




//post request to add new note #login required
noteRouter.post('/newnote', auth, async (req, res) => {
    try {
        const { title, desc, tag } = req.body // getting data from req body
        const Note = new noteModule({
            title, desc, tag, user: req.user.id // making a obj to be saved  in database

        })

        const savedNote = await Note.save() //saving the note
        res.send(savedNote) // sending as response
    } catch (error) {
        res.status(400).send(error) // else error
    }
})

module.exports = noteRouter // exporting module is must
