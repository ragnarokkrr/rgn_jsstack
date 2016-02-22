var Rx = require('rx');

function* fibonnaci() {
  var fn1 = 1;
  var fn2 = 2;
  while (1) {
    var current = fn2;
    fn2 = fn1;
    fn1 = fn1 + current;
    yield current;
  }
}


Rx.Observable.from(fibonnaci())
  .take(10)
  .subscribe(x => console.log('Value: %s', x));
