$(document).ready(readyUp);

let operator = '';

function readyUp() {
  // console.log('JQ');
  $('.js-equalBtn').on('click', clickEqualSubmit);
  $('.js-addBtn').on('click', operatorSelector);
  $('.js-minusBtn').on('click', operatorSelector);
  $('.js-multiplyBtn').on('click', operatorSelector);
  $('.js-divideBtn').on('click', operatorSelector);
}

function clickEqualSubmit() {
  console.log('click me baby one more time!');
  const calcObject = {
    numOne: $('.js-numOne').val(),
    operator: operator,
    numTwo: $('.js-numTwo').val(),
  };
  postCalculations(calcObject);
}

function operatorSelector() {
  operator = $(this).prop('name');
  return operator;
}

function render() {
  console.log('render is rendering!');
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
