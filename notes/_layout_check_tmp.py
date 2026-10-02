# Arithmetic layout check for docs/embed/fig-transmission-cells.html
# No browser available: approximate text advance widths with Arial/Helvetica
# metrics (units per 1000 em), which track system-ui (Segoe UI) closely.
# Georgia gets a 1.10 factor, bold a 1.07 factor. Both are conservative
# (over-estimates), so "fits" here means fits with margin in the real font.

W = {}
for ch, adv in [
    (' ', 278), ('!', 278), ('"', 355), ('#', 556), ('$', 556), ('%', 889), ('&', 667),
    ("'", 191), ('(', 333), (')', 333), ('*', 389), ('+', 584), (',', 278), ('-', 333),
    ('.', 278), ('/', 278), (':', 278), (';', 278), ('?', 556), ('[', 278), (']', 278),
    ('_', 556), ('=', 584), ('<', 584), ('>', 584),
]:
    W[ch] = adv
for d in '0123456789':
    W[d] = 556
for ch, adv in zip('ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                   [667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611]):
    W[ch] = adv
for ch, adv in zip('abcdefghijklmnopqrstuvwxyz',
                   [556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500]):
    W[ch] = adv


def tw(text, size, bold=False, georgia=False):
    u = sum(W.get(c, 556) for c in text) / 1000.0
    f = 1.0
    if bold:
        f *= 1.07
    if georgia:
        f *= 1.10
    return u * size * f


FAILS = []


def chk(tag, left, right, lo, hi, left_is_anchor=False):
    # report the trailing-edge clearance; a deliberate left inset is not slack
    ok = left >= lo - 0.5 and right <= hi + 0.5
    slack = hi - right
    if not ok:
        FAILS.append((tag, round(left, 1), round(right, 1), lo, hi, round(min(left - lo, hi - right), 1)))
    return ok, slack


def left_text(tag, x, text, size, bound_lo, bound_hi, bold=False, georgia=False):
    return chk(tag, x, x + tw(text, size, bold, georgia), bound_lo, bound_hi,
               left_is_anchor=(abs(x - bound_lo) < 1e-9))


def ctr_text(tag, x, text, size, bound_lo, bound_hi, bold=False, georgia=False):
    half = tw(text, size, bold, georgia) / 2.0
    return chk(tag, x - half, x + half, bound_lo, bound_hi)


WIDTHS = [846, 760, 700, 640, 560]
report = {}

for w in WIDTHS:
    worst = []

    def rec(name, res):
        worst.append((round(res[1], 1), name))

    # ---------------- T1 ----------------
    L, R, T, B = 92, w - 20, 52, 372
    midX = (L + R) / 2.0
    cw = midX - L
    chh = 160.0
    midY = 212.0

    rec('T1 panelTitle', ctr_text('T1 panelTitle', (L + R) / 2,
        'Change of volume by what the receiver adds', 12, 0, w, bold=True))

    # top-left cell: I-s/he
    rec('T1 TL title', left_text('T1 TL title', L + 12, 'I-s/he', 13, L, midX, bold=True, georgia=True))
    for r in ['transmission, volume unchanged', 'code and message invariant',
              'addresser and addressee variable']:
        rec('T1 TL row', left_text('T1 TL row', L + 12, r, 10, L, midX))
    tag_w = tw('Lotman', 9.5) + 12
    rec('T1 TL tag vs title', chk('T1 TL tag vs title',
        L + 12 + tw('I-s/he', 13, True, True), midX - 10 - tag_w, 0, w))

    # bottom-left cell: presemiotic
    rec('T1 BL title', left_text('T1 BL title', L + 12, 'Presemiotic binding', 13, L, midX, bold=True, georgia=True))
    for r in ['a chain of biochemical impulses', 'regulating one organism',
              'recipient valued for transparency', 'adds nothing of its own']:
        rec('T1 BL row', left_text('T1 BL row', L + 12, r, 10, L, midX))
    tag_w = tw('Lotman, the floor', 9.5) + 12
    rec('T1 BL tag vs title', chk('T1 BL tag vs title',
        L + 12 + tw('Presemiotic binding', 13, True, True), midX - 10 - tag_w, 0, w))
    rec('T1 toolcall box', chk('T1 toolcall box', L + 12,
        L + 12 + tw('a tool call sits here', 10) + 12, L, midX))

    # bottom-right cell: I-I
    rec('T1 BR title', left_text('T1 BR title', midX + 12, 'I-I, autocommunication', 13, midX, R, bold=True, georgia=True))
    for r in ['volume increases', 'second code is structural only:',
              'rhythm, ornament, repetition', 'adds no content of its own']:
        rec('T1 BR row', left_text('T1 BR row', midX + 12, r, 10, midX, R))
    tag_w = tw('Lotman', 9.5) + 12
    rec('T1 BR tag vs title', chk('T1 BR tag vs title',
        midX + 12 + tw('I-I, autocommunication', 13, True, True), midX + cw - 10 - tag_w, 0, w))

    # top-right cell: unnamed + MA13 point
    rec('T1 TR title', left_text('T1 TR title', midX + 12, 'The unnamed cell', 13, midX, R, bold=True, georgia=True))
    for r in ['volume increases and the receiver', 'adds substantial content']:
        rec('T1 TR row', left_text('T1 TR row', midX + 12, r, 10, midX, R))
    tag_w = tw('measured', 9.5) + 12
    rec('T1 TR tag vs title', chk('T1 TR tag vs title',
        midX + 12 + tw('The unnamed cell', 13, True, True), midX + cw - 10 - tag_w, 0, w))

    px = midX + cw * 0.10
    rec('T1 MA13 head', left_text('T1 MA13 head', px + 14, 'MA13, measured', 10.5, midX, R, bold=True))
    for r in ['volume x 4.4 at the median', 'content gain 0.84 at the median',
              'n = 26 real delegations']:
        rec('T1 MA13 row', left_text('T1 MA13 row', px + 14, r, 10, midX, R))

    rec('T1 tick unchanged', ctr_text('T1 tick unchanged', L + cw / 2, 'unchanged', 10, 0, midX))
    rec('T1 tick increases', ctr_text('T1 tick increases', midX + cw / 2, 'increases', 10, midX, w))
    rec('T1 axis title', ctr_text('T1 axis title', (L + R) / 2,
        'volume of information across the exchange', 11, 0, w))
    # rotated: vertical extent must sit inside T..B
    rec('T1 vaxis span', chk('T1 vaxis span', midY - tw('content the receiver adds of its own', 11) / 2,
        midY + tw('content the receiver adds of its own', 11) / 2, T, B))
    rec('T1 vtick substantial', chk('T1 vtick substantial', T + chh / 2 - tw('substantial', 10) / 2,
        T + chh / 2 + tw('substantial', 10) / 2, T, midY))
    rec('T1 vtick none', chk('T1 vtick none', midY + chh / 2 - tw('none', 10) / 2,
        midY + chh / 2 + tw('none', 10) / 2, midY, B))

    # ---------------- T2 ----------------
    llx, lrx, tx = 104, w - 104, 116
    rec('T2 panelTitle', ctr_text('T2 panelTitle', w / 2,
        'What crosses between two semiotic systems', 12, 0, w, bold=True))
    lanes = [
        ('Texts: TRANSLATED', 'recoded into the other language; part is cut off',
         'wrong word: the text does not stay itself', 'a text'),
        ('Meaning: GENERATED', 'arises between two non-identical codes',
         'wrong word: a chain excludes new messages', 'nothing crosses whole'),
        ('Codes and metatexts: TRANSMITTED', 'arrive intact, one level below meaning',
         'the only lane where transmission is correct', 'code / metatext'),
    ]
    for head, under, verdict, moving in lanes:
        rec('T2 head', left_text('T2 head', tx, head, 12, llx, lrx, bold=True))
        rec('T2 under', left_text('T2 under', tx, under, 10, llx, lrx))
        rec('T2 verdict', left_text('T2 verdict', tx, verdict, 10, llx, lrx, bold=True))
        box = tw(moving, 10) + 8
        rec('T2 edgeLabel', chk('T2 edgeLabel', w / 2 - box / 2, w / 2 + box / 2, llx, lrx))
        # edgeLabel box must not sit on top of the left-aligned verdict/under text
        rec('T2 label vs under', chk('T2 label vs under',
            tx + tw(under, 10), w / 2 - box / 2, 0, w))
    rec('T2 nodeSub A', ctr_text('T2 nodeSub A', 62, 'generator', 10, 0, llx))
    rec('T2 nodeSub B', ctr_text('T2 nodeSub B', w - 62, 'generator', 10, lrx, w))
    rec('T2 quote', ctr_text('T2 quote', w / 2,
        '1983: "exchange of metatexts, of codes, which are transmitted from one hemisphere of culture to another"',
        10, 0, w, georgia=True))

    # ---------------- T3 ----------------
    half = w / 2.0
    olx, olr, orx, orr = 20, half - 16, half + 16, w - 20
    rec('T3 title L', ctr_text('T3 title L', half / 2, 'Enlargement: the colour case (1983)', 12, 0, half, bold=True))
    rec('T3 title R', ctr_text('T3 title R', half + half / 2, 'Collapse: the halt clause (MA4b)', 12, half, w, bold=True))
    rec('T3 sub L', left_text('T3 sub L', olx, 'a language of distinctions is worked out', 10, olx, olr))
    rec('T3 sub R', left_text('T3 sub R', orx, 'the halt clause is handed over as code', 10, orx, orr))

    for x0, x1, lab, note in [(olx, olr, 'before', 'the same'), (olx, olr, 'after', 'told apart'),
                              (orx, orr, 'before', 'told apart'), (orx, orr, 'after', 'all refused')]:
        rec('T3 swatch label', chk('T3 swatch label', x0, x0 + tw(lab, 10, True), x0, x0 + 46, True))
        rec('T3 swatch note', left_text('T3 swatch note', x0 + 166, note, 10, x0 + 156, x1))

    for x0, x1, txt in [(olx, olr, 'distinctions cross as code'), (orx, orr, 'the clause crosses as code')]:
        box = tw(txt, 10) + 8
        rec('T3 arrow label', chk('T3 arrow label', x0 + 158 - box / 2, x0 + 158 + box / 2, x0 + 72, x1))

    rec('T3 band L head', left_text('T3 band L head', olx + 10, 'Receiver gains a distinction', 11, olx, olr, bold=True))
    rec('T3 band L det', left_text('T3 band L det', olx + 10, 'it sees shades it could not see', 10, olx, olr))
    rec('T3 band R head', left_text('T3 band R head', orx + 10, 'Receiver loses the distinction', 11, orx, orr, bold=True))
    rec('T3 band R det', left_text('T3 band R det', orx + 10, 'refusal recall 1.00, false refusal 1.00', 10, orx, orr))

    for r in ['distinctions arrive as linguistic code', 'and ordinary consciousness then sees',
              'shades previously indistinguishable']:
        rec('T3 L row', left_text('T3 L row', olx, r, 10, olx, olr))
    rec('T3 L cite', left_text('T3 L cite', olx, 'Asimmetriya i dialog, 1983, printed p. 18', 9.5, olx, olr))
    rec('T3 L diag', left_text('T3 L diag', olx, 'the receiver could evaluate the code', 10.5, olx, olr, bold=True))
    for r in ['his example, not a measurement:', 'the enlargement side is unmeasured']:
        rec('T3 L grey', left_text('T3 L grey', olx, r, 9.5, olx, olr))

    for r in ['11 of 11 items whose own message carried', 'the tags the clause names as grounds',
              'for answering were refused anyway']:
        rec('T3 R row', left_text('T3 R row', orx, r, 10, orx, orr))
    rec('T3 R cite', left_text('T3 R cite', orx, 'MA4b arm C2, llama3.2:3b, 18 items', 9.5, orx, orr))
    rec('T3 R diag', left_text('T3 R diag', orx, 'the receiver could only pattern-match', 10.5, orx, orr, bold=True))
    rec('T3 R tablehead', left_text('T3 R tablehead', orx, 'same predicate, evaluated by a rule:', 10, orx, orr))

    bandW = orr - orx
    cols = [orx + bandW * 0.50, orx + bandW * 0.71, orx + bandW * 0.92]
    heads = ['recall', 'false refusal', 'F1']
    for i, hd in enumerate(heads):
        lo = orx if i == 0 else cols[i - 1] + tw(heads[i - 1], 9.5) / 2
        rec('T3 col head ' + hd, ctr_text('T3 col head ' + hd, cols[i], hd, 9.5, lo, orr))
    for lab in ['halt clause', 'rule layer']:
        rec('T3 row label vs col0', chk('T3 row label vs col0', orx + tw(lab, 9.5),
            cols[0] - tw('1.00', 10) / 2, 0, w))
    for i in range(3):
        lo = cols[i - 1] + tw('1.00', 10) / 2 if i else orx + tw('rule layer', 9.5)
        rec('T3 val col %d' % i, ctr_text('T3 val col %d' % i, cols[i], '1.00', 10, lo, orr))

    worst.sort()
    report[w] = worst[:8]

# ---------------- vertical stacking checks (width independent) ----------------
# glyph box: ascender 0.75em above baseline, descender 0.22em below
VFAILS = []


def vstack(tag, items, lo, hi):
    """items: list of (baseline, em). Checks top>lo, bottom<hi, no row overlap."""
    prev_bottom = lo
    for baseline, em in items:
        top = baseline - 0.75 * em
        bottom = baseline + 0.22 * em
        if top < prev_bottom - 0.01:
            VFAILS.append((tag, 'overlap at baseline %.1f: top %.1f < %.1f' % (baseline, top, prev_bottom)))
        prev_bottom = bottom
    if prev_bottom > hi + 0.01:
        VFAILS.append((tag, 'overruns bottom: %.1f > %d' % (prev_bottom, hi)))
    return prev_bottom


# T1 top-right cell (52..212): title, 2 rows, then the MA13 four-line label
py = 52 + 160 * 0.58
vstack('T1 TR cell', [(70, 13), (86, 10), (99, 10),
                      (py - 19, 10.5), (py - 6, 10), (py + 7, 10), (py + 20, 10)], 52, 212)
# T1 bottom-left cell (212..372): title, 4 rows, tool-call box 294..312
vstack('T1 BL cell', [(230, 13), (246, 10), (259, 10), (272, 10), (285, 10)], 212, 294)
vstack('T1 BL tagbox', [(307, 10)], 294, 312)
# T1 bottom-right cell
vstack('T1 BR cell', [(230, 13), (246, 10), (259, 10), (272, 10), (285, 10)], 212, 372)
# T1 axis furniture below the plot (372..420)
vstack('T1 axis labels', [(388, 10), (404, 11)], 372, 420)

# T2 lane interior (0..76 local): head 18, under 34, edgeLabel box 43..57, verdict 70
vstack('T2 lane above label', [(18, 12), (34, 10)], 0, 43)
vstack('T2 lane below label', [(70, 10)], 57, 76)
# T2 last lane ends 316; quote at 340; canvas 360
vstack('T2 quote', [(340, 10)], 316, 360)

# T3 left column, after the band ends at 222
vstack('T3 left column', [(240, 10), (253, 10), (266, 10), (280, 9.5), (306, 10.5),
                          (332, 9.5), (345, 9.5)], 222, 400)
# T3 right column, band ends 222, rule line at 353
vstack('T3 right column', [(240, 10), (253, 10), (266, 10), (280, 9.5), (306, 10.5),
                           (330, 10), (348, 9.5)], 222, 353)
vstack('T3 right table rows', [(364, 10), (380, 10)], 353, 400)
# T3 swatch rows and the arrow between them
vstack('T3 swatch row 1', [(77, 10)], 58, 88)
vstack('T3 arrow label', [(114, 10)], 92, 130)
vstack('T3 swatch row 2', [(155, 10)], 136, 166)
vstack('T3 band interior', [(198, 11), (214, 10)], 180, 222)

print('VERTICAL FAILURES:', len(VFAILS))
for f in VFAILS:
    print('  VFAIL', f)
print()
print('FAILURES:', len(FAILS))
for f in FAILS:
    print('  FAIL', f)
print()
for w in WIDTHS:
    print('canvas width %d px - tightest 8 clearances (px):' % w)
    for slack, name in report[w]:
        print('    %7.1f  %s' % (slack, name))
    print()
