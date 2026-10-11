const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  barcode: { type: Number },
  name: { type: String, required: true },

  category: { type: String },
  new_price: { type: Number },
  old_price: { type: Number },
  image: { type: String }
})


module.exports = mongoose.model('Product', productSchema)