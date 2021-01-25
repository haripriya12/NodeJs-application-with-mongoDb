
const express = require('express');
const { MongoClient } = require('mongodb'); // We used the curly brases here, it gonna be pulling out the mongo clint from mongodb

const connectionString = "mongodb://localhost:27017";

// 27017 - default port that mongodb  runs on
// mongodb - this is the mongodb protocol that's diffeent from HTTp


async function init() {
  const client = new MongoClient(connectionString, {
    useUnifiedTopology: true
  });
  await client.connect();   // connect mongo from node server

  const app = express();

  app.get('/get', async(req, res) => {
    const db = await client.db('my-database-name');
    const collection = db.collection('my-collection-name');

    const data = await collection.find({
      $text: { $search: req.query.search }
    })
    .limit(5)
    .toArray()

    res.json({status: "ok", data}).end();
  })

  const PORT = 3000;

  app.use(express.static('./static'));
  app.listen(PORT);
  console.log(`Running on http://localhost:${PORT}`);

  
}

init();