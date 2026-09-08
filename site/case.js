document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const track = carousel.querySelector('.related-track');
  const controls = carousel.querySelector('.carousel-controls');
  const previous = carousel.querySelector('[data-direction="-1"]');
  const next = carousel.querySelector('[data-direction="1"]');
  if (!track || !controls || !previous || !next) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const updateControls = () => {
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  };
  const move = direction => {
    const card = track.querySelector('.related-card');
    if (!card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
    track.scrollBy({ left: direction * step, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  };

  controls.hidden = false;
  controls.addEventListener('click', event => {
    const button = event.target.closest('[data-direction]');
    if (button && !button.disabled) move(Number(button.dataset.direction));
  });
  track.addEventListener('keydown', event => {
    if (event.target !== track) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
  });
  track.addEventListener('scroll', updateControls, { passive: true });
  new ResizeObserver(updateControls).observe(track);
  updateControls();
});
