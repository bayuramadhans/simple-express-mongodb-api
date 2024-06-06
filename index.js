require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
app.use(express.json());

const blogRoutes = require('./routes/blog');
app.use('/blog', blogRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = app;