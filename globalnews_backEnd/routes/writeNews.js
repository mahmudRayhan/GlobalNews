const writenewsRouter = require('express').Router();
const bodyParser = require('body-parser');
//const news = require('../models/NewsModel')
const news = require('../models/TempNewsModel')

writenewsRouter.use(bodyParser.json());

const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"../globalnews/public/assets/writeNews")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})

const upload = multer ({storage:storage});


writenewsRouter.post('/',upload.single("headerPic"),(req, res) => {
    // news.create(req.body)

    console.log(req.body)
    const newsDemo = new news({
        // headerPic: req.file.originalname,
        title: req.body.title,
        subheader: req.body.subheader,
        body: req.body.body,
        category:req.body.category,
        tag:req.body.tag,
        
        reporterID:req.body.reporterID,
        headerImage:req.file.originalname,
        thumbnail:req.body.thumbnail
        
    })  

    console.log(newsDemo)


    newsDemo.save().then(
        (data)=>{
            console.log("update")
            console.log(data)
            res.json(data)
        }
    ).catch( 
        (error)=>{
            console.log(error)
            res.json(error)
        }
    ) 


   
})



writenewsRouter.route('/')
.get((req,res,next) => {
    /*leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));*/
})

.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});



module.exports = writenewsRouter;