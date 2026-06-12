import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 8000;

const { default: app } = await import('./app.js');

const DB_CLOUD = process.env.DB_CLOUD;

if (!DB_CLOUD) {
  throw new Error('DB_CLOUD is not defined');
}

mongoose
  .connect(DB_CLOUD)
  .then((conn) => {
    console.log('Successful database connection');
    console.log('Using database:', mongoose.connection.name);
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Failed database connection: ${err.message}`);
  });
