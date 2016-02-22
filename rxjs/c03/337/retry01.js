var Rx = require('rx');
var request = require('request');

var get = Rx.Observable.fromNodeCallback(request);

var source = get('url').retry(3);

var subscription = source.subscribe(
  data => console.log(data),
  err => console.log(err)
);
