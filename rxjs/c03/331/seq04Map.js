var Rx = require('rx');

var map = new Map([['key',1], ['key2', 2]]);


var source = Rx.Observable.from(map);

var subscription = source.subscribe(
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e),
  () => console.log('onCompleted')
);
