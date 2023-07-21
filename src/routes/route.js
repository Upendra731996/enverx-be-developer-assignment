const  express= require("express")

const router= express.Router()
const {login,createAuthor}= require("../controller/authorController")
const {createBlog,blogGetBYId,getAllBlog,deletBlog,updateBlog}=require("../controller/blogController")
const {authentication,authorization}= require("../auth/auth")

router.post("/createAuthor" ,createAuthor)
router.post("/login",login)
router.post("/posts",authentication,createBlog)
router.get("/posts/:id",blogGetBYId)
router.get("/posts",getAllBlog)
router.delete("/posts/:id" ,authentication,authorization,deletBlog)
router.put("/posts/:id",authentication,authorization,updateBlog)
// ==========for wrong url==========
router.all("/*" , (req,res)=> {
    return res.status(404).send({status:false, msg:"this url not found"})
})
module.exports=router;