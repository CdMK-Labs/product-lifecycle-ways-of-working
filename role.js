(function () {
  const ROLES = [
    { id: 'head-of-it-area',         title: 'Head of IT Area',         category: 'IT Product Leadership' },
    { id: 'head-of-it-product',      title: 'Head of IT Product',      category: 'IT Product Leadership' },
    { id: 'it-product-architect',    title: 'IT Product Architect',     category: 'IT Product Leadership' },
    { id: 'it-specialist',           title: 'IT Specialist',            category: 'IT Specialists' },
    { id: 'it-developer',            title: 'IT Developer',             category: 'IT Specialists' },
    { id: 'it-delivery-lead',        title: 'IT Delivery Lead',         category: 'IT Specialists' },
    { id: 'it-adoption-specialist',  title: 'IT Adoption Specialist',   category: 'IT Specialists' },
    { id: 'it-supporter',            title: 'IT Supporter',             category: 'IT Specialists' },
    { id: 'it-delivery-partner',     title: 'IT Delivery Partner',      category: 'IT Product Enablement' },
    { id: 'it-value-partner',        title: 'IT Value Partner',         category: 'IT Product Enablement' },
    { id: 'it-architecture-partner', title: 'IT Architecture Partner',  category: 'IT Product Enablement' },
    { id: 'it-portfolio-partner',    title: 'IT Portfolio Partner',     category: 'IT Product Enablement' },
    { id: 'it-sc-market-partner',    title: 'IT SC Market Partner',     category: 'IT Product Enablement' },
    { id: 'product-owner',           title: 'Product Owner',            category: 'Business Roles' },
    { id: 'product-manager',         title: 'Product Manager',          category: 'Business Roles' },
    { id: 'business-owner',          title: 'Business Owner',           category: 'Business Roles' },
  ];

  function find(id)      { return ROLES.find(r => r.id === id); }
  function roleUrl(id)   { return 'role.html?r=' + id; }

  function navLink(href, cls, ariaLabel, html) {
    const a = document.createElement('a');
    a.href = href;
    a.className = cls;
    a.setAttribute('aria-label', ariaLabel);
    a.innerHTML = html;
    return a;
  }

  const id   = new URLSearchParams(window.location.search).get('r');
  const role = find(id);

  if (!role) {
    document.getElementById('role-title').textContent = 'Role not found';
    return;
  }

  const idx  = ROLES.indexOf(role);
  const prev = ROLES[(idx - 1 + ROLES.length) % ROLES.length];
  const next = ROLES[(idx + 1) % ROLES.length];

  // Page title and heading
  document.title = role.title + ' \u2013 Roles & Responsibilities';
  document.getElementById('role-title').textContent = role.title;

  // Category badge
  document.getElementById('role-category').textContent = role.category;

  // Top nav — prev / next
  const navStages = document.getElementById('nav-stages');
  navStages.appendChild(navLink(
    roleUrl(prev.id), 'nav-btn',
    'Previous role: ' + prev.title,
    '<span class="nav-arrow" aria-hidden="true">\u2190</span><span class="nav-label">' + prev.title + '</span>'
  ));
  navStages.appendChild(navLink(
    roleUrl(next.id), 'nav-btn nav-btn-next',
    'Next role: ' + next.title,
    '<span class="nav-label">' + next.title + '</span><span class="nav-arrow" aria-hidden="true">\u2192</span>'
  ));

  // Footer nav
  const footerNav = document.getElementById('role-footer-nav');
  if (footerNav) {
    const inner = document.createElement('div');
    inner.className = 'footer-nav-inner';
    inner.appendChild(navLink(
      roleUrl(prev.id), 'footer-nav-btn',
      'Previous role: ' + prev.title,
      '<span aria-hidden="true">\u2190</span><span>' + prev.title + '</span>'
    ));
    inner.appendChild(navLink(
      roleUrl(next.id), 'footer-nav-btn footer-nav-btn-next',
      'Next role: ' + next.title,
      '<span>' + next.title + '</span><span aria-hidden="true">\u2192</span>'
    ));
    footerNav.appendChild(inner);
  }

  // Fetch and render markdown content
  const contentEl = document.getElementById('role-content');

  fetch('role-descriptions/' + role.id + '.md')
    .then(r => {
      if (!r.ok) throw new Error('Could not load role-descriptions/' + role.id + '.md (' + r.status + ')');
      return r.text();
    })
    .then(md => {
      contentEl.innerHTML = marked.parse(md);

      // Wrap first h2 + following paragraphs in .intro-block
      const firstH2 = contentEl.querySelector('h2');
      if (firstH2) {
        const wrapper = document.createElement('div');
        wrapper.className = 'intro-block';
        firstH2.parentNode.insertBefore(wrapper, firstH2);
        wrapper.appendChild(firstH2);
        let sib = wrapper.nextElementSibling;
        while (sib && sib.tagName === 'P') {
          const toMove = sib;
          sib = toMove.nextElementSibling;
          wrapper.appendChild(toMove);
        }
      }
    })
    .catch(err => console.error(err));
})();
