"""Arithmetic layout check for docs/embed/fig-halt-adjudication.html.

No browser available, so every text extent is measured against the real
system-ui font on this machine (Segoe UI) at the same px sizes the canvas uses,
then compared to the box / column / canvas bounds the script draws.
"""
from PIL import ImageFont

REG = 'C:/Windows/Fonts/segoeui.ttf'
BOLD = 'C:/Windows/Fonts/segoeuib.ttf'
_cache = {}


def tw(text, px, bold=False):
    key = (px, bold)
    if key not in _cache:
        _cache[key] = ImageFont.truetype(BOLD if bold else REG, px)
    return _cache[key].getlength(text)


FAILS = []
CHECKS = [0]


def chk(ok, msg):
    CHECKS[0] += 1
    if not ok:
        FAILS.append(msg)
        print('  FAIL ' + msg)


def fits(text, px, limit, where, bold=False):
    width = tw(text, px, bold)
    chk(width <= limit,
        '%s: "%s" is %.1fpx, limit %.1fpx (over by %.1f)' % (where, text, width, limit, width - limit))
    return width


def centred(text, px, cx, lo, hi, where, bold=False):
    width = tw(text, px, bold)
    x0, x1 = cx - width / 2, cx + width / 2
    chk(x0 >= lo and x1 <= hi,
        '%s: centred "%s" spans %.1f..%.1f, allowed %.1f..%.1f' % (where, text, x0, x1, lo, hi))
    return x0, x1


def left(text, px, x, hi, where, bold=False):
    width = tw(text, px, bold)
    chk(x + width <= hi,
        '%s: "%s" from %.1f ends %.1f, limit %.1f' % (where, text, x, x + width, hi))
    return x, x + width


def no_overlap(rects, where):
    """rects: (name, x0, y0, x1, y1). Two items collide only if both axes overlap."""
    for i in range(len(rects)):
        for j in range(i + 1, len(rects)):
            a, b = rects[i], rects[j]
            xo = min(a[3], b[3]) - max(a[1], b[1])
            yo = min(a[4], b[4]) - max(a[2], b[2])
            chk(xo <= 0 or yo <= 0,
                '%s: "%s" (%.0f..%.0f x %.0f..%.0f) overlaps "%s" (%.0f..%.0f x %.0f..%.0f) '
                'by %.1f x %.1f' % (where, a[0], a[1], a[3], a[2], a[4],
                                    b[0], b[1], b[3], b[2], b[4], xo, yo))


W = 846.0          # body max-width 56rem = 896, minus 2 x 1.5rem padding, minus 2 x 1px viz-box border
L, R = 12.0, W - 12.0
SPAN = R - L
K = 1.0            # k = min(1, w/846) so the desktop case is the tightest for text


def fx(f):
    return L + f * SPAN


# =====================================================================
print('H1  cvPaths, height 548')
RET = (fx(0.000), fx(0.105))
GATE = (fx(0.145), fx(0.300))
GEN = (fx(0.375), fx(0.560))
OUT = (fx(0.600), fx(1.000))
print('  columns RET %.1f..%.1f  GATE %.1f..%.1f  GEN %.1f..%.1f  OUT %.1f..%.1f'
      % (RET + GATE + GEN + OUT))
print('  arrow gaps: RET->GATE %.1f  GATE->GEN %.1f  GEN->OUT %.1f'
      % (GATE[0] - RET[1], GEN[0] - GATE[1], OUT[0] - GEN[1]))
for name, col in (('RET', RET), ('GATE', GATE), ('GEN', GEN), ('OUT', OUT)):
    chk(col[1] <= W, 'H1 column %s right edge %.1f exceeds canvas %.1f' % (name, col[1], W))
for gap, nm in ((GATE[0] - RET[1], 'RET->GATE'), (GEN[0] - GATE[1], 'GATE->GEN'),
                (OUT[0] - GEN[1], 'GEN->OUT')):
    chk(gap >= 20, 'H1 arrow gap %s only %.1fpx, arrowhead needs ~9px' % (nm, gap))

