const test = require('node:test');
const assert = require('node:assert/strict');
const { elements } = require('../app.js');
const { shuffle, oddRound } = require('../memory.js');

test('shuffle preserves the source and every element exactly once', () => {
  const source = elements.map(x => x.symbol);
  const result = shuffle(source, () => 0.4);
  assert.deepEqual(source, elements.map(x => x.symbol));
  assert.deepEqual([...result].sort(), [...source].sort());
  assert.notDeepEqual(result, source);
});

test('odd-one-out rounds always have exactly one metal and three nonmetals', () => {
  for (let i = 0; i < 100; i++) {
    const round = oddRound(elements);
    assert.equal(new Set(round.options.map(x => x.symbol)).size, 4);
    assert.equal(round.options.filter(x => x.kind === 'metal').length, 1);
    assert.equal(round.options.filter(x => x.kind === 'nonmetal').length, 3);
    assert.equal(round.options.find(x => x.kind === 'metal').symbol, round.answer);
  }
});
