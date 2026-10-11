const User = require("../models/userModel");
const Product = require("../models/productModel")

exports.getUserProducts = async (req, res) => {
    try {
        
        const userId = req.user.userId;
    
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        res.status(200).json({ products: user.cartData });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

exports.saveProducts = async (req, res) => {
    const { barcode, quantity } = req.body;

    try {
        const userId = req.user.userId;
    
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    
        const product = await Product.findOne({ barcode });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
    
        const cartItemIndex = user.cartData.findIndex(item => item.barcode === barcode);
        if (cartItemIndex !== -1) {
            user.cartData[cartItemIndex].count += quantity;
        } else {
            user.cartData.push({
                barcode,
                count: quantity,
                img: product.image || "", 
            });
        }
    
        await user.save();
    
        return res.status(200).json({
            message: "Product added to cart successfully",
            cartData: user.cartData,
        });
      } catch (error) {
        console.log("Error: ", error)
        if (!res.headersSent) {
          return res.status(500).json({ message: "Internal server error" });
        }
      }
}
