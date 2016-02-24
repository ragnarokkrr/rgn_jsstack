var _ = require('underscore'),
  common = require('../fjs-common');

var zombie = {
  name: "Bub",
  film: "Day of the Dead"
};

console.log(_.keys(zombie));

console.log(_.values(zombie));

console.log(_.pluck([{
  title: "Chthon",
  author: "Anthony"
}, {
  title: "Grendel",
  author: "Gardner"
}, {
  title: "After Dark"
}], 'author'));

console.log(_.pairs(zombie));

console.log(_.object(_.map(_.pairs(zombie), (pair) => [pair[0].toUpperCase(), pair[1]])));

console.log(_.invert(zombie));

console.log(_.keys(_.invert({
  a: 138,
  b: 9
})));

console.log(_.pluck(_.map([{
    title: "Chthon",
    author: "Anthony"
  }, {
    title: "Grendel",
    author: "Gardner"
  }, {
    title: "After Dark"
  }], (obj) => _.defaults(obj, {
    author: "Unknown"
  })),
  'author'
));

var person = {
  name: "Romy",
  token: "j3983ij",
  password: "tigress"
};

var info = _.omit(person, 'token', 'password');

console.log(info);

var creds = _.pick(person, 'token', 'password');

console.log(creds);

var library = [{
  title: "SICP",
  isbn: "026010771",
  ed: 1
}, {
  title: "SICP",
  isbn: "026010871",
  ed: 2
}, {
  title: "Joy of Clojure",
  isbn: "1935182641",
  ed: 1
}];

console.log(_.findWhere(library, {
  title: "SICP"
}));

console.log(_.where(library, {
  title: "SICP"
}));

console.log(_.pluck(library, 'title'));

var project = (table, keys) => {

  return _.map(table, (obj) => {
    var pickArgs = common.construct(obj, keys);
    return _.pick.apply(null, pickArgs);
  });
};

var editionResults = project(library, ['title', 'isbn']);

console.log(editionResults);

var isbnResults = project(editionResults, ['isbn']);
console.log(isbnResults);


var rename = (obj, newNames) => {
  console.log("obj", obj, "newNames", newNames);
  return _.reduce(newNames, (o, nu, old) => {
      console.log("\to", o, "nu", nu, "old", old);
      if (_.has(obj, old)) {
        console.log("trocou!");
        o[nu] = obj[old];
        return o;
      } else {
        return o;
      }
    },
    _.omit.apply(null, common.construct(obj, _.keys(newNames))));
};

console.log(rename({
  a: 1,
  b: 2
}, {
  'a': 'AAA'
}));


var as = (table, newNames) => {
  return _.map(table, (obj) => rename(obj, newNames));
};

console.log(as(library, {
  isbn: 'code',
  ed: 'edition'
}));


var restrict = (table, pred) => {
  return _.reduce(table, (newTable, obj) => {
    console.log("newTable", newTable, "obj", obj);
    if (common.truthy(pred(obj))) {
      return newTable;
    } else {
      return _.without(newTable, obj);
    }
  }, table);
};

console.log(restrict(library, (book) => book.ed > 1));

console.log(
  restrict(
    project(
      as(library, {ed: 'edition'}),
      ['title', 'isbn', 'edition']),
      (book) => book.edition > 1
  )
);
