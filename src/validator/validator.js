const mongoose = require('mongoose')

const checkInput = (value) => {
    return (Object.keys(value).length > 0)}

const isValidInput = function (value) {

    if (typeof value === "undefined" || typeof value === "null") {
        return false}
    if (typeof value === "string" && value.trim().length == 0) {
        return false}
        return true}

const isValidName = (value) => {
    return (/^[A-Z a-z]+$/).test(value)}

const isValidEmail = (value) => {
    return (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(value));}

const isValidpassword = (value) => {
    return (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(value))}

const isValidMobileNumber = (value) => {
    return ((/^((\+91)?|91)?[6789][0-9]{9}$/g).test(value))}

const isValidCity = (value) => {
    return (/^[A-za-z]+$/).test(value)}

const isValidObjectId = (value) => {
    return mongoose.isValidObjectId(value)}

const isVaildDOB = (value) => {return (/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/gm).test(value)}

module.exports = {checkInput, isValidInput, isValidName, isValidEmail, isValidpassword, isValidMobileNumber, isValidCity, isValidObjectId,isVaildDOB}