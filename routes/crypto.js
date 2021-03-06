const express = require('express');
const router = express.Router();

const { cryptos } = require('../controllers/cryptoData');
const { latest, single, create, remove, update, search } = require('../controllers/cryptoAPI')
//const index = require("../controllers/index.js")

router.get('/cryptos', cryptos);

router.get('/crypto/:cryptoId', single)
router.post('/crypto/create', create);
router.delete('/crypto/:cryptoId', remove);
router.put('/crypto/:cryptoId', update);

router.get('/latest', latest)
router.get('/search', search)


module.exports = router;