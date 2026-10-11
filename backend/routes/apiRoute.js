const express = require('express');
const router = express.Router();
const { 
    getBestSellersProducts, 
    getProductStats,
    getAllProducts,
    createProduct, 
    deleteProduct,
    updateProduct,
    getProductByBarcode,
    getWomenHats,
    getMenHats,
    getChildrenHats
} = require('../controllers/productController');
const upload = require("../config/multer");

router.get('/bestseller', getBestSellersProducts);
router.get("/stats", getProductStats);
router.get("/products", getAllProducts);
router.post("/products", upload.single('image'), createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);
router.get("/products/:barcode", getProductByBarcode);

router.get("/women-hats", getWomenHats);
router.get("/men-hats", getMenHats);
router.get("/children-hats", getChildrenHats);


module.exports = router;
