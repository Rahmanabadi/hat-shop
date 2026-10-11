const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

exports.signUp = async (req, res) => {
  let isSuccessful = false;

  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ isSuccessful, message: "User already registered with this email" });
    }

    const newUser = new User({
      username,
      email,
      password,
      cartData: [], 
    });

    await newUser.save();

    const payload = { userId: newUser._id };
    const authToken = jwt.sign(payload, process.env.JWT_SECRET);

    isSuccessful = true;
    res.status(201).json({ isSuccessful, authToken }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ isSuccessful, message: "Internal server error", error: error.message }); // Added error message
  }
};

exports.login = async (req, res) => {
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
        const authToken = jwt.sign(payload, process.env.JWT_SECRET);
    
        isSuccessful = true;
        return res.status(200).json({ isSuccessful, data: { authToken } });
    
      } catch (error) {
        console.error(error);
        return res.status(500).json({ isSuccessful, message: "Internal server error" });
      }
}