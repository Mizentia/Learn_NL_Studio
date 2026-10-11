export function renderGuideModal(guide, isBn, t) {
  if (!guide) return '';
  const steps = isBn ? guide.stepsBn : guide.stepsEn;
  const stepsList = steps.map(s => `
    <li style="margin-bottom: 0.85rem; padding-left: 0.5rem; line-height: 1.6;">${s}</li>
  `).join('');

  return `
    <div id="guideModalBackdrop" style="position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(6px);z-index:200;display:flex;align-items:center;justify-content:center;padding:1.5rem;">
      <div style="background:var(--card-bg);border:1px solid var(--card-border);border-radius:20px;max-width:620px;width:100%;max-height:85vh;overflow-y:auto;padding:2rem;box-shadow:0 20px 40px rgba(0,0,0,0.4);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem;">
          <span class="guide-badge">${isBn ? guide.categoryBn : guide.categoryEn}</span>
          <button id="closeModalBtn" style="background:none;border:none;color:var(--text-main);font-size:1.5rem;cursor:pointer;padding:0 5px;">✕</button>
        </div>
        <h2 style="font-size:1.4rem;font-weight:800;margin-bottom:0.75rem;">${isBn ? guide.titleBn : guide.titleEn}</h2>
        <p style="color:var(--text-muted);font-size:0.95rem;line-height:1.6;margin-bottom:1.5rem;">${isBn ? guide.descBn : guide.descEn}</p>
        <div style="background:rgba(0,0,0,0.2);border:1px solid var(--card-border);border-radius:14px;padding:1.25rem;margin-bottom:1.5rem;">
          <h4 style="font-size:0.95rem;color:var(--primary);margin-bottom:0.75rem;">${t.stepsLabel}:</h4>
          <ol style="margin-left:1.2rem;color:var(--text-main);font-size:0.92rem;">
            ${stepsList}
          </ol>
        </div>
        <div style="text-align:right;">
          <button id="closeModalFooterBtn" class="btn-icon" style="width:auto;padding:8px 20px;font-weight:700;border-radius:10px;">${t.closeModalBtn}</button>
        </div>
      </div>
    </div>
  `;
}
