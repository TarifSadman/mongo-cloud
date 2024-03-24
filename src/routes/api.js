import express from 'express';
import { client } from '../models/db.js';
import { ObjectId } from 'mongodb';
// import SendLime from '@sendlime/server-sdk';
import { config } from 'dotenv';

config();

const router = express.Router();

// const sendLime = new SendLime({
//   apiKey: process.env.SENDLIME_API_KEY,
//   apiSecret: process.env.SENDLIME_API_SECRET,
// });

router.post('/insert', async (req, res) => {
  try {
    const db = client.db('mongoTryout');
    const collection = db.collection('tarif-collects');

    const { name, age, email, phone } = req.body;

    const result = await collection.insertOne({ name, age, email, phone });
    const insertedId = result.insertedId;

    // await sendLime.message
    // .sendSms({
    //   from: 'SendLime',
    //   text: `Hello ${name}, your data has been inserted successfully`,
    //   to: phone,
    // })
    // .catch((error) => {
    //   console.error('Error sending SMS:', error);
    // })

    res.status(201).json({ success: true, message: 'Data inserted successfully', insertedId });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/list', async (req, res) => {
  try {
    const db = client.db('mongoTryout');
    const collection = db.collection('tarif-collects');

    const data = await collection.find().toArray();

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, phone } = req.body;

    const db = client.db('mongoTryout');
    const collection = db.collection('tarif-collects');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, age, email, phone } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({ success: true, message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const db = client.db('mongoTryout');
    const collection = db.collection('tarif-collects');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
