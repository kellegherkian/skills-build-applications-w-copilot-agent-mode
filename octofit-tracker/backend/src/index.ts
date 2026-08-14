import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

const users = [
  { id: 'u1', name: 'Taylor Swift', email: 'taylor@example.com' },
  { id: 'u2', name: 'Jordan Rivera', email: 'jordan@example.com' },
];

const activities = [
  { id: 'a1', userId: 'u1', type: 'Run', durationMinutes: 30 },
  { id: 'a2', userId: 'u2', type: 'Cycling', durationMinutes: 45 },
];

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'API is running', port, apiBaseUrl });
});

app.get('/api/users', (req: Request, res: Response) => {
  res.json(users);
});

app.get('/api/activities', (req: Request, res: Response) => {
  res.json(activities);
});

// Start server
app.listen(port, () => {
  console.log(`OctoFit Tracker API is running on port ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
