var _ = require('underscore');

var txt = `name, age, hair
Merble, 35, red
Bob, 64, blonde`;

var lameCSV = (str) => {
  return _.reduce(str.split("\n"), (table, row) => {
    var newRow = _.map(row.split(","), (c) => c.trim());
    table.push(newRow);
    return table;
    }, []);
  };

var peopleTable = lameCSV(txt);

console.log(peopleTable);

console.log(_.rest(peopleTable).sort());

var second = (table) => table[1];
var nth = (table, nth) => table[nth];

var selectNames = (table) => _.rest(_.map(table, _.first));
var selectAges = (table) => _.rest(_.map(table,  second));
var selectHairColor = (table) => _.rest(_.map(table, (row) => nth(row, 2)));
var mergeResults = _.zip;

console.log(selectNames(peopleTable));
console.log(selectAges(peopleTable));
console.log(selectHairColor(peopleTable));

console.log(mergeResults(
  selectNames(peopleTable),
  selectAges(peopleTable)
));