# box() writes a bold 10px first line then 10px lines; usable inner width is col - 14
BOXES = [
    ('B2 RET', RET, ['Retrieval', 'flat top-5']),
    ('C2 RET', RET, ['Retrieval', 'flat top-5']),
    ('D2 RET', RET, ['Retrieval', 'flat top-5', 'metadata read']),
    ('E2 RET', RET, ['Retrieval', 'flat top-5', 'metadata read']),
    ('D2 GATE', GATE, ['rule gate', 'R1 7, R2 3, R3 1', '11 closed, 7 open']),
    ('E2 GATE', GATE, ['rule gate', 'R1 7, R2 3, R3 1', '11 closed, 7 open']),
    ('B2 GEN', GEN, ['generator', 'no halt clause', '36 calls']),
    ('C2 GEN', GEN, ['generator', 'HALT_CLAUSE in prompt', '36 calls']),
    ('D2 GEN', GEN, ['generator', 'no halt clause', '14 calls, 22 saved']),
    ('E2 GEN', GEN, ['generator', 'HALT_CLAUSE in prompt', '14 calls, 22 saved']),
    ('B2 OUT', OUT, ['answer or refusal, decided by the model', 'caught 1 of 5 should-refuse items']),
    ('C2 OUT', OUT, ['refusal on all 18 items', 'no usable answer anywhere in the arm']),
    ('D2 OUT ans', OUT, ['answer or refusal on the 7 cleared items', '5 answered, 2 refused by the generator']),
    ('D2 OUT halt', OUT, ['canonical HALT_STRING, 11 items', 'no model output exists for these']),
    ('E2 OUT ans', OUT, ['refusal on all 7 cleared items', 'the gate cleared them; the clause fired']),
    ('E2 OUT halt', OUT, ['canonical HALT_STRING, 11 items', 'no model output exists for these']),
]
for label, col, lines in BOXES:
    inner = (col[1] - col[0]) - 14
    for i, line in enumerate(lines):
        fits(line, 10, inner, 'H1 box %s line %d (inner %.1f)' % (label, i, inner), bold=(i == 0))

# vertical: box() centres n lines at 12px leading, needs n*12 + 5 inside the box height
for label, n, h in (('B2/C2 RET,GEN,OUT', 2, 44), ('D2/E2 RET,GATE', 3, 58),
                    ('B2/C2 GEN 3 lines', 3, 44), ('D2/E2 GEN 3 lines', 3, 44),
                    ('D2/E2 OUT 2 lines', 2, 44)):
    need = (n - 1) * 12 + 8 + 3 + 4      # leading + ascent + descent + padding
    chk(need <= h, 'H1 vertical %s: %d lines need %.0fpx, box is %dpx' % (label, n, need, h))

# edge labels on the arrows
ungated_mid = (RET[1] + GEN[0]) / 2
a0, a1 = centred('no gate', 10, ungated_mid - 56 * K, RET[1], GEN[0], 'H1 label no gate')
b0, b1 = centred('18 of 18', 10, GEN[0] - 31 * K, RET[1], GEN[0], 'H1 label 18 of 18')
chk(a1 + 4 <= b0, 'H1 labels "no gate" (ends %.1f) and "18 of 18" (starts %.1f) collide' % (a1, b0))
print('  "no gate" %.1f..%.1f   "18 of 18" %.1f..%.1f   clear gap %.1f' % (a0, a1, b0, b1, b0 - a1))
centred('7 of 18', 10, (GATE[1] + GEN[0]) / 2, GATE[1], GEN[0], 'H1 label 7 of 18')

