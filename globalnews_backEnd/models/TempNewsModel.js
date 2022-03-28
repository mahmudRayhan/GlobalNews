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

const TempNewsSchema = new mongoose.Schema({
    
    title:{
        type:String,
        require: true
    },
    body:{
        type:String,
        require: true
    },
    category:{
        type:String,
        require: true,
        lowercase:true
    },
    tag:{
        type:String,
        require: true
    },
    date:{
        type:Date,
        default: new Date()
    },
    headerImage:{
        type:String,
        require:true
    },
    thumbnail:{
        type:String,
        require:true
    },
    images:{
        type:[String]
    },
    reporterID : {
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'user',
        type : String,
        required : true,
    },status:{
        type:String,
        default:"pending"
    },comments : [commentSchema]
});

const TempNewsModel = mongoose.model('TempNewsModel',TempNewsSchema)
module.exports = TempNewsModel

