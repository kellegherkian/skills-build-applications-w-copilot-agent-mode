import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
export const app = express();
export const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME?.trim();
export const codespaceUrl = codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : null;
export const apiBaseUrl = codespaceUrl
    ? codespaceUrl
    : `http://localhost:${port}`;
const users = [
    { id: 'u1', name: 'Taylor Swift', email: 'taylor@example.com' },
    { id: 'u2', name: 'Jordan Rivera', email: 'jordan@example.com' },
];
const activities = [
    { id: 'a1', userId: 'u1', type: 'Run', durationMinutes: 30 },
    { id: 'a2', userId: 'u2', type: 'Cycling', durationMinutes: 45 },
];
app.use(cors());
app.use(express.json());
app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running', port, apiBaseUrl, codespaceName: codespaceName || null, codespaceUrl });
});
app.get('/api/users', (req, res) => {
    res.json(users);
});
app.get('/api/activities', (req, res) => {
    res.json(activities);
});
//# sourceMappingURL=server.js.map