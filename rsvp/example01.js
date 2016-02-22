var RSVP = require('rsvp');

function dieToss(){
  return Math.floor(Math.random() * 6) + 1;
}

console.log('1');

var promise = new RSVP.Promise((fulfill, reject) => {
  var n = dieToss();
  if (n === 6) {
    fulfill(n);
  } else {
    reject(n);
  }
  console.log('2');
});

promise.then(
  toss => console.log('Yay, thew a %s.', toss),
  toss => console.log('Oh, noes, threw a %s', toss)
);
console.log('3');
