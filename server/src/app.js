import express from 'express';
import morgan from 'morgan';
import bugRouter from './routes/bugRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// Middleware

app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/bugs', bugRouter);
app.use('/api/v1/projects', projectRouter);

// TODO: Implement auth routing: /api/v1/auth/users?
app.use('/api/v1/users', userRouter);

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Bug-Board API is running',
  });
});

app.use((err, req, res, next) => {
  console.log('Hit the error handler');
  console.error(err.stack);

  res.status(500).send('Something broke!');
});

export default app;
