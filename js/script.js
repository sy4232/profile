// Sohei Yamada — academic site (minimal)

// Nav gains a hairline + subtle shadow once the page is scrolled.
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
