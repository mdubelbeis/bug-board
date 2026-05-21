import express from 'express';
import morgan from 'morgan';

const app = express();
const environment = process.env.ENVIRONMENT;

import bugRouter from './routes/bugRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import userRouter from './routes/userRoutes.js';

// MIDDLEWARE
app.use(express.json());

if (environment === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/bugs', bugRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Bug-Board API is running',
  });
});

export default app;
