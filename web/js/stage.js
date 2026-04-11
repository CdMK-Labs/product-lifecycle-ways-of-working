(function () {
  const STAGES = [
    { id: 'value-proposition',   title: 'Value Proposition',   color: '#0D6A4B', prev: 'adapt-and-optimize',  next: 'product-discovery'   },
    { id: 'product-discovery',   title: 'Product Discovery',   color: '#0C563D', prev: 'value-proposition',   next: 'align-and-plan'      },
    { id: 'align-and-plan',      title: 'Align & Plan',        color: '#0B885A', prev: 'product-discovery',   next: 'develop-and-deliver' },
    { id: 'develop-and-deliver', title: 'Develop & Deliver',   color: '#0D6A4B', prev: 'align-and-plan',      next: 'deploy'              },
    { id: 'deploy',              title: 'Deploy',              color: '#02462F', prev: 'develop-and-deliver', next: 'operate-and-monitor' },
    { id: 'operate-and-monitor', title: 'Operate & Monitor',   color: '#0C563D', prev: 'deploy',              next: 'measure-and-learn'   },
    { id: 'measure-and-learn',   title: 'Measure & Learn',     color: '#0C563D', prev: 'operate-and-monitor', next: 'adapt-and-optimize'  },
    { id: 'adapt-and-optimize',  title: 'Adapt & Optimize',    color: '#2DA973', prev: 'measure-and-learn',   next: 'value-proposition'   },
  ];

  function stageUrl(id) { return 'lifecycle-stage.html?s=' + id; }
  function find(id)      { return STAGES.find(s => s.id === id); }

  function navLink(href, cls, ariaLabel, html) {
    const a = document.createElement('a');
    a.href = href;
    a.className = cls;
    a.setAttribute('aria-label', ariaLabel);
    a.innerHTML = html;
    return a;
  }

  const id    = new URLSearchParams(window.location.search).get('s');
  const stage = find(id);

  if (!stage) {
    document.getElementById('stage-title').textContent = 'Stage not found';
    return;
  }

  const idx       = STAGES.indexOf(stage);
  const prevStage = find(stage.prev);
  const nextStage = find(stage.next);

  // Accent bar colour + CSS custom property for themed accents
  document.getElementById('accent-bar').style.background = stage.color;
  document.documentElement.style.setProperty('--stage-color', stage.color);

  // Page title and heading
  document.title = stage.title + ' Product Lifecycle';
  document.getElementById('stage-title').textContent = stage.title;

  // Stage position indicator
  document.getElementById('stage-indicator').textContent = (idx + 1) + ' / ' + STAGES.length;

  // Top nav — prev / next with separate arrow and label spans
  const navStages = document.getElementById('nav-stages');
  navStages.appendChild(navLink(
    stageUrl(stage.prev), 'nav-btn',
    'Previous stage: ' + prevStage.title,
    '<span class="nav-arrow" aria-hidden="true">←</span><span class="nav-label">' + prevStage.title + '</span>'
  ));
  navStages.appendChild(navLink(
    stageUrl(stage.next), 'nav-btn nav-btn-next',
    'Next stage: ' + nextStage.title,
    '<span class="nav-label">' + nextStage.title + '</span><span class="nav-arrow" aria-hidden="true">→</span>'
  ));

  // Footer nav — prev / next as button-style links
  const footerNav = document.getElementById('stage-footer-nav');
  if (footerNav) {
    const inner = document.createElement('div');
    inner.className = 'footer-nav-inner';
    inner.appendChild(navLink(
      stageUrl(stage.prev), 'footer-nav-btn',
      'Previous stage: ' + prevStage.title,
      '<span aria-hidden="true">←</span><span>' + prevStage.title + '</span>'
    ));
    inner.appendChild(navLink(
      stageUrl(stage.next), 'footer-nav-btn footer-nav-btn-next',
      'Next stage: ' + nextStage.title,
      '<span>' + nextStage.title + '</span><span aria-hidden="true">→</span>'
    ));
    footerNav.appendChild(inner);
  }

  // Fetch and render markdown content
  const contentEl = document.getElementById('stage-content');

  fetch('../../content/lifecycle-stages/markdown/' + stage.id + '.md')
    .then(r => {
      if (!r.ok) throw new Error('Could not load ../content/lifecycle-stages/markdown/' + stage.id + '.md (' + r.status + ')');
      return r.text();
    })
    .then(md => {
      contentEl.innerHTML = marked.parse(md);

      // Process all h2 elements for special section treatment
      contentEl.querySelectorAll('h2').forEach(h2 => {

        // Who Is Involved: mark primary role headings, bullet lists, and the others line
        if (/who is involved/i.test(h2.textContent)) {
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

      // Make template file links trigger a download (skip directory links)
      contentEl.querySelectorAll('a[href^="supporting-materials/"]').forEach(a => {
        if (/\.\w+$/.test(a.getAttribute('href'))) {
          a.setAttribute('download', '');
        }
      });
    })
    .catch(err => console.error(err));
})();
