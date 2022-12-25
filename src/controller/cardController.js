const cardModel = require('../models/cardModel')
const customerModel = require('../models/customerModel')
const validator = require('../validator/validator')


//=======================[function to create card data]============================//

const createCard = async (req, res) => {
    try {

        let data = req.body
        let { cardType, customerName, status, vision, customerId, ...rest} = data

        if(!validator.checkInput(data)) return res.status(400).send({status: false, message: "Body cannot be empty, please provide mandatory inputs (i.e. cardType,  customerId"})
        if (validator.checkInput(rest)) return res.status(400).send({status: false, message: "only 'cardType, status, vision, customerId' are accepts"})

        data.cardNumber = 'C001'

        if(!validator.isValidInput(cardType)) return res.status(400).send({status: true, message: "Please enter cardType"})
        if(!["REGULAR", "SPECIAL"].includes(cardType)) return res.status(400).send({status: true, message: "INVALID INPUT... choose input from the given list: (REGULAR, SPECAIL)"})

        if(status){
            if (!validator.isValidInput(status)) return res.status(400).send({status: true, message: "Please enter status"})
            if (!["ACTIVE", "INACTIVE"].includes(status)) return res.status(400).send({status: true, message: "INVALID INPUT... choose input from the given list: (ACTIVE, INACTIVE)"})
        }

        if (vision) {
            if (!validator.isValidInput(vision)) return res.status(400).send({status: true, message: "Please enter vision"})
        }

        if (!validator.isValidInput(customerId)) return res.status(400).send({status: true, message: "Please enter status"})
        if (!validator.isValidObjectId(customerId)) return res.status(400).send({status: true, message: `INVALID INPUT... given customerId: '${customerId}' is not valid`})

        let checkCustomer = await customerModel.findById({_id: customerId})
        
        if (!checkCustomer) return res.status(404).send({status: false, message: `Customer not found by provided customerId: ${customerId}`})

        let fname = checkCustomer.firstName
        let lname = checkCustomer.lastName

        data.customerName = fname+' '+lname

        let findData = await cardModel.findOne().sort({$natural: -1})  // finding rececently created data 

        if (findData){
            // data.cardNumber = findData.cardNumber
            let a = findData.cardNumber
            let b = Number(a.slice(3))
            let c = "C00"+(b+1)
            data.cardNumber=c
        }
        
        let cardData = await cardModel.create(data)
          
        return res.status(201).send({status: true, message: 'successfully created', data: cardData})

    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }}

//=========================[function to fetch card's data]========================//

const getCard = async (req, res) => {
    try {
        let getData = await cardModel.find()
        if (!getData) return res.status(404).send({status: false, message: "Something went wrong"})
        return res.status(200).send({status: true, message: "Data fetched successfully", totalData: getData.length, data: getData})
        
    } catch (error) {

        return res.status(500).send({status: false, message: error.message})
    }}

module.exports = {createCard, getCard}