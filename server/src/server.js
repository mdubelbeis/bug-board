import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
const DB_CLOUD = process.env.DB_CLOUD;
const DB_LOCAL = process.env.DB_LOCAL;

mongoose
  .connect(DB_LOCAL)
  .then((conn) => {
    console.log('DB CONNECTED...');
  })
  .catch((err) => {
    console.error(`DB CONNECTION FAILED: ${err.message}`);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
