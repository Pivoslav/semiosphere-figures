
function fit(c, h) {
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = c.clientWidth || 760;
  c.width = w * dpr;
  c.height = h * dpr;
  c.style.height = h + 'px';
  var ctx = c.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  return { ctx: ctx, w: w, h: h };
}

function arrow(ctx, x1, y1, x2, y2, color, dashed) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;
  if (dashed) ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);
  var a = Math.atan2(y2 - y1, x2 - x1), hl = 9;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - hl * Math.cos(a - 0.4), y2 - hl * Math.sin(a - 0.4));
  ctx.lineTo(x2 - hl * Math.cos(a + 0.4), y2 - hl * Math.sin(a + 0.4));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function node(ctx, x, y, r, label, sub) {
  ctx.save();
  ctx.fillStyle = '#eef3f8';
  ctx.strokeStyle = '#2a4a6f';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#1a1a1a';
  ctx.textAlign = 'center';
  ctx.font = 'bold 13px Georgia, serif';
  ctx.fillText(label, x, y + 4);
  if (sub) {
    ctx.fillStyle = '#555';
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText(sub, x, y + r + 14);
  }
  ctx.restore();
}

function edgeLabel(ctx, x, y, text, color) {
  ctx.save();
  ctx.font = '10px system-ui, sans-serif';
  ctx.textAlign = 'center';
  var pad = 4, tw = ctx.measureText(text).width;
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.fillRect(x - tw / 2 - pad, y - 9, tw + pad * 2, 14);
  ctx.fillStyle = color || '#555';
  ctx.fillText(text, x, y + 2);
  ctx.restore();
}

