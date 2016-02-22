var fs = require('fs')
  Rx = require('rx');

var rename = Rx.Observable.fromNodeCallback(fs.rename);

var source = rename('file1.txt', 'file2.txt');

var subscription = source.subscribe(
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e),
  () => console.log('onCompleted')
);
