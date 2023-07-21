const express= require('express')
const route= require("./routes/route")
const mongoose=require('mongoose')

const app= express()

app.use(express.json())

mongoose.connect("mongodb+srv://upendra:wvUNUF1FjJ02PCPH@cluster0.b8yrh4n.mongodb.net/envex",{
    useNewUrlParser:true
})
.then(()=> console.log("mongoose is connected"))
.catch((err)=> console.log("err : "+ err))
app.use("/",route)

app.listen(3000,()=>{
    console.log("express running on port 3000")
})