function panelTitle(ctx, x, y, text) {
  ctx.save();
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawCells() {
  var c = document.getElementById('cvCells');
  if (!c) return;
  var s = fit(c, 420), ctx = s.ctx, w = s.w;
  var L = 92, R = w - 20, T = 52, B = 372;
  var midX = (L + R) / 2, midY = (T + B) / 2;
  var cw = midX - L, chh = midY - T;

  panelTitle(ctx, (L + R) / 2, 22, 'Change of volume by what the receiver adds');

  function cellBox(x, y, bw, bh, emph) {
    ctx.save();
    ctx.fillStyle = emph ? 'rgba(42,74,111,0.10)' : 'rgba(141,148,163,0.07)';
    ctx.fillRect(x, y, bw, bh);
    ctx.strokeStyle = emph ? '#2a4a6f' : '#b9bdc6';
    ctx.lineWidth = emph ? 2.5 : 1;
    if (!emph) ctx.setLineDash([4, 3]);
    ctx.strokeRect(x, y, bw, bh);
    ctx.restore();
  }

  function block(x, y, title, rows, titleColor) {
    ctx.save();
    ctx.textAlign = 'left';
    ctx.fillStyle = titleColor;
    ctx.font = 'bold 13px Georgia, serif';
    ctx.fillText(title, x, y);
    ctx.fillStyle = '#444';
    ctx.font = '10px system-ui, sans-serif';
    for (var i = 0; i < rows.length; i++) ctx.fillText(rows[i], x, y + 16 + i * 13);
    ctx.restore();
  }

  function tag(xRight, yTop, text, fg, bg, bd) {
    ctx.save();
    ctx.font = '9.5px system-ui, sans-serif';
    ctx.textAlign = 'left';
    var bw = ctx.measureText(text).width + 12;
    ctx.fillStyle = bg;
    ctx.fillRect(xRight - bw, yTop, bw, 16);
    ctx.strokeStyle = bd;
    ctx.lineWidth = 1;
    ctx.strokeRect(xRight - bw, yTop, bw, 16);
    ctx.fillStyle = fg;
    ctx.fillText(text, xRight - bw + 6, yTop + 11);
    ctx.restore();
  }

  cellBox(L, T, cw, chh, false);
  cellBox(midX, T, cw, chh, true);
  cellBox(L, midY, cw, chh, false);
  cellBox(midX, midY, cw, chh, false);

  block(L + 12, T + 18, 'I-s/he', [
    'transmission, volume unchanged',
    'code and message invariant',
    'addresser and addressee variable'
  ], '#2a4a6f');
  tag(midX - 10, T + 4, 'Lotman', '#5c6670', '#f1f2f4', '#c9ccd3');

  block(L + 12, midY + 18, 'Presemiotic binding', [
    'a chain of biochemical impulses',
    'regulating one organism',
    'recipient valued for transparency',
    'adds nothing of its own'
  ], '#5c6670');
  tag(midX - 10, midY + 4, 'Lotman, the floor', '#5c6670', '#f1f2f4', '#c9ccd3');
  ctx.save();
  ctx.font = '10px system-ui, sans-serif';
  ctx.textAlign = 'left';
  var ttxt = 'a tool call sits here';
  var tw = ctx.measureText(ttxt).width;
  ctx.fillStyle = 'rgba(154,59,59,0.08)';
  ctx.fillRect(L + 12, midY + 82, tw + 12, 18);
  ctx.strokeStyle = '#9a3b3b';
  ctx.lineWidth = 1;
  ctx.strokeRect(L + 12, midY + 82, tw + 12, 18);
  ctx.fillStyle = '#9a3b3b';
  ctx.fillText(ttxt, L + 18, midY + 95);
  ctx.restore();

  block(midX + 12, midY + 18, 'I-I, autocommunication', [
    'volume increases',
    'second code is structural only:',
    'rhythm, ornament, repetition',
    'adds no content of its own'
  ], '#1f5136');
  tag(midX + cw - 10, midY + 4, 'Lotman', '#5c6670', '#f1f2f4', '#c9ccd3');

  block(midX + 12, T + 18, 'The unnamed cell', [
    'volume increases and the receiver',
    'adds substantial content'
  ], '#2a4a6f');
  tag(midX + cw - 10, T + 4, 'measured', '#2a4a6f', '#e6edf5', '#2a4a6f');

  var px = midX + cw * 0.10, py = T + chh * 0.58;
  ctx.save();
  ctx.fillStyle = '#2a4a6f';
  ctx.beginPath();
  ctx.arc(px, py, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.textAlign = 'left';
  ctx.font = 'bold 10.5px system-ui, sans-serif';
  ctx.fillStyle = '#2a4a6f';
  ctx.fillText('MA13, measured', px + 14, py - 19);
  ctx.font = '10px system-ui, sans-serif';
  ctx.fillStyle = '#333';
  ctx.fillText('volume x 4.4 at the median', px + 14, py - 6);
  ctx.fillText('content gain 0.84 at the median', px + 14, py + 7);
  ctx.fillText('n = 26 real delegations', px + 14, py + 20);
  ctx.restore();

  arrow(ctx, L, B, R, B, '#555', false);
  arrow(ctx, L, B, L, T - 10, '#555', false);

  ctx.save();
  ctx.fillStyle = '#555';
  ctx.textAlign = 'center';
  ctx.font = '10px system-ui, sans-serif';
  ctx.fillText('unchanged', L + cw / 2, B + 16);
  ctx.fillText('increases', midX + cw / 2, B + 16);
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillText('volume of information across the exchange', (L + R) / 2, B + 32);
  ctx.restore();

  ctx.save();
  ctx.translate(46, T + chh / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#555';
  ctx.textAlign = 'center';
  ctx.font = '10px system-ui, sans-serif';
  ctx.fillText('substantial', 0, 0);
  ctx.restore();

  ctx.save();
  ctx.translate(46, midY + chh / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#555';
  ctx.textAlign = 'center';
  ctx.font = '10px system-ui, sans-serif';
  ctx.fillText('none', 0, 0);
  ctx.restore();

  ctx.save();
  ctx.translate(24, midY);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#555';
  ctx.textAlign = 'center';
  ctx.font = '11px system-ui, sans-serif';
  ctx.fillText('content the receiver adds of its own', 0, 0);
  ctx.restore();
}

function drawLanes() {
  var c = document.getElementById('cvLanes');
  if (!c) return;
  var s = fit(c, 360), ctx = s.ctx, w = s.w;
  var lx = 104, rx = w - 104, tx = 116;

  panelTitle(ctx, w / 2, 22, 'What crosses between two semiotic systems');

  function lane(y, color, head, under, verdict, moving, emph) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.globalAlpha = emph ? 0.11 : 0.06;
    ctx.fillRect(lx, y, rx - lx, 76);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = color;
    ctx.lineWidth = emph ? 2 : 1;
    if (!emph) ctx.setLineDash([4, 3]);
    ctx.strokeRect(lx, y, rx - lx, 76);
    ctx.setLineDash([]);
    ctx.textAlign = 'left';
    ctx.fillStyle = color;
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(head, tx, y + 18);
    ctx.fillStyle = '#444';
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText(under, tx, y + 34);
    ctx.fillStyle = emph ? color : '#8a5a5a';
    ctx.font = 'bold 10px system-ui, sans-serif';
    ctx.fillText(verdict, tx, y + 70);
    ctx.restore();
    arrow(ctx, lx + 8, y + 52, rx - 8, y + 52, color, !emph);
    edgeLabel(ctx, w / 2, y + 54, moving, color);
  }

  lane(56, '#c45c26', 'Texts: TRANSLATED',
    'recoded into the other language; part is cut off',
    'wrong word: the text does not stay itself', 'a text', false);
  lane(148, '#6b3fa0', 'Meaning: GENERATED',
    'arises between two non-identical codes',
    'wrong word: a chain excludes new messages', 'nothing crosses whole', false);
  lane(240, '#1f5136', 'Codes and metatexts: TRANSMITTED',
    'arrive intact, one level below meaning',
    'the only lane where transmission is correct', 'code / metatext', true);

  node(ctx, 62, 186, 32, 'A', 'generator');
  node(ctx, w - 62, 186, 32, 'B', 'generator');

  ctx.save();
  ctx.fillStyle = '#555';
  ctx.textAlign = 'center';
  ctx.font = 'italic 10px Georgia, serif';
  ctx.fillText('1983: "exchange of metatexts, of codes, which are transmitted from one hemisphere of culture to another"', w / 2, 340);
  ctx.restore();
}

function drawOutcomes() {
  var c = document.getElementById('cvOutcomes');
  if (!c) return;
  var s = fit(c, 400), ctx = s.ctx, w = s.w, h = s.h;
  var half = w / 2;
  var lx = 20, lr = half - 16, rx = half + 16, rr = w - 20;

  ctx.save();
  ctx.strokeStyle = '#ddd';
  ctx.beginPath();
  ctx.moveTo(half, 36);
  ctx.lineTo(half, h - 10);
  ctx.stroke();
  ctx.restore();

  panelTitle(ctx, half / 2, 22, 'Enlargement: the colour case (1983)');
  panelTitle(ctx, half + half / 2, 22, 'Collapse: the halt clause (MA4b)');

  function swatchRow(x0, y, label, fillA, fillB, note, noteColor) {
    ctx.save();
    ctx.textAlign = 'left';
    ctx.fillStyle = '#555';
    ctx.font = 'bold 10px system-ui, sans-serif';
    ctx.fillText(label, x0, y + 19);
    ctx.fillStyle = fillA;
    ctx.fillRect(x0 + 46, y, 52, 30);
    ctx.fillStyle = fillB;
    ctx.fillRect(x0 + 104, y, 52, 30);
    ctx.strokeStyle = '#8d94a3';
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 46, y, 52, 30);
    ctx.strokeRect(x0 + 104, y, 52, 30);
    ctx.fillStyle = noteColor;
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText(note, x0 + 166, y + 19);
    ctx.restore();
  }

  function band(x0, x1, color, head, detail) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.12;
    ctx.fillRect(x0, 180, x1 - x0, 42);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x0, 180, x1 - x0, 42);
    ctx.textAlign = 'left';
    ctx.fillStyle = color;
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(head, x0 + 10, 198);
    ctx.fillStyle = '#333';
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText(detail, x0 + 10, 214);
    ctx.restore();
  }

  function rows(x0, items, color, size, y0) {
    ctx.save();
    ctx.textAlign = 'left';
    ctx.fillStyle = color;
    ctx.font = size + 'px system-ui, sans-serif';
    for (var i = 0; i < items.length; i++) ctx.fillText(items[i], x0, y0 + i * 13);
    ctx.restore();
  }

  function diagnosis(x0, text, color) {
    ctx.save();
    ctx.textAlign = 'left';
    ctx.fillStyle = color;
    ctx.font = 'bold 10.5px system-ui, sans-serif';
    ctx.fillText(text, x0, 306);
    ctx.restore();
  }

  ctx.save();
  ctx.textAlign = 'left';
  ctx.fillStyle = '#444';
  ctx.font = '10px system-ui, sans-serif';
  ctx.fillText('a language of distinctions is worked out', lx, 44);
  ctx.fillText('the halt clause is handed over as code', rx, 44);
  ctx.restore();

  swatchRow(lx, 58, 'before', '#9aa87f', '#9aa87f', 'the same', '#5c6670');
  arrow(ctx, lx + 72, 92, lx + 72, 130, '#1f5136', false);
  edgeLabel(ctx, lx + 158, 114, 'distinctions cross as code', '#1f5136');
  swatchRow(lx, 136, 'after', '#9aa87f', '#6f8a3f', 'told apart', '#1f5136');
  band(lx, lr, '#1f5136', 'Receiver gains a distinction', 'it sees shades it could not see');
  rows(lx, [
    'distinctions arrive as linguistic code',
    'and ordinary consciousness then sees',
    'shades previously indistinguishable'
  ], '#333', 10, 240);
  rows(lx, ['Asimmetriya i dialog, 1983, printed p. 18'], '#8d94a3', 9.5, 280);
  diagnosis(lx, 'the receiver could evaluate the code', '#1f5136');
  rows(lx, [
    'his example, not a measurement:',
    'the enlargement side is unmeasured'
  ], '#8d94a3', 9.5, 332);

  swatchRow(rx, 58, 'before', '#6f8a3f', '#b06a6a', 'told apart', '#5c6670');
  arrow(ctx, rx + 72, 92, rx + 72, 130, '#9a3b3b', false);
  edgeLabel(ctx, rx + 158, 114, 'the clause crosses as code', '#9a3b3b');
  swatchRow(rx, 136, 'after', '#b06a6a', '#b06a6a', 'all refused', '#9a3b3b');
  band(rx, rr, '#9a3b3b', 'Receiver loses the distinction', 'refusal recall 1.00, false refusal 1.00');
  rows(rx, [
    '11 of 11 items whose own message carried',
    'the tags the clause names as grounds',
    'for answering were refused anyway'
  ], '#333', 10, 240);
  rows(rx, ['MA4b arm C2, llama3.2:3b, 18 items'], '#8d94a3', 9.5, 280);
  diagnosis(rx, 'the receiver could only pattern-match', '#9a3b3b');

  var bandW = rr - rx;
  var cols = [rx + bandW * 0.50, rx + bandW * 0.71, rx + bandW * 0.92];
  var heads = ['recall', 'false refusal', 'F1'];
  var r1 = ['1.00', '1.00', '0.43'];
  var r2 = ['1.00', '0.62', '0.56'];
  ctx.save();
  ctx.textAlign = 'left';
  ctx.fillStyle = '#444';
  ctx.font = '10px system-ui, sans-serif';
  ctx.fillText('same predicate, evaluated by a rule:', rx, 330);
  ctx.fillStyle = '#8d94a3';
  ctx.font = '9.5px system-ui, sans-serif';
  ctx.fillText('halt clause', rx, 364);
  ctx.fillStyle = '#1f5136';
  ctx.fillText('rule layer', rx, 380);
  ctx.textAlign = 'center';
  for (var i = 0; i < 3; i++) {
    ctx.fillStyle = '#8d94a3';
    ctx.font = '9.5px system-ui, sans-serif';
    ctx.fillText(heads[i], cols[i], 348);
    ctx.fillStyle = '#9a3b3b';
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText(r1[i], cols[i], 364);
    ctx.fillStyle = '#1f5136';
    ctx.fillText(r2[i], cols[i], 380);
  }
  ctx.strokeStyle = '#ddd';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(rx, 353);
  ctx.lineTo(rr, 353);
  ctx.stroke();
  ctx.restore();
}

function drawAll() { drawCells(); drawLanes(); drawOutcomes(); }
window.addEventListener('load', drawAll);
window.addEventListener('resize', drawAll);
