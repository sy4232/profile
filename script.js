// Dark Mode Toggle
const toggleBtn = document.getElementById('theme-toggle');
const prefersDark = localStorage.getItem('theme') === 'dark';
if (prefersDark) document.body.classList.add('dark-mode');

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// ScrollSpy Highlighting
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.sidebar nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) current = section.getAttribute('id');
    });

    navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

// Print Button
const printBtn = document.getElementById('print-button');
printBtn.addEventListener('click', () => {
  window.print();
});
