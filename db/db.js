const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URL
const url = process.env.MONGODB_URI;

// Database Name
const dbName = 'mydatabase';

async function main() {
  // Create a new MongoClient
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect the client to the server
    await client.connect();

    console.log('Connected successfully to MongoDB server');

    const db = client.db(dbName);

    const collection = db.collection('documents');

    const insertResult = await collection.insertMany([{ a: 1 }, { b: 2 }, { c: 3 }]);
    console.log('Inserted documents:', insertResult);

    const findResult = await collection.find({}).toArray();
    console.log('Found documents:', findResult);

  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
