const express = require('express')
const router = express.Router();
const SignUpModel = require('../models/SignUpModel')

router.get('/insert',(req,res)=>{
    let user=new SignUpModel({
        fullName:"subEditor",
        lastName:"world",
        email:"se2@example.com",
        password:"1234",
        birthday:"12/12/1994",
        userRole:"sub-editor",
        gender:"male",
        phoneNum:"01902728120",
        userDesk:'international'
    })
    user.save().then(response=>{
        res.send(response)
    })

})

module.exports = router