const express = require('express');
const router = express.Router();

const { cryptos } = require('../controllers/cryptoData');
const { latest, single, create, remove, update, search, subscribe } = require('../controllers/cryptoAPI')

router.get('/cryptos', cryptos);

router.get('/crypto/:cryptoId', single)
router.post('/crypto/create', create);
router.delete('/crypto/:cryptoId', remove);
router.put('/crypto/:cryptoId', update);

router.get('/latest', latest)
router.get('/search', search)
router.post('/subscribe', subscribe)

module.exports = router;