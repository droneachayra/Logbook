const mongoose =require('mongoose');


const Schema=mongoose.Schema;

const logSchema=new Schema({
    trainer:{type:String},
    trainy:{type:String,unique:true},
    drone:{type:String,required:true},
    startDate:{type:String,required:true},
    endDate:{type:String,required:true},
    duration:{type:String,required:true},
    create_at:{type:Number,default:Date.now().valueOf()},
    updated_at:{type:Number,default:Date.now().valueOf()}
})
module.exports=mongoose.model('logbook',logSchema);
