const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { emit } = require('nodemon');
const app = express()
const port = process.env.PORT || 5000

//middle ware
app.use(cors())
require('dotenv').config()
app.use(express.json())
//collection with mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6m4yg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// used async function
async function run() {
    try {
        await client.connect()
        const furnitureCollection = client.db("furnitureWare").collection("furniture");
        const sliderCollection = client.db("furnitureWare").collection("sliderInfo");

        app.get('/furniture', async (req, res) => {
            const query = {}
            const cursor = furnitureCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/myItems' ,async(req, res)=>{
            const email = req.query.email;
            const query = {email:email}
            const cursor = furnitureCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/furniture/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const furniture = await furnitureCollection.findOne(query)
            res.send(furniture)
        })
        app.post('/furniture', async (req, res) => {
            const productDoc = req.body
            const result = await furnitureCollection.insertOne(productDoc)
            res.send(result)
        })
        app.delete('/furniture/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await furnitureCollection.deleteOne(query)
            res.send(result)
        })
        app.put('/furniture/:id', async(req, res)=>{
            const id = req.params.id
            const updateFurniture = req.body 
            console.log(updateFurniture)
            const filter = {_id:ObjectId(id)}
            const options = { upsert: true };
            const updateDoc = {
                $set: {updateFurniture}
            }
            const result = await furnitureCollection.updateOne(filter,updateDoc,options)
            res.send(result)
        })
        app.put('/quantity/:id', async(req, res)=>{
            const id = req.params.id
            const updateFurniture = req.body 
            console.log(updateFurniture)
            const filter = {_id:ObjectId(id)}
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity:updateFurniture.quantity
                }
            }
            const result = await furnitureCollection.updateOne(filter,updateDoc,options)
            res.send(result)
        })

        app.get('/slider' ,async(req, res)=>{
            const query = {}
            const cursor = sliderCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        
    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('running furniture ware house server')
})
app.listen(port, () => {
    console.log('listening ', port)
})