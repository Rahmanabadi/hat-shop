const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const apiRoutes = require("./routes/apiRoute");
const userRoutes = require('./routes/userRoute');
const authRoutes = require("./routes/authRoute");
const cartRoutes = require("./routes/cartRoute");

const authMiddleware = require('./middlewares/authMiddleware');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use('/api', apiRoutes);
app.use('/user', authMiddleware, userRoutes);
app.use('/auth', authRoutes);
app.use('/cart', authMiddleware, cartRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
