const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    text: {type:String, required: true},
    completed: {type: Boolean , default:false},
});


const taskSchema = new mongoose.Schema(
    {
        title: {type:String, required:true},
        description: {type:string},
        priority: {type:String, enum:["Low", "Medium", "High"] , default: "Medium"},
        Status: {type:String, enum:["Pending", "In Progress" , "Completed"] , default:"Pending"},
        dueDate: {type:Date, required:true},
       
    }
)