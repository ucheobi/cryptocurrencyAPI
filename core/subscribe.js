const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const User = require("../models/user");
const querystring = require("querystring");

router.post("/", (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'An error has occured trying to subscribe, please refresh your browser and try again!'
            })
        }

        const { email } = fields;

        if(!email){
            return res.status(400).json({
                error: 'Valid email address is required'
            }) 
        }

        let user = new User(fields);
        user.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: 'An error has occured trying to subscribing!!!'
                })                    
            }
            const query = querystring.stringify({
                "submitted": true
            });
            res.redirect("/?" + query)
        })
    })
})

module.exports = router;
