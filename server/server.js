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
  // calc data
  //{
  //   numOne: 0,
  //   operator: 'add',
  //   numTwo: 0,
  // }
  console.log('GET');
  res.send(calcInfo);
});

// POST for receiving calc inputs from input fields
app.post('/calculation', (req, res) => {
  // console.log(req.body);
  calcInfo.push(req.body);
  console.log(calcInfo);
  for (let i = 0; i < calcInfo.length; i++) {
    const entry = calcInfo[i];
    let result = 0;
    if (entry.operator === 'add') {
      result += Number(entry.numOne) + Number(entry.numTwo);
      console.log(result);
    } else if (entry.operator === 'subtract') {
      result += Number(entry.numOne) - Number(entry.numTwo);
      console.log(result);
    } else if (entry.operator === 'multiply') {
      result += Number(entry.numOne) * Number(entry.numTwo);
      console.log(result);
    } else {
      result += Number(entry.numOne) / Number(entry.numTwo);
      console.log(result);
    }
  }
  res.sendStatus(200);
});

app.use(express.static('public'));
app.listen(PORT, () => {
  console.log('Listening on PORT: ', PORT);
});
