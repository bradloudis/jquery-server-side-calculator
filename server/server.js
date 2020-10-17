const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 5000;

let calcHistory = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES BELOW HERE

// TODO GET results of calculations and full history of calcs
app.get('/calculation', (req, res) => {
  // console.log('GET');
  res.send(calcHistory);
});

// POST for receiving calc inputs from input fields
// calc data
//{
//   numOne: 0,
//   operator: 'add',
//   numTwo: 0,
// }
app.post('/calculation', (req, res) => {
  // console.log(req.body);
  const calcData = req.body;
  const calcArray = [];
  calcArray.push(calcData);
  console.log(calcArray);
  for (let i = 0; i < calcArray.length; i++) {
    const entry = calcArray[i];
    let result = 0;
    console.log(entry);
    if (entry.operator === '+') {
      result += Number(entry.numOne) + Number(entry.numTwo);
      calcData.result = result;
    } else if (entry.operator === '-') {
      result += Number(entry.numOne) - Number(entry.numTwo);
      calcData.result = result;
    } else if (entry.operator === '*') {
      result += Number(entry.numOne) * Number(entry.numTwo);
      calcData.result = result;
    } else {
      result += Number(entry.numOne) / Number(entry.numTwo);
      calcData.result = result;
    }
  }
  calcHistory.push(calcData);
  // console.log(calcHistory);
  res.sendStatus(200);
});

app.use(express.static('public'));
app.listen(PORT, () => {
  console.log('Listening on PORT: ', PORT);
});
