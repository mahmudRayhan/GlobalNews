const express = require('express')
const router = express.Router();
const NewsModel = require('../models/NewsModel')
const TempNewsModel = require('../models/TempNewsModel')

router.post('/approve',(req,res)=>{
    console.log(req.body);
    
    let news =new NewsModel({
        title:req.body.news.title,
        tag:req.body.news.tag,
        images:req.body.news.images,
        body:req.body.news.body,
        category:req.body.news.category,
        headerImage:req.body.news.headerImage,
        thumbnail:req.body.news.thumbnail,
        reporterID:req.body.news.reporterID,
        approvedBy:req.body.approvedBy
    })
    news.save().then(response=>{
        
        TempNewsModel.deleteOne({_id:req.body.news._id})
            .then(result=>{
                res.send('Successfully added to database')
            }).catch(err=>{
                console.log(err);
            })
    }).catch(err=>{
        console.log(err);
    })
})

router.post('/reject',(req,res)=>{

    TempNewsModel.deleteOne({_id:req.body.id})
    .then(result=>{
        res.send('Successfully deleted')
    }).catch(err=>{
        console.log(err);
    })
})
router.post('/refer',(req,res)=>{
    console.log("Refer:",req.body)
    TempNewsModel.findOneAndUpdate({_id:req.body.id},{status:"refered to editor"})
        .then(response=>{
            res.send("Successfully refered")
        }).catch(err=>{
            console.log(err)
        })
})

module.exports = router