//http://xgrommx.github.io/rx-book/
var Rx = require('rx');

var source = Rx.Observable.create(observer => {
  observer.onNext(42);
  observer.onCompleted();

  return () => console.log('disposed');

});


var subscription = source.subscribe(
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e),
  () => console.log('onCompleted')

);


subscription.dispose();
