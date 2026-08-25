const express = require('express');
const router = express.Router();
const { getItems, createItem } = require('../controllers/itemController');

router.get('/items', getItems);
router.post('/items', createItem);

module.exports = router;