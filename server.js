const express = require('express');
// Create React app auto blocks cross origin resource sharing
const cors = require('cors');
const port = process.env.PORT || 5000;
const campaigns = require('./campaigns.json');
const cards = require('./cards.json');

const app = express();
// Enable Access-Control-Allow-Origin across all headers
app.use(cors());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
  res.send('Hello world');
});


app.get('/getCampaigns', (req, res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(campaigns));
});

app.get('/getCards', (req, res) => {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(cards));
});
