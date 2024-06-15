const { url } = require('inspector');
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function makeConnection(){
    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);
    return client;
}

async function writeToDB(username, password) {
    let client 
    try {
        client = await makeConnection();
        await client.connect();
        console.log("Connected successfully to server");
        const db = client.db("mydatabase").collection("users");
        const user = { "username": username, "password": password };
        const result = await db.insertOne(user);
        console.log(`Inserted a document with the _id: ${result.insertedId}`);
    } catch (err) {
        console.error(err.stack);
    } finally {
        if (client) {
            await client.close();
            console.log("Connection to server closed");
        }
    }
}
async function readFromDB(username) {
    let client;
    try {
        client = await makeConnection();
        await client.connect();
        console.log("Connected successfully to server");
        
        const db = client.db("mydatabase"); // Specify your database name here
        const collection = db.collection("users"); // Specify your collection name here
        
        const findResult = await collection.findOne({"username": username});
        console.log(findResult)
        return findResult;
    }
    catch (err) {
        console.error(err.stack);
    }
    finally {
        if (client) {
            await client.close();
            console.log("Connection to server closed");
        }
    }
}
async function readAllFromDB() {
    let client;
    try {
        client = await makeConnection();
        await client.connect();
        console.log("Connected successfully to server");
        
        const db = client.db("mydatabase"); // Specify your database name here
        const collection = db.collection("users"); // Specify your collection name here
        
        const cursor = collection.find({});
        const results = await cursor.toArray();
        
        //console.log(results)
        return results;
    }
    catch (err) {
        console.error(err.stack);
    }
    finally {
        if (client) {
            await client.close();
            console.log("Connection to server closed");
        }
    }
}
// readAllFromDB()
// readFromDB("temp")
// writeToDB("one", "two")

// const deleteResult = await myColl.deleteOne(doc);
module.exports = {writeToDB, readFromDB, readAllFromDB}
