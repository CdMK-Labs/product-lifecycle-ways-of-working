(function () {
  const STAGES = [
    { id: 'value-proposition',   title: 'Value Proposition',   color: '#0D6A4B', prev: 'adapt-and-optimize',   next: 'product-discovery'   },
    { id: 'product-discovery',   title: 'Product Discovery',   color: '#0C563D', prev: 'value-proposition',   next: 'align-and-plan'      },
    { id: 'align-and-plan',      title: 'Align & Plan',        color: '#0B885A', prev: 'product-discovery',   next: 'develop-and-deliver' },
    { id: 'develop-and-deliver', title: 'Develop & Deliver',   color: '#0D6A4B', prev: 'align-and-plan',      next: 'deploy'              },
    { id: 'deploy',              title: 'Deploy',              color: '#02462F', prev: 'develop-and-deliver', next: 'operate-and-monitor' },
    { id: 'operate-and-monitor', title: 'Operate & Monitor',   color: '#0C563D', prev: 'deploy',              next: 'measure-and-learn'   },
    { id: 'measure-and-learn',   title: 'Measure & Learn',     color: '#0C563D', prev: 'operate-and-monitor', next: 'adapt-and-optimize'  },
    { id: 'adapt-and-optimize',  title: 'Adapt & Optimize',    color: '#2DA973', prev: 'measure-and-learn',   next: 'value-proposition'   },
  ];

  function stageUrl(id) { return 'stage.html?s=' + id; }
  function find(id)      { return STAGES.find(s => s.id === id); }

  const id    = new URLSearchParams(window.location.search).get('s');
  const stage = find(id);

  if (!stage) {
    document.getElementById('stage-title').textContent = 'Stage not found';
    return;
  }

  const idx = STAGES.indexOf(stage);

  // Accent bar colour + CSS custom property for themed accents
  document.getElementById('accent-bar').style.background = stage.color;
  document.documentElement.style.setProperty('--stage-color', stage.color);

  // Page title and heading
  document.title = stage.title + ' — Product Lifecycle';
  document.getElementById('stage-title').textContent = stage.title;

  // Stage position indicator
  document.getElementById('stage-indicator').textContent = (idx + 1) + ' / ' + STAGES.length;

  // Top nav — prev / next with separate arrow and label spans
  const navStages = document.getElementById('nav-stages');

  if (stage.prev) {
    const a = document.createElement('a');
    a.href = stageUrl(stage.prev);
    a.className = 'nav-btn';
    a.setAttribute('aria-label', 'Previous stage: ' + find(stage.prev).title);
    a.innerHTML = '<span class="nav-arrow" aria-hidden="true">←</span>'
                + '<span class="nav-label">' + find(stage.prev).title + '</span>';
    navStages.appendChild(a);
  }
  if (stage.next) {
    const a = document.createElement('a');
    a.href = stageUrl(stage.next);
    a.className = 'nav-btn nav-btn-next';
    a.setAttribute('aria-label', 'Next stage: ' + find(stage.next).title);
    a.innerHTML = '<span class="nav-label">' + find(stage.next).title + '</span>'
                + '<span class="nav-arrow" aria-hidden="true">→</span>';
    navStages.appendChild(a);
  }

  // Footer nav — prev / next as button-style links
  const footerNav = document.getElementById('stage-footer-nav');
  if (footerNav) {
    const inner = document.createElement('div');
    inner.className = 'footer-nav-inner';

    if (stage.prev) {
      const a = document.createElement('a');
      a.href = stageUrl(stage.prev);
      a.className = 'footer-nav-btn';
      a.setAttribute('aria-label', 'Previous stage: ' + find(stage.prev).title);
      a.innerHTML = '<span aria-hidden="true">←</span><span>' + find(stage.prev).title + '</span>';
      inner.appendChild(a);
    } else {
      inner.appendChild(document.createElement('span')); // empty spacer to keep next right-aligned
    }

    if (stage.next) {
      const a = document.createElement('a');
      a.href = stageUrl(stage.next);
      a.className = 'footer-nav-btn footer-nav-btn-next';
      a.setAttribute('aria-label', 'Next stage: ' + find(stage.next).title);
      a.innerHTML = '<span>' + find(stage.next).title + '</span><span aria-hidden="true">→</span>';
      inner.appendChild(a);
    }

    footerNav.appendChild(inner);
  }

  // Fetch and render markdown content
  const contentEl = document.getElementById('stage-content');

  fetch('content/' + stage.id + '.md')
    .then(r => {
      if (!r.ok) throw new Error('Could not load content/' + stage.id + '.md (' + r.status + ')');
      return r.text();
    })
    .then(md => {
      contentEl.innerHTML = marked.parse(md);

      // Process all h2 elements for special section treatment
      contentEl.querySelectorAll('h2').forEach(h2 => {

        // Who Is Involved: pill-style all ULs until the next H2 (supports subgroups via H3)
        if (/who is involved/i.test(h2.textContent)) {
          let el = h2.nextElementSibling;
          while (el && el.tagName !== 'H2') {
            if (el.tagName === 'UL') el.classList.add('who-list');
            el = el.nextElementSibling;
          }
        }

        // Common Pitfalls: mark each bold-only <p> as a pitfall title
        if (/common pitfalls/i.test(h2.textContent)) {
          let el = h2.nextElementSibling;
          while (el && el.tagName !== 'H2') {
            if (el.tagName === 'P'
                && el.children.length === 1
                && el.children[0].tagName === 'STRONG') {
              el.classList.add('pitfall-title');
            }
            el = el.nextElementSibling;
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
        let next = wrapper.nextElementSibling;
        while (next && next.tagName === 'P') {
          const toMove = next;
          next = toMove.nextElementSibling;
          wrapper.appendChild(toMove);
        }
      }

      // Make template links trigger a download
      contentEl.querySelectorAll('a[href^="templates/"]').forEach(a => {
        a.setAttribute('download', '');
      });
    })
    .catch(err => console.error(err));
})();
