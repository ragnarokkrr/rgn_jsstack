var _ = require('underscore');

aGlobalVariable = 'livin la vida global';

console.log(_.map(_.range(2), function() {
  return aGlobalVariable;
}));


function makeEmptyObject() {
  return new Object();
}


// lexical show.bs.collapse
aVariable = "Outer";

function afun() {
  var aVariable = "Middle";

  return _.map([1, 2, 3], function(e) {
    var aVariable = "In";

    return [aVariable, e].join(' ');
  });
}
console.log(afun());

var afun2 = () => {
  var aVariable = "Middle";

  return _.map([1, 2, 3], (e) => {
    var aVariable = "in";
    return [aVariable, e].join(' ');
  });
};

console.log(afun2());

// dynamic scoping


var globals = {};

function makeBindFun(resolver) {
  return function(k, v) {
    var stack = globals[k] || [];
    globals[k] = resolver(stack, v)
    return globals;
  }
}

var stackBinder = makeBindFun(function(stack, v) {
  stack.push(v);
  return stack;
});

var stackUnbinder = makeBindFun(function(stack) {
  stack.pop();
  return stack;
});


var dynamicLookup = function(k) {
  var slot = globals[k] || [];
  return _.last(slot);
}

stackBinder('a', 1);
stackBinder('b', 100);

console.log('a', dynamicLookup('a'));


console.log("globals", globals);

stackBinder('a', '*');

dynamicLookup('a');

console.log("globals", globals);

stackUnbinder('a');

console.log(dynamicLookup('a'));


function f() {
  return dynamicLookup('a')
}

function g() {
  stackBinder('a', 'g');
  return f();
}

console.log(f());
console.log(g());

console.log(globals);

// js dynamic scope

function globalThis() {
  return this;
}

//console.log(globalThis());


console.log(globalThis.call('barnabas'));
console.log(globalThis.apply('orsulak', []));


var nopeThis = _.bind(globalThis, 'nope');

console.log(nopeThis.call('wat'));

// function scope
function strangeIdentity(n) {
  for (var i = 0; i < n; i++);
  return i; //omg
}

console.log(strangeIdentity(138));

function strangeIdentityEqui(n) {
  var i;
  for (i = 0; i < n; i++);
  return i;
}

function strangeIdentitySim(n) {
  for (this['i'] = 0; this['i'] < n; this['i']++);
  return this['i'];
}

console.log(strangeIdentitySim(108));

console.log(i);

console.log(strangeIdentity.call({}, 10000));

console.log(i);


function f() {
  this['a'] = 200;
  return this['a'] + this['b'];
}

var globalsF = {
  'b': 2
};

console.log(f.call(_.clone(globalsF)));

console.log(globalsF);
