const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        symbol: String,
        slug: String,
        num_market_pairs: Number,
        date_added: Date,
        tags: Array,
        max_supply: Number,
        circulating_supply: Number,
        total_supply: Number,
        platform: Object,
        cmc_rank: Number,
        last_updated: Date,
        quote: Object
    },
    { timestamps: true}
)

module.exports = mongoose.model("Crypto", cryptoSchema )