const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const noteSchema = new mongoose.Schema({
    title:{ type:String , required:true},
    message_body: {type: String , required:true},
    type: {type: String , required:true , default: 'news'},
    status: {type: Boolean , default: true},
    media_files: {type: Array },
    createdBy:  [{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
},{
    timestamps:true,
})
module.exports = noteSchema;