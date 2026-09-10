document.querySelectorAll('.transport-status-screens, .transport-transfer-screens').forEach(track => {
  const slides = [...track.querySelectorAll(track.classList.contains('transport-status-screens') ? '.transport-screen' : '.transport-phone')];
  const mobile = matchMedia('(max-width: 700px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const offsets = () => slides.map(slide => slide.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft);
  const moveTo = index => {
    track.scrollTo({ left: offsets()[Math.max(0, Math.min(index, slides.length - 1))], behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  };
  track.addEventListener('keydown', event => {
    if (!mobile.matches || event.target !== track) return;
    const positions = offsets();
    const current = positions.reduce((closest, left, index) => Math.abs(left - track.scrollLeft) < Math.abs(positions[closest] - track.scrollLeft) ? index : closest, 0);
    const targets = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    moveTo(targets[event.key]);
  });
});
