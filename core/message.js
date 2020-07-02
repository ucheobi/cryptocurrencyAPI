const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/user");


const message = async () => {

    let emails = [];

    User.find({},'email -_id', (err, users) => {
        if(err){
            return status(400).json({
                message: "I cant find your data"
            })
        }
        users.forEach((item) => {
            let email = item.email
            emails.push(email)
        })
        //return emails
    
        //let testAccount = await nodemailer.createTestAccount();
    
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        const mailOptions = {
            from: '"Bitcoin Technology 👻" <bitcoin@support.com>', // sender address,
            to: {...emails},
            subject: "Your Daily Cryptocurrency Update",
            html: `<h3>Hello Ms Iris, </h3>

            <p>You have subscribe for daily cryptocurrency update.</p>


            <p>Best regards,</p>
            
            <p>Admin</p>`                
        };

  

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log(info);;
            }

        });

})
}




