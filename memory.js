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
    const name = item => item[getLanguage() === 'pl' ? 'pl' : 'ru'];
    const otherName = item => item[getLanguage() === 'pl' ? 'ru' : 'pl'];

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
      options = shuffle([item, ...shuffle(elements.filter(x => x.symbol !== item.symbol)).slice(0,3)]);
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

    function markFailure() { failed = true; mistakes.add(deck[current].symbol); }

    function resolve() {
      if (solved) return;
      solved = true; feedback = l('correct'); feedbackKind = 'good';
      if (!failed && !usedHint) successes++;
    }

    function next() { current++; prepare(); render(); $('gameTitle')?.focus(); }

    function renderChrome() {
      $('memoryMastery').innerHTML = `<strong>${mastered.size} / 24</strong><span>${l('learned')}</span>`;
      $('memoryActivities').setAttribute('aria-label', l('games'));
      $('memoryActivities').innerHTML = ['flashcards','match','quiz','missing','odd'].map((key,i) => `<button class="activity-tile activity-${key}${mode === key ? ' active' : ''}" data-mode="${key}" aria-pressed="${mode === key}"><span class="activity-number">0${i+1}</span><strong>${l(key)[0]}</strong><span>${l(key)[1]}</span></button>`).join('');
      $('memorySettings').innerHTML = `<label>${l('pack')}<select id="memoryPack"><option value="all">${l('all')}</option><option value="0">${l('first')}</option><option value="1">${l('second')}</option><option value="2">${l('third')}</option></select></label>${mode === 'flashcards' ? `<label>${l('direction')}<select id="memoryDirection"><option value="forward">${l('forward')}</option><option value="reverse">${l('reverse')}</option></select></label>` : ''}<button class="game-secondary" id="memoryRestart">${l('newRound')}</button><button class="game-secondary" id="memoryFocus" aria-pressed="${focusMode}">${l(focusMode ? 'exitFocus' : 'focus')}</button>`;
      $('memoryPack').value = pack;
      $('memoryPack').parentElement.hidden = mode === 'odd';
      if ($('memoryDirection')) $('memoryDirection').value = reverse ? 'reverse' : 'forward';
      $('memoryActivities').querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => { mode = button.dataset.mode; start(); $('memoryGame').scrollIntoView({behavior:'smooth',block:'start'}); }));
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
      if (!item) { renderResult(); return; }
      if (mode === 'flashcards') renderFlash(item);
      else if (mode === 'match') renderMatch();
      else if (mode === 'missing') renderMissing(item);
      else renderChoices(item);
    }

    function renderFlash(item) {
      $('gameContent').innerHTML = `<h3 id="gameTitle" tabindex="-1">${l(reverse ? 'rememberSymbol' : 'rememberName')}</h3><button class="learning-flip${revealed ? ' is-flipped' : ''}" id="memoryFlip" aria-label="${l('reveal')}" aria-pressed="${revealed}"><span class="flip-inner"><span class="flip-face flip-front" aria-hidden="${revealed}">${reverse ? `<span class="flash-name">${name(item)}</span><span class="flash-translation">${otherName(item)}</span>` : `<strong class="flash-symbol">${item.symbol}</strong><span class="flash-caption">${l('rememberName')}</span>`}</span><span class="flip-face flip-back" aria-hidden="${!revealed}"><strong class="flash-symbol answer-symbol">${item.symbol}</strong><span class="flash-name">${name(item)}</span><span class="flash-translation">${otherName(item)}</span></span></span></button><p class="flip-help">${l('flip')}</p><div class="game-actions">${revealed ? `<button class="game-secondary" id="memoryAgain">${l('again')}</button><button class="game-primary" id="memoryKnown">${l('known')}</button>` : `<button class="game-primary" id="memoryReveal">${l('reveal')}</button>`}</div><p class="game-save-note">${l('saving')}</p>`;
      const flip = () => { revealed = !revealed; render(); $('memoryFlip').focus({preventScroll:true}); };
      $('memoryFlip').addEventListener('click', flip);
      $('memoryReveal')?.addEventListener('click', flip);
      $('memoryKnown')?.addEventListener('click', () => { mastered.add(item.symbol); sessionKnown.add(item.symbol); save(); next(); });
      $('memoryAgain')?.addEventListener('click', () => { mastered.delete(item.symbol); sessionKnown.delete(item.symbol); save(); deck.push(item); mistakes.add(item.symbol); next(); });
    }

    function renderMatch() {
      $('gameContent').innerHTML = `<h3 id="gameTitle" tabindex="-1">${l('matchPrompt')}</h3><div class="pair-board"><div><h4>${l('symbol')}</h4>${pairs.map(x => `<button class="pair-tile symbol-tile${matched.has(x.symbol) ? ' matched' : ''}${selected === x.symbol ? ' selected' : ''}" data-pair-symbol="${x.symbol}" aria-pressed="${selected === x.symbol}" ${matched.has(x.symbol) ? 'disabled' : ''}>${x.symbol}${matched.has(x.symbol) ? `<span>${name(x)}</span>` : ''}</button>`).join('')}</div><div><h4>${l('name')}</h4>${names.map(x => `<button class="pair-tile name-tile${matched.has(x.symbol) ? ' matched' : ''}" data-pair-name="${x.symbol}" ${matched.has(x.symbol) ? 'disabled' : ''}>${name(x)}</button>`).join('')}</div></div>${feedbackBlock()}${nextButton()}`;
      $('gameContent').querySelectorAll('[data-pair-symbol]').forEach(button => button.addEventListener('click', () => { selected = button.dataset.pairSymbol; feedback = ''; render(); }));
      $('gameContent').querySelectorAll('[data-pair-name]').forEach(button => button.addEventListener('click', () => {
        if (!selected) { feedback = l('matchPrompt'); feedbackKind = ''; render(); return; }
        if (selected === button.dataset.pairName) { matched.add(selected); feedback = l('pairRight'); feedbackKind = 'good'; selected = null; }
        else { failed = true; mistakes.add(selected); feedback = l('pairWrong'); feedbackKind = 'retry'; selected = null; }
        if (matched.size === pairs.length) { resolve(); feedback = l('pairsDone'); }
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
        else { markFailure(); button.classList.add('incorrect'); button.disabled = true; feedback = l('wrong'); feedbackKind = 'retry'; const node = $('memoryGame').querySelector('.game-feedback'); node.className = 'game-feedback retry'; node.textContent = feedback; }
      }));
      bindNext();
    }

    function renderMissing(item) {
      $('gameContent').innerHTML = `<h3 id="gameTitle" tabindex="-1">${l('writePrompt')}</h3><div class="missing-name"><strong>${name(item)}</strong><span>${otherName(item)}</span></div><form id="missingForm" class="symbol-form"><label for="missingInput">${l('symbol')}</label><div><input id="missingInput" maxlength="2" autocomplete="off" autocapitalize="off" spellcheck="false" ${solved ? 'disabled' : ''}><button class="game-primary" type="submit" ${solved ? 'disabled' : ''}>${l('check')}</button></div></form><p class="symbol-rule">${l('caseHint')}</p><div class="game-actions">${!solved ? `<button id="symbolHint" class="game-secondary">${l('hint')}</button>` : ''}</div>${feedbackBlock()}${nextButton()}`;
      $('missingInput').value = inputValue;
      $('missingForm').addEventListener('submit', event => {
        event.preventDefault(); if (solved) return;
        inputValue = $('missingInput').value.trim();
        if (inputValue === item.symbol) resolve();
        else { markFailure(); feedback = inputValue.toLowerCase() === item.symbol.toLowerCase() ? `${l('caseWrong')} ${item.symbol}` : l('wrong'); feedbackKind = 'retry'; }
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
    }

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && focusMode) { focusMode = false; $('elements').classList.remove('game-focus'); render(); }
    });
    return { render };
  }
  return { create, shuffle, oddRound, createLearningDeck };
});
