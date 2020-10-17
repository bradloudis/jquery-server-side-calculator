$(document).ready(readyUp);

let operator = '';

function readyUp() {
  // console.log('JQ');
  $('.js-equalBtn').on('click', clickEqualSubmit);
  $('.js-addBtn').on('click', operatorSelector);
  $('.js-minusBtn').on('click', operatorSelector);
  $('.js-multiplyBtn').on('click', operatorSelector);
  $('.js-divideBtn').on('click', operatorSelector);
  $('.js-clearBtn').on('click', clearFields);
}

function clearFields() {
  $('.js-numOne').val('');
  $('.js-numTwo').val('');
}

function clickEqualSubmit() {
  console.log('click me baby one more time!');
  const calcObject = {
    numOne: $('.js-numOne').val(),
    operator: operator,
    numTwo: $('.js-numTwo').val(),
  };
  postCalculations(calcObject);
  clearFields();
}

function operatorSelector() {
  operator = $(this).prop('name');
  return operator;
}

function render(response) {
  console.log(response);
  const result = $('.js-results');

  result.empty();
  for (let i = 0; i < response.length; i++) {
    result.append(
      `<li>${response[i].numOne} ${response[i].operator} ${response[i].numTwo} = ${response[i].result}</li>`
    );
  }
}

// SERVER CALLS

function postCalculations(calcObject) {
  $.ajax({
    type: 'POST',
    url: '/calculation',
    data: calcObject,
  })
    .then((response) => {
      console.log(response);
      getCalcHistory();
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
      render(response);
    })
    .catch((err) => {
      console.log(err);
      alert('OUCHIE!');
    });
}
