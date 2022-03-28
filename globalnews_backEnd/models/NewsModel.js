const mongoose = require('mongoose')


var commentSchema = new mongoose.Schema({
    commentBody:  {
        type: String,
        required: true
    },
    commentAuthor :  {
        type: String,
        required: true,
    }
    });

var replySchema = new mongoose.Schema({
    replyBody:  {
        type: String,
        required: true
    },
    replyAuthor :  {
        type: String,
        required: true,
        authorID : String,
    },
    parentComment : {
        type : commentSchema,
        required : true,
    }
    });


const NewsSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true
    },
    body:{
        type:String,
        //required: true
    },thumbnail:{
        type:String,
        //required : true
    },
    headerImage:{
        type:String,
        require:true
    }, 
    images:[String],
    subheader:{
        type:String,
        required: false
    },date:{
        type:Date,
        default: Date.now
    }, category: {
        type: String,
        required: true,
    }, tag : {
        type: String,
        required: true,
    }, reporterID : {
        type: String,
        required: true,
    },approvedBy:{
        type: mongoose.Schema.Types.ObjectId,
        require:false
    },comments : [commentSchema]
});


module.exports = mongoose.model('news',NewsSchema)