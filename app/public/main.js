const toggle = document.querySelector('.theme-toggle');
let storedTheme;
try {
  storedTheme = localStorage.getItem('theme');
} catch {
  storedTheme = null;
}
if (storedTheme === 'dark') document.documentElement.dataset.theme = 'dark';
toggle?.setAttribute('aria-pressed', String(document.documentElement.dataset.theme === 'dark'));
toggle?.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  toggle.setAttribute('aria-pressed', String(dark));
  try {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  } catch {
    // The theme still changes for this page view if storage is unavailable.
  }
});
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
