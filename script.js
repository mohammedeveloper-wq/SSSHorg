const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  primaryNav?.classList.toggle('open', !isOpen);
});

primaryNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
    primaryNav.classList.remove('open');
  });
});

const filterButtons = document.querySelectorAll('.filter-button');
const courseCards = document.querySelectorAll('.course-card');
const courseCount = document.querySelector('#course-count');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let visible = 0;
    courseCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (courseCount) courseCount.textContent = `${visible} ${visible === 1 ? 'learning pathway' : 'learning pathways'}`;
  });
});

document.querySelectorAll('.course-link').forEach((link) => {
  link.addEventListener('click', () => {
    const interest = document.querySelector('#enquiry-interest');
    if (interest) interest.value = link.dataset.course || '';
  });
});

document.querySelector('#enquiry-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.querySelector('#form-message');
  if (message) {
    message.textContent = 'Thanks for your interest. This demo form is not connected yet, so please contact the society directly to complete your enquiry.';
    message.classList.add('form-message-visible');
  }
});

const year = document.querySelector('#current-year');
if (year) year.textContent = new Date().getFullYear();
