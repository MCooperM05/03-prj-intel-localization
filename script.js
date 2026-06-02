const bootstrapLink = document.getElementById("bootstrap-css");

function applyDirection() {

    const pageText = document.body.textContent || "";

    const rtlPattern =
        /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

    const isRTL = rtlPattern.test(pageText);

    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.body.dir = isRTL ? "rtl" : "ltr";

    document.body.classList.toggle("rtl-mode", isRTL);

    bootstrapLink.href = isRTL
        ? "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css"
        : "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";

    console.log("RTL Mode:", isRTL);
}

window.addEventListener("load", () => {
    applyDirection();

    const observer = new MutationObserver(() => {
        applyDirection();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
});