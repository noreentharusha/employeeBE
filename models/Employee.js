const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    }
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);

module.exports = EmployeeModel;