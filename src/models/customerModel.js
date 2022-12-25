const mongoose = require("mongoose")
const validator = require("validator")

const customerSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    mobileNumber:{type:Number,required:true,unique:true},
    DOB:{type:Date},
    emailID:{type:String,required:true},
    address:{type:String,required:true},
    customerID: {type: String,validator: [validator.isVaildUUID, "Please provide a valid UUID"], required: true,unique:true},
    status: {type: String, default: "ACTIVE", enum: ["ACTIVE", "INACTIVE"]}
},{timestamps:true}) 

module.exports = mongoose.model('Customer',customerSchema)