const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const logSchema=new Schema({
    trainer:{type:Array, required:true},
    trainee:{type:Array,required:true},
    drone:{type:Array,required:true},
    startDate:{type:Date,required:true},
    startTime:{type:Date,required:true},
    examiner:{type:String,required:true},
    examtime:{type:Number, required:true},
    examUin:{type:String,required:true}
});

module.exports=mongoose.model('logbook',logSchema);
