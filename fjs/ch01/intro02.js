var _ = require('underscore');


var existy = (x) => x != null;

console.log(existy(null));
console.log(existy(undefined));
console.log(existy({}.notHere));
console.log(existy((function() {})()));
console.log(existy(0));
console.log(existy(false));

var truthy = (x) => (x !== false) && existy(x);

console.log(truthy(true));
console.log(truthy(undefined));
console.log(truthy(0));
console.log(truthy(''));


/*
{
  if(condition)
    return _.isFunction(doSomething) ? doSomething() : doSomething;
  else
    return undefined;
}
*/

var doWhen = (cond, action) => {
  if (truthy(cond)) return action();
  else return undefined;
};

var executeIfHasField = (target, name) => {
  return doWhen(existy(target[name]), () => {
    var result = _.result(target, name);
    console.log('The result is: %s', result);
    return result;
  });
};

executeIfHasField([1, 2, 3], 'reverse');

executeIfHasField({
  foo: 42
}, 'foo');

executeIfHasField([1, 2, 3], 'notHere');

console.log([null, undefined, 1, 2, false].map(existy));
console.log([null, undefined, 1, 2, false].map(truthy));
