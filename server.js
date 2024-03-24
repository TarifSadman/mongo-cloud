import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import apiRoutes from './src/routes/api.js';

config();

const app = express();
const PORT = process.env.PORT || 3777;

app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
