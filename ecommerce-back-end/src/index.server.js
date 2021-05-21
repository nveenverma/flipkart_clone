// Node Modules
const express = require('express')
const env = require('dotenv')
const app = express();
const mongoose = require('mongoose')

// routes
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin/auth")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")

// Environment variable or you can say constants
env.config();

// MongoDB Connection
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@cluster0.yiuxu.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(
    MONGODB_URI, 
    {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true
    }
).then(() => {
    console.log("Database Connected");
})

// To parse the data passed in the requests, we use following middleware
app.use(express.json())
    
// endpoint '/api' using express router
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

// Listening to the server on below port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
});