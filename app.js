const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

mongoose.connect('mongodb://0.0.0.0:27017').then(() => {
    console.log('MongoDB is connected');
});

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    dateofbirth: Date
});

const Data = mongoose.model('Data', dataSchema);

// Route to fetch all data from the MongoDB collection
app.get('/data', async (req, res) => {
    try {
        const allData = await Data.find();
        res.json(allData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/submit', (req, res) => {
    const { name, email, age, dateofbirth } = req.body;
    const newData = new Data({
        name,
        email,
        age,
        dateofbirth,
    });
    newData.save();
    res.send('Data submitted successfully');
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});