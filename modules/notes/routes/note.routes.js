const express = require("express");
const router = express.Router();
const multer = require("multer");



const validateRequest = require("../../../common/middleware/validateRequest");
const isAutoraized = require("../../../common/middleware/isAuthorized");
const uploads = require("../../../common/middleware/multer");
const { GET_ALL_NOTES, GET_NOTE, DELETE_NOTE, ADD_NEW_NOTE, GET_NOTE_BY_TYPE } = require("../endPoints");
const { getAllNotes, getNote, deleteNote, addNewNote, getNoteByType } = require("../controller/note.controller");
const { addNoteSchema } = require("../joi/noteValidation");



// Start end Points

router.get(GET_ALL_NOTES, isAutoraized(GET_ALL_NOTES), getAllNotes);
router.get(GET_NOTE, isAutoraized(GET_NOTE), getNote);
router.get(GET_NOTE_BY_TYPE, isAutoraized(GET_NOTE_BY_TYPE), getNoteByType);
router.post(
  ADD_NEW_NOTE,
  isAutoraized(ADD_NEW_NOTE),
  uploads.array("media_files", 10),
  validateRequest(addNoteSchema),
  addNewNote
);

router.delete(DELETE_NOTE, isAutoraized(DELETE_NOTE), deleteNote);

module.exports = router;


