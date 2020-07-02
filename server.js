const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const nodemailer = require("nodemailer");
const User = require("./models/user");
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

const message = async () => {

    //let emails = [];

    User.find({},'email name -_id', (err, users) => {
        if(err){
            return status(400).json({
                message: "I cant find your data"
            })
        }
        console.log(users);

        users.forEach((item) => {
            let { name, email }  = item
    
            let mailTransporter = nodemailer.createTransport( {
                service: "Gmail",
                port: 465,
                secureConnection: true,
                auth: {
                    user: process.env.GMAIL,
                    pass: process.env.G_PASS
                }
            });

            const mailOptions = {
                from: '"Bitcoin Technology 👻" <bitcoin@support.com>', // sender address,
                to: email,
                subject: "Your Daily Cryptocurrency Update",
                html: `<h3>Hello ${name}, </h3>

                <p>You have subscribe for daily cryptocurrency update.</p>


                <p>Best regards,</p>
                
                <p>Admin</p>`                
            };

            mailTransporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent");
                }
                
            });

    })

})
}


setInterval(() => {
    message()
       
}, 5000)

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
})