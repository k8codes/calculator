$(document).ready(function() {
  var clicked = [];
  var plus = '+';
  var minus = '-';
  var times = '*';
  var divide = '/';
  var point = '.';
  var solution = false;
  var nonNum = false;
  var isPoint = false;
  var lastOperation;
  //resets calculator
 function clearOutput() {
   $('#output').empty();
   clicked = [];
   solution = false;
   isPoint = false;
  }
  //alert if output exceeds limit
 function exceedsLimit() {
    if (clicked.length > 9) {
      alert('Character limit exceeded. Please start over.');
    clearOutput();
  }
 }
  //enter === equals
$(document).keyup(function(event){
    if (event.keyCode == 13){
        $("#equals").click();
    }
});
//display nums
function displayNum(id, char) {
  $('#' + id).click(function() {
    if (solution === true) {
      clearOutput();
    }
    $('#output').append(char);
    solution = false;
    nonNum = false;
    clicked.push(char);
    exceedsLimit();
  })
}
//display non-nums
function displayNonNum(id, char) {
  $('#' + id).click(function() {
    if (nonNum === true) {
      alert('Selection must be numeric');
    } else if (isPoint === true && char === point) {
      alert('Please make another selection');
    } else {
      if (char === point) {
        isPoint = true;
      } else if (char !== point) {
        isPoint = false;
      }
      solution = false;
      $('#output').append(char);
      nonNum = true;
      clicked.push(char);
      exceedsLimit();
    }
  })
}
  //display nums
  displayNum('zero', '0');
  displayNum('one', '1');
  displayNum('two', '2');
  displayNum('three', '3');
  displayNum('four', '4');
  displayNum('five', '5');
  displayNum('six', '6');
  displayNum('seven', '7');
  displayNum('eight', '8');
  displayNum('nine', '9');
  //display non-nums
  displayNonNum('plus', '+');
  displayNonNum('minus', '-');
  displayNonNum('times', '*');
  displayNonNum('divide', '/');
  displayNonNum('point', '.');

  //evaluates expression
$('#equals').click(function() {
  clicked = clicked.join('');
  lastOperation = clicked.slice(1).split('');
  clicked = eval(clicked).toString();
  if (clicked.length > 9) {
    clicked = Number(clicked);
    clicked = [clicked.toFixed(9)];
    clicked = clicked.join('');
  }
  clicked = [Number(clicked)];
  $('#output').html(clicked);
  solution = true;
  clicked = clicked.toString().split('');
});


//clear all data from calculator
$('#ac').click(function() {
  clearOutput();
})
//clear last input before operation
$('#ce').click(function() {
  var last = clicked.length;
  if (last === clicked.lastIndexOf(plus) + 1 || last === clicked.lastIndexOf(minus) + 1 || last === clicked.lastIndexOf(times) + 1 || last === clicked.lastIndexOf(divide) + 1 ) {
    $('#output').html(clicked);
  } else {
    clicked.pop();
    $('#output').html(clicked)
  }
})

})
