import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import api from './routes/api.js';

const app = express();

/*
Rate limiting for all requests
This will only allow user with the same ip to send 100 requests per 15 minutes
*/
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//This will log all request to the api
app.use(morgan('dev'));
app.use(cors());
app.use('/api', api);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (_) => {
  console.log(`Server Listing on http://localhost:${PORT}`);
  mongoose
    .connect(process.env.DB_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));
});
