var _ = require('underscore'),
  common = require('../fjs-common');

var nums = [1, 2, 3, 4, 5];

var doubleAll = (array) => {
  return _.map(array, (n) => n * 2);
};

console.log(doubleAll(nums));


var average = (array) => {
  var sum = _.reduce(array, (a, b) => a + b);
  return sum / _.size(array);
};

console.log(average(nums));

var onlyEven = (array) => {
  return _.filter(array, (n) => (n % 2) === 0);
};

console.log(onlyEven(nums));


console.log(_.map({
  a: 1,
  b: 2
}, _.identity));


console.log(_.map({
  a: 1,
  b: 2
}, (v, k) => [k, v]));


console.log(_.map({
  a: 1,
  b: 2
}, (v, k, coll) => [k, v, _.keys(coll)]));


var nums = [100, 2, 25];

var div = (x, y) => x / y;

console.log(_.reduce(nums, div));

console.log(_.reduceRight(nums, div));

function allOf( /* funs */ ) {
  return _.reduceRight(arguments, (truth, f) => truth && f(), true);
};

function anyOf( /* funs */ ) {
  return _.reduceRight(arguments, (truth, f) => truth || f(), false)
};

var T = () => true;
var F = () => false;

console.log(allOf());
console.log(allOf(T));
console.log(allOf(T, T));
console.log(allOf(T, T, T, T, T, F));
console.log(anyOf(T, T, F));
console.log(anyOf(F, F, F, F));
console.log(anyOf());


console.log(_.find(['a', 'b', 3, 'd'], _.isNumber));
console.log(_.reject(['a', 'b', 3, 'd'], _.isNumber));

function complement(pred) {
  return function() {
    return !pred.apply(null, _.toArray(arguments));
  }
}

// arrow functions doesn't binds 'arguments'
function complement2(pred) {
  var args = arguments;
  return () => !pred.apply(null, _.toArray(args));
}
console.log(_.filter(['a', 'b', 3, 'd'], complement(_.isNumber)));

console.log("all:", _.all([1, 2, 3, 4], _.isNumber));

console.log("any: ", _.any([1, 2, 'c', 4], _.isString));

var people = [{
  name: "Rick",
  age: 30
}, {
  name: "Jaka",
  age: 24
}];

console.log(_.sortBy(people, (p) => p.age));


var albums = [{
  title: "Sabbath Bloody Sabbath",
  genre: "Metal"
}, {
  title: "Scientist",
  genre: "Dub"
}, {
  title: "Undertow",
  genre: "Metal"
}];

console.log(_.groupBy(albums, (a) => a.genre));

console.log(_.countBy(albums, (a) => a.genre));

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


var mapcat = (fun, coll) => cat.apply(null, _.map(coll, fun));


console.log(mapcat((e) => construct(e, [","]), [1, 2, 3]));

var butLast = (coll) => _.toArray(coll).slice(0, -1);

function interpose(inter, coll) {
  return butLast(mapcat(function(e) {
    return construct(e, [inter]);
  }, coll));
}

var interpose2 = (inter, coll) => {
  //console.log(`${inter} === ${coll}`);
  return butLast(mapcat((e) => construct(e, [inter]), coll))
};

console.log(interpose2(",", [1, 2, 3]));
