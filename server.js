// import { MongoClient } from "mongodb";
// import { config } from "dotenv";

// config();

// const uri = process.env.MONGO_URI;

// MongoClient.connect(uri)
//   .then(client => {
//     console.log("Connected to Database");

//     const db = client.db("mongoTryout");
//     const collection = db.collection("tarif-collects");

//     collection.insertOne({
//       name: "Random Name",
//       age: 25,
//       email: "rname@mail.com",
//     })
//       .then(result => {
//         console.log("New data inserted:", result.insertedId);
//       })
//       .catch(err => {
//         console.error("Error inserting data:", err);
//       })
//       .finally(() => {
//         client.close();
//       });
//   })
//   .catch(err => {
//     console.error("Error connecting to database:", err);
//   });


import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import apiRoutes from './src/routes/api.js';

config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
