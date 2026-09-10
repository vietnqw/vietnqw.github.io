// Loads content/*.json and fills the page. Also owns the theme switch.
(async () => {
  const [site, pubs, projects, bg] = await Promise.all(
    ['site', 'publications', 'projects', 'background'].map(n => fetch(`content/${n}.json`).then(r => r.json()))
  );
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---- profile / hero ----
  document.title = site.name;
  document.querySelectorAll('[data-field="name"]').forEach(el => el.textContent = site.name);
  const portrait = $('.portrait');
  if (site.portrait) { portrait.src = site.portrait; portrait.alt = site.name; } else portrait.hidden = true;
  $('[data-field="eyebrow"]').textContent = site.eyebrow;
  $('[data-field="headline"]').innerHTML = site.headline; // ponytail: the one field that accepts HTML (for the <em> accent word)
  $('[data-field="intro"]').textContent = site.intro;
  $('#hero-links').innerHTML =
    (site.email ? `<a class="email" href="mailto:${esc(site.email)}">${esc(site.email)}</a>` : '') +
    (site.links || []).map(l => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join('');
  $('#year').textContent = new Date().getFullYear();

  // ---- publications (first 4, toggle to all) ----
  document.querySelectorAll('#publications, a[href="#publications"]').forEach(el => el.hidden = !pubs.length);
  let showAll = false;
  const renderPubs = () => {
    const shown = showAll ? pubs : pubs.slice(0, 4);
    $('#pub-list').innerHTML = shown.map(p => `
      <article class="pub">
        <span class="year mono">${esc(p.year)}</span>
        <div class="pub-body">
          <a class="pub-title" href="${esc(p.links?.[0]?.href || '#')}">${esc(p.title)}</a>
          <div class="pub-authors">${esc(p.authors)}</div>
          <div class="pub-meta mono">
            <span class="pub-venue">${esc(p.venue)}</span>
            ${(p.links || []).map(l => `<a class="chip" href="${esc(l.href)}">${esc(l.label)}</a>`).join('')}
          </div>
        </div>
      </article>`).join('');
    $('#pub-count').textContent = `Showing ${shown.length} of ${pubs.length}`;
    $('#pub-toggle').textContent = showAll ? 'Show fewer' : `Show all ${pubs.length} publications`;
  };
  $('.pub-more').hidden = pubs.length <= 4; // nothing to expand
  $('#pub-toggle').onclick = () => { showAll = !showAll; renderPubs(); };
  renderPubs();

  // ---- projects ----
  const arrow = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14 21 3"></path><path d="M15 3h6v6"></path><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path></svg>';
  $('#project-grid').innerHTML = projects.map(r => `
    <div class="card">
      ${r.image
        ? `<div class="thumb"><img src="${esc(r.image)}" alt="${esc(r.name)} screenshot"></div>`
        : `<div class="thumb placeholder mono caps">${esc(r.name)}</div>`}
      <div class="card-body">
        <div class="card-name">${esc(r.name)}</div>
        <div class="card-blurb">${esc(r.blurb)}</div>
        <a class="cta" href="${esc(r.href || '#')}">${arrow}${esc(r.cta || 'Open')}</a>
      </div>
    </div>`).join('');

  // ---- background ----
  const rows = list => (list || []).map(c => `
    <div class="row">
      <span class="logo-cell">${c.logo
        ? `<img class="logo" src="${esc(c.logo)}" alt="">`
        : `<span class="mark">${esc(c.place[0])}</span>`}</span>
      <div class="row-text">
        <span class="role">${esc(c.role)}</span>
        <span class="place mono">${esc(c.place)}</span>
      </div>
      <span class="when mono">${esc(c.when)}</span>
    </div>`).join('');
  $('#experience').innerHTML = rows(bg.experience);
  $('#education').innerHTML = rows(bg.education);
  // logo files are cropped tight to the mark, so size each to the same visual area (max 88x58)
  const fitLogo = img => {
    const r = img.naturalWidth / img.naturalHeight;
    let h = Math.sqrt(2600 / r), w = r * h;
    if (w > 88) { w = 88; h = w / r; }
    if (h > 58) { h = 58; w = h * r; }
    img.style.width = w + 'px'; img.style.height = h + 'px';
  };
  document.querySelectorAll('.logo').forEach(img => img.complete && img.naturalWidth ? fitLogo(img) : img.onload = () => fitLogo(img));

  // ---- theme / accent / motion ----
  const { theme = 'system', accent, motion = 1 } = site.settings || {};
  const root = document.documentElement;
  const systemDark = matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => root.dataset.theme === 'dark' || (!root.dataset.theme && systemDark.matches);
  // lighten a hex colour by amt (0..1) so a custom accent stays readable on dark backgrounds
  const lift = (hex, amt) => '#' + hex.replace('#', '').match(/../g)
    .map(p => Math.round(parseInt(p, 16) + (255 - parseInt(p, 16)) * amt).toString(16).padStart(2, '0')).join('');
  const applyTheme = t => {
    if (t === 'system') root.removeAttribute('data-theme'); else root.dataset.theme = t;
    if (accent) root.style.setProperty('--accent', isDark() ? lift(accent, 0.38) : accent);
    Animations.refreshColors();
  };
  applyTheme(localStorage.theme || theme);
  $('#theme-toggle').onclick = () => applyTheme(localStorage.theme = isDark() ? 'light' : 'dark');
  systemDark.addEventListener('change', () => applyTheme(root.dataset.theme || 'system'));

  Animations.start($('#helix'), $('#backdrop'),
    () => motion * (matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1));
})();
