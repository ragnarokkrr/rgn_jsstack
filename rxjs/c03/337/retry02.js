"use strict";

var Rx = require('rx');
var request = require('request');

var get = Rx.Observable.fromNodeCallback(request);


var source = get('url').retryWhen(
  attempts =>
  attempts
  .zip(Rx.Observable.range(1, 3), (_, i) => i)
  .flatMap(i => {
    console.log('delay retry by %s second(s)', i);
    return Rx.Observable.timer(i * 1e3);
  })

);


var subscription = source.subscribe(
  data => {
    console.log(data);
  }
);
