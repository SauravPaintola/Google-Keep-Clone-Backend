const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title:{type:String },
    desc:{type:String},
    tag:{type:String},
    user:{type:String , required:true}
},{
    versionKey:false
})

const NoteModel = mongoose.model("note" , noteSchema);

module.exports = NoteModel