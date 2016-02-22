var Rx = require('rx');

var source = Rx.Observable.range(0, 3)
  .flatMap(x => Promise.resolve(x * x));

var subscription = source.subscribe(
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e),
  () => console.log('onCompleted')
);
