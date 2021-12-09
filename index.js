const PORT = 8100;
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const express = require('express');
const scrapShoppingSites = require('./scrappers');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json('Go to /results for results');
});

app.get('/results', (req, res) => {
  scrapShoppingSites(req.query.q)
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
});

app.listen(PORT, () => {
  console.log('Running on port: ', PORT);
});
