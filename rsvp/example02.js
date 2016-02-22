var RSVP = require('rsvp');

function dieToss() {
  return Math.floor(Math.random() * 6) + 1;
}

function tossASix() {
  return new RSVP.Promise((fulfill, reject) => {
    var n = Math.floor(Math.random() * 6) + 1;
    if (n === 6) {
      fullfill(n);
    } else {
      reject(n);
    }
  });
}

function logAndTossAgain(toss) {
  console.log('Tossed a %s, need to try again.', toss);
  return tossASix();
}

function logSuccess(toss) {
  console.log('Yay, managed to toss a %s.', toss);
}

function logFailure(toss) {
  console.log("Tossed a %s. Too bad couldn't roll a six", toss);
}

tossASix()
  .then(null, logAndTossAgain)
  .then(null, logAndTossAgain)
  .then(logSuccess, logFailure);
