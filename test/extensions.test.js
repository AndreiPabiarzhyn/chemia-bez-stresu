const test=require('node:test');const assert=require('node:assert/strict');
const {elements}=require('../app.js');
const {examples,formulas,formulaCounts,formulaMatches,makeExam,gradeExam}=require('../extensions.js');
test('all 24 elements have unique illustration tiles and bilingual explanations',()=>{
  assert.equal(new Set(Object.values(examples).map(x=>x[0])).size,24);
  for(const e of elements){assert.ok(examples[e.symbol]);assert.equal(examples[e.symbol].length,5);assert.ok(examples[e.symbol].slice(1).every(x=>typeof x==='string'&&x.length>0));}
});
test('formula checking distinguishes atom count, element count and exact composition',()=>{
  assert.deepEqual(formulaCounts(formulas[0].atoms),{atoms:3,elements:2});
  assert.deepEqual(formulaCounts(formulas[2].atoms),{atoms:2,elements:1});
  assert.ok(formulaMatches(formulas[0],{H:2,O:1,C:0}));
  assert.equal(formulaMatches(formulas[0],{H:1,O:2,C:0}),false);
  assert.equal(formulaMatches(formulas[0],{H:2,O:1,C:1}),false);
});
test('Polish exam grades ten questions strictly and independently',()=>{
  const questions=makeExam(elements,()=>.3);
  assert.equal(questions.length,10);
  const answers=questions.map(q=>q.answer);
  assert.equal(gradeExam(questions,answers).filter(Boolean).length,10);
  answers[0]=answers[0].toLowerCase();
  assert.equal(gradeExam(questions,answers).filter(Boolean).length,9);
  assert.equal(gradeExam(questions,[]).filter(Boolean).length,0);
});
