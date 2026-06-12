import express, { type Express } from 'express';
import morgan from 'morgan';
import { protect } from './middleware/authMiddleware.js';
import {
  globalErrorHandler,
  notFoundHandler,
} from './middleware/errorMiddleware.js';
import authRouter from './routes/authRoutes.js';
import bugRouter from './routes/bugRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import projectRouter from './routes/projectRoutes.js';

const app: Express = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/comments', protect, commentRouter);
app.use('/api/v1/bugs', protect, bugRouter);
app.use('/api/v1/projects', protect, projectRouter);
// app.use('/api/v1/users', protect, userRouter); TODO: admin-only
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
