const mongoose=require("mongoose")
const objectId= mongoose.Schema.Types.ObjectId


const blogSchema= new mongoose.Schema({
    blogName:{
        type:String,
        require:true,
        trim:true
    },
    body:{
        type:String,
        require:true,
        trim:true
    }
    ,
    category:{
        type:String,
        require:true,
        trim:true
    },
    authorId: { type: objectId, 
        ref: 'author',
        required:true
       },
    isDeleted:{
         type:Boolean,
        default:false
        
    }
    ,
    deletedAt:{
        type:Date,
        default:null
    }


},{ timestamps: true })

module.exports=mongoose.model("blog",blogSchema)