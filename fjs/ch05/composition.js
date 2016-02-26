var _ = require('underscore'),
  common = require('../fjs-common'),
  ch04 = require('../ch04/higher.js');

/* ==== dispatch */

function dispatch( /* funs */ ) {
  var funs = _.toArray(arguments);
  var size = funs.length;

  return function(target /* args */ ) {
    var ret /* = undefined*/ ;
    var args = _.rest(arguments);

    for (var funIndex = 0; funIndex < size; funIndex++) {
      var fun = funs[funIndex];
      console.log("fun", [fun], "target", target, "args", args);
      ret = fun.apply(fun, common.construct(target, args));

      if (common.existy(ret)) return ret;
    }
    return ret;
  };
}

var a = (aa) => console.log("aa", aa);

var b = (bb) => console.log("bb", bb);

var dispatched = dispatch(a, b);

console.log(dispatched("sdsdd"));

var str = dispatch(ch04.invoker('toString', Array.prototype.toString),
  ch04.invoker('toString', String.prototype.toString));

console.log(str('a'));
console.log(str(_.range(10)));

function stringReverse(s) {
  if (!_.isString(s)) return undefined;
  return s.split('').reverse().join("");
}

console.log(stringReverse("abd"));

var rev = dispatch(ch04.invoker('reverse', Array.prototype.reverse),
  stringReverse);


console.log(rev([1, 2, 3]));
console.log(rev("abc"));

var sillyReverse = dispatch(rev, ch04.always(42));

console.log(sillyReverse([1, 2, 3]));

console.log(sillyReverse(100000));

/// dispatch switch
var notify = m => {
  console.log(`=>notify: ${m}`);
  return m;
};
var changeView = v => {
  console.log(`=>changeView: ${v}`);
  return v;
};

function performCommandHardcoded(command) {
  var result;
  switch (command.type) {
    case 'notify':
      result = notify(command.message);
      break;
    case 'join':
      result = changeView(command.target);
      break;
    default:
      console.log(`hardcoded deefault: ${command}`);
  }
  return result;
}

console.log(performCommandHardcoded({
  type: 'notify',
  message: 'hi'
}));

console.log(performCommandHardcoded({
  type: 'join',
  target: 'waiting-room'
}));

console.log(performCommandHardcoded({
  type: 'wat'
}));


function isa(type, action) {
  return function(obj) {
    if (type === obj.type) {
      return action(obj);
    }
  };
}

var performCommand = dispatch(
  isa('notify', (obj) => notify(obj.message)),
  isa('join', (obj) => changeView(obj.target)), (obj) => console.log(`default: ${obj}`)
);

var shutdown = hostname => {
  console.log(`shutdown: ${hostname}`);
  return hostname;
};

console.log('performCommand:', performCommand({
  type: 'join',
  target: 'waiting-room'
}));


var performaAdminCommand = dispatch(isa('kill', obj => shutdown(obj.hostname)), performCommand);

console.log(performaAdminCommand({
  type: 'kill',
  hostname: 'localhost'
}));


function rightAwayInvoker() {
  var args = _.toArray(arguments);
  var method = args.shift();
  var target = args.shift();

  return method.apply(target, args);
}

console.log(rightAwayInvoker(Array.prototype.reverse, [1, 2, 3]));


/* currying */
function leftCurryDiv(n) {
  return function(d) {
    return n / d;
  };
}

function rightCurryDiv(d) {
  return function(n) {
    return n / d;
  };
}

var divide10by = leftCurryDiv(10);
console.log('divide10by:', divide10by(2));

var divideBy10 = rightCurryDiv(10);
console.log(divideBy10(2));

function curry(fun) {
  return function(arg) {
    return fun(arg);
  };
}

console.log(['11', '11', '11', '11'].map(parseInt));

console.log(['11', '11', '11', '11'].map(curry(parseInt)));

function curry2(fun) {
  // console.log("curry2=> fun", [fun]);
  return function(secondArg) {
    // console.log("curry2=> secondArg", [secondArg]);
    return function(firstArg) {
      console.log("curry2=> fun", [fun], "firstArg", firstArg, "secondArg", secondArg);
      return fun(firstArg, secondArg);
    };
  };
}

function div(n, d) {
  return n / d;
}

var div10 = curry2(div)(10);

console.log('div10', div10(50));


var plays = [{
  artist: "Burial",
  track: "Archangel"
}, {
  artist: "Ben Frost",
  track: "Stomp"
}, {
  artist: "Ben Frost",
  track: "Stomp"
}, {
  artist: "Burial",
  track: "Archangel"
}, {
  artist: "Emeralds",
  track: "Snores"
}, {
  artist: "Burial",
  track: "Archangel"
}];

console.log(_.countBy(plays, function(song) {
  return [song.artist, song.track].join(" - ");
}));

function songToString(song) {
  return [song.artist, song.track].join(" - ");
}

var songCount = curry2(_.countBy)(songToString);

console.log(songCount(plays));


var greatherThan = curry2(function greatherThan(lhs, rhs) {
  return lhs > rhs;
});
var lessThan = curry2(function lessThan(lhs, rhs) {
  return lhs < rhs;
});

var withinRange = ch04.checker(
  ch04.validator("arg must be greather than 10", greatherThan(10)),
  ch04.validator("arg must be less than 20", lessThan(20)));

console.log(withinRange(15));
console.log(withinRange(1));

/* partial application */
