import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const port = Number(process.env.PORT || 8080);
const model = process.env.OPENAI_MODEL || 'gpt-5';
const hasApiKey = Boolean(process.env.OPENAI_API_KEY);

const systemPrompt = `Ты — спокойный помощник по химии для ученика 7 класса польской школы.
Отвечай на языке, который указан в запросе (ru или pl). Объясняй коротко и понятными словами.
Не начинай с готового ответа: сначала назови, что уже известно, затем предложи следующий шаг.
Учитывай польские термины masa, objętość, gęstość и единицы измерения.
Если выбран режим first — дай только первый шаг и один вопрос ученику.
Если выбран режим hint — дай подсказку без окончательного числа.
Если выбран режим full — покажи полный разбор, проверку и одну типичную ошибку.
Не придумывай данные, которых нет в условии. Если условие неполное, задай один уточняющий вопрос.`;

function json(response, status, payload) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(payload));
}

function localHint(question, lang, mode) {
  const isPolish = lang === 'pl';
  const first = isPolish
    ? 'Najpierw wypisz dane: masę (m), objętość (V) i gęstość (ρ). Co dokładnie trzeba obliczyć?'
    : 'Сначала выпиши данные: массу (m), объём (V) и плотность (ρ). Что именно нужно найти?';
  const hint = isPolish
    ? 'Wskazówka: wybierz wzór z trójkąta — ρ = m : V, m = ρ × V albo V = m : ρ. Najpierw sprawdź jednostki.'
    : 'Подсказка: выбери формулу из треугольника — ρ = m : V, m = ρ × V или V = m : ρ. Сначала проверь единицы.';
  const full = isPolish
    ? 'Lokalne rozwiązanie: zapisz znane wielkości, zamień jednostki na zgodne, wybierz wzór i wykonaj działanie. Na końcu sprawdź wynik działaniem odwrotnym. Jeśli podasz liczby, przejdziemy przez obliczenia krok po kroku.'
    : 'Локальный разбор: запиши известные величины, приведи единицы к одинаковым, выбери формулу и выполни действие. В конце проверь результат обратным действием. Если добавишь числа, разберём вычисления по шагам.';
  if (!question.trim()) return isPolish ? 'Wpisz treść zadania.' : 'Напиши условие задачи.';
  if (mode === 'first') return first;
  if (mode === 'hint') return hint;
  return full;
}

function extractOutputText(data) {
  if (typeof data?.output_text === 'string') return data.output_text.trim();
  const chunks = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) if (typeof content?.text === 'string') chunks.push(content.text);
  }
  return chunks.join('\n').trim();
}

async function askAi({ question, lang, mode, topic }) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      store: false,
      instructions: systemPrompt,
      input: `Язык: ${lang}\nРежим: ${mode}\nТема: ${topic}\n\nЗадача ученика:\n${question}`
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || `OpenAI request failed (${response.status})`);
  const text = extractOutputText(data);
  if (!text) throw new Error('OpenAI returned an empty response');
  return text;
}

async function readBody(request) {
  const parts = [];
  let length = 0;
  for await (const part of request) {
    length += part.length;
    if (length > 30000) throw new Error('request_too_large');
    parts.push(part);
  }
  return Buffer.concat(parts).toString('utf8');
}

function serveStatic(request, response, pathname) {
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const file = normalize(join(root, relative));
  if (!file.startsWith(root)) return json(response, 403, { ok: false, error: 'forbidden' });
  const type = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.json':'application/json' }[extname(file)] || 'application/octet-stream';
  createReadStream(file).on('error', () => json(response, 404, { ok: false, error: 'not_found' })).on('open', () => response.writeHead(200, { 'Content-Type': type })).pipe(response);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  if (request.method === 'GET' && url.pathname === '/api/health') return json(response, 200, { ok: true, mode: hasApiKey ? 'ai' : 'local' });
  if (request.method === 'POST' && url.pathname === '/api/help') {
    try {
      const body = JSON.parse(await readBody(request));
      const question = typeof body.question === 'string' ? body.question.slice(0, 12000) : '';
      const lang = body.lang === 'pl' ? 'pl' : 'ru';
      const mode = ['first', 'hint', 'full'].includes(body.mode) ? body.mode : 'first';
      const topic = typeof body.topic === 'string' ? body.topic : 'density';
      if (!question.trim()) return json(response, 400, { ok: false, error: 'question_required' });
      if (!hasApiKey) return json(response, 200, { ok: true, source: 'local', text: localHint(question, lang, mode) });
      const text = await askAi({ question, lang, mode, topic });
      return json(response, 200, { ok: true, source: 'ai', text });
    } catch (error) {
      const status = error.message === 'request_too_large' ? 413 : 502;
      return json(response, status, { ok: false, error: error.message });
    }
  }
  if (request.method === 'GET' || request.method === 'HEAD') return serveStatic(request, response, url.pathname);
  return json(response, 405, { ok: false, error: 'method_not_allowed' });
});

server.listen(port, () => console.log(`Chemia bez stresu running at http://localhost:${port} (${hasApiKey ? `AI: ${model}` : 'local fallback'})`));
