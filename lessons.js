(function(root,factory){ const api=factory(); if(typeof module==='object'&&module.exports) module.exports=api; else root.ChemistryLessons=api; })(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const units = [
    { title:['Элемент, атом, молекула','Pierwiastek, atom, cząsteczka'],
      rule:['Элемент — это вид атомов. O — символ элемента кислорода. Один атом O и молекула O₂ — не одно и то же: в O₂ два атома кислорода.','Pierwiastek to rodzaj atomów. O jest symbolem tlenu. Atom O i cząsteczka O₂ to nie to samo: w O₂ są dwa atomy tlenu.'],
      example:['Кислород, которым мы дышим, содержит молекулы O₂.','Tlen, którym oddychamy, zawiera cząsteczki O₂.'],
      trap:['Na — натрий (sód), N — азот (azot). Вторая буква символа важна.','Na to sód, N to azot. Druga litera symbolu ma znaczenie.'], models:[['O',['O']],['O₂',['O','O']]],
      questions:[
        {prompt:['Сколько атомов в одной молекуле O₂?','Ile atomów jest w jednej cząsteczce O₂?'],options:['1','2','3'],answer:'2',why:['Индекс 2 означает два атома кислорода.','Indeks 2 oznacza dwa atomy tlenu.']},
        {prompt:['Найди неверную пару.','Znajdź błędną parę.'],options:['Na — azot','N — azot','O — tlen'],answer:'Na — azot',why:['Na — sód (натрий). Azot — это N.','Na to sód. Symbolem azotu jest N.']}
      ]
    },
    {title:['Простое или сложное вещество?','Substancja prosta czy złożona?'],
      rule:['Простое вещество состоит из атомов одного элемента. Соединение — из атомов разных элементов. Считай виды атомов, а не только их количество.','Substancja prosta składa się z atomów jednego pierwiastka. Związek chemiczny składa się z atomów różnych pierwiastków. Licz rodzaje atomów, nie tylko ich liczbę.'],
      example:['O₂ — простое вещество, хотя атомов два. H₂O — соединение: водород и кислород.','O₂ to substancja prosta, choć ma dwa atomy. H₂O jest związkiem: wodór i tlen.'],
      trap:['«Два атома» не означает «два элемента». В O₂ один элемент.','„Dwa atomy” nie oznacza „dwa pierwiastki”. W O₂ jest jeden pierwiastek.'],models:[['O₂',['O','O']],['H₂O',['H','O','H']]],
      questions:[
        {prompt:['O₂ — это…','O₂ to…'],options:[['Простое вещество','Substancja prosta'],['Соединение','Związek chemiczny'],['Смесь','Mieszanina']],answer:0,why:['Оба атома принадлежат одному элементу — кислороду.','Oba atomy należą do jednego pierwiastka: tlenu.']},
        {prompt:['H₂O — это…','H₂O to…'],options:[['Простое вещество','Substancja prosta'],['Соединение','Związek chemiczny'],['Смесь','Mieszanina']],answer:1,why:['Вода содержит два разных элемента: H и O.','Woda zawiera dwa różne pierwiastki: H i O.']}
      ]
    },
    {title:['Смесь и соединение','Mieszanina i związek'],
      rule:['В смеси разные вещества находятся вместе. В соединении атомы разных элементов химически связаны. Воздух — смесь, чистая вода — соединение.','W mieszaninie różne substancje występują razem. W związku atomy różnych pierwiastków są połączone chemicznie. Powietrze to mieszanina, czysta woda to związek.'],
      example:['В воздухе есть молекулы азота N₂ и кислорода O₂. Модель показывает только часть состава воздуха.','W powietrzu są cząsteczki azotu N₂ i tlenu O₂. Model pokazuje tylko część składu powietrza.'],
      trap:['Поваренная соль NaCl — соединение. Раствор соли в воде — смесь.','Sól kuchenna NaCl to związek. Roztwór soli w wodzie to mieszanina.'],models:[['O₂',['O','O']],['N₂',['N','N']],['O₂',['O','O']]],
      questions:[
        {prompt:['Воздух — это…','Powietrze to…'],options:[['Соединение','Związek chemiczny'],['Смесь','Mieszanina'],['Один элемент','Jeden pierwiastek']],answer:1,why:['В воздухе разные вещества: прежде всего азот и кислород.','W powietrzu są różne substancje, głównie azot i tlen.']},
        {prompt:['Раствор соли в воде — это…','Roztwór soli w wodzie to…'],options:[['Смесь','Mieszanina'],['Простое вещество','Substancja prosta'],['Один новый элемент','Nowy pierwiastek']],answer:0,why:['Соль и вода образуют смесь. Растворение не создаёт новый элемент.','Sól i woda tworzą mieszaninę. Rozpuszczanie nie tworzy nowego pierwiastka.']}
      ]
    },
    {title:['Читаем формулы и символы','Czytamy wzory i symbole'],
      rule:['Большая буква начинает символ элемента. Маленькая продолжает его: Cl — один символ. Маленькая цифра справа снизу показывает количество атомов. Если цифры нет — атом один.','Wielka litera rozpoczyna symbol pierwiastka. Mała litera go uzupełnia: Cl to jeden symbol. Indeks dolny pokazuje liczbę atomów. Brak indeksu oznacza jeden atom.'],
      example:['H₂O: два атома H и один O. Всего три атома, но только два разных элемента.','H₂O: dwa atomy H i jeden O. Razem trzy atomy, ale tylko dwa różne pierwiastki.'],
      trap:['Cl — хлор. CL — неверная запись: вторая буква должна быть маленькой.','Cl to chlor. CL to błędny zapis: druga litera musi być mała.'],models:[['H₂O',['H','O','H']]],
      questions:[
        {prompt:['Сколько разных элементов в H₂O?','Ile różnych pierwiastków jest w H₂O?'],options:['1','2','3'],answer:'2',why:['Два: водород H и кислород O.','Dwa: wodór H i tlen O.']},
        {prompt:['Сколько всего атомов в одной молекуле H₂O?','Ile atomów jest w jednej cząsteczce H₂O?'],options:['1','2','3'],answer:'3',why:['2 атома H + 1 атом O = 3.','2 atomy H + 1 atom O = 3.']},
        {prompt:['Исправь символ хлора: CL → …','Popraw symbol chloru: CL → …'],type:'input',answer:'Cl',why:['Первая буква большая C, вторая маленькая l: Cl.','Pierwsza litera jest wielka C, druga mała l: Cl.']}
      ]
    }
  ];

  function checkAnswer(question,value){ return question.type==='input' ? String(value).trim()===question.answer : String(value)===String(question.answer); }

  function create({getLanguage,onPractice}) {
    const $=id=>document.getElementById(id), text=value=>Array.isArray(value)?value[getLanguage()==='pl'?1:0]:value;
    let index=0, passed=new Set(), feedback=new Map();
    try {const saved=JSON.parse(localStorage.getItem('chemia-mini-lessons')||'{}'); if(Number.isInteger(saved.index)&&saved.index>=0&&saved.index<units.length)index=saved.index; if(Array.isArray(saved.passed))passed=new Set(saved.passed.filter(k=>/^\d-\d$/.test(k)));}catch{}
    const tr=(ru,pl)=>getLanguage()==='pl'?pl:ru;
    const save=()=>{try{localStorage.setItem('chemia-mini-lessons',JSON.stringify({index,passed:[...passed]}));}catch{}};
    function render(){
      const unit=units[index];
      $('elementTheoryPanel').innerHTML=`<div class="lesson-route" role="group" aria-label="${tr('Мини-уроки','Mini-lekcje')}">${units.map((u,i)=>`<button data-unit="${i}" class="lesson-stop${i===index?' active':''}" aria-pressed="${i===index}"><small>${i+1} / 4</small><strong>${text(u.title)}</strong></button>`).join('')}</div><article class="mini-lesson"><span class="eyebrow">${tr('ПОЙМИ → ПОПРОБУЙ → ПРОВЕРЬ','ZROZUM → SPRÓBUJ → SPRAWDŹ')}</span><h2>${text(unit.title)}</h2><p class="lesson-rule">${text(unit.rule)}</p><div class="particle-model" role="group" aria-label="${tr('Схематические модели частиц','Schematyczne modele cząstek')}">${unit.models.map(([formula,atoms])=>`<div class="molecule"><div>${atoms.map(s=>`<button class="atom-token atom-${s}" data-atom="${s}" aria-label="${tr('Атом','Atom')} ${s}">${s}</button>`).join('')}</div><strong>${formula}</strong></div>`).join('')}</div><p id="atomExplanation" class="atom-explanation" aria-live="polite">${tr('Нажми на атом, чтобы узнать его название. Модель схематическая: размеры и расстояния условны.','Kliknij atom, aby poznać jego nazwę. Model jest schematyczny: rozmiary i odległości są umowne.')}</p><p>${text(unit.example)}</p><aside class="lesson-trap"><b>${tr('Частая ошибка','Częsty błąd')}</b><p>${text(unit.trap)}</p></aside><h3>${tr('Проверь себя','Sprawdź się')}</h3><div class="lesson-questions">${unit.questions.map((q,i)=>{const key=`${index}-${i}`,done=passed.has(key);return `<section class="lesson-question"><h4>${i+1}. ${text(q.prompt)}</h4>${q.type==='input'?`<form data-qform="${i}"><input aria-label="${text(q.prompt)}" maxlength="2" autocomplete="off" spellcheck="false" ${done?'disabled':''}><button class="game-primary" ${done?'disabled':''}>${tr('Проверить','Sprawdź')}</button></form>`:`<div class="lesson-options">${q.options.map((v,j)=>`<button class="game-secondary" data-q="${i}" data-answer="${typeof q.answer==='number'?j:v}" ${done?'disabled':''}>${text(v)}</button>`).join('')}</div>`}<p class="lesson-feedback${done?' good':''}" role="status">${done?tr('Верно! ','Dobrze! ')+text(q.why):feedback.has(key)?tr('Пока нет. ','Jeszcze nie. ')+text(q.why):''}</p></section>`;}).join('')}</div><div class="game-actions"><button id="lessonNext" class="game-primary" ${unit.questions.every((_,i)=>passed.has(`${index}-${i}`))?'':'disabled'}>${index<units.length-1?tr('Следующий мини-урок','Następna mini-lekcja'):tr('К практике по элементам','Do ćwiczeń z pierwiastków')}</button></div></article>`;
      $('elementTheoryPanel').querySelectorAll('[data-unit]').forEach(b=>b.addEventListener('click',()=>{index=Number(b.dataset.unit);save();render();}));
      $('elementTheoryPanel').querySelectorAll('[data-atom]').forEach(b=>b.addEventListener('click',()=>{$('atomExplanation').textContent=({H:['H — водород / wodór','H — wodór / водород'],O:['O — кислород / tlen','O — tlen / кислород'],N:['N — азот / azot','N — azot / азот']})[b.dataset.atom][getLanguage()==='pl'?1:0];}));
      const answer=(i,value)=>{const key=`${index}-${i}`;if(checkAnswer(unit.questions[i],value))passed.add(key);else feedback.set(key,true);save();render();};
      $('elementTheoryPanel').querySelectorAll('[data-q]').forEach(b=>b.addEventListener('click',()=>answer(Number(b.dataset.q),b.dataset.answer)));
      $('elementTheoryPanel').querySelectorAll('[data-qform]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();answer(Number(form.dataset.qform),form.querySelector('input').value);}));
      $('lessonNext').addEventListener('click',()=>{if(index<units.length-1){index++;save();render();$('elementTheoryPanel').scrollIntoView({behavior:'smooth',block:'start'});}else onPractice();});
    }
    return {render};
  }
  return {create,units,checkAnswer};
});
