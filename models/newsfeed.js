const mongoose = require('mongoose');

const newsfeedSchema = new mongoose.Schema(
    {
        source: Object,
        author: String,
        title: String,
        description: String,
        url: String,
        urlToImage: String,
        publishedAt: String,
        content: String
    }
)

module.exports = mongoose.model("Newsfeed", newsfeedSchema )