const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');

const app = express();


app.use(cors({
    origin: ['http://localhost:5173', 'https://code-review-ai-aivj.onrender.com'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/ai', aiRoutes);

module.exports = app;
