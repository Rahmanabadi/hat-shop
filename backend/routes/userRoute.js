const express = require('express');
const router = express.Router();
const { 
    getUserProducts,
    saveProducts
} = require('../controllers/userController');

router.get("/products", getUserProducts);
router.post("/save-product", saveProducts);

module.exports = router;