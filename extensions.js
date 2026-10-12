(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ChemistryExtras=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const examples={
    H:[0,'Стакан воды','Szklanka wody','Вода H₂O содержит водород в составе соединения. Это не чистый водород.','Woda H₂O zawiera wodór w związku chemicznym. To nie czysty wodór.'],
    O:[1,'Кислородный баллон','Butla tlenowa','В баллоне может находиться простое вещество кислород O₂. Сам баллон сделан из другого материала.','Butla może zawierać substancję prostą: tlen O₂. Sama butla jest wykonana z innego materiału.'],
    N:[2,'Воздух','Powietrze','В воздухе много азота N₂. Воздух — смесь разных газов, а не чистый азот.','W powietrzu jest dużo azotu N₂. Powietrze to mieszanina gazów, nie czysty azot.'],
    C:[3,'Грифель карандаша','Grafit ołówka','Графит — форма простого вещества углерода. В грифеле также может быть глина.','Grafit jest odmianą węgla. Rysik ołówka może też zawierać glinę.'],
    Na:[4,'Поваренная соль','Sól kuchenna','В соли NaCl есть натрий в составе соединения. Соль — не металлический натрий.','Sól NaCl zawiera sód w związku chemicznym. Sól nie jest metalicznym sodem.'],
    Mg:[5,'Лёгкие металлические детали','Lekkie części metalowe','Магний входит в некоторые лёгкие сплавы, используемые для деталей транспорта. Не всякий велосипед содержит магний.','Magnez jest składnikiem niektórych lekkich stopów używanych w częściach pojazdów. Nie każdy rower zawiera magnez.'],
    Al:[6,'Алюминиевая банка','Puszka aluminiowa','Материал банки содержит алюминий. Часто это сплав с другими элементами.','Materiał puszki zawiera glin. Często jest to stop z innymi pierwiastkami.'],
    Si:[7,'Компьютерный чип','Układ scalony','В электронных чипах используется кремний. Чип состоит из нескольких материалов.','W układach scalonych wykorzystuje się krzem. Układ zawiera różne materiały.'],
    Br:[8,'Обработка воды бассейна','Uzdatnianie wody w basenie','Некоторые средства для обработки воды содержат соединения брома. В бассейн не наливают чистый бром.','Niektóre środki do uzdatniania wody zawierają związki bromu. Do basenu nie wlewa się czystego bromu.'],
    Ag:[9,'Серебряное украшение','Srebrna biżuteria','Серебряные украшения содержат серебро; обычно это сплав, а не абсолютно чистый металл.','Srebrna biżuteria zawiera srebro, zwykle w stopie, nie jako całkowicie czysty metal.'],
    Sn:[10,'Консервная банка','Puszka konserwowa','Некоторые стальные банки покрывают тонким слоем олова для защиты поверхности.','Niektóre stalowe puszki pokrywa się cienką warstwą cyny, aby chronić powierzchnię.'],
    I:[11,'Йодированная соль','Sól jodowana','В йодированную соль добавляют небольшое количество соединений йода. Это не чистый йод.','Do soli jodowanej dodaje się niewielką ilość związków jodu. To nie czysty jod.'],
    Ba:[12,'Рентгеновский контраст','Kontrast rentgenowski','Сульфат бария применяется в некоторых медицинских контрастных средствах. Он является соединением, а не металлическим барием.','Siarczan baru stosuje się w niektórych środkach kontrastowych. To związek, nie metaliczny bar.'],
    P:[13,'Коробок спичек','Pudełko zapałek','Красный фосфор находится на тёрке коробка безопасных спичек, а не в деревянной палочке.','Czerwony fosfor znajduje się na drasce pudełka zapałek bezpiecznych, nie w drewnianym patyczku.'],
    S:[14,'Резиновая шина','Gumowa opona','Сера используется при обработке резины. В готовой шине она входит в состав материала.','Siarkę wykorzystuje się przy obróbce gumy. W gotowej oponie jest składnikiem materiału.'],
    K:[15,'Банан','Banan','Банан содержит калий в виде ионов и соединений. В нём нет кусочков металлического калия.','Banan zawiera potas w postaci jonów i związków. Nie ma w nim kawałków metalicznego potasu.'],
    Ca:[16,'Мел','Kreda','Природный мел содержит карбонат кальция CaCO₃. Кальций здесь входит в состав соединения.','Naturalna kreda zawiera węglan wapnia CaCO₃. Wapń jest tu składnikiem związku.'],
    Fe:[17,'Железный гвоздь','Żelazny gwóźdź','Обычный гвоздь часто сделан из стали — сплава, главным компонентом которого является железо.','Zwykły gwóźdź jest często stalowy. Stal to stop, którego głównym składnikiem jest żelazo.'],
    Cu:[18,'Медный провод','Miedziany przewód','Металлическая часть медного провода содержит медь. Наружная изоляция — другой материал.','Metalowa część miedzianego przewodu zawiera miedź. Zewnętrzna izolacja to inny materiał.'],
    Zn:[19,'Оцинкованное ведро','Ocynkowane wiadro','Поверхность стального ведра может быть покрыта цинком для защиты от коррозии.','Powierzchnia stalowego wiadra może być pokryta cynkiem, który chroni przed korozją.'],
    Au:[20,'Золотое кольцо','Złoty pierścionek','Золотое украшение содержит золото. Обычно добавлены другие металлы, чтобы сделать его прочнее.','Złota biżuteria zawiera złoto. Zwykle dodaje się inne metale, aby zwiększyć jej wytrzymałość.'],
    Hg:[21,'Старый ртутный термометр','Stary termometr rtęciowy','В старых ртутных термометрах была ртуть в герметичной трубке. Многие современные термометры ртути не содержат.','Stare termometry rtęciowe zawierały rtęć w szczelnej rurce. Wiele nowych termometrów nie zawiera rtęci.'],
    Pb:[22,'Свинцовый аккумулятор','Akumulator ołowiowy','В свинцово-кислотном автомобильном аккумуляторе используются свинец и его соединения.','W samochodowym akumulatorze kwasowo-ołowiowym wykorzystuje się ołów i jego związki.'],
    Cl:[23,'Поваренная соль','Sól kuchenna','NaCl содержит хлор в составе соединения. Поваренная соль — не газ хлор Cl₂.','NaCl zawiera chlor w związku chemicznym. Sól kuchenna nie jest gazowym chlorem Cl₂.']
  };
  const formulas=[{formula:'H₂O',atoms:{H:2,O:1},ru:'вода',pl:'woda'},{formula:'CO₂',atoms:{C:1,O:2},ru:'углекислый газ',pl:'dwutlenek węgla'},{formula:'O₂',atoms:{O:2},ru:'кислород',pl:'tlen'}];
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function formulaCounts(counts){return {atoms:Object.values(counts).reduce((a,b)=>a+b,0),elements:Object.values(counts).filter(n=>n>0).length};}
  function formulaMatches(target,counts){return ['H','O','C'].every(s=>(target.atoms[s]||0)===(counts[s]||0));}
  function makeExam(elements,random=Math.random){
    const pool=[...elements];for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
    const symbolQuestions=pool.slice(0,4).map(e=>({prompt:`Wpisz symbol pierwiastka: ${e.pl}.`,answer:e.symbol,why:`${e.pl} → ${e.symbol}. Pierwsza litera wielka, druga mała.`}));
    const nameQuestions=pool.slice(4,6).map(e=>({prompt:`Wybierz nazwę pierwiastka ${e.symbol}.`,options:[e.pl,...pool.filter(x=>x.symbol!==e.symbol).slice(0,2).map(x=>x.pl)].sort(),answer:e.pl,why:`${e.symbol} to ${e.pl}.`}));
    return [...symbolQuestions,...nameQuestions,
      {prompt:'O₂ to…',options:['substancja prosta','związek chemiczny','mieszanina'],answer:'substancja prosta',why:'O₂ składa się tylko z atomów tlenu.'},
      {prompt:'Powietrze to…',options:['związek chemiczny','mieszanina','jeden pierwiastek'],answer:'mieszanina',why:'Powietrze zawiera różne substancje, m.in. azot i tlen.'},
      {prompt:'Ile różnych pierwiastków jest w H₂O?',answer:'2',why:'H i O: dwa różne pierwiastki.'},
      {prompt:'Ile atomów jest w jednej cząsteczce CO₂?',answer:'3',why:'Jeden C + dwa O = trzy atomy.'}];
  }
  function gradeExam(questions,answers){return questions.map((q,i)=>String(answers[i]??'').trim()===q.answer);}

  function create({elements,getLanguage}){
    const $=id=>document.getElementById(id),say=(ru,pl)=>getLanguage()==='pl'?pl:ru;
    let formulaIndex=0,counts={H:0,O:0,C:0},formulaFeedback='',formulaGood=false,formulaAnswers={atoms:'',elements:''},exam=null,examIndex=0,answers=[],finished=false;
    const dialog=document.createElement('dialog');dialog.className='example-dialog';document.body.append(dialog);
    dialog.setAttribute('aria-labelledby','exampleTitle');
    let opener=null;
    dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
    function openExample(symbol,button){
      const entry=examples[symbol],element=elements.find(e=>e.symbol===symbol);if(!entry||!element)return;
      opener=button;const [tile,ru,pl,exRu,exPl]=entry,col=tile%6,row=Math.floor(tile/6);
      dialog.innerHTML=`<button class="example-close" aria-label="${say('Закрыть','Zamknij')}">×</button><span class="eyebrow">${symbol} · ${element.pl} / ${element.ru}</span><h2 id="exampleTitle">${getLanguage()==='pl'?pl:ru}</h2><div class="example-art" role="img" aria-label="${getLanguage()==='pl'?pl:ru}" style="background-position:${col*20}% ${row*(100/3)}%"></div><p class="contains-label">${say('Содержит этот элемент','Zawiera ten pierwiastek')}</p><p>${getLanguage()==='pl'?exPl:exRu}</p><p class="example-note">${say('Предмет может содержать соединения и сплавы. Это не обязательно чистый элемент.','Przedmiot może zawierać związki i stopy. Nie musi być czystym pierwiastkiem.')}</p>`;
      dialog.querySelector('.example-close').addEventListener('click',()=>dialog.close());
      dialog.showModal();
    }
    function renderFormulas(){
      const target=formulas[formulaIndex];
      $('elementFormulasPanel').innerHTML=`<article class="mini-lesson"><span class="eyebrow">${say('ЛАБОРАТОРИЯ ФОРМУЛ','LABORATORIUM WZORÓW')}</span><h2>${say('Собери молекулу','Zbuduj cząsteczkę')}</h2><label class="formula-picker">${say('Формула','Wzór')}<select id="formulaTarget">${formulas.map((f,i)=>`<option value="${i}">${f.formula} — ${f[getLanguage()==='pl'?'pl':'ru']}</option>`).join('')}</select></label><p>${say('Добавляй атомы кнопками. Нажми на добавленный атом, чтобы убрать его. Порядок здесь не важен: проверяем только состав.','Dodawaj atomy przyciskami. Kliknij dodany atom, aby go usunąć. Kolejność nie ma tu znaczenia: sprawdzamy tylko skład.')}</p><div class="formula-palette">${['H','O','C'].map(s=>`<button class="atom-token atom-${s}" data-add="${s}" aria-label="${say('Добавить атом','Dodaj atom')} ${s}">${s} +</button>`).join('')}</div><div class="formula-workspace" role="group" aria-label="${say('Твоя модель','Twój model')}">${['H','O','C'].flatMap(s=>Array.from({length:counts[s]},()=>`<button class="atom-token atom-${s}" data-remove="${s}" aria-label="${say('Убрать атом','Usuń atom')} ${s}">${s}</button>`)).join('')||`<span>${say('Здесь появятся твои атомы','Tutaj pojawią się Twoje atomy')}</span>`}</div><p class="example-note">${say('Это модель состава, а не изображение формы молекулы и связей.','To model składu, nie obraz kształtu cząsteczki i wiązań.')}</p><form id="formulaForm"><div class="formula-count-inputs"><label>${say('Всего атомов','Liczba atomów')}<input id="formulaAtomCount" inputmode="numeric" autocomplete="off" maxlength="2" required></label><label>${say('Разных элементов','Różne pierwiastki')}<input id="formulaElementCount" inputmode="numeric" autocomplete="off" maxlength="1" required></label></div><div class="game-actions"><button class="game-primary">${say('Проверить модель и числа','Sprawdź model i liczby')}</button><button type="button" id="formulaClear" class="game-secondary">${say('Очистить','Wyczyść')}</button></div></form><p class="lesson-feedback${formulaGood?' good':''}" role="status">${formulaFeedback}</p></article>`;
      $('formulaTarget').value=formulaIndex;
      $('formulaAtomCount').value=formulaAnswers.atoms;$('formulaElementCount').value=formulaAnswers.elements;
      $('formulaAtomCount').addEventListener('input',()=>{formulaAnswers.atoms=$('formulaAtomCount').value;});$('formulaElementCount').addEventListener('input',()=>{formulaAnswers.elements=$('formulaElementCount').value;});
      $('formulaTarget').addEventListener('change',e=>{formulaIndex=Number(e.target.value);counts={H:0,O:0,C:0};formulaFeedback='';formulaGood=false;renderFormulas();});
      $('elementFormulasPanel').querySelectorAll('[data-add],[data-remove]').forEach(b=>b.addEventListener('click',()=>{const s=b.dataset.add||b.dataset.remove;counts[s]=Math.max(0,Math.min(6,counts[s]+(b.dataset.add?1:-1)));formulaFeedback='';formulaGood=false;renderFormulas();}));
      $('formulaClear').addEventListener('click',()=>{counts={H:0,O:0,C:0};formulaFeedback='';formulaGood=false;renderFormulas();});
      $('formulaForm').addEventListener('submit',e=>{e.preventDefault();const expected=formulaCounts(target.atoms),modelGood=formulaMatches(target,counts),numbersGood=$('formulaAtomCount').value.trim()===String(expected.atoms)&&$('formulaElementCount').value.trim()===String(expected.elements);formulaGood=modelGood&&numbersGood;formulaFeedback=(modelGood&&numbersGood?say('Верно! ','Dobrze! '):say('Проверь ещё раз. ','Sprawdź jeszcze raz. '))+say(`${target.formula}: ${Object.entries(target.atoms).map(([s,n])=>`${s} × ${n}`).join(' + ')}. Всего атомов ${expected.atoms}, разных элементов ${expected.elements}.`,`${target.formula}: ${Object.entries(target.atoms).map(([s,n])=>`${s} × ${n}`).join(' + ')}. Atomów: ${expected.atoms}, różnych pierwiastków: ${expected.elements}.`);if(!modelGood)formulaFeedback+=say(' Состав модели пока не совпадает.',' Skład modelu jeszcze się nie zgadza.');renderFormulas();});
    }
    function renderExam(){
      const panel=$('elementExamPanel');
      if(!exam){panel.innerHTML=`<article class="mini-lesson"><span class="eyebrow">SPRAWDZIAN · 7 KLASA</span><h2>Mały sprawdzian z chemii</h2><p>10 pytań: symbole, nazwy, substancje i wzory. Bez tłumaczeń i podpowiedzi. Odpowiedzi możesz zmienić przed zakończeniem. Wynik i wyjaśnienia zobaczysz na końcu.</p><p>Bez limitu czasu. Wynik nie jest oceną szkolną.</p><button id="examStart" class="game-primary">Zacznij sprawdzian</button></article>`;$('examStart').addEventListener('click',()=>{exam=makeExam(elements);answers=Array(exam.length).fill('');examIndex=0;finished=false;renderExam();});return;}
      if(finished){const grades=gradeExam(exam,answers);panel.innerHTML=`<article class="mini-lesson"><span class="eyebrow">WYNIK I WYJAŚNIENIA</span><h2>${grades.filter(Boolean).length} / ${exam.length} poprawnych odpowiedzi</h2><p>Sprawdź, co już umiesz, a co warto powtórzyć.</p><div class="exam-review">${exam.map((q,i)=>`<section class="lesson-question"><h4>${i+1}. ${q.prompt}</h4><p class="${grades[i]?'exam-correct':'exam-incorrect'}">${grades[i]?'Poprawnie':'Do powtórki'} · Twoja odpowiedź: ${escape(answers[i])||'brak'}</p><p>Poprawna odpowiedź: <b>${q.answer}</b>. ${q.why}</p></section>`).join('')}</div><div class="game-actions"><button id="examAgain" class="game-primary">Nowy sprawdzian</button></div></article>`;$('examAgain').addEventListener('click',()=>{exam=null;renderExam();});return;}
      const q=exam[examIndex];panel.innerHTML=`<article class="mini-lesson"><span class="eyebrow">PYTANIE ${examIndex+1} / ${exam.length}</span><progress class="game-progress" value="${examIndex}" max="${exam.length}" aria-label="Postęp sprawdzianu"></progress><h2>${q.prompt}</h2><form id="examForm">${q.options?`<fieldset class="exam-options"><legend>Wybierz jedną odpowiedź</legend>${q.options.map(o=>`<label><input type="radio" name="examAnswer" value="${o}" ${answers[examIndex]===o?'checked':''}>${o}</label>`).join('')}</fieldset>`:`<label class="exam-answer-label">Twoja odpowiedź<input id="examAnswer" autocomplete="off" spellcheck="false" maxlength="20"></label>`}<div class="game-actions"><button type="button" id="examBack" class="game-secondary" ${examIndex===0?'disabled':''}>Wstecz</button><button class="game-primary">${examIndex===exam.length-1?'Zakończ i pokaż wynik':'Dalej'}</button></div><p id="examNotice" role="status"></p></form></article>`;
      if($('examAnswer')){$('examAnswer').value=answers[examIndex];$('examAnswer').addEventListener('input',()=>{answers[examIndex]=$('examAnswer').value;});} panel.querySelectorAll('input[name="examAnswer"]').forEach(input=>input.addEventListener('change',()=>{answers[examIndex]=input.value;}));
      const read=()=>q.options?panel.querySelector('input[name="examAnswer"]:checked')?.value||'':$('examAnswer').value.trim();
      $('examBack').addEventListener('click',()=>{answers[examIndex]=read();examIndex--;renderExam();});
      $('examForm').addEventListener('submit',e=>{e.preventDefault();const answer=read();if(!answer){$('examNotice').textContent='Najpierw wpisz lub wybierz odpowiedź.';return;}answers[examIndex]=answer;if(examIndex===exam.length-1)finished=true;else examIndex++;renderExam();panel.scrollIntoView({behavior:'smooth',block:'start'});});
    }
    function render(){renderFormulas();renderExam();}
    return {openExample,render};
  }
  return {create,examples,formulas,formulaCounts,formulaMatches,makeExam,gradeExam};
});
