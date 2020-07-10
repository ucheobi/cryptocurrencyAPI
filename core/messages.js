const nodemailer = require("nodemailer");
const User = require("../models/user");
const Crypto = require('../models/crypto');


// Daily email notification for prices
exports.messages = async () => {
 
    Crypto.find({}, 'name quote -_id')
    .exec((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: 'Nothing was found or there was an error in your request!'
            })
        }
              
        let message = `
        <style>
        table {
          font-family: verdana, arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        
        td, th {
          border: 1px solid #dddddd;
          text-align: center;
          padding: 8px;
        }      
        th {
            color: #ff9900
        }
        
        </style>
        
            <table><tr><th>Name</th><th>Prices(USD)</th></tr>`

        data.forEach(value => {
                let { name, quote } = value;

                for (let key in quote){     
                    message += `
                        <tr>
                            <td>${name}</td>
                            <td>${quote[key].price}</td>
                        </tr>       
                    ` 
                }
        })

        message += '</table>'
        
        User.find({},'email name -_id', (err, users) => {
            if(err){
                console.log(err);
            } 

            if(users.length == 0){
                console.log("Sorry, no email is found in this directory");
            }
            

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
                    html: `
                        <h3>Hello ${name}, </h3>
                    
                        <p>Your Daily summary</p>

                        <hr>

                        <p>Current prices for today</p>
                    
                        ${message}


                    
                        <p>Best regards,</p>
                                        
                        <p>Crypto Admin</p        
                    `               
                }

                mailTransporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent");
                    }         
                });

        })
    })
})
}


