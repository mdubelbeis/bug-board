import express from 'express';
import morgan from 'morgan';
import bugRouter from './routes/bugRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
console.log('NODE_ENV in app.js:', process.env.NODE_ENV);
// MIDDLEWARE

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

export default app;
