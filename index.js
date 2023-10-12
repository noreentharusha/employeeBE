const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const EmployeeModel = require("./models/Employee")
require('dotenv').config()

app.use(cors());
app.use(express.json());

/// DATABASE CONNECTION
mongoose.connect(
    "mongodb+srv://Noreen:E2pM8OzH12KhyLQE@cluster0.ionfh5e.mongodb.net/employeeDB?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);

app.post("/add/employee", async (req, res) => {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const number = req.body.number;
        const gender = req.body.gender;

        const employee = new EmployeeModel({
            first_name: first_name,
            last_name: last_name,
            email: email,
            number: number,
            gender: gender
        });

        await employee.save();
        res.status(200).send("Employee added successfully!");
    } catch (error) {
        console.error("Error adding employee:", error);
        res.status(500).send("An error occurred while adding the employee.");
    }
});

app.get('/get/employees', async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        res.json(employees);
    } catch (error) {
        console.error('Error getting employees:', error);
        res.status(500).json({ error: 'An error occurred while getting employees.' });
    }
});

app.put('/update/:id', async (req, res) => {
    const newFirstName = req.body.first_name;
    const newLastName = req.body.last_name;
    const newEmail = req.body.email;
    const newNumber = req.body.number;
    const newGender = req.body.gender;
    const id = req.params.id;

    try {
        const employeeToUpdate = await EmployeeModel.findById(id);

        if (!employeeToUpdate) {
            return res.status(404).send('Employee not found');
        }

        employeeToUpdate.first_name = newFirstName;
        employeeToUpdate.last_name = newLastName;
        employeeToUpdate.email = newEmail;
        employeeToUpdate.number = newNumber;
        employeeToUpdate.gender = newGender;

        await employeeToUpdate.save();

        res.status(200).send('Employee updated successfully!');
    } catch (error) {
        console.error('Error editing employee:', error);
        res.status(500).send('An error occurred while editing the employee.');
    }
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await EmployeeModel.findByIdAndRemove(id).exec();
        res.status(200).send('Employee delted successfully!');
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).send('An error occurred while deleting the employee.');
    }
});

app.listen(process.env.PORT || 3001, () => {
    console.log("You are connected!");
});