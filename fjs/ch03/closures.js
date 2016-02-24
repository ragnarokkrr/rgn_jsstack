var _ = require('underscore'),
  common = require('../fjs-common');

function whatWasTheLocal() {
  var CAPTURED = "Oh hai";

  return function() {
    return "The local was: " + CAPTURED;
  }
}

var reportLocal = whatWasTheLocal();


console.log(reportLocal());


function createScaleFunction(FACTOR) {
  return function(v) {
    return _.map(v, function(n) {
      return (n * FACTOR);
    });
  }
}


var scale10 = createScaleFunction(10);

console.log(scale10([1, 2, 3]));

console.log(createScaleFunction(100)([1, 2, 3]));

console.log(scale10([1, 2, 3]));


function createScaleFunctionManualBind(FACTOR) {
  return function(v) {
    this['FACTOR'] = FACTOR;
    var captures = this;

    return _.map(v, _.bind(function(n) {
      return (n * this['FACTOR']);
    }, captures));
  };
}

var scale10MB = createScaleFunctionManualBind(1000);

console.log(scale10MB.call({}, [5, 6, 7]));

function makeAdder(CAPTURED) {
  return function(free) {
    return free + CAPTURED;
  }
}

var add10 = makeAdder(10);

console.log(add10(32));

var add1024 = makeAdder(1024);
console.log(add1024(11));

var average = (array) => {
  var sum = _.reduce(array, (a, b) => a + b);
  return sum / _.size(array);
};

function averageDamp(FUN) {

  return function(n) {
    console.log("FUN", FUN, "n", n);
    return average([n, FUN(n)]);
  }
}

var averageSq = averageDamp(function(n) {
  return n * n;
});

console.log(averageSq(10));


function showObject(OBJ) {
  return function() {
    return OBJ;
  }
}

var o = {
  a: 42
};

var showO = showObject(o);

console.log(showO());

o.newField = 108;

console.log(showO());

var pingpong = (function() {
  var PRIVATE = 0;

  return {
    inc: function(n) {
      return PRIVATE += n;
    },
    dec: function(n) {
      return PRIVATE -= n;
    }
  };
})();

console.log(pingpong.inc(10));
console.log(pingpong.dec(7));

pingpong.div = function(n) {
  return PRIVATE / n; //not defined!
};

//console.log(pingpong.div(3));

function plucker(FIELD) {
  return function(obj) {
    return (obj && obj[FIELD]);
  }
}

var best = {
  title: "Infinite Jest",
  author: "DFW"
};

var getTitle = plucker('title');

console.log(getTitle(best));

var books = [{
  title: "Chthon"
}, {
  stars: 5
}, {
  title: "Botchan"
}];

var third = plucker(2);

console.log(third(books));

console.log(_.filter(books, getTitle));
