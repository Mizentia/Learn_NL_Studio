export function renderHero(t) {
  return `
    <header class="learn-hero container">
      <div style="margin-bottom: 1rem;">
        <span class="guide-badge">${t.badge}</span>
      </div>
      <h1 class="learn-title">${t.headerTitle}</h1>
      <p class="learn-sub">${t.headerSub}</p>
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          id="searchInput"
          class="search-input"
          placeholder="${t.searchPlaceholder}"
          autocomplete="off"
        />
      </div>
    </header>
  `;
}
