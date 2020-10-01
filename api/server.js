/* eslint-disable no-console */
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'dinotesDB';

app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.post('/note', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const notesCollection = db.collection('notes');

    // Insert data to collection
    notesCollection.insertOne(req.body).then((result) => {
      console.log(result);
    });

    client.close();
  });

  res.status(200).json('Data successfully saved');
});

app.get('/notes', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const notesCollection = db.collection('notes');

    // Insert data to collection
    notesCollection
      .find()
      .toArray()
      .then((result) => {
        res.status(200).json(result);
      });

    client.close();
  });
});

app.get('/note/:id', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const notesCollection = db.collection('notes');

    // cari note sesuai id
    notesCollection.findOne({ _id: ObjectId(req.params.id) }).then((result) => {
      res.status(200).json(result);
    });

    client.close();
  });
});

app.put('/note/:id', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const notesCollection = db.collection('notes');

    // update data collection
    notesCollection
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: { title: req.body.title, note: req.body.note } })
      .then((result) => {
        console.log(result);
      });

    client.close();
  });

  res.status(200).json('Data successfully updated');
});

app.delete('/note/:id', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    const db = client.db(dbName);
    const notesCollection = db.collection('notes');

    // update data collection
    notesCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        console.log(result);
      });

    client.close();
  });

  res.status(200).json('Data successfully deleted');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