# the bypass label must sit below the GEN box and left of the OUT column
for arm, top in (('D2', 270), ('E2', 406)):
    gen_bot = top + 44
    h_top = top + 58
    lab_y = h_top + 6
    x0, x1 = centred('generator NEVER CALLED', 10, (GATE[1] + OUT[0]) / 2, GATE[1], OUT[0],
                     'H1 %s bypass label' % arm)
    chk(lab_y - 9 >= gen_bot, 'H1 %s bypass label top %.1f overlaps GEN box bottom %.1f'
        % (arm, lab_y - 9, gen_bot))
    chk(x1 <= OUT[0], 'H1 %s bypass label right %.1f overlaps OUT column %.1f' % (arm, x1, OUT[0]))
    print('  %s bypass label %.1f..%.1f at y %.0f..%.0f (GEN bottom %.0f, OUT starts %.1f)'
          % (arm, x0, x1, lab_y - 9, lab_y + 5, gen_bot, OUT[0]))

# headers, arm labels, notes
left('No gate: the halt decision sits inside the generator prompt', 12, L, W, 'H1 group A header', bold=True)
left('Deterministic gate upstream: the generator is never asked to decide', 12, L, W, 'H1 group B header', bold=True)
for nm in ('B2_no_halt', 'C2_generator_halt', 'D2_rule_gate', 'E2_rule_gate_plus_typed_halt'):
    left(nm, 11, L, RET[1] + 220, 'H1 arm label', bold=True)
left('Both arms call the generator on every item: 2 hops x 18 items = 36 calls. No rule ever inspects the retrieved metadata.', 10, L, W, 'H1 group A note')
left('Total generator calls in the run: 100. The gate is a pure function of retrieved-hit metadata.', 10, L, W, 'H1 footer 1')
left('D2 and E2 therefore make identical gate decisions; they differ only in what the generator prompt contains.', 10, L, W, 'H1 footer 2')

# vertical stacking: nothing may overlap its neighbour
rows = [('groupA header', 26 - 9, 26 + 3), ('B2 label', 50 - 8, 50 + 3), ('B2 boxes', 58, 102),
        ('C2 label', 128 - 8, 128 + 3), ('C2 boxes', 136, 180), ('groupA note', 202 - 8, 202 + 3),
        ('groupB header', 238 - 9, 238 + 3), ('D2 label', 262 - 8, 262 + 3),
        ('D2 gate/ret', 270, 328), ('D2 halt box', 328, 372),
        ('E2 label', 398 - 8, 398 + 3), ('E2 gate/ret', 406, 464), ('E2 halt box', 464, 508),
        ('footer 1', 526 - 8, 526 + 3), ('footer 2', 540 - 8, 540 + 3)]
for i in range(len(rows) - 1):
    chk(rows[i][2] <= rows[i + 1][1],
        'H1 vertical overlap: %s ends %.0f, %s starts %.0f' % (rows[i][0], rows[i][2],
                                                               rows[i + 1][0], rows[i + 1][1]))
chk(rows[-1][2] <= 548, 'H1 content ends %.0f, canvas height 548' % rows[-1][2])
print('  vertical stack 17..%.0f inside canvas height 548' % rows[-1][2])

# =====================================================================
print('H2  cvTradeoff, height 450')
xA, xB = fx(0.0414), fx(1.0)
yT, yBase = 56.0, 250.0
plotH = yBase - yT
groupW = (xB - xA) / 4
barW = groupW * 0.203
gapW = groupW * 0.0305
pad = (groupW - (3 * barW + 2 * gapW)) / 2
print('  plot x %.1f..%.1f  groupW %.2f  barW %.2f  gapW %.2f  pad %.2f'
      % (xA, xB, groupW, barW, gapW, pad))
chk(pad >= 0, 'H2 bar group overflows its slot, pad %.2f' % pad)

ARMS = [('B2', 'B2_no_halt', 0.2, 0.3846, 0.1818),
        ('C2', 'C2_generator_halt', 1.0, 1.0, 0.4348),
        ('D2', 'D2_rule_gate', 1.0, 0.6154, 0.5556),
        ('E2', 'E2_rule_gate_plus_typed_halt', 1.0, 1.0, 0.4348)]

