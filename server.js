const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Messages = require('./core/messages.js');
//const expressValidator = require('express-validator');
require('dotenv').config();

//import all routes middleware
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

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(expressValidator())
app.use(cors());


//get root route
app.use("/api", cryptoRoute);


setInterval(() => {
    Messages.messages().then((err, message) => {
       if(err){
           console.log("There was an error sending your message");
       } else {
           console.log("Message sent successfully");
       }

    })
       
}, 8000)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
})