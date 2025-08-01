import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import cuisineRoutes from './routes/cuisines';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3001');

app.use(helmet());
const allowedOrigins = [
  'http://localhost:3000',
  'https://try-palate.vercel.app'
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('CORS allowed origins:', allowedOrigins);

// For production debugging - temporarily allow all origins
const corsOptions = process.env.NODE_ENV === 'production' ? {
  origin: true, // Allow all origins temporarily
  credentials: true,
} : {
  origin: allowedOrigins,
  credentials: true,
};

console.log('CORS options:', corsOptions);

app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/cuisines', cuisineRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    cors_fix_deployed: true,
    node_env: process.env.NODE_ENV
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;