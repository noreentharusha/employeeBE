const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const EmployeeModel = require("./models/Employee");
require('dotenv').config();

app.use(cors());
app.use(express.json());

/// DATABASE CONNECTION
mongoose.connect(
    "mongodb+srv://Noreen:Tharusha@123@cluster0.nd3emdc.mongodb.net/employeeDB",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// ... (rest of your routes)

app.listen(process.env.PORT || 3001, () => {
    console.log("You are connected!");
});