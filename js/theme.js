export function initTheme() {
  const saved = localStorage.getItem('nl_learn_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  return saved;
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('nl_learn_theme', next);
  return next;
}
