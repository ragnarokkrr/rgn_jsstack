var Rx = require('rx');

var source = Rx.Observable.interval(1000);

var hot = source.publish();


var subscription1 = hot.subscribe(
  x => console.log("Observer 1: onNext: %s", x),
  e => console.log("Observer 1: onError: %s", e),
  () => console.log("Observer 1: onCompleted")
);

console.log('Current Time after 1st subscription: %s', Date.now());

setTimeout(() => {

  hot.connect();
  console.log('Current time after connect: %s', Date.now());

  setTimeout(()=> {

    console.log('Current time after 2nd subscription: %s', Date.now());

    var subscription2 = hot.subscribe(
      x => console.log('Observer 2: onNext: %s', x),
      e => console.log('Observer 2: onError: %s', e),
      () => console.log('Observer 2: onCompleted')
    );

  }, 3e3)
}, 3e3);
