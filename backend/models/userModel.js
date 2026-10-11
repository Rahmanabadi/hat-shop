const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    barcode: { type: Number, required: true },
    count: { type: Number, required: true },
    img: { type: String, default: "" },
});

const usersSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: [cartItemSchema], default: [] }, 
    date: { type: Date, default: Date.now() },
})


module.exports = mongoose.model('Users', usersSchema)
