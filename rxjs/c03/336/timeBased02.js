var Rx = require('rx');

var seq = Rx.Observable.interval(1e3);

var bufSeq = seq.bufferWithTime(3e3);

bufSeq
  .map(arr => arr.reduce((acc, x) => acc + x, 0))
  .subscribe(console.log.bind(console));
