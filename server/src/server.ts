import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 8000;

const { default: app } = await import('./app.js');

const DB_CLOUD = process.env.DB_CLOUD;
const DB_LOCAL = process.env.DB_LOCAL;

if (!DB_CLOUD || !DB_LOCAL) {
  throw new Error('DB_CLOUD or DB_LOCAL is not defined');
}

mongoose
  .connect(DB_LOCAL)
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
