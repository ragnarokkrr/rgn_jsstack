var Rx = require('rx');

var array = [1, 2, 3, 4, 5];

var source = Rx.Observable.from(array);


var subscription = source.subscribe(
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e),
  () => console.log('onCompleted')

);
