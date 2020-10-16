$(document).ready(readyUp);

function readyUp() {
  console.log('JQ');
}

// SERVER CALLS

function postCalculations(calcObject) {
  $.ajax({
    type: 'POST',
    url: '/calculation',
    data: calcObject,
  })
    .then((response) => {
      console.log('buttz');
    })
    .catch((err) => {
      console.log(err);
      alert('WHOOPSIE!');
    });
}

function getCalcHistory() {
  $.ajax({
    type: 'GET',
    url: '/calculation',
  })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
      alert('OUCHIE!');
    });
}
