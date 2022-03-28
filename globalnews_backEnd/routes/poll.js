const express = require('express')
const router = express.Router();
const PollModel = require('../models/PollModel')

router.get('/poll',(req,res)=>{

    PollModel.find({deadline:{$gt:new Date()}})
        .then(docs=>{
            res.send(docs)
        }).catch(err=>{
            res.send(err)
        })
})
router.post('/poll',(req,res)=>{
    console.log(req.body);
    PollModel.findOneAndUpdate({_id:req.body.id},{votes:req.body.votes})
        .then(response=>console.log(response))
        .catch(error=>console.log(error))
})

router.post('/addpoll',(req,res)=>{
    console.log(req.body.pollData.deadline);
    console.log(new Date(req.body.pollData.deadline));
    let list=[]
    let voteCountInit =[]
    req.body.pollData.options.map((item)=>{
        list = [...list,item.option];
        voteCountInit=[...voteCountInit,0];
    })
    
    const poll =new PollModel({
        title:req.body.pollData.title,
        options:list,
        deadline:new Date(req.body.pollData.deadline),
        votes:voteCountInit,
        date:new Date(),
        type:req.body.pollData.type
    })
    console.log(poll);
    poll.save().then(res=>console.log(res)).catch(err=>console.log(err))
})
module.exports=router