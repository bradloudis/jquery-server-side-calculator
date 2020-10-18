$(document).ready(readyUp);

let operator = '';

function readyUp() {
  // call getCalcHistory() on page load to grab any calculation history that is already stored on the server
  getCalcHistory();
  $('.js-equalBtn').on('click', clickEqualSubmit);
  $('.js-addBtn').on('click', operatorSelector);
  $('.js-minusBtn').on('click', operatorSelector);
  $('.js-multiplyBtn').on('click', operatorSelector);
  $('.js-divideBtn').on('click', operatorSelector);
  $('.js-clearBtn').on('click', clearFields);
}

// clears all fields and removes any button highlights
function clearFields() {
  $('.js-numOne').val('');
  $('.js-numTwo').val('');
  removeBtnColor();
}

// removes any button highlights and resets the operator variable to an empty string
function removeBtnColor() {
  $('.js-addBtn').removeClass('colorBtn');
  $('.js-minusBtn').removeClass('colorBtn');
  $('.js-multiplyBtn').removeClass('colorBtn');
  $('.js-divideBtn').removeClass('colorBtn');
  operator = '';
}

// checks that input field has a number and a math operator is selected (if not user is alerted).
// creates an object to send over to the server for computing
function clickEqualSubmit() {
  console.log('click me baby one more time!');
  if (
    $('.js-numOne').val().length === 0 ||
    $('.js-numTwo').val().length === 0
  ) {
    alert('Please fill out both input fields!');
  } else if (operator === '') {
    alert('Please select a math operator!');
  } else {
    const calcObject = {
      numOne: $('.js-numOne').val(),
      operator: operator,
      numTwo: $('.js-numTwo').val(),
    };
    // send the object to the post function
    postCalculations(calcObject);
    // reset any button highlights
    removeBtnColor();
  }
}

// highlights the button
// sets the name value to the variable operator
function operatorSelector() {
  $(this).addClass('colorBtn');
  operator = $(this).prop('name');
  return operator;
}

// appends the most recent calculation as a large number on the DOM
// appends a complete history of calculations from the server on the DOM
function render(response) {
  // console.log(response);
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

// sends calcObject to the server for calculations
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

// receives the complete history of calculations
function getCalcHistory() {
  $.ajax({
    type: 'GET',
    url: '/calculation',
  })
    .then((response) => {
      if (response.length > 0) {
        render(response);
      }
    })
    .catch((err) => {
      console.log(err);
      alert('OUCHIE!');
    });
}
