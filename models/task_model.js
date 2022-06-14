const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const taskSchema = new mongoose.Schema({
    taskName:{
        type:String,
        unique:true,
        trim:true,
        min:3,
        max:30,
        required:true
    },
    completed:{
        type:Boolean,
        lowercase:true,
        trim:true,
        required:true,
        default:false
    }
}, { timestamps: true })


const tasks = mongoose.model('tasks', taskSchema);

module.exports=tasks