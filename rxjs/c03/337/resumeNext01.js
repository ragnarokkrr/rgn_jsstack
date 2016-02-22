var Rx = require('rx');

var source = Rx.Observable.onErrorResumeNext(
  Rx.Observable.just(42),
  Rx.Observable.throw(new Error()),
  Rx.Observable.just(56),
  Rx.Observable.throw(new Error()),
  Rx.Observable.just(68)
);

var subscription = source.subscribe(
  data => console.log(data)
);
