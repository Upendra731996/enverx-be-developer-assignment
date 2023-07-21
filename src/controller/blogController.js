const blogModel= require("../models/blogModels")
const authorModel= require("../models/authorModel")
const mongoose=require("mongoose")
let {isValid,isValidBody} = require("../validation/validator")


async function createBlog(req,res){
    try{
    let data= req.body;
    
    if(isValidBody(data)){
        return res.status(400).send({status:false,msg:"body is empty please provide some data to create blog"})
    }
    let {blogName,body,category,authorId}=data
   
    if(!isValid(blogName)){
        return res.status(400).send({status:false,msg:"blogName is mandatry"})
    }
    
    
    if(!isValid(body)){
        return res.status(400).send({status:false,msg:"body is mandatry"})
    }
    if(!isValid(category)){
        return res.status(400).send({status:false,msg:"category is mandatry"})
    }
    if(!isValid(authorId)){
        return res.status(400).send({status:false,msg:"authorId is mandatry"})
    }
    let checkAuthor= await authorModel.findById(authorId)
    if(!checkAuthor){
        return res.status(400).send({status:false,msg:"this author id is not exist"})
    }
    
    let blogData= await blogModel.create(data)
    return res.status(201).send({status:true,data:blogData})

}
catch(err){
    return res.status(500).send({status:false,err:err.masage})
}

}

async function blogGetBYId(req,res){
    try{
        
    let blogId=req.params.id

    if(!isValid(blogId)){
        return res.status(400).send({status:false,msg:" blogid is mandatry  in path param for perticular blog"})
    }
   
    if(!mongoose.Types.ObjectId.isValid(blogId)){
        return res.status(400).send({status:false,msg:"this is  not valid id"})
    }
    let blog=await blogModel.findById(blogId,{isDeleted:false})
    if(!blog){
        return res.status(400).send({status:false,msg:"this id for blog not exist or deleted"})
    }
   
    return res.status(200).send({status:true,data:blog})
}
catch(err){
    return res.status(500).send({status:false,err:err.masage}) 
}
}



async function getAllBlog(req,res){

    try{
let data=req.query

        let blog=await blogModel.find({isDeleted:false,...data}).sort({createdAt:1})
       
        return res.status(200).send({status:true,data:blog})
    }
    catch(err){
        return res.status(500).send({status:false,err:err.masage}) 
    }
}




async function deletBlog(req,res){
    try{
        let blogId= req.params.id
        

        if(!blogId){
            return res.status(400).send({status:false,msg:"blog id is mandatory in path param"})
        }
        if(!mongoose.Types.ObjectId.isValid(blogId)){
            return res.status(400).send({status:false,msg:"this is  not valid id"})
        }

        let deleted= await blogModel.findOneAndUpdate(
            {_id:blogId,isDeleted:false},
            {$set:{isDeleted:true,deletedAt: new Date}},
            {new:true}
        );


        if(!deleted){
            return res.status(400).send({status:false,msg:"blog blog not fournd or already deleted"})
        }
        return res.status(200).send({status:true,data:deleted})
    }
    catch(err){
        return res.status(500).send({status:false,err:err.masage}) 
    }
}


async function updateBlog(req,res){
  
    try{
        let data= req.body
        let blogId= req.params.id
    
    if(isValidBody(data)){
        return res.status(400).send({status:false,msg:"body is empty please provide some data to for update  blog"})
    }
    if(mongoose.Types.ObjectId.isValid(blogId)){
        return res.status(400).send({status:false,msg:"this is  not valid id"})
    }

   let {blogName,body,category}=data
let updatedBlogData= await blogModel.findOneAndUpdate(
    {_id:blogId,isDeleted:false},
    {$set:{blogName,body,category}},
    {$new:true}
)
if(!updatedBlogData){
    return res.status(400).send({status:false,msg:"blog is not exist or deleted"})
}
return res.status(200).send({status:true,data:updatedBlogData})

    }
    catch(err){
        return res.status(500).send({status:false,err:err.masage}) 
    }
}



module.exports={createBlog,blogGetBYId,getAllBlog,deletBlog,updateBlog}