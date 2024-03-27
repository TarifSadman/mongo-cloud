import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import apiRoutes from './src/routes/api.js';
import authRoutes from './src/routes/auth.js'
import authMiddleware from './src/middleWare/authMiddleware.js';

config();

const app = express();
const PORT = process.env.PORT || 3777;

app.use(bodyParser.json());

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
