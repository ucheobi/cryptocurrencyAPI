const express = require('express');
const router = express.Router();

const News = require('../models/news');
const Newsfeed = require('../models/newsfeed');
const Crypto = require('../models/crypto');

router.get("/", (req, res) => {

    let isSubscribe = req.query.submitted;

    Crypto.find({})
        .exec((err, results) => {
        if (err){
            return res.status(400).json({
                message: "There was an error retrieving your data"
            })
        }
        if(results.length <= 0){
            return res.status(400).json({
                message: "No crypto data can be found in the database"
            })
        }   

        News.find({})
            .exec((err, features) => {
                if (err){
                    return res.status(400).json({
                        message: "There was an error retrieving your daily news"
                    })
                }
                if(features.length <= 0){
                    return res.status(400).json({
                        message: "No news features can be found in the database"
                    })
                }
                    Newsfeed.find()
                        .exec((err, news) => {
                            if (err){
                                return res.status(400).json({
                                    message: "There was an error retrieving your daily news"
                                })
                            }
                            if(news.length <= 0){
                                return res.status(400).json({
                                    message: "No news can be found in the database"
                                })
                            }
                            
                            res.render("index", {data: news, results: results, features: features, subscribe: isSubscribe, page_name: 'home.ejs' })
                        })
    })      })
    
})

module.exports = router;