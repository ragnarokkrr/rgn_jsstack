var Rx = require('rx');

var source1 = Rx.Observable.interval(5e3).take(2);

var proj = Rx.Observable.range(100, 3);

var resultSeq = source1.flatMap(proj);


var subscription = resultSeq.subscribe(
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e),
  () => console.log('onCompleted')
);