# tick labels, right-aligned at xA-6
for t in range(6):
    txt = '%.2f' % (t * 0.2)
    width = tw(txt, 10)
    chk(xA - 6 - width >= L, 'H2 tick "%s" starts %.1f, left margin %.1f' % (txt, xA - 6 - width, L))
tick_gap = plotH / 5
chk(tick_gap >= 14, 'H2 tick label pitch %.1fpx too small for 10px text' % tick_gap)
print('  tick label pitch %.1fpx, 6 labels, widest %.1fpx ending at %.1f'
      % (tick_gap, max(tw('%.2f' % (t * 0.2), 10) for t in range(6)), xA - 6))

# bars and their value labels: every label is its own rectangle, checked against
# every other label and against the legend strip
legend_end = xA
for _lab in ('refusal recall (higher better)', 'false refusal (lower better)', 'refusal F1 (higher better)'):
    legend_end += 13 + tw(_lab, 10) + 22
legend_end -= 22
bar_rects = [('legend strip', xA, 32 - 9, legend_end, 32 + 3)]
for g, (sid, name, rec, fr, f1) in enumerate(ARMS):
    gx = xA + g * groupW
    for i, v in enumerate((rec, fr, f1)):
        x0 = gx + pad + i * (barW + gapW)
        x1 = x0 + barW
        chk(x1 <= xB, 'H2 bar %s/%d right edge %.1f exceeds plot right %.1f' % (sid, i, x1, xB))
        chk(x0 >= xA, 'H2 bar %s/%d left edge %.1f precedes axis %.1f' % (sid, i, x0, xA))
        lab = '%.2f' % v
        lw = tw(lab, 10, bold=True)
        top = yBase - v * plotH
        bar_rects.append(('%s %s label' % (sid, lab), (x0 + x1) / 2 - lw / 2, top - 4 - 10,
                          (x0 + x1) / 2 + lw / 2, top - 4 + 3))
no_overlap(bar_rects, 'H2 bar labels and legend')
print('  12 bar value labels, widest %.1fpx, neighbour pitch %.1fpx, tallest label top %.1f vs legend bottom %.1f'
      % (tw('0.38', 10, True), gapW + barW, yBase - plotH - 14, 35.0))

# x axis labels, two lines per group, must not touch the neighbouring group
spans = []
for g, (sid, name, rec, fr, f1) in enumerate(ARMS):
    gc = xA + g * groupW + groupW / 2
    centred(sid, 12, gc, xA, xB, 'H2 axis short label', bold=True)
    s0, s1 = centred(name, 9, gc, xA, xB, 'H2 axis arm name')
    spans.append((name, s0, s1))
for i in range(3):
    chk(spans[i][2] + 6 <= spans[i + 1][1],
        'H2 axis labels "%s" (ends %.1f) and "%s" (starts %.1f) collide'
        % (spans[i][0], spans[i][2], spans[i + 1][0], spans[i + 1][1]))
print('  axis arm names: ' + ' | '.join('%s %.0f..%.0f' % s for s in spans))

# legend laid out left to right from xA
lx = xA
for lab in ('refusal recall (higher better)', 'false refusal (lower better)', 'refusal F1 (higher better)'):
    lx += 13 + tw(lab, 10) + 22
chk(lx - 22 <= xB, 'H2 legend ends %.1f, plot right %.1f' % (lx - 22, xB))
print('  legend runs %.1f..%.1f (limit %.1f)' % (xA, lx - 22, xB))

# the stacked decomposition bar
sW = xB - xA
cut = xA + sW * 0.75
print('  decomposition bar %.1f..%.1f, cut at %.1f (gate seg %.1fpx, gen seg %.1fpx)'
      % (xA, xB, cut, cut - xA, xB - cut))
