import express from 'express';
import { client } from '../models/db.js';

const router = express.Router();

router.post('/insert', async (req, res) => {
  try {
    const db = client.db('mongoTryout');
    const collection = db.collection('tarif-collects');

    const { name, age, email } = req.body;

    const result = await collection.insertOne({ name, age, email });
    const insertedId = result.insertedId;

    res.status(201).json({ success: true, message: 'Data inserted successfully', insertedId });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
