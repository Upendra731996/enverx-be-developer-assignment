const jwt=require("jsonwebtoken")
let blogModel= require("../models/blogModels")


async function authentication(req,res,next){
    try{

        let token= req.headers["x-api-key"]
        console.log(token)
        if(!token){
            return res.status(400).send({
                status: false,
                msg: "You're not logined, " });
             
        }
         verifyToken=jwt.verify(token, "my-secret-key",
         (err,response)=>{
            if(err){
                return res.status(500).send({status:false,msg:"token is not valid pleas provide valod token"})
            }
            req.headers.authorId=response.authorId
         })
         next()

    }
    catch(err){
        return res.status(500).send({status:false,err:err.masage})
       }
    
}
  async function authorization(req,res,next){
try{
    let authorId= req.headers.authorId
    let blogId= req.params.id
    let data= await blogModel.findById(blogId)
    
    
    
if( authorId!=data.authorId){
    return res.status(400).send({status:false,msg:"you are not authorize persone for form the this operation"})

}
next()

    

}
catch(err){
    return res.status(500).send({status:false,err:err.masage})
   }
    
  }



module.exports={authentication ,authorization}