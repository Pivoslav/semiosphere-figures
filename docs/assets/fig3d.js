/* Shared Three.js stage for the 3D companion pages (three@0.128 globals:
   THREE, THREE.OrbitControls, optional THREE.CSS2DRenderer).

   Renders on demand. Nothing draws while the scene is still, the tab is
   hidden, or the stage is scrolled out of view. Nothing moves until the
   reader presses a button: a page's tick function runs only while
   setRunning(true) is in effect, and returns false to stop itself. A system
   "reduce motion" setting is honoured by never autoplaying; motion the reader
   asks for with Play or Turn still runs. */
(function (global) {
  "use strict";

  var reduce = !!(global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function stage(opts) {
    opts = opts || {};
    var el = document.getElementById(opts.stageId || "viz-stage");
    var mount = document.getElementById(opts.mountId || "viz3d");

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(opts.background != null ? opts.background : 0xfaf8f4);
    var camera = new THREE.PerspectiveCamera(opts.fov || 45, 1, 0.1, opts.far || 100);
    camera.position.fromArray(opts.camera || [0, 4, 9]);

    var renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(global.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    var labels = null;
    if (THREE.CSS2DRenderer) {
      labels = new THREE.CSS2DRenderer();
      var ls = labels.domElement.style;
      ls.position = "absolute";
      ls.inset = "0";
      ls.pointerEvents = "none";
      mount.appendChild(labels.domElement);
    }

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.12;
    controls.target.fromArray(opts.target || [0, 0.5, 0]);
    if (opts.minDistance) controls.minDistance = opts.minDistance;
    if (opts.maxDistance) controls.maxDistance = opts.maxDistance;

    scene.add(new THREE.AmbientLight(0xffffff, opts.ambient != null ? opts.ambient : 0.7));
    var sun = new THREE.DirectionalLight(0xffffff, opts.sun != null ? opts.sun : 0.8);
    sun.position.set(5, 8, 4);
    scene.add(sun);

    var tickFn = null, running = false, onScreen = true, dirty = true, raf = 0, last = 0;

    function canDraw() { return onScreen && !document.hidden; }

    function frame(now) {
      raf = 0;
      if (!canDraw()) { last = 0; return; }
      var dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      var animating = false;
      if (running && tickFn) {
        animating = tickFn(dt, now) !== false;
        if (!animating) setRunning(false);
        dirty = true;
      }
      var moving = controls.update();
      if (dirty || moving) {
        renderer.render(scene, camera);
        if (labels) labels.render(scene, camera);
        dirty = false;
      }
      if ((animating || moving) && !raf) raf = global.requestAnimationFrame(frame);
      else if (!animating && !moving) last = 0;
    }

    function requestRender() {
      dirty = true;
      if (!raf && canDraw()) raf = global.requestAnimationFrame(frame);
    }

    function resize() {
      var w = Math.max(el.clientWidth, 280), h = Math.max(el.clientHeight, 240);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (labels) labels.setSize(w, h);
      requestRender();
    }

    function setRunning(on) {
      running = !!on;
      if (opts.onRunningChange) opts.onRunningChange(running);
      if (running) requestRender();
    }

    controls.addEventListener("change", requestRender);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) requestRender(); });
    if ("ResizeObserver" in global) new ResizeObserver(resize).observe(el);
    else global.addEventListener("resize", resize);
    if ("IntersectionObserver" in global) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        if (onScreen) requestRender();
      }).observe(el);
    }
    resize();

    function label(text, pos, cls) {
      if (!labels) return null;
      var d = document.createElement("div");
      d.className = "lbl" + (cls ? " " + cls : "");
      d.textContent = text;
      var o = new THREE.CSS2DObject(d);
      o.position.copy(pos);
      scene.add(o);
      return o;
    }

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      controls: controls,
      reduce: reduce,
      label: label,
      requestRender: requestRender,
      setRunning: setRunning,
      isRunning: function () { return running; },
      onTick: function (fn) { tickFn = fn; }
    };
  }

  /* Wire a Play/Pause button to a stage. */
  function playButton(btn, s, labels) {
    labels = labels || {};
    var playText = labels.play || btn.textContent || "Play";
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", function () { s.setRunning(!s.isRunning()); });
    return function sync(running) {
      btn.textContent = running ? (labels.pause || "Pause") : playText;
      btn.setAttribute("aria-pressed", running ? "true" : "false");
    };
  }

  /* Wire a Turn button that slowly spins the model around its centre. Dragging
     still works while it turns. */
  function turnButton(btn, s, labels) {
    labels = labels || {};
    var on = labels.on || "Stop turning", off = labels.off || btn.textContent || "Turn the model";
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", function () {
      var c = s.controls;
      c.autoRotate = !c.autoRotate;
      c.autoRotateSpeed = 1.6;
      btn.textContent = c.autoRotate ? on : off;
      btn.setAttribute("aria-pressed", c.autoRotate ? "true" : "false");
      s.requestRender();
    });
  }

  global.Fig3D = { stage: stage, playButton: playButton, turnButton: turnButton, reduce: reduce };
})(window);
