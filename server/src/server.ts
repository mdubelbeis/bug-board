import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 8000;

const { default: app } = await import('./app.js');

const DB =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_CLOUD
    : process.env.DB_LOCAL;

if (!DB) {
  throw new Error('Database connection string is not defined');
}

mongoose
  .connect(DB)
  .then(() => {
    console.log('Successful database connection');
    console.log('Using database:', mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Failed database connection: ${err.message}`);
  });
