import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { client } from '../models/db.js';
import { config } from 'dotenv';

config();

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const db = client.db('mongoTryout');
    const collection = db.collection('users');
    await collection.insertOne({ username, email, password: hashedPassword });

    res.status(201).json({ success: true, message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = client.db('mongoTryout');
    const collection = db.collection('users');
    const user = await collection.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.status(200).json({ success: true, message: 'User signed in successfully', token });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
