var Rx = require('rx');

var source1 = Rx.Observable.range(1, 3);
var source2 = Rx.Observable.range(1, 3);

console.log('concat');

source1.concat(source2)
  .subscribe(console.log.bind(console));

console.log('merge');

source1.merge(source2)
  .subscribe(console.log.bind(console));

console.log('catch');

var source2a = Rx.Observable.range(4, 6);

source1.catch(source2a)
  .subscribe(console.log.bind(console));

console.log('onErrorResumeNext');

var source1Err = Rx.Observable.throw(new Error('An error has ocurred.'));

source1Err.onErrorResumeNext(source2)
  .subscribe(console.log.bind(console));
