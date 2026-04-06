(function () {
  const DELIVERABLES = [
    { id: 'opportunity-brief',                        title: 'Opportunity Brief',                       color: '#0D6A4B' },
    { id: 'discovery-pack',                           title: 'Discovery Pack',                          color: '#0C563D' },
    { id: 'business-case-and-delivery-decision-pack', title: 'Business Case & Delivery Decision Pack',  color: '#0B885A' },
    { id: 'delivery-pack',                            title: 'Delivery Pack',                           color: '#0D6A4B' },
    { id: 'release-and-readiness-pack',               title: 'Release & Readiness Pack',                color: '#02462F' },
    { id: 'product-review-pack',                      title: 'Product Review Pack',                     color: '#2DA973' },
  ];

  function find(id) { return DELIVERABLES.find(d => d.id === id); }

  const id          = new URLSearchParams(window.location.search).get('d');
  const deliverable = find(id);

  if (!deliverable) {
    document.getElementById('deliverable-title').textContent = 'Deliverable not found';
    return;
  }

  const idx = DELIVERABLES.indexOf(deliverable);

  // Accent bar colour + CSS custom property for themed accents
  document.getElementById('accent-bar').style.background = deliverable.color;
  document.documentElement.style.setProperty('--stage-color', deliverable.color);

  // Page title and heading
  document.title = deliverable.title + ' — Product Lifecycle';
  document.getElementById('deliverable-title').textContent = deliverable.title;

  // Position indicator
  document.getElementById('deliverable-indicator').textContent = (idx + 1) + ' / ' + DELIVERABLES.length;

  // Footer nav — back to Deliverable Model
  const footerNav = document.getElementById('deliverable-footer-nav');
  if (footerNav) {
    const inner = document.createElement('div');
    inner.className = 'footer-nav-inner';
    const back = document.createElement('a');
    back.href = 'deliverable-model.html';
    back.className = 'footer-nav-btn';
    back.setAttribute('aria-label', 'Back to Deliverable Model');
    back.innerHTML = '<span aria-hidden="true">←</span><span>Deliverable Model</span>';
    inner.appendChild(back);
    footerNav.appendChild(inner);
  }

  // Fetch and render markdown content
  const contentEl = document.getElementById('deliverable-content');

  fetch('stage-descriptions/deliverables/' + id + '.md')
    .then(r => {
      if (!r.ok) throw new Error('Could not load stage-descriptions/deliverables/' + id + '.md (' + r.status + ')');
      return r.text();
    })
    .then(md => {
      contentEl.innerHTML = marked.parse(md);

      // Process all h2 elements for special section treatment
      contentEl.querySelectorAll('h2').forEach(h2 => {

        // Who Is Involved: mark primary role headings, bullet lists, and the others line
        if (/who is (typically )?involved/i.test(h2.textContent)) {
          let isFirst = true;
          let el = h2.nextElementSibling;
          while (el && el.tagName !== 'H2') {
            if (el.tagName === 'H3') {
              el.classList.add('role-name');
              if (isFirst) { el.classList.add('role-name-first'); isFirst = false; }
            }
            if (el.tagName === 'UL') {
              el.classList.add('role-bullets');
            }
            if (el.tagName === 'P'
                && el.querySelector('strong')
                && /others who may contribute/i.test(el.textContent)) {
              el.classList.add('others-contribute');
            }
            el = el.nextElementSibling;
          }
        }

        // Common Pitfalls: replace each bold-only <p> with an <h3 class="role-name">
        if (/common pitfalls/i.test(h2.textContent)) {
          let el = h2.nextElementSibling;
          while (el && el.tagName !== 'H2') {
            const sibling = el.nextElementSibling;
            if (el.tagName === 'P'
                && el.children.length === 1
                && el.children[0].tagName === 'STRONG') {
              const h3 = document.createElement('h3');
              h3.className = 'role-name';
              h3.textContent = el.children[0].textContent;
              el.parentNode.replaceChild(h3, el);
            }
            el = sibling;
          }
        }
      });

      // Wrap intro section (first H2 + following paragraphs) in .intro-block
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

      // Make supporting-materials file links trigger a download (skip directory links)
      contentEl.querySelectorAll('a[href^="supporting-materials/"]').forEach(a => {
        if (/\.\w+$/.test(a.getAttribute('href'))) {
          a.setAttribute('download', '');
        }
      });
    })
    .catch(err => console.error(err));
})();
