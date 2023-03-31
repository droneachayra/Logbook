const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const logSchema=new Schema({
    Trainer:{type:Array, required:true},
    Trainee:{type:Array,required:true},
    UIN:{type:Array,required:true},
    Place_of_Operation:{type:String,required:true},
    Date:{type:Number,required:true},
    Start_Day1:{type:Array,required:true},
    Start_Day2:{type:Array, required:true},
    EXAMINER:{type:Array,required:true},
    EXAMINER_TIME:{type:Array,required:true},
    EXAM_UIN:{type:Array,requied:true},
});

module.exports=mongoose.model('logbook',logSchema);
