var Rx = require('rx');

var source = Rx.Observable.interval(1000);

var subscription1 = source.subscribe(
  x => console.log('Observer 1: onNext: %s', x),
  e => console.log('Observer 1: onError: %s', e.message),
  () => console.log('Observer 1: onCompleted')
);

var subscription2 = source.subscribe(
  x => console.log('Observer 2: onNext: %s', x),
  e => console.log('Observer 2: onError: %s', e.message),
  () => console.log('Observer 2: onCompleted')
);

setTimeout(() => {
  subscription1.dispose();
  subscription2.dispose();
}, 5000);
