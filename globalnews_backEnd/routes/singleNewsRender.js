const express = require('express')
const router = express.Router();
const NewsModel = require('../models/NewsModel')
const TempNewsModel = require('../models/TempNewsModel')
const User = require('../models/SignUpModel')
const ObjectID = require('mongodb').ObjectID;

router.get('/news/:newsid',(req,res)=>{
    //let objectId =  ObjectID(req.params.newsid);
    console.log(req.params.newsid);
    
    NewsModel.findOne({_id:req.params.newsid})
            .then(docs=>{
                
                User.findOne({_id:docs.reporterID})
                    .then(user=>{
                        docs ={
                            ...docs._doc,
                            authorName:user.fullName,
                            authorImage:user.profilePic,
                            authorDesk:user.userDesk,
                            authorRole:user.userRole
                            }
                        res.send(docs)
                    })
                
            }).catch(err=>{
                res.send(err)
            })
 })
 router.get('/temp/:newsid',(req,res)=>{
    //let objectId =  ObjectID(req.params.newsid);
    console.log(req.params.newsid);
    
    TempNewsModel.findOne({_id:req.params.newsid})
            .then(docs=>{
                
                User.findOne({_id:docs.reporterID})
                    .then(user=>{
                        docs ={
                            ...docs._doc,
                            authorName:user.fullName + " " + user.lastName,
                            authorImage:user.profilePic,
                            authorDesk:user.userDesk,
                            authorRole:user.userRole
                            }
                        res.send(docs)
                    })
                
            }).catch(err=>{
                res.send(err)
            })
 })
module.exports = router