const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name:{ type:String , required:true},
    email: {type: String , required:true},
    password: {type: String , required:true},
    avatar: {type: String },
    role: {type: String , default: 'user'},
    notifiy_me: {type: Boolean , default: true},
    received_notes: [{type:mongoose.Schema.Types.ObjectId,ref:'note'}],
},{
    timestamps:true,
})
userSchema.pre('save' , async function(next){
    this.password = await bcrypt.hash(this.password , 7)
    next();
});
module.exports = userSchema;