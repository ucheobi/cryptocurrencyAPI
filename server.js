const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
var path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Messages = require('./core/messages.js');
const NewsAPI = require("newsapi");
const fetch = require("node-fetch");
const News = require("./models/news");
const Newsfeed = require("./models/newsfeed");


//const expressValidator = require('express-validator');
require('dotenv').config();

const newsapi = new NewsAPI(process.env.API_NEWS_KEY);

//import all routes middleware
const index = require('./routes/index.js');
const cryptoRoute = require('./routes/crypto.js');

//initialize app
const app = express()

//connect to mongoose database
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Database is connected successfully'))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
//app.use(expressValidator())
app.use(cors());


//get root route
app.use("/", index);
app.use("/api", cryptoRoute);


//News API 
// newsapi.v2.topHeadlines({
//     sources: 'bbc-news,the-verge',
//     language: 'en'
//   }).then(response => {
//     return response.articles
//   }).then(article => {
//     Newsfeed.insertMany(article, (error, data) => {
//         if (error){
//             console.log(error);       
//         }
//         console.log("News has been updated successfully");        
//     })  
//   })

// newsapi.v2.sources({
//     category: 'technology',
//     language: 'en',
//     country: 'us'
//   }).then(response => {
//     return response.sources;
//   }).then(feed => {

//    News.insertMany(feed, (error, data) => {
//         if (error){
//             console.log(error);       
//         }
//         console.log("Your news feed has been updated successfully");        
//     })  
//   })

// setInterval(() => {
//     Messages.messages()     
// }, 20000)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
})