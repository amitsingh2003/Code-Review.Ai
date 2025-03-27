require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;  // Use Vercel's assigned port in production

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
