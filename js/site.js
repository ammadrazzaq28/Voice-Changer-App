/* Shared nav, year, reveal, effect chips */
(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector("[data-nav-toggle]");
  var menu = document.querySelector("[data-nav-menu]");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var reduces = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nodes = document.querySelectorAll(".reveal");
  if (reduces || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) {
      el.classList.add("is-in");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  var chips = document.querySelectorAll("[data-effect-chips] .effect-chip");
  if (chips.length && !reduces) {
    var i = 0;
    setInterval(function () {
      chips.forEach(function (c) {
        c.classList.remove("is-active");
      });
      i = (i + 1) % chips.length;
      chips[i].classList.add("is-active");
    }, 1800);
  }
})();
