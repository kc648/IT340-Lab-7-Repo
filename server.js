const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/local')
	.then(() => {
        	console.log('Connected to MongoDB successfully!');
   	 })
   	 .catch((err) => {
        	console.error('Error connecting to MongoDB:', err);
   	 });

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	user: String,
	pass: String
});

const UserModel = mongoose.model("users", UserSchema);

app.get('/', (req, res) => {
        UserModel.find()
            .then(users => {
                const userNames = users.map(user =>`${user.firstName} ${user.lastName}`).join(`<br>`);
                res.send(`Welcome to MEAN stack!<br><br>Express.js is connected to MongoDB!<br><br>Users found in database:<br>${userNames}`);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send(`Error accessing users database.`);
            });
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
