(function () {
        "use strict";
        var pref = { mode: "dark", accent: "#8b5cf6" },
          $ = function (x) {
            return document.getElementById(x);
          };
        try {
          pref = Object.assign(
            pref,
            JSON.parse(localStorage.getItem("themeshift:v1") || "{}"),
          );
        } catch (x) {}
        function resolved() {
          return pref.mode === "system"
            ? matchMedia("(prefers-color-scheme:light)").matches
              ? "light"
              : "dark"
            : pref.mode;
        }
        function draw() {
          var light = resolved() === "light";
          $("preview").classList.toggle("light", light);
          document.documentElement.style.setProperty("--a", pref.accent);
          $("token").textContent =
            "--mode: " +
            pref.mode +
            ";  --resolved: " +
            resolved() +
            ";  --accent: " +
            pref.accent +
            ";";
          document.querySelectorAll("[data-mode]").forEach(function (x) {
            x.classList.toggle("active", x.dataset.mode === pref.mode);
          });
          document.querySelectorAll("[data-accent]").forEach(function (x) {
            x.classList.toggle("active", x.dataset.accent === pref.accent);
          });
          localStorage.setItem("themeshift:v1", JSON.stringify(pref));
        }
        document.querySelectorAll("[data-mode]").forEach(function (x) {
          x.onclick = function () {
            pref.mode = x.dataset.mode;
            draw();
          };
        });
        document.querySelectorAll("[data-accent]").forEach(function (x) {
          x.onclick = function () {
            pref.accent = x.dataset.accent;
            draw();
          };
        });
        matchMedia("(prefers-color-scheme:light)").addEventListener(
          "change",
          function () {
            if (pref.mode === "system") draw();
          },
        );
        draw();
      })();
