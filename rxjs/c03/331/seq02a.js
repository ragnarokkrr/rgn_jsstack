var Rx = require('rx');

var source = Rx.Observable.range(1, 5);

var observer = Rx.Observer.create(
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e),
  () => console.log('onCompleted'));

var subscription = source.subscribe(observer);
