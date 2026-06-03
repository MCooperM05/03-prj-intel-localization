const bootstrapLink = document.getElementById("bootstrap-css");

const rtlLanguageCodes = [
  "ar",
  "fa",
  "he",
  "ur",
  "ps",
  "sd",
  "ug",
  "ku",
  "yi",
  "dv",
  "ckb",
];

function isRtlLocale(locale) {
  if (!locale) return false;
  const normalized = locale.toLowerCase().trim();
  return rtlLanguageCodes.some(
    code => normalized === code || normalized.startsWith(`${code}-`)
  );
}

function detectDirection() {
  const htmlLang = document.documentElement.lang || "";
  
  // If HTML lang is explicitly set, use it as the primary source
  if (htmlLang) {
    return isRtlLocale(htmlLang) ? "rtl" : "ltr";
  }

  // Fallback to browser preferred languages
  const browserLocales = navigator.languages || [];
  if (browserLocales.some(isRtlLocale)) {
    return "rtl";
  }

  // Last resort: check for RTL characters in page content
  const pageText = document.body.innerText || "";
  const hasRtlCharacters = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(pageText);
  return hasRtlCharacters ? "rtl" : "ltr";
}

function getBootstrapHref(direction) {
  return direction === "rtl"
    ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css"
    : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
}

function updateDirection() {
  const direction = detectDirection();
  const html = document.documentElement;

  html.dir = direction;
  document.body.dir = direction;

  if (!html.lang) {
    html.lang = navigator.language || "en";
  }

  bootstrapLink.href = getBootstrapHref(direction);
  console.log("Direction:", direction, "lang:", html.lang);
}

window.addEventListener("load", () => {
  updateDirection();
  setTimeout(updateDirection, 1000);
  setTimeout(updateDirection, 2000);
  setTimeout(updateDirection, 3000);

  new MutationObserver(updateDirection).observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
});