centred('6 of 8 come from the GATE', 11, (xA + cut) / 2, xA + 8, cut - 8, 'H2 seg1 title', bold=True)
centred('gate false closure 0.4615 of 13 should-answer items', 10, (xA + cut) / 2, xA + 8, cut - 8, 'H2 seg1 sub')
centred('2 from the generator', 11, (cut + xB) / 2, cut + 8, xB - 8, 'H2 seg2 title', bold=True)
centred('0.2857 of 7 cleared', 10, (cut + xB) / 2, cut + 8, xB - 8, 'H2 seg2 sub')
left('Error decomposition, D2_rule_gate: 8 false refusals out of 13 should-answer items', 12, L, W, 'H2 decomp header', bold=True)
left('The gate closed 6 answerable items before any model call: e2_i06, e2_i07, e2_i10, e2_i11, e2_i12, e2_i15.', 10, xA, W, 'H2 note 1')
left('The generator refused 2 that the gate had cleared: e2_i04 and e2_i08. B2, with no halt language at all, refused both too.', 10, xA, W, 'H2 note 2')
left('C2 and E2 admit no decomposition: every one of the 13 should-answer items was refused, false refusal 1.0000.', 10, xA, W, 'H2 note 3')

h2rows = [('title', 18 - 9, 18 + 3), ('legend', 32 - 9, 32 + 3), ('plot', yT - 14, yBase),
          ('axis short', 268 - 9, 268 + 3), ('axis names', 282 - 7, 282 + 3),
          ('separator', 296, 296), ('decomp header', 320 - 9, 320 + 3),
          ('stacked bar', 336, 386), ('note 1', 402 - 8, 402 + 3), ('note 2', 416 - 8, 416 + 3),
          ('note 3', 436 - 8, 436 + 3)]
for i in range(len(h2rows) - 1):
    chk(h2rows[i][2] <= h2rows[i + 1][1],
        'H2 vertical overlap: %s ends %.0f, %s starts %.0f' % (h2rows[i][0], h2rows[i][2],
                                                               h2rows[i + 1][0], h2rows[i + 1][1]))
chk(h2rows[-1][2] <= 450, 'H2 content ends %.0f, canvas height 450' % h2rows[-1][2])
print('  vertical stack 9..%.0f inside canvas height 450' % h2rows[-1][2])

# =====================================================================
print('H3  cvClause, height 420')
dotX0, dotX1, rateX = fx(0.255), fx(0.657), fx(0.674)
labelLimit = fx(0.241)
print('  label col %.1f..%.1f  dots %.1f..%.1f  rate col from %.1f'
      % (L, labelLimit, dotX0, dotX1, rateX))

centred('Same predicate, two places to evaluate it', 12, W / 2, L, R, 'H3 title', bold=True)
centred('HALT_CLAUSE licenses refusal only when the message carries no SHELL=soviet_outward and no SHELL=rival.', 10, W / 2, L, R, 'H3 sub 1')
centred('Every dot below is a hop-1 message that visibly carried one of those two tags, so the clause did not license refusal.', 10, W / 2, L, R, 'H3 sub 2')

h0, h1 = left('arm and generator prompt', 10, L, dotX0 - 6, 'H3 col header 1')
h2a, h2b = left('one dot per tagged message; filled = refused', 10, dotX0, rateX - 6, 'H3 col header 2')
h3a, h3b = left('refused anyway', 10, rateX, R, 'H3 col header 3')
print('  headers %.0f..%.0f | %.0f..%.0f | %.0f..%.0f' % (h0, h1, h2a, h2b, h3a, h3b))

AUDIT = [('B2_no_halt', 'no halt clause', 11, 4, '0.3636', False),
         ('C2_generator_halt', 'HALT_CLAUSE in prompt', 11, 11, '1.0000', True),
         ('D2_rule_gate', 'no halt clause', 6, 1, '0.1667', False),
         ('E2_rule_gate_plus_typed_halt', 'HALT_CLAUSE in prompt', 6, 6, '1.0000', True)]
