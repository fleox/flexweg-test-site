import { useCmsData as C, toast as L, getCurrentPublishContext as B, i18n as A, pickPublicLocale as H } from "@agent-cms/runtime";
import { jsxs as c, jsx as i } from "react/jsx-runtime";
import { useState as M, useEffect as E } from "react";
import { useTranslation as F } from "react-i18next";
const j = `# Reading Time

Shows the estimated reading time ("6 min de lecture", "6 min read") above and/or below each post, in the page's language.

- Computed at publish time from the rendered text of the post (editor blocks included), at a configurable reading speed (220 words per minute by default).
- Works with any theme and with the multilingual plugin: each translation gets its own count and its own language.
- Settings: speed, position (top / bottom / both), style (badge or text), pages on/off, minimum duration, custom text per language.

After changing the settings, regenerate all HTML pages so published posts pick them up.
`, d = {
  enabled: !0,
  wordsPerMinute: 220,
  position: "top",
  style: "badge",
  includePages: !1,
  minMinutes: 1,
  labels: {}
}, x = ["top", "bottom", "both"], w = ["badge", "text"];
function f(a) {
  const t = a && typeof a == "object" ? a : {}, e = Number(t.wordsPerMinute), l = Number(t.minMinutes);
  return {
    enabled: t.enabled ?? d.enabled,
    wordsPerMinute: Number.isFinite(e) && e >= 100 && e <= 400 ? Math.round(e) : d.wordsPerMinute,
    position: x.includes(t.position) ? t.position : d.position,
    style: w.includes(t.style) ? t.style : d.style,
    includePages: t.includePages ?? d.includePages,
    minMinutes: Number.isFinite(l) && l >= 0 && l <= 30 ? Math.round(l) : d.minMinutes,
    labels: { ...t.labels && typeof t.labels == "object" ? t.labels : {} }
  };
}
const R = {
  enabled: { description: "Show the estimated reading time on posts. Pages must be regenerated (`regenerate all`) after a change." },
  wordsPerMinute: { description: "Reading speed used to compute the time: minutes = words / wordsPerMinute, rounded up.", min: 100, max: 400, format: "integer" },
  position: { description: "Where the reading time is shown in the post body: above the text, below it, or both.", values: x },
  style: { description: "Look of the reading time: a pill-shaped badge with a clock icon, or a discreet line of text.", values: w },
  includePages: { description: "Also show it on pages (not only posts). The static home page is never included." },
  minMinutes: { description: "Hide the reading time on entries shorter than this many minutes (0 = always show).", min: 0, max: 30, format: "integer" },
  labels: {
    description: 'Optional custom text per language, keyed by language code; {minutes} is replaced by the number, e.g. {"fr":"Lecture : {minutes} min","en":"{minutes}-minute read"}. A missing language uses the built-in text ("{minutes} min de lecture" / "{minutes} min read").',
    format: "map of language code → text containing {minutes}"
  }
};
function $({ config: a, save: t }) {
  var v;
  const { t: e } = F("reading-time"), { settings: l } = C(), [n, o] = M(() => f(a)), [r, u] = M(!1);
  E(() => o(f(a)), [a]);
  const m = ((v = l == null ? void 0 : l.pluginConfigs) == null ? void 0 : v["agentcms-multilang"]) ?? {}, p = Array.from(
    new Set([((l == null ? void 0 : l.language) || "en").split("-")[0], ...m.enabledLanguages ?? []].filter(Boolean))
  );
  async function b(s) {
    s.preventDefault(), u(!0);
    try {
      const g = {};
      for (const [T, N] of Object.entries(n.labels)) N.trim() && (g[T] = N.trim());
      await t({ ...n, labels: g }), L.success(e("settings.saved"));
    } finally {
      u(!1);
    }
  }
  const h = {
    top: e("settings.positionTop"),
    bottom: e("settings.positionBottom"),
    both: e("settings.positionBoth")
  }, S = { badge: e("settings.styleBadge"), text: e("settings.styleText") };
  return /* @__PURE__ */ c("form", { onSubmit: b, "data-form-type": "other", className: "max-w-xl space-y-4", children: [
    /* @__PURE__ */ i("h1", { className: "text-xl font-semibold", children: e("settings.title") }),
    /* @__PURE__ */ i("p", { className: "text-sm text-surface-500", children: e("settings.intro") }),
    /* @__PURE__ */ c("label", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ i("input", { type: "checkbox", checked: n.enabled, onChange: (s) => o({ ...n, enabled: s.target.checked }) }),
      /* @__PURE__ */ i("span", { className: "text-sm", children: e("settings.enabled") })
    ] }),
    /* @__PURE__ */ c("label", { className: "block space-y-1", children: [
      /* @__PURE__ */ i("span", { className: "label", children: e("settings.wordsPerMinute") }),
      /* @__PURE__ */ i(
        "input",
        {
          type: "number",
          min: 100,
          max: 400,
          step: 10,
          className: "input w-full",
          value: n.wordsPerMinute,
          onChange: (s) => o({ ...n, wordsPerMinute: Number(s.target.value) })
        }
      )
    ] }),
    /* @__PURE__ */ c("label", { className: "block space-y-1", children: [
      /* @__PURE__ */ i("span", { className: "label", children: e("settings.position") }),
      /* @__PURE__ */ i("select", { className: "input w-full", value: n.position, onChange: (s) => o({ ...n, position: s.target.value }), children: x.map((s) => /* @__PURE__ */ i("option", { value: s, children: h[s] }, s)) })
    ] }),
    /* @__PURE__ */ c("label", { className: "block space-y-1", children: [
      /* @__PURE__ */ i("span", { className: "label", children: e("settings.style") }),
      /* @__PURE__ */ i("select", { className: "input w-full", value: n.style, onChange: (s) => o({ ...n, style: s.target.value }), children: w.map((s) => /* @__PURE__ */ i("option", { value: s, children: S[s] }, s)) })
    ] }),
    /* @__PURE__ */ c("label", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ i("input", { type: "checkbox", checked: n.includePages, onChange: (s) => o({ ...n, includePages: s.target.checked }) }),
      /* @__PURE__ */ i("span", { className: "text-sm", children: e("settings.includePages") })
    ] }),
    /* @__PURE__ */ c("label", { className: "block space-y-1", children: [
      /* @__PURE__ */ i("span", { className: "label", children: e("settings.minMinutes") }),
      /* @__PURE__ */ i(
        "input",
        {
          type: "number",
          min: 0,
          max: 30,
          className: "input w-full",
          value: n.minMinutes,
          onChange: (s) => o({ ...n, minMinutes: Number(s.target.value) })
        }
      )
    ] }),
    /* @__PURE__ */ c("fieldset", { className: "space-y-2", children: [
      /* @__PURE__ */ i("legend", { className: "label", children: e("settings.labels") }),
      /* @__PURE__ */ i("p", { className: "text-xs text-surface-500", children: e("settings.labelsHelp") }),
      p.map((s) => /* @__PURE__ */ c("label", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ i("span", { className: "text-sm font-medium", style: { width: "2.5rem" }, children: s }),
        /* @__PURE__ */ i(
          "input",
          {
            className: "input w-full",
            value: n.labels[s] ?? "",
            placeholder: "{minutes} min",
            onChange: (g) => o({ ...n, labels: { ...n.labels, [s]: g.target.value } })
          }
        )
      ] }, s))
    ] }),
    /* @__PURE__ */ i("button", { type: "submit", className: "btn-primary", disabled: r, children: /* @__PURE__ */ i("span", { children: e("settings.save") }) })
  ] });
}
const I = {
  en: {
    public: { label_one: "{{count}} min read", label_other: "{{count}} min read", aria: "Estimated reading time" },
    settings: {
      navLabel: "Reading time",
      title: "Reading time",
      intro: "Shows how long a post takes to read, computed from its word count at publish time.",
      enabled: "Show the reading time",
      wordsPerMinute: "Reading speed (words per minute)",
      position: "Position",
      positionTop: "Above the text",
      positionBottom: "Below the text",
      positionBoth: "Above and below",
      style: "Style",
      styleBadge: "Badge with an icon",
      styleText: "Plain text",
      includePages: "Also show it on pages",
      minMinutes: "Hide below (minutes, 0 = always show)",
      labels: "Custom text per language",
      labelsHelp: "Optional. {minutes} is replaced by the number. Empty = built-in text.",
      save: "Save",
      saved: "Saved. Regenerate all HTML pages to apply it to published posts."
    }
  },
  fr: {
    public: { label_one: "{{count}} min de lecture", label_other: "{{count}} min de lecture", aria: "Temps de lecture estimé" },
    settings: {
      navLabel: "Temps de lecture",
      title: "Temps de lecture",
      intro: "Affiche la durée de lecture d'un article, calculée à partir du nombre de mots au moment de la publication.",
      enabled: "Afficher le temps de lecture",
      wordsPerMinute: "Vitesse de lecture (mots par minute)",
      position: "Position",
      positionTop: "Au-dessus du texte",
      positionBottom: "Sous le texte",
      positionBoth: "Au-dessus et en dessous",
      style: "Style",
      styleBadge: "Badge avec icône",
      styleText: "Texte simple",
      includePages: "L'afficher aussi sur les pages",
      minMinutes: "Masquer en dessous de (minutes, 0 = toujours)",
      labels: "Texte personnalisé par langue",
      labelsHelp: "Facultatif. {minutes} est remplacé par le nombre. Vide = texte par défaut.",
      save: "Enregistrer",
      saved: "Enregistré. Régénérez toutes les pages HTML pour l'appliquer aux articles publiés."
    }
  }
};
function O(a) {
  const e = a.replace(/<(script|style|iframe|svg|noscript)[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/&[a-z#0-9]+;/gi, "x").match(/[\p{L}\p{N}][\p{L}\p{N}'’\-]*/gu);
  return e ? e.length : 0;
}
function _(a, t) {
  return a <= 0 ? 0 : Math.max(1, Math.ceil(a / t));
}
function P(a) {
  return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const D = '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
function k(a, t, e, l, n) {
  return `<p class="cms-reading-time cms-reading-time--${l}" data-reading-time="${n}" style="${l === "top" ? "margin:0 0 1.5em" : "margin:2em 0 0"}"><span style="${e === "badge" ? "display:inline-flex;align-items:center;gap:.4em;padding:.3em .8em;border-radius:999px;background:rgba(127,127,127,.12);font-size:.85em;font-weight:600;line-height:1.4" : "display:block;font-size:.85em;opacity:.75;font-style:italic"}" aria-label="${P(t)}">${e === "badge" ? D : ""}<span>${P(a)}</span></span></p>`;
}
const y = "reading-time";
function z(a, t, e) {
  const l = (t || "en").toLowerCase(), n = a.labels[l] ?? a.labels[l.split("-")[0]], o = A.getFixedT(H(l), y), r = String(o("public.aria"));
  return n && n.trim() ? { label: n.split("{minutes}").join(String(e)), aria: r } : { label: String(o("public.label", { count: e })), aria: r };
}
const U = {
  id: y,
  name: "Reading Time",
  version: "1.0.0",
  description: "Shows the estimated reading time at the top of every post.",
  author: "Studio Prana",
  readme: j,
  settings: {
    navLabelKey: "settings.navLabel",
    defaultConfig: d,
    component: $,
    schema: R
  },
  i18n: I,
  register(a) {
    a.addFilter(
      "post.html.body",
      (t, ...e) => {
        var l;
        try {
          const n = e[0], o = e[1] ?? B();
          if (!n || !o) return t;
          const r = f((l = o.settings.pluginConfigs) == null ? void 0 : l[y]);
          if (!r.enabled || n.type === "page" && (!r.includePages || o.settings.homeMode === "static-page" && o.settings.homePageId === n.id))
            return t;
          const u = _(O(t), r.wordsPerMinute);
          if (u === 0 || u < r.minMinutes) return t;
          const { label: m, aria: p } = z(r, o.settings.language, u), b = r.position !== "bottom" ? k(m, p, r.style, "top", u) : "", h = r.position !== "top" ? k(m, p, r.style, "bottom", u) : "";
          return b + t + h;
        } catch (n) {
          return console.warn("[reading-time] skipped:", n), t;
        }
      },
      20
    );
  }
};
export {
  U as default
};
