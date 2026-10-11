const Product = require('../models/productModel')

exports.getBestSellersProducts = async (req, res) => {
  try {
    const bestsellers = await Product.find({ category: 'best' }).limit(5)
    res.json(bestsellers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getProductStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments() 

    res.json({
      totalProducts
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({ error: 'Error fetching stats' })
  }
}

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Error fetching products' })
  }
}

exports.createProduct = async (req, res) => {
  try {
    const { barcode, name, category, new_price, old_price } = req.body
    const imagePath = req.file ? req.file.path : null 

    if (!name || !category || !new_price || !old_price) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const newProduct = new Product({
      barcode,
      name,
      category,
      new_price,
      old_price,
      image: imagePath 
    })

    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (error) {
    console.error('Error saving product:', error.message) 
    res.status(500).json({ message: 'Error saving product' })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Product deleted' })
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ error: 'Error deleting product' })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updatedProduct)
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' })
  }
}

exports.getProductByBarcode = async (req, res) => {
  const { barcode } = req.params 

  try {
    const product = await Product.findOne({ barcode: barcode }) 
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.getWomenHats = async (req, res) => {
    try {
        const hats = await Product.find({ category: 'w' }); 
        res.json(hats);
      } catch (error) {
        console.error('Error fetching women hats:', error);
        res.status(500).json({ message: 'Server error' });
      }
}

exports.getMenHats = async (req, res) => {
    try {
        const hats = await Product.find({ category: 'm' }); 
        res.json(hats);
      } catch (error) {
        console.error('Error fetching men hats:', error);
        res.status(500).json({ message: 'Server error' });
      }
}

exports.getChildrenHats = async (req, res) => {
    try {
        const hats = await Product.find({ category: 'c' }); 
        res.json(hats);
      } catch (error) {
        console.error('Error fetching children hats:', error);
        res.status(500).json({ message: 'Server error' });
      }
}
