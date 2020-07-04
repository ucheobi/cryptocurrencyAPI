const Crypto = require('../models/crypto');
const nodemailer = require("nodemailer");
const User = require("../models/user")
const formidable = require('formidable');
const messages = require('../core/messages')



// Get a single cryptocurrency data from the database
exports.single = (req, res) => {
    let searchId = req.params.cryptoId;
    
    if(searchId){     
        Crypto.findById(searchId)
        .exec((err, crypto) => {
            if(err){
                res.status(400).json({
                    error: 'Data with such ID does not exist!'
                })
            }
            res.json(crypto)
        })
    } else {
        res.status(400).json({
            error: 'Data with such ID does not exist!'
        })
    }   
}

//Get all the saved cryptocurrencies currently in the database
exports.latest = (req, res) => {
    Crypto.find()
        .exec((err, latest) => {
            if(err || !latest){
                return res.status(400).json({
                    error: 'Nothing was found or there was an error in your request!'
                })
            }
            res.json(latest)
        })
}


//Create a new crypto currency data and save to the database
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: 'There was an error trying to upload your data'
            })
        }

        //check for some important missing fields data
        const {
            id,
            name,
            symbol,
            max_supply,
            circulating_supply,
            total_supply,
            cmc_rank
        } = fields;

        if(
            !id ||
            !name ||
            !symbol ||
            !max_supply ||
            !circulating_supply ||
            !total_supply ||
            !cmc_rank 
        ){
            return res.status(400).json({
                error: 'Check some important missing fields'
            })          
        }

        let cryptoData = new Crypto(fields);
            cryptoData.save((err, crypto) => {
                if(err){
                    return res.status(400).json({
                        error: 'An error occured while saving your data. Please check your data and try again'
                    })                    
                }
                res.json(crypto);
            })
    })
}

exports.remove = (req, res) => {
    let cryptoID = req.params.cryptoId;
    
    Crypto.deleteOne(
        {_id: cryptoID}, (err) => {
            if(err){
                return res.status(400).json({
                    error: 'Crypto data with such ID cannot be found'
                })                    
            }
            res.json({
                message: 'Crypto Data successfully removed'
            });
        })
    
}

exports.update = (req, res) => {
    // :TODO
}

exports.search = (req, res) => { 
  
}

exports.subscribe = (req, res) => {
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

            res.json(
                {
                    result: result,
                    message: "Thank you for subscribing"
                }
            );
        })
    })
}

