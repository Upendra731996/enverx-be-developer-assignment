
const mongoose= require("mongoose")


const authorSchema= new mongoose.Schema({
   
    fullName:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true

    },
    password:{
        type:String,
        require:true,
        trim:true

    }
},{ timestamps: true })

module.exports= mongoose.model("author" ,authorSchema)