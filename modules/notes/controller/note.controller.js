const Note = require("../model/note.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const User = require("../../users/model/user.model");




// Start  get all Notes //
const getAllNotes = async (req, res) => {
    let {page , size} = req.query ;
    if(!page){
        page = 1 ;
    }
    if(!size){
        size = 5 ;
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size ;


    const notes = await Note.find({})
    // .populate("createdBy")
    .limit(limit).skip(skip);
    const all = await Note.count();
    const totalPAges = Math.ceil(all/limit)
    res.status(StatusCodes.OK).json({ message: "Allnotes",page , size , totalPAges , data: notes });
};
// End  get all Notes //

// Start get specific Note by id //
const getNote = async (req, res) => {
    let { id } = req.params;
    try {
        const note = await Note.findOne({ _id: id })
        res.status(StatusCodes.OK).json({ message: "note", data: note })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Erro", data: error })
    }
}
// End get specific Note by id //

// Start get specific Note by type //
const getNoteByType = async (req, res) => {
    let { type } = req.body;
    try {
        const note = await Note.findOne({ type: type })
        res.status(StatusCodes.OK).json({ message: "note", data: note })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Erro", data: error })
    }
}
// End get specific Note by type //

// Start add new Note  //
const addNewNote = async (req, res) => {
    let createdBy = req.user.id;
    const { title, message_body, type, status, media_files } = req.body;
    const URLS = [];

    try {
        for (let i = 0; i < req.files.length; i++) {
            URLS.push(process.env.IMGURL + req.files[i].filename);
        }
        const newNote = new Note({
            title,
            message_body,
            type,
            status,
            media_files: URLS,
            createdBy,
          });
         await newNote.save();
        //   console.log(URLS);
          res.json({ message: "registered", data: newNote });
          await newNote.save();
          let users = await User.find({});
          for(let index=0 ; index<users.length ; index++){
          let current_received = users[index].received_notes;
          current_received.push(newNote.id)
        //   console.log(current_received) 
           
          users[index].save();         
          }
          newNote.save();
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "error", data: error });
    }
};
// End add new Note  //


// start Delete Note //
const deleteNote = async (req, res) => {
    let { id } = req.params;
    try {
        const note = await Note.deleteOne({ _id: id });
        res.json({ message: "user deleted", data: note });
    } catch (error) {
        res.json({ message: "error in delete", data: error });
    }
};
// End Delete Note //



module.exports = {
    getAllNotes,
    getNote,
    getNoteByType,
    addNewNote,
    deleteNote,
};