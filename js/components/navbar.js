export function renderNavbar(lang) {
  const isBn = lang === 'bn';
  return `
    <nav class="navbar">
      <div class="container nav-inner">
        <a href="/" class="brand-logo">
          <span>📚 Learn NL Studio</span>
          <span class="brand-badge">Guides</span>
        </a>
        <div class="nav-actions">
          <a href="http://localhost:8080/" class="btn-icon" title="Noksha Lab Root" style="text-decoration:none;">🏠</a>
          <a href="http://localhost:8082/" class="btn-icon" title="NL Studio Public" style="text-decoration:none;">🎨</a>
          <button id="langToggleBtn" class="btn-icon lang-btn" title="Toggle Language">
            ${isBn ? 'বাং | EN' : 'EN | বাং'}
          </button>
          <button id="themeToggleBtn" class="btn-icon" title="Toggle Theme">
            🌓
          </button>
        </div>
      </div>
    </nav>
  `;
}
