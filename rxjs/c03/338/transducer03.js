var Rx = require('rx');


var source = Rx.Observable.range(1, 4);

var increment = (x) => x + 1;
var isEven = (x) => x % 2 === 0;

var transduced = source.map(increment).filter(isEven);

transduced.subscribe(
  x => console.log("onNext: %s", x),
  e => console.log("onError: %s", e),
  () => console.log("onCompleted")
);
