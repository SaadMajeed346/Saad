const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema= new Schema({
    userId:String,
});
module.exports=mongoose.model('users',userSchema);