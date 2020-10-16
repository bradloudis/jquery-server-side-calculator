const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 5000;

let calcInfo = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES BELOW HERE

// TODO GET results of calculations
app.get('/calculation', (req, res) => {
  console.log('GET');
  res.send(calcInfo);
});

// POST for receiving calc inputs from input fields
app.post('/calculation', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.use(express.static('public'));
app.listen(PORT, () => {
  console.log('Listening on PORT: ', PORT);
});
