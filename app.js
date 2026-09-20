(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ChemiaTrainer = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const tasks = [
    { type: 'density', title: 'Найди плотность', titlePl: 'Oblicz gęstość', text: 'Masa metalowego klocka wynosi 400 g, a jego objętość 50 cm³. Oblicz gęstość.', values: ['m = 400 g', 'V = 50 cm³'], answer: 8, unit: 'g/cm³', hint: 'Нужно узнать, сколько граммов приходится на 1 cm³. Раздели 400 на 50.', hintPl: 'Sprawdź, ile gramów przypada na 1 cm³. Podziel 400 przez 50.', solution: '400 : 50 = 8 g/cm³.', solutionPl: '400 : 50 = 8 g/cm³.' },
    { type: 'mass', title: 'Найди массу', titlePl: 'Oblicz masę', text: 'Gęstość aluminium wynosi 2,7 g/cm³, a objętość przedmiotu 20 cm³. Oblicz masę.', values: ['ρ = 2,7 g/cm³', 'V = 20 cm³'], answer: 54, unit: 'g', hint: 'Каждый 1 cm³ весит 2,7 g. Таких кубиков 20, поэтому умножь 2,7 на 20.', hintPl: 'Każdy 1 cm³ waży 2,7 g. Takich kostek jest 20, więc pomnóż 2,7 przez 20.', solution: '2,7 × 20 = 54 g.', solutionPl: '2,7 × 20 = 54 g.' },
    { type: 'volume', title: 'Найди объём', titlePl: 'Oblicz objętość', text: 'Masa przedmiotu wynosi 780 g, a gęstość 7,8 g/cm³. Oblicz objętość.', values: ['m = 780 g', 'ρ = 7,8 g/cm³'], answer: 100, unit: 'cm³', hint: 'Раздели всю массу на массу одного кубика: 780 : 7,8.', hintPl: 'Podziel całą masę przez masę 1 cm³: 780 : 7,8.', solution: '780 : 7,8 = 100 cm³.', solutionPl: '780 : 7,8 = 100 cm³.' },
    { type: 'density', title: 'Сначала переведи единицы', titlePl: 'Najpierw zamień jednostki', text: 'Masa klocka wynosi 1,2 kg, a jego objętość 400 cm³. Oblicz gęstość w g/cm³.', values: ['m = 1,2 kg', 'V = 400 cm³'], answer: 3, unit: 'g/cm³', hint: 'Сначала: 1,2 kg = 1200 g. Затем раздели массу на объём.', hintPl: 'Najpierw: 1,2 kg = 1200 g. Potem podziel masę przez objętość.', solution: '1,2 kg = 1200 g; 1200 : 400 = 3 g/cm³.', solutionPl: '1,2 kg = 1200 g; 1200 : 400 = 3 g/cm³.' },
    { type: 'mass', title: 'Найди массу', titlePl: 'Oblicz masę', text: 'Gęstość miedzi wynosi 8,9 g/cm³, a objętość próbki 10 cm³. Oblicz masę.', values: ['ρ = 8,9 g/cm³', 'V = 10 cm³'], answer: 89, unit: 'g', hint: 'Если 1 cm³ весит 8,9 g, то 10 cm³ весят в 10 раз больше.', hintPl: 'Jeżeli 1 cm³ waży 8,9 g, to 10 cm³ waży dziesięć razy więcej.', solution: '8,9 × 10 = 89 g.', solutionPl: '8,9 × 10 = 89 g.' },
    { type: 'volume', title: 'Найди объём', titlePl: 'Oblicz objętość', text: 'Masa przedmiotu wynosi 540 g, a jego gęstość 2,7 g/cm³. Oblicz objętość.', values: ['m = 540 g', 'ρ = 2,7 g/cm³'], answer: 200, unit: 'cm³', hint: 'Раздели всю массу на то, сколько весит 1 cm³: 540 : 2,7.', hintPl: 'Podziel całą masę przez masę 1 cm³: 540 : 2,7.', solution: '540 : 2,7 = 200 cm³.', solutionPl: '540 : 2,7 = 200 cm³.' }
  ];

  const topicGroups = [
    {
      titleRu: 'Вещества и их свойства', titlePl: 'Substancje i ich właściwości',
      topics: [
        { id: 'density', number: '01', titleRu: 'Плотность', titlePl: 'Gęstość', noteRu: 'Масса, объём и единицы', notePl: 'Masa, objętość i jednostki', available: true },
        { id: 'states', number: '02', titleRu: 'Агрегатные состояния', titlePl: 'Stany skupienia', noteRu: 'Твёрдое, жидкое, газ', notePl: 'Ciało stałe, ciecz, gaz' }
      ]
    },
    {
      titleRu: 'Строение вещества', titlePl: 'Budowa materii',
      topics: [
        { id: 'atoms', number: '03', titleRu: 'Атомы и молекулы', titlePl: 'Atomy i cząsteczki', noteRu: 'Из чего состоит вещество', notePl: 'Z czego składa się materia' },
        { id: 'elements', number: '04', titleRu: 'Химические элементы', titlePl: 'Pierwiastki chemiczne', noteRu: 'Символы и таблица', notePl: 'Symbole i układ okresowy' }
      ]
    },
    {
      titleRu: 'Химические превращения', titlePl: 'Przemiany chemiczne',
      topics: [
        { id: 'reactions', number: '05', titleRu: 'Химические реакции', titlePl: 'Reakcje chemiczne', noteRu: 'Признаки и запись реакций', notePl: 'Objawy i zapis reakcji' },
        { id: 'equations', number: '06', titleRu: 'Уравнения реакций', titlePl: 'Równania reakcji', noteRu: 'Коэффициенты и баланс', notePl: 'Współczynniki i bilans' }
      ]
    }
  ];

  const translations = {
    ru: { pageTitle:'Chemia bez stresu — плотность',currentTopicLabel:'Текущая тема',currentTopic:'Плотность',sectionNavLabel:'Части темы',courseMap:'КАРТА КУРСА',chooseTopic:'Выбери тему',close:'Закрыть',topicPanelIntro:'Темы расположены в порядке изучения. Пройденные уроки всегда можно открыть снова.',available:'Открыть',soon:'Скоро',tagline:'7 klasa · объяснения по-русски',navLesson:'Урок',navPractice:'Тренажёр',navWords:'Словарь',topic:'ТЕМА 01 · GĘSTOŚĆ',heroTitle:'Плотность — это<br><em>насколько тесно</em><br>упаковано вещество',heroText:'Без заучивания формулы вслепую. Сначала поймём смысл, потом научимся решать задачи из польского учебника.',tryTask:'Попробовать задачу',sameVolume:'одинаковый объём',lowDensity:'Mała gęstość',particlesLoose:'частицы расположены свободно',highDensity:'Duża gęstość',particlesDense:'частиц в том же объёме больше',meaningTitle:'Что означает 2,7 g/cm³?',meaningText:'Представь кубик со стороной 1 см. Если он сделан из алюминия, то весит <b>2,7 грамма</b>.',howTitle:'Как найти плотность?',howText:'Узнай, сколько граммов приходится на каждый 1 cm³:',mass:'масса',volume:'объём',density:'плотность',polishFormula:'По-польски: <b>gęstość = masa : objętość</b>',stepsTitle:'Разберём по шагам',stepDivide:'Делим массу на объём',stepSimplify:'Упрощаем',stepResult:'Получаем',exampleCheck:'Проверка: 2,7 × 200 = 540 ✓',unitsWarning:'Перед решением проверь единицы',practiceLink:'Закрепить →',miniTrainer:'МИНИ-ТРЕНАЖЁР',practiceTitle:'Решаем по одному шагу',correctLabel:'Правильно',yourAnswer:'Твой ответ',checkButton:'Проверить',showHint:'Показать подсказку',nextTask:'Следующая задача →',cheatsheet:'ШПАРГАЛКА',whatFind:'Что ищем?',notationNote:'В польских задачах плотность иногда обозначают буквой <b>d</b>, а иногда греческой буквой <b>ρ</b>.',dictionaryDirection:'POLSKI → РУССКИЙ',wordsTitle:'Слова, которые встречаются в задачах',sentenceLabel:'РАЗБЕРИ ПРЕДЛОЖЕНИЕ',footerText:'Материал для 7 класса польской школы',taskNumber:n=>`Задание ${n} из ${tasks.length}`,placeholder:'Например: 2,7',invalid:'Введи только число. Можно использовать запятую: например, 2,7.',right:'Верно!',wrong:'Пока нет.',hintLabel:'Подсказка:'},
    pl: { pageTitle:'Chemia bez stresu — gęstość',currentTopicLabel:'Aktualny temat',currentTopic:'Gęstość',sectionNavLabel:'Części tematu',courseMap:'MAPA KURSU',chooseTopic:'Wybierz temat',close:'Zamknij',topicPanelIntro:'Tematy są ułożone w kolejności nauki. Do ukończonych lekcji można zawsze wrócić.',available:'Otwórz',soon:'Wkrótce',tagline:'7 klasa · proste wyjaśnienia',navLesson:'Lekcja',navPractice:'Ćwiczenia',navWords:'Słownik',topic:'TEMAT 01 · GĘSTOŚĆ',heroTitle:'Gęstość mówi,<br><em>jak ciasno</em><br>ułożona jest materia',heroText:'Bez uczenia się wzoru na pamięć. Najpierw zrozumiemy sens, potem rozwiążemy zadania krok po kroku.',tryTask:'Spróbuj zadania',sameVolume:'ta sama objętość',lowDensity:'Mała gęstość',particlesLoose:'cząsteczki są ułożone luźno',highDensity:'Duża gęstość',particlesDense:'więcej cząsteczek w tej samej objętości',meaningTitle:'Co oznacza 2,7 g/cm³?',meaningText:'Wyobraź sobie kostkę o boku 1 cm. Jeżeli jest z aluminium, waży <b>2,7 grama</b>.',howTitle:'Jak obliczyć gęstość?',howText:'Sprawdź, ile gramów przypada na każdy 1 cm³:',mass:'masa',volume:'objętość',density:'gęstość',polishFormula:'Wzór: <b>gęstość = masa : objętość</b>',stepsTitle:'Rozwiązanie krok po kroku',stepDivide:'Dzielimy masę przez objętość',stepSimplify:'Upraszczamy',stepResult:'Otrzymujemy',exampleCheck:'Sprawdzenie: 2,7 × 200 = 540 ✓',unitsWarning:'Przed rozwiązaniem sprawdź jednostki',practiceLink:'Poćwicz →',miniTrainer:'MINI TRENAŻER',practiceTitle:'Rozwiązuj krok po kroku',correctLabel:'Poprawne',yourAnswer:'Twoja odpowiedź',checkButton:'Sprawdź',showHint:'Pokaż wskazówkę',nextTask:'Następne zadanie →',cheatsheet:'ŚCIĄGA',whatFind:'Czego szukamy?',notationNote:'W zadaniach gęstość może być oznaczona literą <b>d</b> albo grecką literą <b>ρ</b>.',dictionaryDirection:'POLSKI → ROSYJSKI',wordsTitle:'Słowa spotykane w zadaniach',sentenceLabel:'PRZEANALIZUJ ZDANIE',footerText:'Materiał dla 7 klasy polskiej szkoły',taskNumber:n=>`Zadanie ${n} z ${tasks.length}`,placeholder:'Na przykład: 2,7',invalid:'Wpisz tylko liczbę. Możesz użyć przecinka, na przykład 2,7.',right:'Dobrze!',wrong:'Jeszcze nie.',hintLabel:'Wskazówka:'}
  };

  function parseAnswer(value) {
    const normalized = String(value).trim().replace(',', '.').replace(/\s+/g, '');
    if (!normalized || !/^-?\d+(\.\d+)?$/.test(normalized)) return NaN;
    return Number(normalized);
  }

  function isCorrect(value, expected) {
    const number = parseAnswer(value);
    return Number.isFinite(number) && Math.abs(number - expected) < 0.0001;
  }

  function init() {
    const $ = id => document.getElementById(id);
    let index = 0, correct = 0, attempted = 0, answered = false;
    let lang = localStorage.getItem('chemia-lang') || 'ru';

    function t(key) { return translations[lang][key]; }

    function applyLanguage() {
      document.documentElement.lang = lang;
      document.title = t('pageTitle');
      document.querySelectorAll('[data-i18n]').forEach(node => { const value = t(node.dataset.i18n); if (typeof value === 'string') node.textContent = value; });
      document.querySelectorAll('[data-i18n-html]').forEach(node => { const value = t(node.dataset.i18nHtml); if (typeof value === 'string') node.innerHTML = value; });
      document.querySelectorAll('[data-i18n-aria]').forEach(node => { const value = t(node.dataset.i18nAria); if (typeof value === 'string') node.setAttribute('aria-label', value); });
      document.querySelectorAll('[data-lang]').forEach(button => button.classList.toggle('active', button.dataset.lang === lang));
      $('answerInput').placeholder = t('placeholder');
      renderTopicList();
      renderTask();
    }

    function renderTopicList() {
      $('topicList').innerHTML = topicGroups.map(group => {
        const groupTitle = lang === 'pl' ? group.titlePl : group.titleRu;
        const items = group.topics.map(topic => {
          const title = lang === 'pl' ? topic.titlePl : topic.titleRu;
          const note = lang === 'pl' ? topic.notePl : topic.noteRu;
          const current = topic.id === 'density';
          return `<button class="topic-item${current ? ' current' : ''}" data-topic="${topic.id}" ${topic.available ? '' : 'disabled'}>
            <span class="topic-number">${topic.number}</span>
            <span class="topic-copy"><strong>${title}</strong><small>${note}</small></span>
            <span class="topic-status">${topic.available ? t('available') : t('soon')}</span>
          </button>`;
        }).join('');
        return `<section class="topic-group"><h3 class="topic-group-title">${groupTitle}</h3><div class="topic-items">${items}</div></section>`;
      }).join('');
      $('topicList').querySelectorAll('[data-topic]:not(:disabled)').forEach(button => button.addEventListener('click', () => { closeTopicMenu(); switchView('lesson'); }));
    }

    function openTopicMenu() {
      $('topicPanel').hidden = false;
      $('topicBackdrop').hidden = false;
      $('topicMenuButton').setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      $('topicMenuClose').focus();
    }

    function closeTopicMenu() {
      $('topicPanel').hidden = true;
      $('topicBackdrop').hidden = true;
      $('topicMenuButton').setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }

    function switchView(name) {
      document.querySelectorAll('.view').forEach(view => view.classList.toggle('active', view.id === name));
      document.querySelectorAll('.nav-link').forEach(button => button.classList.toggle('active', button.dataset.view === name));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (name === 'practice') setTimeout(() => $('answerInput').focus(), 350);
    }

    document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => switchView(button.dataset.view)));
    document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => switchView(button.dataset.go)));
    document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => { lang = button.dataset.lang; localStorage.setItem('chemia-lang', lang); applyLanguage(); }));
    $('topicMenuButton').addEventListener('click', () => $('topicPanel').hidden ? openTopicMenu() : closeTopicMenu());
    $('topicMenuClose').addEventListener('click', closeTopicMenu);
    $('topicBackdrop').addEventListener('click', closeTopicMenu);
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('topicPanel').hidden) { closeTopicMenu(); $('topicMenuButton').focus(); } });

    function renderTask() {
      const task = tasks[index];
      answered = false;
      $('taskType').textContent = lang === 'pl' ? task.titlePl : task.title;
      $('taskNumber').textContent = t('taskNumber')(index + 1);
      $('taskText').textContent = task.text;
      $('knownValues').innerHTML = task.values.map(value => `<span>${value}</span>`).join('');
      $('answerUnit').textContent = task.unit;
      $('answerInput').value = '';
      $('answerInput').disabled = false;
      $('checkButton').disabled = false;
      $('hintButton').hidden = false;
      $('nextButton').hidden = true;
      $('feedback').className = 'feedback';
      $('feedback').textContent = '';
    }

    function check() {
      if (answered) return;
      const task = tasks[index], value = $('answerInput').value;
      if (!Number.isFinite(parseAnswer(value))) {
        $('feedback').className = 'feedback error';
        $('feedback').textContent = t('invalid');
        return;
      }
      attempted++;
      answered = true;
      const right = isCorrect(value, task.answer);
      if (right) correct++;
      $('scoreValue').textContent = `${correct} / ${attempted}`;
      $('feedback').className = `feedback${right ? '' : ' error'}`;
      $('feedback').innerHTML = right
        ? `<b>${t('right')}</b> ${lang === 'pl' ? task.solutionPl : task.solution}`
        : `<b>${t('wrong')}</b> ${lang === 'pl' ? task.solutionPl : task.solution}`;
      $('answerInput').disabled = true;
      $('checkButton').disabled = true;
      $('hintButton').hidden = true;
      $('nextButton').hidden = false;
    }

    $('checkButton').addEventListener('click', check);
    $('answerInput').addEventListener('keydown', event => { if (event.key === 'Enter') check(); });
    $('hintButton').addEventListener('click', () => {
      $('feedback').className = 'feedback';
      $('feedback').innerHTML = `<b>${t('hintLabel')}</b> ${lang === 'pl' ? tasks[index].hintPl : tasks[index].hint}`;
    });
    $('nextButton').addEventListener('click', () => { index = (index + 1) % tasks.length; renderTask(); $('answerInput').focus(); });
    applyLanguage();
  }

  if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', init);
  return { tasks, topicGroups, parseAnswer, isCorrect };
});
