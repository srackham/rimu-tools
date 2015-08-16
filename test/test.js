var test = require('tape');

var exec = require('child_process').exec;

function execute(command, callback) {
  exec(command, function(error, stdout, stderr) {
    callback(stdout);
  });
}

function expect_rimuc(t, source, html) {
  execute('echo \'' + source + '\' | node ./bin/rimuc.js --no-rimurc', function(out) {
    t.equal(out, html)
  })
}

test('basic arithmetic', function(t) {
  t.equal(2 + 3, 5, 'sum two numbers');
  t.equal(7 * 8 + 9, 65, 'sum three numbers');
  t.end();
});

test('ls command', function(t) {
  t.plan(1);
  execute('ls README.md', function(out) {
    t.equal(out, 'README.md\n')
  });
});

test('rimuc', function(t) {
  t.plan(1);
  expect_rimuc(t, '*Hello World!*', '<p><em>Hello World!</em></p>\n\n');
});

