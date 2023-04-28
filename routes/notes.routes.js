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


//put request to update a particular note


noteRouter.put('/updatenote/:id', auth, async (req, res) => {
    try {
        const { _id, title, desc, tag } = req.body
        const newNote = {}
        if (title) { newNote.title = title }
        if (desc) { newNote.desc = desc }
        if (tag) { newNote.tag = tag }

        const note = await noteModule.findById(_id)
        console.log(note)
        console.log(req.user)
        if (note.user === req.user.id) {
            const updatedNote = await noteModule.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.send(note)

        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})



// delete request to delete particular note

noteRouter.delete('/deletenote', auth, async (req, res) => {
    try {
        const _id = req.body.id
        const user = await noteModule.findById(_id) // searching element by id
        if (user.user === req.user.id) { // checking for valid user is making request
            const note = await noteModule.findByIdAndDelete(_id) // deleting element by id
            res.json({
                "status": "Deleted",
                note
            })
        }

        else { // response for unauthorized access
            res.status(401).send("unauthorized access")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = noteRouter // exporting module is must 
