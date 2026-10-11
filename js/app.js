import { initTheme, toggleTheme } from './theme.js';
import { I18N, getLanguage, setLanguage } from './i18n.js';
import { GUIDES_DATA } from './guides-data.js';
import { renderNavbar } from './components/navbar.js';
import { renderHero } from './components/hero.js';
import { renderGuideCard } from './components/guide-card.js';
import { renderGuideModal } from './components/guide-modal.js';

let currentLang = getLanguage();
let searchQuery = '';
let selectedGuide = null;
initTheme();

function render() {
  const t = I18N[currentLang] || I18N.bn;
  const isBn = currentLang === 'bn';
  const app = document.getElementById('app');
  if (!app) return;

  const q = searchQuery.toLowerCase().trim();
  const filtered = GUIDES_DATA.filter(g => {
    if (!q) return true;
    const title = (isBn ? g.titleBn : g.titleEn).toLowerCase();
    const desc = (isBn ? g.descBn : g.descEn).toLowerCase();
    const cat = (isBn ? g.categoryBn : g.categoryEn).toLowerCase();
    return title.includes(q) || desc.includes(q) || cat.includes(q);
  });

  const cardsHtml = filtered.map(g => renderGuideCard(g, isBn, t)).join('');

  app.innerHTML = `
    ${renderNavbar(currentLang)}
    <main>
      ${renderHero(t)}
      <section class="container">
        <div class="guides-grid">
          ${cardsHtml.length > 0 ? cardsHtml : '<p style="text-align:center;grid-column:1/-1;color:var(--text-muted);">কোনো গাইড পাওয়া যায়নি।</p>'}
        </div>
      </section>
    </main>
    <div id="modalContainer">
      ${selectedGuide ? renderGuideModal(selectedGuide, isBn, t) : ''}
    </div>
    <footer>
      <div class="container">
        <p>${t.footerText}</p>
      </div>
    </footer>
  `;

  bindEvents();
}

function bindEvents() {
  const input = document.getElementById('searchInput');
  if (input) {
    input.value = searchQuery;
    input.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
      document.getElementById('searchInput')?.focus();
    });
  }

  document.querySelectorAll('.guide-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-guide-id');
      selectedGuide = GUIDES_DATA.find(g => g.id === id);
      render();
    });
  });

  const closeModal = () => { selectedGuide = null; render(); };
  document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
  document.getElementById('closeModalFooterBtn')?.addEventListener('click', closeModal);
  document.getElementById('guideModalBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'guideModalBackdrop') closeModal();
  });

  document.getElementById('themeToggleBtn')?.addEventListener('click', () => { toggleTheme(); });
  document.getElementById('langToggleBtn')?.addEventListener('click', () => {
    currentLang = currentLang === 'bn' ? 'en' : 'bn';
    setLanguage(currentLang);
    render();
  });
}

document.addEventListener('DOMContentLoaded', render);
