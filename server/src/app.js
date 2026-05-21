import express from 'express';
import morgan from 'morgan';

const app = express();
const environment = process.env.ENVIRONMENT;
app.use(express.json());

app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Bug-Board API is running',
  });
});

export default app;
