const User = require("../models/userModel");
const mongoose = require("mongoose");
const { consolidateCartItems } = require("../utils/reducers");

exports.getCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log("user", userId)
    
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
    
        const cartData = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(userId) } },
            { $unwind: "$cartData" }, 
            { $match: { "cartData.count": { $gt: 0 } } }, 
            {
                $lookup: {
                    from: "products", 
                    localField: "cartData.barcode", 
                    foreignField: "barcode", 
                    as: "productInfo", 
                },
            },
            { $unwind: "$productInfo" }, 
            {
                $group: {
                    _id: "$_id", 
                    products: {
                        $push: {
                            product: "$productInfo",
                            quantity: "$cartData.count", 
                            img: "$cartData.img", 
                        },
                    },
                },
            },
            { $project: { _id: 0, products: 1 } }, 
        ]);
    
        res.json(cartData.length > 0 ? consolidateCartItems(cartData[0].products) : []);
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ message: "Error fetching cart data" });
    }
    
}

exports.updateCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { updatedCart } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!Array.isArray(updatedCart)) {
      return res.status(400).json({ message: "Cart must be an array" });
    }

    user.cartData = updatedCart;
    await user.save();

    res.status(200).json({ message: "Cart successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update cart" });
  }
}

exports.purchaseCart = async (req, res) => {
    try {
        const userId = req.user.userId;
    
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        user.cartData = []; 
        await user.save();
    
        res.status(200).json({ message: "Purchase completed" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to process purchase" });
      }
}
