var Rx = require('rx');

var set = new Set ([1, 2, 3, 4, 5, 5, 5]);

var source = Rx.Observable.from(set);

var subscription = source.subscribe(
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e),
  () => console.log('onCompleted')
);
