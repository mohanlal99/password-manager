import express from 'express' 
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser';
import cors from 'cors'

dotenv.config();

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const app = express();
const port = 3000;
app.use(cors())

app.use(bodyParser.json())

const dbName = 'passop'; //database name


await client.connect()

//get the all requests
app.get("/", async (req, res) => {

    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
});
// Save the password using post requests 
app.post("/", async (req, res) => {
    const password  = req.body
    const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.insertOne(password)
    res.send({success : true , result: findResult})
});

// Delete requests 
app.delete('/', async (req, res) => {
  const password  = req.body
  const db = client.db(dbName)
    const collection = db.collection('passwords')
    const findResult = await collection.deleteOne(password)
    res.send({success : true , result: findResult})
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
