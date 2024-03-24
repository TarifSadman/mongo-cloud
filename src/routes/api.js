import express from 'express';
import { client } from '../models/db.js';

const router = express.Router();

router.post('/insert', async (req, res) => {
  try {
    const db = client.db('mongoTryout');
    const collection = db.collection('tarif-collects');

    const { name, age, email } = req.body;

    const result = await collection.insertOne({ name, age, email });
    res.json({ insertedId: result.insertedId });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
