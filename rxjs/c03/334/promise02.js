var RSVP = require('rsvp')
  Rx = require('rx');

var promise1 = new RSVP.Promise((resolve, reject) => resolve(42));

var source1 = Rx.Observable.fromPromise(promise1);

var subscription1 = source1.subscribe(
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e),
  () => console.log('onCompleted')
);


var source2 = Rx.Observable.throw(new Error('reason')).toPromise(RSVP.Promise);

source2.then (
  value => console.log('Resolved value: %s', value),
  reason => console.log('Rejected reason: %s ', reason)
);
