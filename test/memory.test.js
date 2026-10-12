const test = require('node:test');
const assert = require('node:assert/strict');
const { elements } = require('../app.js');
const { shuffle, oddRound, createLearningDeck } = require('../memory.js');

test('all 24 means every element exactly once, including previously mastered ones', () => {
  const deck = createLearningDeck(elements, new Set(['H','O','Na']));
  assert.equal(deck.length, 24);
  assert.equal(new Set(deck.map(x => x.symbol)).size, 24);
  assert.deepEqual(deck.map(x => x.symbol).sort(), elements.map(x => x.symbol).sort());
});

test('a short pack keeps precisely its selected eight elements', () => {
  const pack = elements.slice(8,16);
  const deck = createLearningDeck(pack);
  assert.equal(deck.length, 8);
  assert.deepEqual(deck.map(x => x.symbol).sort(), pack.map(x => x.symbol).sort());
});

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
