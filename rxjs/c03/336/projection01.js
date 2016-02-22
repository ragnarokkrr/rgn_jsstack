var Rx = require('rx');

var array = ['Reactive', 'Extensions', 'RxJs'];

var seqString = Rx.Observable.from(array);

var seqNum = seqString.map(x => x.length);

seqNum
  .subscribe(console.log.bind(console));
