var _ = require('underscore'),
  common = require('../fjs-common');


console.log(_.max([1, 2, 3, 4, 5]));
console.log(_.max([1, 2, 3, 4.75, 4.5]));


var people = [{
  name: "Fred",
  age: 65
}, {
  name: "Lucy",
  age: 36
}];

console.log(_.max(people, function(p) {
  return p.age;
}));

function finder(valueFun, bestFun, coll) {
  return _.reduce(coll, function(best, current) {
    //console.log("best", best, "current", current);
    var bestValue = valueFun(best);
    var currentValue = valueFun(current);
    //console.log("bestFun", bestFun(bestValue, currentValue));
    return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
  });
}

function plucker(FIELD) {
  return function(obj) {
    return (obj && obj[FIELD]);
  }
}

console.log(finder(_.identity, Math.max, [1, 2, 3, 4, 5]));

console.log(finder(plucker('age'), Math.max, people));

console.log(finder(plucker('name'), function(x, y) {
  return (x.charAt(0) === "L") ? x : y
}, people));

function best(fun, coll) {
  return _.reduce(coll, function(x, y) {
    return fun(x, y) ? x : y;
  });
}

console.log(best(function(x, y) {
  return x > y
}, [1, 2, 3, 4, 5]));


function repeat(times, VALUE) {
  return _.map(_.range(times), function() {
    return VALUE;
  });
}

console.log(repeat(4, "Major"));

function repeatedly(times, fun) {
  return _.map(_.range(times), fun);
}

console.log(repeatedly(3, function() {
  return Math.floor((Math.random() * 10) + 1);
}));


console.log(repeatedly(3, function() {
  return "Odelay!"
}));


function iterateUntil(fun, check, init) {
  var ret = [];
  var result = fun(init);
  while (check(result)) {
    ret.push(result);
    result = fun(result);
  }
  return ret;
}

console.log(iterateUntil(function(n) {
    return n + n
  },
  function(n) {
    return n <= 1024
  }, 1));

console.log(repeatedly(10, function(exp) {
  return Math.pow(2, exp + 1)
}));


function always(VALUE) {
  return function() {
    return VALUE;
  }
}

var f = always(function() {})

console.log((f() === f()));

var g = always(function() {})

console.log((f() === g()));

console.log(repeatedly(3, always("Odelay!")));

function invoker(NAME, METHOD) {
  //console.log("NAME", NAME, "METHOD", METHOD);
  return function(target /* args */ ) {
    //console.log("target", target);
    if (!common.existy(target)) {
      common.fail("Must provide a target");
    }
    var targetMethod = target[NAME];
    var args = _.rest(arguments);

    //console.log("config args", args, "arguments", arguments, "targetMethod", targetMethod);
    return common.doWhen((common.existy(targetMethod) && METHOD === targetMethod),
      function() {
        //console.log("\tdoWhen args", args);
        return targetMethod.apply(target, args);
      });
  };
}


var rev = invoker('reverse', Array.prototype.reverse);

console.log(_.map([
  [1, 2, 3]
], rev));

var uniqueString = (len) => {
  return Math.random().toString(36).substr(2, len);
};

console.log(uniqueString(10));

var uniqueString = (prefix) => [prefix, new Date().getTime()].join('');

console.log(uniqueString("argento"));


function makeUniqueStringFunction(start) {
  var COUNTER = start;
  return function(prefix) {
    return [prefix, COUNTER++].join('');
  };
}

var uniqueString = makeUniqueStringFunction(0);

console.log(uniqueString("dari"));
console.log(uniqueString("dari"));
console.log(uniqueString("om"));

var omgenerator = (function(init) {
  var COUNTER = init; //<= NO referential transparency
  return {
    uniqueString: function(prefix) {
      return [prefix, COUNTER++].join(''); //<= NO referential transparency
    }
  }
})(0);

console.log(omgenerator.uniqueString('lichking-'));

var nums = [1, 2, 3, null, 5];

console.log(_.reduce(nums, function(total, n) {
  return total * n
}));

function fnull(fun /*, defaults */ ) {
  var defaults = _.rest(arguments);
  // console.log('fnull> arguments:', arguments);
  // console.log('fnull> fun:', [fun], 'defaults:', defaults);
  return function fnullImpl( /* args */ ) {
    // console.log("\tfnullImpl> arguments:", arguments); // _injects here extra argumentsfrom first reduce call below
    // including the arguments from original safeMult setup call
    var args = _.map(arguments,
      function(e, i, coll) {
        // console.log('\t\tmap> i:', i, 'e:', e);
        var defaulted = common.existy(e) ? e : defaults[i];
        // console.log('\t\t\tmap> defaulted:', defaulted);
        return defaulted;
      });
    // console.log("\tfnullImpl> apply: ", args/*[args[0], args[1]]*/);
    return fun.apply(null, args); // apply in multUnsafe accepts only args[0] and args[1]
  };
}

var safeMult = fnull(function multUnsafe(total, n) {
  return total * n;
}, 1, 1);

console.log(_.reduce(nums, safeMult));


function defaults(d) {
  return function(o, k) {
    var val = fnull(_.identity, d[k]);
    return o && val(o[k]);
  };
}

function doSomething(config) {
  var lookup = defaults({
    critical: 108
  });

  return lookup(config, 'critical');
}

console.log(doSomething({
  critical: 9
}));

console.log(doSomething({}));

function checker( /* validators */ ) {
  var validators = _.toArray(arguments);

  return function(obj) {
    return _.reduce(validators, function(errs, check) {
      if (check(obj))
        return errs;
      else {
        return _.chain(errs).push(check.message).value();
      }
    }, []);
  };
}

var alwaysPasses = checker(always(true), always(true));

console.log(alwaysPasses({}));

var fails = always(false);
fails.message = "a failure in life";
var alwaysFails = checker(fails);

console.log(alwaysFails({}));

function validator(message, fun) {
  var f = function( /* args */ ) {
    return fun.apply(fun, arguments);
  };
  f['message'] = message;
  return f;
}


var gonnaFail = checker(validator("ZOMG!", always(false)));

console.log(gonnaFail(100));


function aMap(obj) {
  return _.isObject(obj);
}

var checkCommand = checker(validator("must be a map", aMap));

console.log(checkCommand({}));

console.log(checkCommand(42));

function hasKeys() {
  var KEYS = _.toArray(arguments);

  var fun = function(obj) {
    return _.every(KEYS, function(k) {
      return _.has(obj, k);
    });
  };

  fun.message = common.cat(["Must have values for keys:"], KEYS).join(" ");
  return fun;
}

var checkCommand = checker(validator("must be a map", aMap),
  hasKeys('msg', 'type'));

console.log(checkCommand({
  msg: "blah",
  type: "display"
}));


console.log(checkCommand(32));

console.log(checkCommand({}));
