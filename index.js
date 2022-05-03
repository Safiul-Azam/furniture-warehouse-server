const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000

//middle ware
app.use(cors())
app.use(express.json())
//collection with mongodb

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.6m4yg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("furnitureWare").collection("furniture");
  console.log('furniture ware is connected')
  // perform actions on the collection object
  client.close();
});


app.get('/', (req, res)=>{
    res.send('running furniture ware house server')
})
app.listen(port, ()=>{
    console.log('listening ', port)
})