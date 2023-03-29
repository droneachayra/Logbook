const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const drones=new Schema({
    uin:{type:String, unique:true, required:true},
    class:{type:String, required:true},
    category:{type:String,required:true}
}, {
    collection: 'drones'
 })

module.exports=mongoose.model('drones',drones)