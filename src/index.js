const express = require("express")
const mongoose = require("mongoose")
const route = require("./route/route.js")
const app = express()
const multer = require("multer")

app.use(express.json())
app.use(multer().any())
app.use("/",route)
mongoose.set("strictQuery",true)

mongoose.connect("mongodb+srv://Lucifer:lucifer123@newcluster.v5hebkq.mongodb.net/newDataBase?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=>console.log("MongoDb is Connect"))
.catch((err)=>console.log(err))

app.listen(3000,function(){
    console.log("Express runing on 3000")
})


