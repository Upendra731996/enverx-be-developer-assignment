const authorModel= require("../models/authorModel")
const jwt=require("jsonwebtoken")
const {isValid,isValidEmail,isValidBody,isValidPassword}=require("../validation/validator")


async function createAuthor(req,res){

    try{
        let data= req.body

        if(isValidBody(data)){
            return res.status(400).send({status:false,msg:"body is empty please provide some data to create author"})
        }
let {fullName,email,password}=data
     

        if(!isValid(fullName)){
             return res.status(400).send({status:false,msg:"fullName is mandatry fieled"})
        }

        if(!isValid(email)){
            return res.status(400).send({status:false,msg:"email is mandatry fieled"})
        }

        if(!isValidEmail(email)){
            return res.status(400).send({status:false,msg:"please provide valid email id"})
        }
let checkEmail=await authorModel.findOne({email:email})

         if(checkEmail){
            return res.status(400).send({status:false,msg:"this email is allready resister please provide anothe mail"})
         }


        if(!isValid(password)){
            return res.status(400).send({status:false,msg:"password is mandatry fieled"})
        }
        if(!isValidPassword(password)){
            return res.status(400).send({status:false,msg:"Password must  be between 8 and 15 character"})
        }
 
        let authorData=await authorModel.create(data)
        return res.status(201).send({status:true,data:authorData})

    }
    catch(err){
        return res.status(500).send({status:false,err:err.masage})
    }

}

async function login(req,res){
   try{

    let data= req.body;
    let email=data.email;
    let password=data.password

    if(isValidBody(data)){
        return res.status(400).send({status:false,msg:"email and password is missing"})
    }
    if(!isValid(email)){
        return res.status(400).send({status:false,msg:"email mandatry for login"})
    }
    if(!isValid(password)){
        return res.status(400).send({status:false,msg:"pass word mandatry for login"})
    }

    let authorData= await authorModel.findOne({email:email})
console.log(authorData)
    if(email!= authorData.email){
        return res.status(400).send({status:false,msg:"credential is incorect"})
    }
let payLoad={
   fullName: authorData.fullName,
   authorId:authorData._id
}
    let token= jwt.sign(payLoad,"my-secret-key")

    return res.status(201).send({status:true,token:token})

   }
   catch(err){
    return res.status(500).send({status:false,err:err.masage})
   }
}

module.exports={createAuthor, login}