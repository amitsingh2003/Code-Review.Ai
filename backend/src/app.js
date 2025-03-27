const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');
require('dotenv').config(); 

const app = express();


app.use(cors({
    origin: process.env.FRONTEND_URL || '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World! Backend is working fine 🎉');
});


app.use('/ai', aiRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
