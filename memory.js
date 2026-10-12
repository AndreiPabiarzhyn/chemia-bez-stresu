(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ElementMemory = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const labels = {
    ru: {
      flashcards:['Карточки','Вспомни и переверни'], match:['Соедини пары','Символ + название'],
      quiz:['Выбери ответ','Один из четырёх'], missing:['Вставь пропуск','Напиши символ сам'], odd:['Найди лишнее','Различай группы'],
      games:'Выбери игру', learned:'Уже запомнил', pack:'Что учим?', all:'Все 24', first:'Первые 8', second:'Следующие 8', third:'Последние 8',
      direction:'Направление', forward:'Символ → название', reverse:'Название → символ', newRound:'Новая подборка',
      card:'Карточка', round:'Раунд', flip:'Нажми на карточку или «Показать ответ»', reveal:'Показать ответ',
      rememberName:'Как называется этот элемент?', rememberSymbol:'Какой у него символ?', known:'Запомнил', again:'Повторить позже',
      progress:'Прогресс', matchPrompt:'Нажми на символ, затем на его название.', symbol:'Символы', name:'Названия',
      quizPrompt:'Выбери название элемента', writePrompt:'Напиши символ элемента', oddPrompt:'Найди один металл среди неметаллов.',
      correct:'Верно! Отличная работа.', wrong:'Пока не совпало. Попробуй ещё раз.', pairWrong:'Это разные элементы. Выбери другую пару.',
      pairRight:'Пара найдена!', pairsDone:'Все пары найдены!', next:'Дальше', check:'Проверить', hint:'Подсказка',
      caseHint:'Первая буква большая, вторая (если есть) — маленькая. Например: Na.', caseWrong:'Элемент верный! Проверь регистр букв:',
      symbolHint:'Первая буква:', metalReason:'— металл. Остальные три — неметаллы.', result:'Раунд пройден!',
      resultText:'Небольшие повторения помогают запоминать. Можно продолжить или повторить трудные элементы.',
      resultScore:'С первой попытки', mistakes:'Повторить трудные', playAgain:'Ещё один раунд', finished:'Все карточки запомнил!',
      pending:'В очереди на повторение', empty:'Нажми «Новая подборка», чтобы начать.', focus:'Большое игровое поле', exitFocus:'Обычный размер',
      repeatAdded:'Вернёмся к этому элементу чуть позже.', saving:'Прогресс сохраняется на этом устройстве.',
      theoryTip:'Металлы: железо, медь, натрий. Неметаллы: кислород, азот, углерод. Кремний в этой игре не используется.'
    },
    pl: {
      flashcards:['Fiszki','Przypomnij i odwróć'], match:['Połącz pary','Symbol + nazwa'],
      quiz:['Wybierz odpowiedź','Jedna z czterech'], missing:['Uzupełnij brak','Wpisz symbol sam'], odd:['Znajdź intruza','Rozpoznaj grupy'],
      games:'Wybierz grę', learned:'Już pamiętasz', pack:'Czego się uczymy?', all:'Wszystkie 24', first:'Pierwsze 8', second:'Kolejne 8', third:'Ostatnie 8',
      direction:'Kierunek', forward:'Symbol → nazwa', reverse:'Nazwa → symbol', newRound:'Nowy zestaw',
      card:'Fiszka', round:'Runda', flip:'Kliknij fiszkę lub „Pokaż odpowiedź”', reveal:'Pokaż odpowiedź',
      rememberName:'Jak nazywa się ten pierwiastek?', rememberSymbol:'Jaki ma symbol?', known:'Pamiętam', again:'Powtórzę później',
      progress:'Postęp', matchPrompt:'Kliknij symbol, a potem jego nazwę.', symbol:'Symbole', name:'Nazwy',
      quizPrompt:'Wybierz nazwę pierwiastka', writePrompt:'Wpisz symbol pierwiastka', oddPrompt:'Znajdź jeden metal wśród niemetali.',
      correct:'Dobrze! Świetna praca.', wrong:'Jeszcze nie. Spróbuj ponownie.', pairWrong:'To różne pierwiastki. Wybierz inną parę.',
      pairRight:'Para znaleziona!', pairsDone:'Wszystkie pary znalezione!', next:'Dalej', check:'Sprawdź', hint:'Wskazówka',
      caseHint:'Pierwsza litera wielka, druga (jeśli jest) — mała. Na przykład: Na.', caseWrong:'Pierwiastek jest poprawny! Sprawdź wielkość liter:',
      symbolHint:'Pierwsza litera:', metalReason:'to metal. Pozostałe trzy to niemetale.', result:'Runda ukończona!',
      resultText:'Krótkie powtórki pomagają zapamiętać. Możesz kontynuować lub powtórzyć trudne pierwiastki.',
      resultScore:'Za pierwszym razem', mistakes:'Powtórz trudne', playAgain:'Jeszcze jedna runda', finished:'Pamiętasz wszystkie fiszki!',
      pending:'W kolejce do powtórki', empty:'Kliknij „Nowy zestaw”, aby zacząć.', focus:'Duże pole gry', exitFocus:'Zwykły rozmiar',
      repeatAdded:'Wrócimy do tego pierwiastka za chwilę.', saving:'Postęp zapisuje się na tym urządzeniu.',
      theoryTip:'Metale: żelazo, miedź, sód. Niemetale: tlen, azot, węgiel. Krzem nie pojawia się w tej grze.'
    }
  };

  Object.assign(labels.ru, { learned:'Всего запомнил', sessionLearned:'Запомнил в этой подборке', remaining:'Осталось карточек', repeatQueue:'Из них на повторение', sessionDone:'Подборка завершена!', sessionSummary:'Все элементы выбранной подборки пройдены.', overall:'Всего отмечено как запомненные', repeatProgress:'Повторы не увеличивают число элементов в подборке.' });
  Object.assign(labels.pl, { learned:'Łącznie zapamiętane', sessionLearned:'Zapamiętane w tym zestawie', remaining:'Pozostałe fiszki', repeatQueue:'W tym do powtórki', sessionDone:'Zestaw ukończony!', sessionSummary:'Wszystkie pierwiastki z wybranego zestawu zostały przećwiczone.', overall:'Łącznie oznaczone jako zapamiętane', repeatProgress:'Powtórki nie zwiększają liczby pierwiastków w zestawie.' });
  labels.ru.mixed=['Смешанная проверка','Выбор и ввод символов'];
  labels.pl.mixed=['Sprawdzian mieszany','Wybór i zapis symboli'];

  function createLearningDeck(available, mastered = new Set(), random = Math.random) {
    return shuffle(available, random).sort((a,b) => Number(mastered.has(a.symbol)) - Number(mastered.has(b.symbol)));
  }

  function shuffle(items, random = Math.random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function oddRound(elements, random = Math.random) {
    const nonmetals = shuffle(elements.filter(x => x.kind === 'nonmetal'), random).slice(0, 3);
    const metal = shuffle(elements.filter(x => x.kind === 'metal'), random)[0];
    return { answer: metal.symbol, options: shuffle([...nonmetals, metal], random) };
  }

  function distractors(item,elements,random=Math.random) {
    const groups=[['Na','N'],['C','Ca','Cl','Cu'],['S','Si','Sn'],['Mg','Mn'],['Ag','Au'],['Br','Ba']];
    const close=new Set(groups.filter(g=>g.includes(item.symbol)).flat());
    const others=elements.filter(x=>x.symbol!==item.symbol);
    const ordered=[...shuffle(others.filter(x=>close.has(x.symbol)),random),...shuffle(others.filter(x=>!close.has(x.symbol)),random)];
    return shuffle([item,...ordered.slice(0,3)],random);
  }

  function create({ elements, getLanguage }) {
    const $ = id => document.getElementById(id);
    let mastered = new Set();
    try {
      const saved = JSON.parse(localStorage.getItem('chemia-elements-mastered') || '[]');
      if (Array.isArray(saved)) mastered = new Set(saved.filter(s => elements.some(e => e.symbol === s)));
    } catch { /* A corrupt or unavailable store must not block learning. */ }
    let mode = 'flashcards', pack = 'all', reverse = false, deck = [], current = 0;
    let revealed = false, solved = false, failed = false, successes = 0, mistakes = new Set();
    let options = [], pairs = [], names = [], selected = null, matched = new Set();
    let focusMode = false, total = 8, feedback = '', feedbackKind = '', inputValue = '', usedHint = false;
    let previousLanguage = getLanguage();
    let sessionSize = 0, sessionKnown = new Set();

    const l = key => labels[getLanguage() === 'pl' ? 'pl' : 'ru'][key];
    let answerLanguage='pl', verified=new Set(), stats={}, guided=false, selectedSide='symbol';
    try {stats=JSON.parse(localStorage.getItem('chemia-lab-stats')||'{}');if(!stats||typeof stats!=='object'||Array.isArray(stats))stats={};verified=new Set(elements.filter(x=>stats[x.symbol]?.verified===true).map(x=>x.symbol));}catch{}
    const name = item => item[answerLanguage];
    const otherName = item => item[answerLanguage==='pl'?'ru':'pl'];
    const say=(ru,pl)=>getLanguage()==='pl'?pl:ru;

    function record(symbol,good,type) {
      const old=stats[symbol]||{};
      stats[symbol]={correct:(Number(old.correct)||0)+(good?1:0),errors:(Number(old.errors)||0)+(good?0:1),lastType:type,lastAt:Date.now(),due:Date.now()+(good&&type!=='helped'?86400000:0),verified:good&&type==='input'?true:good?old.verified===true:false};
      if(stats[symbol].verified)verified.add(symbol);else verified.delete(symbol);
      try{localStorage.setItem('chemia-lab-stats',JSON.stringify(stats));}catch{}
    }

    function persistSession() {
      try{localStorage.setItem('chemia-lab-session',JSON.stringify({mode,pack,reverse,answerLanguage,deck:deck.map(x=>x.symbol),current,revealed,solved,failed,usedHint,successes,mistakes:[...mistakes],sessionSize,sessionKnown:[...sessionKnown],options:options.map(x=>x.symbol),pairs:pairs.map(x=>x.symbol),names:names.map(x=>x.symbol),matched:[...matched],inputValue,guided}));}catch{}
    }

    function explanation(item,chosen) {
      return say(`Ты выбрал ${chosen.symbol} — ${chosen.ru} (${chosen.pl}). Здесь ${item.symbol} — ${item.ru} (${item.pl}).`,`Wybrano ${chosen.symbol} — ${chosen.pl}. Tutaj ${item.symbol} oznacza ${item.pl}.`);
    }

    function pool() {
      return mode === 'odd' || pack === 'all' ? elements : elements.slice(Number(pack) * 8, Number(pack) * 8 + 8);
    }

    function save() {
      try { localStorage.setItem('chemia-elements-mastered', JSON.stringify([...mastered])); } catch { /* Session remains usable. */ }
    }

    function start(only = null) {
      const available = only || pool();
      deck = createLearningDeck(available, mastered);
      sessionSize = deck.length; sessionKnown = new Set();
      total = mode === 'match' ? Math.ceil(deck.length / 4) : deck.length; current = 0; successes = 0; mistakes = new Set();
      prepare(); render();
    }

    function prepare() {
      revealed = false; solved = false; failed = false; usedHint = false; feedback = ''; feedbackKind = ''; inputValue = '';
      if (current >= (mode === 'flashcards' ? deck.length : total)) return;
      const item = deck[current];
      options = distractors(item,elements);
      if (mode === 'odd') {
        const round = oddRound(elements);
        const metal = item.kind === 'metal' ? item : elements.find(x => x.symbol === round.answer);
        options = shuffle([...round.options.filter(x => x.kind === 'nonmetal'), metal]);
        deck[current] = metal;
      }
      if (mode === 'match') {
        pairs = deck.slice(current * 4, current * 4 + 4); names = shuffle(pairs); selected = null; matched = new Set();
      }
    }

    function markFailure() { failed = true; mistakes.add(deck[current].symbol); record(deck[current].symbol,false,mode); }

    function resolve() {
      if (solved) return;
      solved = true; feedback = l('correct'); feedbackKind = 'good';
      if (!failed && !usedHint) successes++;
      if(mode!=='match'&&mode!=='odd')record(deck[current].symbol,true,failed||usedHint?'helped':mode==='missing'||mode==='mixed'&&current%2===1?'input':mode);
    }

    function next() { current++; prepare(); render(); $('gameTitle')?.focus(); }

    function renderChrome() {
      $('memoryMastery').innerHTML = `<strong>${mastered.size} / 24</strong><span>${l('learned')}</span>`;
      $('memoryMastery').innerHTML += `<span>${say('Проверено без подсказок','Sprawdzone bez podpowiedzi')}: ${verified.size} / 24</span>`;
      $('memoryRoute').textContent=guided?`${say('Учимся по шагам','Uczymy się krok po kroku')}: ${['flashcards','match','quiz','missing','mixed'].indexOf(mode)+1} / 5 — ${say('карточки → пары → выбор → ввод → смешанная проверка','fiszki → pary → wybór → zapis → sprawdzian mieszany')}`:say('Свободная практика. Место занятия сохраняется автоматически.','Swobodne ćwiczenia. Miejsce nauki zapisuje się automatycznie.');
      $('memoryActivities').setAttribute('aria-label', l('games'));
      $('memoryActivities').innerHTML = ['flashcards','match','quiz','missing','odd','mixed'].map((key,i) => `<button class="activity-tile activity-${key}${mode === key ? ' active' : ''}" data-mode="${key}" aria-pressed="${mode === key}"><span class="activity-number">0${i+1}</span><strong>${l(key)[0]}</strong><span>${l(key)[1]}</span></button>`).join('');
      $('memorySettings').innerHTML = `<label>${l('pack')}<select id="memoryPack"><option value="all">${l('all')}</option><option value="0">${l('first')}</option><option value="1">${l('second')}</option><option value="2">${l('third')}</option></select></label>${mode === 'flashcards' ? `<label>${l('direction')}<select id="memoryDirection"><option value="forward">${l('forward')}</option><option value="reverse">${l('reverse')}</option></select></label>` : ''}<button class="game-secondary" id="memoryRestart">${l('newRound')}</button><button class="game-secondary" id="memoryFocus" aria-pressed="${focusMode}">${l(focusMode ? 'exitFocus' : 'focus')}</button>`;
      $('memoryPack').value = pack;
      $('memorySettings').insertAdjacentHTML('beforeend',`<label>${say('Язык ответов','Język odpowiedzi')}<select id="answerLanguage"><option value="pl">Polski</option><option value="ru">Русский</option></select></label><button id="reviewDue" class="game-secondary">${say('Повторить трудные','Powtórz trudne')}</button><button id="guidedStart" class="game-primary">${say('Учиться по шагам','Ucz się krok po kroku')}</button>`);
      $('answerLanguage').value=answerLanguage;
      $('answerLanguage').addEventListener('change',e=>{answerLanguage=e.target.value;render();});
      $('reviewDue').addEventListener('click',()=>{const due=elements.filter(x=>stats[x.symbol]&&(stats[x.symbol].due<=Date.now()||stats[x.symbol].errors>stats[x.symbol].correct));if(due.length){guided=false;mode='missing';start(due);}else{feedback=say('Пока нет трудных элементов. Пройди проверку, чтобы собрать повторение.','Nie ma jeszcze trudnych pierwiastków. Zrób ćwiczenie, aby zebrać powtórkę.');feedbackKind='';render();}});
      $('guidedStart').addEventListener('click',()=>{guided=true;mode='flashcards';start();});
      $('memoryPack').parentElement.hidden = mode === 'odd';
      if ($('memoryDirection')) $('memoryDirection').value = reverse ? 'reverse' : 'forward';
      $('memoryActivities').querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => { guided=false; mode = button.dataset.mode; start(); $('memoryGame').scrollIntoView({behavior:'smooth',block:'start'}); }));
      $('memoryPack').addEventListener('change', event => { pack = event.target.value; start(); });
      $('memoryDirection')?.addEventListener('change', event => { reverse = event.target.value === 'reverse'; revealed = false; render(); });
      $('memoryRestart').addEventListener('click', () => start());
      $('memoryFocus').addEventListener('click', () => { focusMode = !focusMode; $('elements').classList.toggle('game-focus', focusMode); render(); });
    }

    function render() {
      if (!deck.length) { start(); return; }
      if (previousLanguage !== getLanguage()) {
        previousLanguage = getLanguage();
        const translatedItem = deck[current];
        feedback = solved ? (mode === 'odd' ? `${translatedItem.symbol} (${name(translatedItem)}) ${l('metalReason')}` : l(mode === 'match' ? 'pairsDone' : 'correct')) : '';
      }
      renderChrome();
      const game = $('memoryGame');
      const item = mode === 'match' ? (current < total ? deck[current * 4] : null) : deck[current];
      const count = mode === 'flashcards' ? `${sessionKnown.size} / ${sessionSize}` : `${Math.min(current + 1,total)} / ${total}`;
      const progress = mode === 'flashcards' ? sessionKnown.size / sessionSize : current / total;
      const queuedRepeats = new Set(deck.slice(current).filter(x => mistakes.has(x.symbol)).map(x => x.symbol)).size;
      game.innerHTML = `<div class="game-topline"><span>${l(mode === 'flashcards' ? 'sessionLearned' : 'round')} <b>${count}</b></span><span>${mode === 'flashcards' ? `${l('remaining')}: ${Math.max(0,deck.length-current)} · ${l('repeatQueue')}: ${queuedRepeats}` : l(mode)[0]}</span></div><progress class="game-progress" max="1" value="${progress}" aria-label="${l('progress')}"></progress>${mode === 'flashcards' ? `<p class="game-save-note">${l('repeatProgress')}</p>` : ''}<div id="gameContent"></div>`;
      if (!item) { renderResult(); persistSession(); return; }
      if (mode === 'flashcards') renderFlash(item);
      else if (mode === 'match') renderMatch();
      else if (mode === 'missing'||mode==='mixed'&&current%2===1) renderMissing(item);
      else renderChoices(item);
      persistSession();
    }

    function renderFlash(item) {
      $('gameContent').innerHTML = `<h3 id="gameTitle" tabindex="-1">${l(reverse ? 'rememberSymbol' : 'rememberName')}</h3><div class="flashcard-stage"><button class="learning-flip${revealed ? ' is-flipped' : ''}" id="memoryFlip" aria-label="${l('reveal')}" aria-pressed="${revealed}"><span class="flip-inner"><span class="flip-face flip-front" aria-hidden="${revealed}">${reverse ? `<span class="flash-name">${name(item)}</span><span class="flash-translation">${otherName(item)}</span>` : `<strong class="flash-symbol">${item.symbol}</strong><span class="flash-caption">${l('rememberName')}</span>`}</span><span class="flip-face flip-back" aria-hidden="${!revealed}"><strong class="flash-symbol answer-symbol">${item.symbol}</strong><span class="flash-name">${name(item)}</span><span class="flash-translation">${otherName(item)}</span></span></span></button></div><p class="flip-help">${l('flip')}</p><div class="game-actions">${revealed ? `<button class="game-secondary" id="memoryAgain">${l('again')}</button><button class="game-primary" id="memoryKnown">${l('known')}</button>` : `<button class="game-primary" id="memoryReveal">${l('reveal')}</button>`}</div><p class="game-save-note">${l('saving')}</p>`;
      $('gameContent').insertAdjacentHTML('beforeend',feedbackBlock());
      const flip = () => { revealed = !revealed; render(); $('memoryFlip').focus({preventScroll:true}); };
      $('memoryFlip').addEventListener('click', flip);
      $('memoryReveal')?.addEventListener('click', flip);
      $('memoryKnown')?.addEventListener('click', () => { mastered.add(item.symbol); sessionKnown.add(item.symbol); save(); next(); });
      $('memoryAgain')?.addEventListener('click', () => { mastered.delete(item.symbol); sessionKnown.delete(item.symbol); record(item.symbol,false,'self'); save(); deck.push(item); mistakes.add(item.symbol); next(); });
      if(revealed){document.querySelector('.flashcard-stage').insertAdjacentHTML('beforeend',`<div class="card-audio"><button class="card-audio-button" id="speakPolish" type="button" aria-label="${say('Послушать по-польски','Posłuchaj po polsku')}" aria-describedby="speechTooltip"><img src="speaker.svg" alt="" width="22" height="22"></button><span class="card-audio-tooltip" id="speechTooltip" role="tooltip">${say('Послушать по-польски','Posłuchaj po polsku')}</span></div>`);$('gameContent').insertAdjacentHTML('beforeend',`<p id="speechStatus" class="game-save-note" role="status"></p>`);$('speakPolish').addEventListener('click',()=>{
        if(!('speechSynthesis' in window)){ $('speechStatus').textContent=say('В этом браузере озвучка недоступна.','Czytanie jest niedostępne w tej przeglądarce.');return; }
        const voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith('pl'));
        if(!voice){$('speechStatus').textContent=say('На устройстве нет польского голоса.','Na tym urządzeniu nie ma polskiego głosu.');return;}
        speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(item.pl);utterance.lang='pl-PL';utterance.voice=voice;utterance.rate=.85;speechSynthesis.speak(utterance);$('speechStatus').textContent=item.pl;
      });}
    }

    function renderMatch() {
      $('gameContent').innerHTML = `<h3 id="gameTitle" tabindex="-1">${say('Выбери символ и название в любом порядке.','Wybierz symbol i nazwę w dowolnej kolejności.')}</h3><div class="pair-board"><div><h4>${l('symbol')}</h4>${pairs.map(x=>`<button class="pair-tile symbol-tile${matched.has(x.symbol)?' matched':''}${selected===x.symbol&&selectedSide==='symbol'?' selected':''}" data-pair="${x.symbol}" data-side="symbol" ${matched.has(x.symbol)?'disabled':''}>${x.symbol}</button>`).join('')}</div><div><h4>${l('name')}</h4>${names.map(x=>`<button class="pair-tile name-tile${matched.has(x.symbol)?' matched':''}${selected===x.symbol&&selectedSide==='name'?' selected':''}" data-pair="${x.symbol}" data-side="name" ${matched.has(x.symbol)?'disabled':''}>${name(x)}</button>`).join('')}</div></div>${feedbackBlock()}${nextButton()}`;
      $('gameContent').querySelectorAll('[data-pair]').forEach(b=>b.addEventListener('click',()=>{
        const symbol=b.dataset.pair,side=b.dataset.side;
        if(!selected||selectedSide===side){selected=symbol;selectedSide=side;feedback='';render();return;}
        if(selected===symbol){matched.add(symbol);record(symbol,true,'match');feedback=l('pairRight');feedbackKind='good';}
        else {failed=true;const target=side==='name'?selected:symbol;mistakes.add(target);record(target,false,'match');feedback=explanation(elements.find(x=>x.symbol===target),elements.find(x=>x.symbol===(side==='name'?symbol:selected)));feedbackKind='retry';}
        selected=null;
        if(matched.size===pairs.length){resolve();feedback=l('pairsDone');}
        render();
      }));
      bindNext();
    }

    function feedbackBlock() { return `<div class="game-feedback ${feedbackKind}" role="status" aria-live="polite">${feedback}</div>`; }
    function nextButton() { return solved ? `<div class="game-actions"><button id="gameNext" class="game-primary">${l('next')}</button></div>` : ''; }
    function bindNext() { $('gameNext')?.addEventListener('click', next); }

    function renderChoices(item) {
      const odd = mode === 'odd';
      $('gameContent').innerHTML = `<h3 id="gameTitle" tabindex="-1">${l(odd ? 'oddPrompt' : 'quizPrompt')}</h3>${odd ? `<details class="game-explanation"><summary>${l('hint')}</summary><p>${l('theoryTip')}</p></details>` : `<div class="quiz-symbol">${item.symbol}</div>`}<div class="choice-board">${options.map(x => `<button class="choice-tile${solved && x.symbol === item.symbol ? ' correct' : ''}" data-choice="${x.symbol}" ${solved ? 'disabled' : ''}>${odd ? `<strong>${x.symbol}</strong>` : ''}<span>${name(x)}</span></button>`).join('')}</div>${feedbackBlock()}${nextButton()}`;
      $('gameContent').querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
        if (button.dataset.choice === item.symbol) { resolve(); if (odd) feedback = `${item.symbol} (${name(item)}) ${l('metalReason')}`; render(); }
        else { markFailure(); button.classList.add('incorrect'); button.disabled = true; const chosen=elements.find(x=>x.symbol===button.dataset.choice); feedback = odd?say(`${chosen.symbol} — неметалл. Здесь нужно найти металл.`,`${chosen.symbol} to niemetal. Szukamy metalu.`):explanation(item,chosen); feedbackKind = 'retry'; const node = $('memoryGame').querySelector('.game-feedback'); node.className = 'game-feedback retry'; node.textContent = feedback; persistSession(); }
      }));
      bindNext();
    }

    function renderMissing(item) {
      $('gameContent').innerHTML = `<h3 id="gameTitle" tabindex="-1">${l('writePrompt')}</h3><div class="missing-name"><strong>${name(item)}</strong><span>${otherName(item)}</span></div><form id="missingForm" class="symbol-form"><label for="missingInput">${l('symbol')}</label><div><input id="missingInput" maxlength="2" autocomplete="off" autocapitalize="off" spellcheck="false" ${solved ? 'disabled' : ''}><button class="game-primary" type="submit" ${solved ? 'disabled' : ''}>${l('check')}</button></div></form><p class="symbol-rule">${l('caseHint')}</p><div class="game-actions">${!solved ? `<button id="symbolHint" class="game-secondary">${l('hint')}</button>` : ''}</div>${feedbackBlock()}${nextButton()}`;
      $('missingInput').value = inputValue;
      if(mode==='mixed')$('symbolHint')?.remove();
      $('missingInput').addEventListener('input',()=>{inputValue=$('missingInput').value;persistSession();});
      $('missingForm').addEventListener('submit', event => {
        event.preventDefault(); if (solved) return;
        inputValue = $('missingInput').value.trim();
        if (inputValue === item.symbol) resolve();
        else { markFailure(); const chosen=elements.find(x=>x.symbol.toLowerCase()===inputValue.toLowerCase()); feedback = inputValue.toLowerCase() === item.symbol.toLowerCase() ? `${l('caseWrong')} ${item.symbol}` : chosen?explanation(item,chosen):say(`Символ ${item.pl} — ${item.symbol}. Первая буква большая, вторая маленькая.`,`${item.pl}: symbol to ${item.symbol}. Pierwsza litera wielka, druga mała.`); feedbackKind = 'retry'; }
        render(); if (!solved) $('missingInput').focus({preventScroll:true});
      });
      $('symbolHint')?.addEventListener('click', () => { usedHint = true; mistakes.add(item.symbol); inputValue = $('missingInput').value; feedback = `${l('symbolHint')} ${item.symbol[0]}`; feedbackKind = ''; render(); });
      bindNext();
    }

    function renderResult() {
      $('memoryGame').querySelector('progress').value = 1;
      $('gameContent').innerHTML = `<div class="round-result"><span class="result-number">${mode === 'flashcards' ? sessionKnown.size : successes}<small> / ${mode === 'flashcards' ? sessionSize : total}</small></span><h3 id="gameTitle" tabindex="-1">${l(mode === 'flashcards' ? 'sessionDone' : 'result')}</h3><p>${mode === 'flashcards' ? `${l('sessionSummary')} ${l('overall')}: ${mastered.size} / 24.` : `${l('resultScore')}: ${successes} / ${total}. ${l('resultText')}`}</p><div class="game-actions">${mistakes.size ? `<button class="game-secondary" id="repeatMistakes">${l('mistakes')}</button>` : ''}<button class="game-primary" id="playAgain">${l('playAgain')}</button></div></div>`;
      $('repeatMistakes')?.addEventListener('click', () => start(elements.filter(x => mistakes.has(x.symbol))));
      $('playAgain').addEventListener('click', () => start());
      if(guided){const path=['flashcards','match','quiz','missing','mixed'],nextMode=path[path.indexOf(mode)+1];if(nextMode){$('gameContent').insertAdjacentHTML('beforeend',`<div class="game-actions"><button id="pathNext" class="game-primary">${say('Следующий шаг','Następny krok')}: ${l(nextMode)[0]}</button></div>`);$('pathNext').addEventListener('click',()=>{mode=nextMode;start();});}else{ $('gameContent').insertAdjacentHTML('beforeend',`<p class="game-save-note">${say('Все шаги пройдены. Повтори трудные элементы или выбери новую подборку.','Wszystkie kroki ukończone. Powtórz trudne pierwiastki lub wybierz nowy zestaw.')}</p>`);}}
    }

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && focusMode) { focusMode = false; $('elements').classList.remove('game-focus'); render(); }
    });
    try {
      const saved=JSON.parse(localStorage.getItem('chemia-lab-session')||'null');
      const list=values=>Array.isArray(values)?values.map(s=>elements.find(e=>e.symbol===s)).filter(Boolean):[];
      if(saved&&['flashcards','match','quiz','missing','odd','mixed'].includes(saved.mode)&&['all','0','1','2'].includes(saved.pack)&&list(saved.deck).length&&Number.isInteger(saved.current)&&saved.current>=0&&saved.current<=list(saved.deck).length){
        mode=saved.mode;pack=saved.pack;deck=list(saved.deck);current=saved.current;reverse=!!saved.reverse;answerLanguage=saved.answerLanguage==='ru'?'ru':'pl';sessionSize=Math.min(elements.length,Number(saved.sessionSize)||new Set(deck.map(e=>e.symbol)).size);total=mode==='match'?Math.ceil(deck.length/4):sessionSize;revealed=!!saved.revealed;solved=!!saved.solved;failed=!!saved.failed;usedHint=!!saved.usedHint;successes=Math.max(0,Math.min(total,Number(saved.successes)||0));mistakes=new Set(list(saved.mistakes).map(x=>x.symbol));sessionKnown=new Set(list(saved.sessionKnown).map(x=>x.symbol));options=list(saved.options);pairs=list(saved.pairs);names=list(saved.names);matched=new Set(list(saved.matched).map(x=>x.symbol));inputValue=String(saved.inputValue||'').slice(0,2);guided=!!saved.guided;
      }
    }catch{}
    return { render, beginPath:()=>{guided=true;mode='flashcards';start();} };
  }
  return { create, shuffle, oddRound, createLearningDeck, distractors };
});
