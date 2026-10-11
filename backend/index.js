require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ObjectId = mongoose.Types.ObjectId;
const multer = require('multer');

const jwt = require('jsonwebtoken');

const path = require('path');

const router = express.Router();

const app = express();


app.use(express.json());
app.use(cors());



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));



app.use((req, res, next) => {         
  console.log(req.path);
  if (req.path.includes('user') && !req.headers['authtoken']) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
});




const Product = mongoose.model("Product", {       
  barcode: { type: Number},
  name: { type: String, required: true },

  category: { type: String},
  new_price: { type: Number },
  old_price: { type: Number },
  image: { type: String },
});

const User = mongoose.model("Users", {
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now() },
});

mongoose.connect(process.env.MONOGO_URL)

const products = [
  { name: "Hat A", category: "bestsellers", new_price: 20, old_price: 25 },
  { name: "Hat B", category: "bestsellers", new_price: 18, old_price: 22 },
];


app.get('/', (req, res) => {            
  res.send('Welcome to the homepage!');
});


app.get('/api/bestsellers', async (req, res) => {   
  const bestsellers = await Product.find({ category: 'best' }).limit(5);
  res.json(bestsellers);
});


app.get('/api/stats', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments(); 

    res.json({
      totalProducts,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Error fetching stats' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    console.log(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});



app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { barcode, name, category, new_price, old_price } = req.body;
    const imagePath = req.file ? req.file.path : null;  

    if (!name || !category || !new_price || !old_price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProduct = new Product({
      barcode,
      name,
      category,
      new_price,
      old_price,
      image: imagePath,  
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error saving product:', error.message);  
    res.status(500).json({ message: 'Error saving product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
});



app.get('/api/products/:barcode', async (req, res) => {
  const { barcode } = req.params;  

  try {
    const product = await Product.findOne({ barcode: barcode });  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.get('/user/products', async (req, res) => {
  try {
    const token = req.headers['authToken'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, 'super_secret_key');
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ products: user.cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/user/save-product', async (req, res) => {
  console.log(5);
  const { barcode, quantity } = req.body;
  console.log(req.params.id);
  const token = req.headers['authtoken'];
  console.log(token);
  try {
    const decoded = jwt.verify(token, 'super_secret_key');
    const userId = decoded.userId;

    console.log(userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.cartData[barcode]) {
      user.cartData[barcode] += quantity; 
    } else {
      user.cartData[barcode] = quantity; 
    }
    console.log(user.cartData);

    
    await User.findOneAndUpdate({_id:userId},{cartData:user.cartData});

    return res.status(200).json({ message: "Product added to cart successfully", cartData: user.cartData });



  } catch (error) {
    
    if (!res.headersSent) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
});





app.post('/signup', async (req, res) => {
  console.log("User Registration");
  let isSuccessful = false;

  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ isSuccessful, message: "User already registered with this email" });
    }

    const initialCart = Array(300).fill(0).reduce((acc, _, idx) => ({ ...acc, [idx]: 0 }), {});

    const newUser = new User({
      username,
      email,
      password,
      cartData: initialCart,
    });

    await newUser.save();

    const payload = { userId: newUser._id };
    const authToken = jwt.sign(payload, 'super_secret_key');

    isSuccessful = true;
    res.status(201).json({ isSuccessful, authToken }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ isSuccessful, message: "Internal server error", error: error.message }); // Added error message
  }
});

app.post('/login', async (req, res) => {
  console.log("User Login");
  let isSuccessful = false;

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ isSuccessful, message: "User not found. Please sign up." });
    }

    if (user.password !== password) { 
      return res.status(401).json({ isSuccessful, message: "Incorrect password. Please try again." });
    }

    const payload = { userId: user._id };
    const authToken = jwt.sign(payload, 'super_secret_key');

    isSuccessful = true;
    return res.status(200).json({ isSuccessful, data: { authToken } });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ isSuccessful, message: "Internal server error" });
  }
});

app.get('/api/women-hats', async (req, res) => {
  try {
    const hats = await Product.find({ category: 'w' }); 
    res.json(hats);
  } catch (error) {
    console.error('Error fetching women hats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/men-hats', async (req, res) => {
  try {
    const hats = await Product.find({ category: 'm' }); 
    res.json(hats);
  } catch (error) {
    console.error('Error fetching men hats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/children-hats', async (req, res) => {
  try {
    const hats = await Product.find({ category: 'c' }); 
    res.json(hats);
  } catch (error) {
    console.error('Error fetching children hats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


function authenticateToken(req, res, next) {
  const token = req.headers['authtoken'];
  if (!token) return res.status(403).json({ message: 'Unauthorized' });

  jwt.verify(token, 'super_secret_key', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.userId = decoded.userId;
    next();
  });
}

app.get('/cart',authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = await User.aggregate([
      { $match: { _id: new ObjectId(userId) } },
      { $project: { cartArray: { $objectToArray: "$cartData" } } },
      { $unwind: "$cartArray" },
      { $match: { "cartArray.v": { $gt: 0 } } },
      {
        $addFields: {
          "cartArray.intKey": {
            $convert: {
              input: "$cartArray.k",
              to: "int",
              onError: null,
              onNull: null
            }
          }
        }
      },
      { $match: { "cartArray.intKey": { $ne: null } } },
      {
        $lookup: {
          from: "products",
          localField: "cartArray.intKey",
          foreignField: "barcode",
          as: "productInfo"
        }
      },
      { $unwind: "$productInfo" },
      {
        $group: {
          _id: "$_id",
          products: {
            $push: {
              product: "$productInfo",
              quantity: "$cartArray.v"
            }
          }
        }
      },
      { $project: { _id: 0, products: 1 } }
    ]);

    res.json(cartData.length > 0 ? cartData[0].products : []);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching cart data' });
  }
});



app.patch('/cart/update', async (req, res) => {
  console.log("Updating Cart");

  try {
    const { userId, updatedCart } = req.body;

    // Find user by ID and update the cart
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cartData = { ...user.cartData, ...updatedCart };
    await user.save();

    res.status(200).json({ message: "Cart successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update cart" });
  }
});

app.post('/purchase', async (req, res) => {
  console.log("Processing Purchase");

  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    user.cartData = {}; 
    await user.save();

    res.status(200).json({ message: "Purchase completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to process purchase" });
  }
});









/*app.get('/api/user', (req, res) => {

  console.log(req.header)

  User
  res.json({ message: 'user' });
})*/





const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
