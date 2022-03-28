

const express = require('express')
const app = express()
const dotenv= require('dotenv')
const mongoose=require('mongoose')
const cors= require('cors')


require ("./db/connection.js");

dotenv.config();
//import route

const authRoute= require('./routes/auth')
const homeRoute= require('./routes/homePageRender')
const categoryRoute = require('./routes/categoryPageRender')
const singleNewsRoute = require('./routes/singleNewsRender')
const writenewsRoute = require('./routes/writeNews');
const pendingNewsRoute = require('./routes/pendingNewsRender')
const newsFlowController =require('./routes/newsFlowController')
const pollController = require('./routes/poll')
const postCommentRoute = require('./routes/postComment')
const collectApiNews = require('./routes/collectApiNews')
const insert = require('./routes/insert')


//middleware
app.use(express.json());

app.use(cors());
//Router middleware

app.use('/',authRoute)
app.use('/writenews',writenewsRoute);
app.use('/postComment',postCommentRoute);
app.use(homeRoute)
app.use(categoryRoute)
app.use(singleNewsRoute)
app.use(pendingNewsRoute)
app.use(newsFlowController)
app.use(pollController)
app.use(collectApiNews)
app.use(insert)


app.listen(3000,()=>{console.log("server is running in 3000")});