var Rx = require('rx');

var arrayLike = { length: 5 };

var source = Rx.Observable.from(arrayLike,
  (v, k) => k + ' - ' + v);


var subscription = source.subscribe (
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e),
  () => console.log('onCompleted')

);
