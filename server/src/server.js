import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 8000;

const DB_CLOUD = process.env.DB_CLOUD;
const DB_LOCAL = process.env.DB_LOCAL;

mongoose
  .connect(DB_LOCAL)
  .then((conn) => {
    console.log('Successful database connection');
  })
  .catch((err) => {
    console.error(`Failed database connection: ${err.message}`);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
