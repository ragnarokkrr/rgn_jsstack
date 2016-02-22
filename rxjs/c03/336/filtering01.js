var Rx = require('rx');

var seq = Rx.Observable.generate(
  0,
  i => i < 10,
  i => i + 1,
  i => i * i
);

var source = seq.filter(n => n < 5);

var subscription = source.subscribe(
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e),
  () => console.log('onCompleted')
);
