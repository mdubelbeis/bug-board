import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 8000;

const { default: app } = await import('./app.js');

const DB_CLOUD = process.env.DB_CLOUD!;

mongoose
  .connect(DB_CLOUD)
  .then((conn) => {
    console.log('Successful database connection');
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Failed database connection: ${err.message}`);
  });
