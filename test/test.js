var test = require('tape');

test('basic arithmetic', function (t) {
  t.equal(2 + 3, 5, 'sum two numbers');
  t.equal(7 * 8 + 9, 65, 'sum three numbers');
  t.end();
});
