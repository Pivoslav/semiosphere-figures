/* Motion controls for the 3D pages built in the thesis lab: Lotman L1, the
   L1 demo, L2, L3 and the semiosphere embedding. Injected by
   scripts/sanitize_public_site.py, which also patches each page so that its
   OrbitControls instance is reachable as window.FIG_CONTROLS and, on L1, so
   that the relay pulses follow window.FIG_MOTION.pulses.

   Every page gets "Turn the model". L1 also gets "Play relays / Pause relays",
   and L3 gets a guided "Play before and after" camera move between its two
   planes. Nothing here starts on its own. */
(function () {
  "use strict";

  var CSS =
    ".fig-motionbar{display:flex;flex-wrap:wrap;gap:.45rem .6rem;align-items:center;margin:.55rem 0 .35rem;" +
    "font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:.8rem}" +
    ".fig-motionbar button{font:inherit;padding:.35rem .6rem;border:1px solid #d8d0c4;border-radius:5px;background:#fff;color:#1a1814;cursor:pointer}" +
    ".fig-motionbar button:hover{border-color:#2a4a6f;color:#2a4a6f}" +
    ".fig-motionbar button[aria-pressed=true]{border-color:#2a4a6f;background:#eef2f7}" +
    ".fig-motionbar .hint{color:#5c564c}" +
    ".fig-motionbar .say{flex-basis:100%;margin:.15rem 0 0;color:#3b4a5c;font-size:.84rem;min-height:1.2em}";

  function waitFor(test, done, tries) {
    var v = test();
    if (v) return done(v);
    if ((tries || 0) > 100) return;
    setTimeout(function () { waitFor(test, done, (tries || 0) + 1); }, 100);
  }

  function button(label) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.setAttribute("aria-pressed", "false");
    return b;
  }

  function ease(k) { return k * k * (3 - 2 * k); }

  /* L3: move the view from the before-1983 plane (y = -3) to the after-1983
     plane (y = +3) and back, keeping the camera's angle. */
  function explosionTour(controls, say, btn) {
    var cam = controls.object, target = controls.target;
    var offset = cam.position.clone().sub(target);
    var home = target.clone();
    var THREE_V = target.constructor;
    var steps = [
      { y: -3, move: 1.6, hold: 3.2, text: "Before 1983: two memos, three topics, three links. Scare quotes, operational vocabulary and nationalist actors travel together." },
      { y: 3, move: 2.4, hold: 3.6, text: "After 1983: fourteen memos. Four new topics appear, among them a quoted «artificial famine» and a hostile «gathering», and the sixteen red lines are pairings that never occurred before." },
      { y: home.y, move: 1.6, hold: 0, text: "Both periods together. Grey pillars join each topic that carries across the break." }
    ];
    var i = 0, t = 0, from = target.y, last = 0, raf = 0, active = false;
    function stop() {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      btn.textContent = "Play before and after";
      btn.setAttribute("aria-pressed", "false");
    }
    function frame(now) {
      var dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      var st = steps[i];
      t += dt;
      var k = Math.min(1, t / st.move);
      var y = from + (st.y - from) * ease(k);
      target.set(home.x, y, home.z);
      cam.position.copy(new THREE_V(home.x, y, home.z).add(offset));
      if (say.textContent !== st.text) say.textContent = st.text;
      if (t >= st.move + st.hold) {
        i += 1; t = 0; from = st.y;
        if (i >= steps.length) { stop(); return; }
      }
      raf = requestAnimationFrame(frame);
    }
    return function toggle() {
      if (active) { stop(); return; }
      active = true; i = 0; t = 0; last = 0; from = target.y;
      offset = cam.position.clone().sub(target);
      btn.textContent = "Stop";
      btn.setAttribute("aria-pressed", "true");
      raf = requestAnimationFrame(frame);
    };
  }

  function build(controls) {
    if (document.querySelector(".fig-motionbar")) return;
    var stage = document.getElementById("viz-stage");
    if (!stage || !stage.parentNode) return;

    var st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);

    var bar = document.createElement("div");
    bar.className = "fig-motionbar";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Motion controls");
    var say = document.createElement("p");
    say.className = "say";
    say.setAttribute("aria-live", "polite");

    var turn = button("Turn the model");
    turn.addEventListener("click", function () {
      controls.autoRotate = !controls.autoRotate;
      controls.autoRotateSpeed = 1.6;
      turn.textContent = controls.autoRotate ? "Stop turning" : "Turn the model";
      turn.setAttribute("aria-pressed", controls.autoRotate ? "true" : "false");
    });

    var motion = window.FIG_MOTION;
    if (motion && motion.hasPulses) {
      var pulses = button(motion.pulses ? "Pause relays" : "Play relays");
      pulses.setAttribute("aria-pressed", motion.pulses ? "true" : "false");
      pulses.addEventListener("click", function () {
        motion.pulses = !motion.pulses;
        pulses.textContent = motion.pulses ? "Pause relays" : "Play relays";
        pulses.setAttribute("aria-pressed", motion.pulses ? "true" : "false");
        say.textContent = motion.pulses
          ? "Sky-blue dots run along the two proven thematic relays, from spr. 1206 to the embassy release and to Novosti."
          : "";
      });
      bar.appendChild(pulses);
    }

    if (/fig-lotman-explosion-3d/.test(window.location.pathname)) {
      var tourBtn = button("Play before and after");
      tourBtn.addEventListener("click", explosionTour(controls, say, tourBtn));
      bar.appendChild(tourBtn);
    }

    bar.appendChild(turn);
    var hint = document.createElement("span");
    hint.className = "hint";
    hint.textContent = "Drag to turn · scroll to zoom";
    bar.appendChild(hint);
    bar.appendChild(say);
    stage.parentNode.insertBefore(bar, stage.nextSibling);
  }

  function start() { waitFor(function () { return window.FIG_CONTROLS; }, build); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
