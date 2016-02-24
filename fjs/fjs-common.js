var _ = require('underscore');

var existy = (x) => x != null;
var truthy = (x) => (x !== false) && existy(x);

function cat() {
  var head = _.first(arguments);
  if (existy(head)) {
    return head.concat.apply(head, _.rest(arguments));
  } else {
    return [];
  }
}

console.log(cat([1, 2, 3], [4, 5], [6, 7, 8]));

var construct = (head, tail) => cat([head], _.toArray(tail));

console.log(construct(42, [1, 2, 3]));

var doWhen = (cond, action) => {
  if (truthy(cond)) return action();
  else return undefined;
};

function fail(thing) {
  throw new Error(thing);
}

exports.existy = existy;
exports.truthy = truthy;
exports.cat = cat;
exports.construct = construct;
exports.doWhen = doWhen;
exports.fail = fail;
