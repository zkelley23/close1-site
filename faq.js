// Progressive enhancement for /support/: opens the FAQ answer named in the
// URL fragment (for example /support/#close-game), so the app or an email can
// link straight to an answer. Without JavaScript the link still scrolls to
// the question; it just stays closed.
(function () {
  function openFromHash() {
    var id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    var target = document.getElementById(id);
    if (target && target.tagName === "DETAILS") {
      target.open = true;
    }
  }

  openFromHash();
  window.addEventListener("hashchange", openFromHash);
})();
