function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function parseNum(s) { return s.trim() === '' ? NaN : Number(s.replace(',', '.')); }

function showScore(id, s) {
  const p = s.all ? Math.round(s.ok / s.all * 100) : 0;
  document.getElementById(id).textContent = 'Загальний рахунок ' + p + '% (' + s.ok + ' правильних відповідей з ' + s.all + ')';
}
function showResult(id, ok, correct) {
  const r = document.getElementById(id);
  r.className = ok ? 'ok' : 'err';
  r.textContent = ok ? 'Правильно!' : 'Помилка, правильна відповідь «' + correct + '»';
}

function fahrenheitChanged() {
  const f = parseNum(document.getElementById('tF').value);
  document.getElementById('tC').value = isNaN(f) ? '' : +(5 / 9 * (f - 32)).toFixed(2);
}
function celsiusChanged() {
  const c = parseNum(document.getElementById('tC').value);
  document.getElementById('tF').value = isNaN(c) ? '' : +(c * 9 / 5 + 32).toFixed(2);
}

const st2 = { ok: 0, all: 0, answer: 0, done: true };

function newTask2() {
  const a = rnd(2, 9), b = rnd(2, 9);
  st2.answer = a * b;
  st2.done = false;
  document.getElementById('task2text').textContent = a + ' × ' + b + ' =';
  document.getElementById('ans2').value = '';
  document.getElementById('ans2').disabled = false;
  document.getElementById('chk2').disabled = false;
  document.getElementById('res2').textContent = '';
  document.getElementById('ans2').focus();
}
function checkTask2() {
  if (st2.done) return;
  const v = parseNum(document.getElementById('ans2').value);
  if (isNaN(v)) {
    document.getElementById('res2').className = 'err';
    document.getElementById('res2').textContent = 'Введіть число';
    return;
  }
  st2.done = true;
  st2.all++;
  const ok = v === st2.answer;
  if (ok) st2.ok++;
  document.getElementById('ans2').disabled = true;
  document.getElementById('chk2').disabled = true;
  showResult('res2', ok, st2.answer);
  showScore('score2', st2);
}

const st3 = { ok: 0, all: 0, answer: 0, done: true };

function newTask3() {
  const a = rnd(2, 9), b = rnd(2, 9), right = a * b;
  st3.answer = right;
  st3.done = false;
  document.getElementById('task3text').textContent = a + ' × ' + b + ' =';
  document.getElementById('res3').textContent = '';

  const set = new Set([right]);
  while (set.size < 4) {
    const w = right + rnd(-10, 10);
    if (w > 0) set.add(w);
  }
  const options = [...set].sort(function () { return Math.random() - 0.5; });

  const box = document.getElementById('opts');
  box.textContent = '';
  options.forEach(function (val) {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'opt';
    radio.value = val;
    radio.addEventListener('change', checkTask3);
    label.append(radio, ' ' + val);
    box.append(label);
  });
}
function checkTask3(e) {
  if (st3.done) return;              
  st3.done = true;
  st3.all++;
  const ok = Number(e.target.value) === st3.answer;
  if (ok) st3.ok++;
  document.querySelectorAll('#opts input').forEach(function (r) { r.disabled = true; });
  showResult('res3', ok, st3.answer);
  showScore('score3', st3);
}

let imagesArray = [
  { path: 'images/images1.jfif', title: 'меблі - 1',   description: 'меблі - 1' },
  { path: 'images/images2.jfif', title: 'меблі - 2', description: 'меблі - 2' },
  { path: 'images/images3.jfif', title: 'меблі - 3',   description: 'меблі - 3' }
];

function placeholder(text) {
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
    '<rect width="800" height="600" fill="#888"/>' +
    '<text x="400" y="320" font-size="48" text-anchor="middle" fill="#fff" font-family="sans-serif">' + text + '</text></svg>';
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function initPhotoRotator(id, images) {
  const root = document.getElementById(id);
  root.textContent = '';
  let i = 0;

  const wrap = document.createElement('div');
  wrap.className = 'rot';

  const back = document.createElement('a');
  back.className = 'rot-nav';
  back.textContent = 'Назад';
  back.href = '#task4';

  const mid = document.createElement('div');
  mid.className = 'rot-mid';

  const fwd = document.createElement('a');
  fwd.className = 'rot-nav';
  fwd.textContent = 'Вперед';
  fwd.href = '#task4';

  const counter = document.createElement('div');
  const img = document.createElement('img');
  img.className = 'rot-img';
  const title = document.createElement('div');
  title.className = 'rot-title';
  const desc = document.createElement('div');
  desc.className = 'rot-desc';
  mid.append(counter, img, title, desc);
  wrap.append(back, mid, fwd);
  root.append(wrap);

  img.addEventListener('error', function () {
    img.onerror = null;
    img.src = placeholder('Немає файлу ' + images[i].path);
  });

  function show() {
    const it = images[i];
    counter.textContent = 'Фотографія ' + (i + 1) + ' з ' + images.length;
    img.src = it.path;
    img.alt = it.title;
    title.textContent = it.title;
    desc.textContent = it.description;
    back.style.visibility = i === 0 ? 'hidden' : 'visible';
    fwd.style.visibility = i === images.length - 1 ? 'hidden' : 'visible';
  }

  back.addEventListener('click', function (e) {
    e.preventDefault();
    if (i > 0) { i--; show(); }
  });
  fwd.addEventListener('click', function (e) {
    e.preventDefault();
    if (i < images.length - 1) { i++; show(); }
  });
  show();
}

const FONT = {
  0: '111101101101111', 1: '010110010010111', 2: '111001111100111',
  3: '111001111001111', 4: '101101111001001', 5: '111100111001111',
  6: '111100111101111', 7: '111001001001001', 8: '111101111101111',
  9: '111101111001111'
};

function initCaptcha(id, length) {
  const root = document.getElementById(id);
  root.textContent = '';

  let code = '';
  for (let k = 0; k < length; k++) code += rnd(0, 9);

  const label = document.createElement('div');
  label.textContent = 'Введіть число';

  const pix = document.createElement('div');
  pix.className = 'cap-pix';
  for (const ch of code) {
    const digit = document.createElement('div');
    digit.className = 'cap-d';
    for (const bit of FONT[ch]) {
      const span = document.createElement('span');
      if (bit === '1') span.className = 'on';
      digit.append(span);
    }
    pix.append(digit);
  }

  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = length;
  input.autocomplete = 'off';

  const msg = document.createElement('div');

  root.append(label, pix, input, msg);

  input.addEventListener('input', function () {
    if (input.value.length < length) { msg.textContent = ''; return; }
    const ok = input.value === code;
    msg.className = ok ? 'ok' : 'err';
    msg.textContent = ok ? 'Правильно' : 'Помилка';
  });
}

showScore('score2', st2);
newTask2();
showScore('score3', st3);
newTask3();
initPhotoRotator('rotator', imagesArray);
initCaptcha('captcha', 4);