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
  removeBtnColor();
}

function removeBtnColor() {
  $('.js-addBtn').removeClass('colorBtn');
  $('.js-minusBtn').removeClass('colorBtn');
  $('.js-multiplyBtn').removeClass('colorBtn');
  $('.js-divideBtn').removeClass('colorBtn');
}

function clickEqualSubmit() {
  console.log('click me baby one more time!');
  const calcObject = {
    numOne: $('.js-numOne').val(),
    operator: operator,
    numTwo: $('.js-numTwo').val(),
  };
  postCalculations(calcObject);
  removeBtnColor();
}

function operatorSelector() {
  $(this).addClass('colorBtn');
  operator = $(this).prop('name');
  return operator;
}

function render(response) {
  console.log(response);
  const result = $('.js-results');
  const bigResult = $('.js-bigResult');
  bigResult.empty();
  result.empty();
  for (let i = 0; i < response.length; i++) {
    result.append(
      `<li>${response[i].numOne} ${response[i].operator} ${response[i].numTwo} = ${response[i].result}</li>`
    );
  }
  bigResult.append(`<h2>${response[response.length - 1].result}</h2>`);
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
