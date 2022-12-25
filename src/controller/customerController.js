const customerModel = require("../models/customerModel")
const validator = require("../validator/validator")
const {v1: uuidv1} = require('uuid')
const cardModel = require("../models/cardModel")
//---------------------------Customer Creation --------------------------------------------

const createCustomer = async function(req,res){
    try{
    const data = req.body
    const {firstName,lastName,mobileNumber,DOB,emailID,address,customerID,status,...rest} = data
    if(!validator.checkInput(data)) return res.status(400).send({status:false,message:"Plese provide the  customer credantial"})
    if(validator.checkInput(rest)) return res.status(400).send({status:false,message:"only firstName, lastName, mobileNumber, DOB, emailID, address, customerID, status are accepts"})
//------------firstName validation-------------

    if(!validator.isValidInput(firstName)) return res.status(400).send({status:false,message:"Plese provide the firstName"})
    if(!validator.isValidName(firstName)) return res.status(400).send({status:false,message:"Plese provide valid firstName"})
//-----------------------lastName validation-----------------

   if(!validator.isValidInput(lastName)) return res.status(400).send({status:false,message:"Plese provide the lastName"})
   if(!validator.isValidName(lastName)) return res.status(400).send({status:false,message:"Plese provide the lastName"})
//----------------------Mobile Number validation----------------

   if(!validator.isValidInput(mobileNumber)) return res.status(400).send({status:false,message:"Plese provide the mobileNumber"})
   if(!validator.isValidMobileNumber(mobileNumber)) return res.status(400).send({status:false,message:"Plese provide valid mobileNumber"})

//-------------------DOB validation --------------

   if(!validator.isValidInput(DOB)) return res.status(400).send({status:false,message:"Plese provide the DOB"})
   if(!validator.isVaildDOB(DOB)) return res.status(400).send({status:false,message:"Please provide a valid DOB"})

//-----------------Email validation----------------

   if(!validator.isValidInput(emailID)) return res.status(400).send({status:false,message:"Plese provide the emailID"})
   if(!validator.isValidEmail(emailID)) return res.status(400).send({status:false,message:"Plese provide valid emailID"})
//-----------------Db call here for check unique mobile Number and emailId------------

   const checkData = await customerModel.findOne({$or:[{mobileNumber:mobileNumber},{emailID:emailID}]})
    if(checkData){
    if(checkData.mobileNumber==mobileNumber) return res.status(409).send({status:false,message:"MobileNumber already exist"})
    if(checkData.emailID==emailID) return res.status(409).send({status:false,message:"EmailID already exist"})}
//----------------address validation------------------

   if(!validator.isValidInput(address)) return res.status(400).send({status:false,message:"Please Provide address"})
   if(!validator.isValidCity(address)) return res.status(400).send({status:false,message:"Please Provide valid address"})

//--------------------customerID validation ------------------

   data.customerID = uuidv1()

//----------------Status validation---------------
    if (status || status == "") {
    if (!validator.isValidInput(status)) return res.status(400).send({status: false, message: "plaese enter status"})
    if (!["ACTIVE", "INACTIVE"].includes(status)) return res.status(400).send({status: false, message: "choose input for status from the list: (ACTIVE, INACTIVE)"})}

   const customerData = await customerModel.create(data)
   return res.status(201).send({status:true,message:"Customer Data Successfully Created",data:customerData})

    }catch (err){
        return res.status(500).send({status:false,message:err.message})
    }}

    //----------Get all customer Data-------------------

    const getCustomer = async (req, res) => {
        try {
    
            let getData = await customerModel.find({status:'ACTIVE'})
            if (!getData) return res.status(404).send({status: false, message: "something went wrong"})
            return res.status(200).send({status: true, message: 'success',totalData: getData.length, data: getData})
            
        } catch (error) {
            return res.status(500).send({status: false, message: error.message})
    }}

    //-----------------Delete customer data--------------

    const deletCustomer = async function(req,res){
        try{
            let id = req.params.customerID
            if(!validator.isValidObjectId(id)) return res.status(400).send({status:false,message:"Please provide ID"})
            let deleteData = await customerModel.findByIdAndDelete({_id:id})
            if(!deleteData) return res.status(404).send({status:false,message:"Data is already deleted"})
            return res.status(200).send({status:true,message:"Data deleted successfully"})

        }catch(err){
            return res.status(500).send({status:false,message:err.message})
        }}

        //====================[function to fetch customer data by id]===================//

const getDataById = async (req, res) => {
    try {
        
        let id = req.params.customerID
        if (!validator.isValidObjectId(id)) return res.status(400).send({status: false, message: `Given customerID: '${id}' is not valid`})
        let customerData = await customerModel.findById({_id: id}).lean()
        if (!customerData) return res.status(404).send({status: false, message: "Customer does not exist or already Deleted"})
        if (customerData.status=="INACTIVE") return res.status(404).send({status: false, message: "Customer is inactive"})

        let cardData = await cardModel.find({customerId:id})
        customerData.cardsData = cardData

        return res.status(200).send({status: true, message: "success", data: customerData})

    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
}}

    module.exports={createCustomer,getCustomer,deletCustomer,getDataById}