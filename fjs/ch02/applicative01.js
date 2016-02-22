var _ = require('underscore');

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
