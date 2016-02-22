var Rx = require('rx');

console.log('Current time: ' + Date.now());

var source = Rx.Observable.timer(
  5000,
  1000
).timestamp();


var subscription = source.subscribe(
  x => console.log(x.value + ': ' + x.timestamp)
);
