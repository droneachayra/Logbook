const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const trainers=new Schema({
    name:{type:String, required:true, unique: true}
}, {
    collection: 'trainers'
 })

module.exports=mongoose.model('trainers',trainers)