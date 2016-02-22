var Rx = require('rx')
  , fs = require('fs');


var exists = Rx.Observable.fromCallback(fs.exists);

var source = exists('file.txt');

var subscription = source.subscribe(
  x => console.log('onNext: %s', x),
  e => console.log('onError: %s', e),
  () => console.log('onCompleted')
);
