const rp = require('request-promise');
const async = require("async");
const Crypto = require('../models/crypto');

const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50',
    qs: {
        'start': '1',
        'limit': '15',
        'convert': 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY
    },
    json: true,
    gzip: true
};

const getData = async () => {  
    const resp = await rp(requestOptions);
    const data = await resp.data;
    return data;    
}


exports.cryptos = async () => {
    
    try {
         const crypto = await getData();

        await Crypto.insertMany(crypto, (error, data) => {
            if (error){
                console.log(error);       
            }
            console.log(data);        
        })  
        
    } catch (error) {
        console.log(error);    
    }
   
}