const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');
const compactLayout = window.matchMedia('(max-width: 1000px)');

function closeMenu({ restoreFocus = false } = {}) {
  header.removeAttribute('data-menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
  if (restoreFocus) menuButton.focus({ preventScroll: true });
}

function syncLayout() {
  const focusWasInMenu = navigation.contains(document.activeElement);
  const focusWasOnButton = document.activeElement === menuButton;
  menuButton.hidden = !compactLayout.matches;
  closeMenu({ restoreFocus: compactLayout.matches && focusWasInMenu });
  if (!compactLayout.matches && focusWasOnButton) navigation.querySelector('a').focus();
}

header.setAttribute('data-menu-ready', '');
syncLayout();
compactLayout.addEventListener('change', syncLayout);

menuButton.addEventListener('click', () => {
  if (menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    return;
  }
  header.setAttribute('data-menu-open', '');
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Закрыть меню');
  navigation.querySelector('a').focus({ preventScroll: true });
});

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !compactLayout.matches) return;
  closeMenu();
  const destination = new URL(link.href, location.href);
  if (destination.origin !== location.origin || destination.pathname !== location.pathname || !destination.hash) return;
  const section = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
  if (!section) return;
  section.setAttribute('tabindex', '-1');
  section.focus({ preventScroll: true });
  section.addEventListener('blur', () => section.removeAttribute('tabindex'), { once: true });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.hasAttribute('data-menu-open')) {
    closeMenu({ restoreFocus: true });
  }
});

document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) closeMenu();
});

header.addEventListener('focusout', (event) => {
  if (!header.contains(event.relatedTarget)) closeMenu();
});

const headerShell = document.querySelector('.header-shell');
if (headerShell) {
  new ResizeObserver(() => {
    if (!header.hasAttribute('data-menu-open')) {
      document.documentElement.style.setProperty('--header-offset', `${headerShell.offsetHeight + 16}px`);
    }
  }).observe(headerShell);
}

const contactDialog = document.querySelector('#contact-dialog');
if (contactDialog) {
  let dialogTrigger;
  let scrollPosition = 0;
  document.querySelectorAll('[data-contact-open]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      dialogTrigger = button;
      closeMenu();
      scrollPosition = window.scrollY;
      document.documentElement.setAttribute('data-contact-open', '');
      contactDialog.showModal();
    });
  });
  contactDialog.querySelector('.contact-dialog-close').addEventListener('click', () => contactDialog.close());
  contactDialog.addEventListener('click', event => {
    if (event.target !== contactDialog) return;
    const bounds = contactDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) contactDialog.close();
  });
  contactDialog.addEventListener('close', () => {
    document.documentElement.removeAttribute('data-contact-open');
    window.scrollTo({ top: scrollPosition, behavior: 'instant' });
    (compactLayout.matches ? menuButton : dialogTrigger)?.focus({ preventScroll: true });
  });
  contactDialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const elements = [...contactDialog.querySelectorAll('a[href], button:not([disabled])')];
    const first = elements[0], last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
}
