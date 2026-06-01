const bootstrapLink = document.getElementById("bootstrap-css");

function applyDirection() {

    const pageText = document.body.innerText;

    // Arabic, Hebrew, Persian, Urdu Unicode ranges
    const rtlPattern =
        /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

    const isRTL = rtlPattern.test(pageText);

    if (isRTL) {

        document.documentElement.setAttribute("dir", "rtl");

        bootstrapLink.href =
            "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css";

        document.body.classList.add("rtl-mode");

    } else {

        document.documentElement.setAttribute("dir", "ltr");

        bootstrapLink.href =
            "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";

        document.body.classList.remove("rtl-mode");
    }
}

// Initial check
applyDirection();

// Watch page for translation changes
const observer = new MutationObserver(() => {
    applyDirection();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
});

function updateDirection() {

    const rtlLanguages = ["ar", "he", "fa", "ur"];

    const lang = document.documentElement.lang;

    const isRTL =
        rtlLanguages.some(code =>
            lang.startsWith(code)
        );

    document.documentElement.dir =
        isRTL ? "rtl" : "ltr";
}

updateDirection();