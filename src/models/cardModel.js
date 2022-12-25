const mongoose = require("mongoose")

let cardSchema = new mongoose.Schema({
    cardNumber:{type:String,required:true},
    cardType:{type:String,enum:["REGULAR","SPECIAL"]},
    customerName:{type:String,required:true},
    status:{type:String,enum:["ACTIVE","INACTIVE"],default:"ACTIVE"},
    vision:{type:String},
    customerId:{type:mongoose.Schema.Types.ObjectId,ref:"Customer"},
},{timestamps:true})
module.exports = mongoose.model("Card",cardSchema)