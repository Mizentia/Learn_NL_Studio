export function renderGuideCard(guide, isBn, t) {
  const steps = isBn ? guide.stepsBn : guide.stepsEn;
  return `
    <div class="guide-card" data-guide-id="${guide.id}">
      <div>
        <span class="guide-badge">${isBn ? guide.categoryBn : guide.categoryEn}</span>
      </div>
      <h3 class="guide-title">${isBn ? guide.titleBn : guide.titleEn}</h3>
      <p class="guide-desc">${isBn ? guide.descBn : guide.descEn}</p>
      <div class="guide-steps-count">
        <span>${steps.length} ${t.stepsLabel}</span>
        <span>${t.readMoreBtn}</span>
      </div>
    </div>
  `;
}
