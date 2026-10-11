const express = require('express');
const router = express.Router();
const { 
    getCart,
    updateCart,
    purchaseCart
} = require('../controllers/cartController');

router.get("", getCart);
router.patch("/update", updateCart);
router.post("/purchase", purchaseCart);

module.exports = router;