pitch = (dotX1 - dotX0) / 11
r = 10.0
print('  11-dot row: pitch %.2f, radius %.1f, last dot right edge %.1f (budget %.1f)'
      % (pitch, r, dotX0 + pitch / 2 + 10 * pitch + r, dotX1))
chk(pitch >= 2 * r + 2, 'H3 dot pitch %.2f too small for radius %.1f (dots would touch)' % (pitch, r))
chk(dotX0 + pitch / 2 + 10 * pitch + r <= dotX1 + 0.01, 'H3 11-dot row overflows its column')

for name, prompt, n, refused, rate, clause in AUDIT:
    fits(name, 10, labelLimit - L, 'H3 arm label', bold=True)
    fits(prompt, 9, labelLimit - L, 'H3 prompt sub')
    left('%d of %d refused anyway, rate %s' % (refused, n, rate), 10, rateX, R,
         'H3 rate text', bold=clause)

pitch2 = (dotX1 - dotX0) / 18
r2 = 7.0
print('  18-dot row: pitch %.2f, radius %.1f, last dot right edge %.1f (budget %.1f)'
      % (pitch2, r2, dotX0 + pitch2 / 2 + 17 * pitch2 + r2, dotX1))
chk(pitch2 >= 2 * r2 + 2, 'H3 R3 dot pitch %.2f too small for radius %.1f' % (pitch2, r2))
chk(dotX0 + pitch2 / 2 + 17 * pitch2 + r2 <= dotX1 + 0.01, 'H3 18-dot row overflows its column')
fits('R3: the clause as a rule', 10, labelLimit - L, 'H3 R3 label', bold=True)
fits('same wording, in Python', 9, labelLimit - L, 'H3 R3 sub')
left('1 of 18 closed by the rule', 10, rateX, R, 'H3 R3 rate', bold=True)

left('The clause was never wrong about which items to refuse. It was never evaluated as a condition.', 12, L + 14, R - 8, 'H3 verdict 1', bold=True)
left('Remove HALT_CLAUSE from the generator prompt once a correct gate exists upstream.', 10, L + 14, R - 8, 'H3 verdict 2')
left('Kept as a backup it destroys every item the gate worked to clear: E2 refused 7 of 7 cleared items, D2 refused 2 of 7.', 10, L + 14, R - 8, 'H3 verdict 3')

h3rows = [('title', 18 - 9, 18 + 3), ('sub 1', 36 - 8, 36 + 3), ('sub 2', 50 - 8, 50 + 3),
          ('col headers', 78 - 8, 78 + 3), ('rule', 86, 86)]
for i, (name, prompt, n, refused, rate, clause) in enumerate(AUDIT):
    y = 112 + i * 44
    h3rows.append(('row %s band' % name.split('_')[0], y - 20, y + 20))
    h3rows.append(('row %s sub' % name.split('_')[0], y + 11 - 7, y + 11 + 3))
h3rows += [('separator', 276, 276), ('R3 dots', 304 - 7, 304 + 7), ('R3 sub', 315 - 7, 315 + 3),
           ('verdict box', 336, 404)]
for i in range(len(h3rows) - 1):
    chk(h3rows[i][2] <= h3rows[i + 1][1],
        'H3 vertical overlap: %s ends %.0f, %s starts %.0f' % (h3rows[i][0], h3rows[i][2],
                                                               h3rows[i + 1][0], h3rows[i + 1][1]))
chk(h3rows[-1][2] <= 420, 'H3 content ends %.0f, canvas height 420' % h3rows[-1][2])
print('  vertical stack 9..%.0f inside canvas height 420' % h3rows[-1][2])

# =====================================================================
print()
print('%d checks run, %d failures' % (CHECKS[0], len(FAILS)))
for f in FAILS:
    print('  - ' + f)
