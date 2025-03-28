require('dotenv').config();
const app = require('./src/app');

const cors = require('cors');

app.use(cors({
    origin: ['http://localhost:5173']
}));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
