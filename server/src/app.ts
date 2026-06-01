import express, { type Express } from 'express';
import morgan from 'morgan';
import {
  globalErrorHandler,
  notFoundHandler,
} from './middleware/errorMiddleware.js';
import authRouter from './routes/authRoutes.js';
import bugRouter from './routes/bugRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import userRouter from './routes/userRoutes.js';

const app: Express = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/bugs', bugRouter);
app.use('/api/v1/projects', projectRouter);
// TODO: Implement auth routing: /api/v1/auth/users?
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

// TODO: Implement advanced routes

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Bug-Board API is running',
  });
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
