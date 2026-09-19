const test = require('node:test');
const assert = require('node:assert/strict');
const { tasks, parseAnswer, isCorrect } = require('../app.js');

test('parses Polish and English decimal separators', () => {
  assert.equal(parseAnswer('2,7'), 2.7);
  assert.equal(parseAnswer(' 2.7 '), 2.7);
  assert.equal(parseAnswer('1 200'), 1200);
});

test('rejects answers containing units or unrelated text', () => {
  assert.equal(Number.isNaN(parseAnswer('2,7 g')), true);
  assert.equal(Number.isNaN(parseAnswer('abc')), true);
});

test('checks numeric answers', () => {
  assert.equal(isCorrect('2,7', 2.7), true);
  assert.equal(isCorrect('2,8', 2.7), false);
});

test('all tasks contain complete learning data', () => {
  assert.ok(tasks.length >= 6);
  for (const task of tasks) {
    assert.ok(task.text && task.hint && task.solution && task.unit);
    assert.equal(Number.isFinite(task.answer), true);
  }
});
