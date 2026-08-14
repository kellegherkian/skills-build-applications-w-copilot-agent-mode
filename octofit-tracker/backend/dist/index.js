import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running', port });
});
// Start server
app.listen(port, () => {
    console.log(`OctoFit Tracker API is running on port ${port}`);
});
//# sourceMappingURL=index.js.map