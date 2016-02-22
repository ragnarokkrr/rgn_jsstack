var Rx = require('rx'),
  transducers = require('transducers-js');

var t = transducers;
var map = t.map,
  filter = t.filter,
  comp = t.comp,
  into = t.into;

var arr = [1, 2, 3, 4];

var res = arr.reduce((result, x) => result.concat(x + 1), []);

console.log(res);

var inc = (n) => n + 1;
var isEven = (n) => n % 2 == 0;
var xf = comp(map(inc), filter(isEven));


console.log(into([], xf, arr));
