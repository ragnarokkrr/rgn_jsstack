var Rx = require('rx');
var request = require('request');

var get = Rx.Observable.fromNodeCallback(request);

Rx.Observable.spawn(function*() {
  var data;
  try {
    data = yield get('http://bing.com').timeout(5e3);
  } catch (e) {
    console.log('Error %s', e);
  }
  console.log(data);
}).subscribe();
