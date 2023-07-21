
const mongoose= require("mongoose")

const isValidBody = (reqBody) => {
    return Object.keys(reqBody).length === 0;
  }
  const isValidEmail = (Email) => {
    return  /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(Email)
  };
  const isValidPassword = (password) => {
    if (password.length > 7 && password.length < 16) return true
}

const isValid = (value) => {
    if (typeof value === "undefined" || typeof value === "null") return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    
    return true;
  }
  
  module.exports={isValid,isValidEmail,isValidBody,isValidPassword}