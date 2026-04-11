(function () {
  const PROCESSES = [
    { id: 'allocate-funding-frames', title: 'Allocate Funding Frames', color: '#0D6A4B' },
    { id: 'approve-investments',     title: 'Approve Investments',     color: '#0C563D' },
    { id: 'forecast-financials',     title: 'Forecast Financials',     color: '#0B885A' },
    { id: 'report-financial-status', title: 'Report Financial Status', color: '#02462F' },
  ];

  const id      = new URLSearchParams(window.location.search).get('p');
  const process = PROCESSES.find(p => p.id === id);

  if (!process) {
    document.getElementById('process-title').textContent = 'Process not found';
    return;
  }

  // Accent bar colour and CSS custom property
  document.getElementById('accent-bar').style.background = process.color;
  document.documentElement.style.setProperty('--stage-color', process.color);

  // Page title and heading
  document.title = process.title + ' \u2013 Product Lifecycle';
  document.getElementById('process-title').textContent = process.title;

  // Fetch and render markdown content
  const contentEl = document.getElementById('process-content');

  fetch('../../content/financial-model/processes/' + process.id + '.md')
    .then(r => {
      if (!r.ok) throw new Error('Could not load ../../content/financial-model/processes/' + process.id + '.md (' + r.status + ')');
      return r.text();
    })
    .then(md => {
      contentEl.innerHTML = marked.parse(md);

      // Wrap intro section (first h2 + following paragraphs) in .intro-block
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

      // Process h2 elements for special section treatment
      contentEl.querySelectorAll('h2').forEach(h2 => {

        // Who Is Involved: mark role headings and bullet lists
        if (/who is involved/i.test(h2.textContent)) {
          let isFirst = true;
          let el = h2.nextElementSibling;
          while (el && el.tagName !== 'H2') {
            if (el.tagName === 'H3') {
              el.classList.add('role-name');
              if (isFirst) { el.classList.add('role-name-first'); isFirst = false; }
            }
            if (el.tagName === 'UL') el.classList.add('role-bullets');
            if (el.tagName === 'P'
                && el.querySelector('strong')
                && /others who may contribute/i.test(el.textContent)) {
              el.classList.add('others-contribute');
            }
            el = el.nextElementSibling;
          }
        }

        // Common Pitfalls: replace bold-only <p> with <h3 class="role-name">
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

        // Outputs and decisions: style decision sub-headings
        if (/outputs and decisions/i.test(h2.textContent)) {
          let isFirst = true;
          let el = h2.nextElementSibling;
          while (el && el.tagName !== 'H2') {
            if (el.tagName === 'H3') {
              el.classList.add('role-name');
              if (isFirst) { el.classList.add('role-name-first'); isFirst = false; }
            }
            if (el.tagName === 'UL') el.classList.add('role-bullets');
            el = el.nextElementSibling;
          }
        }

        // Financial stages: render stage items as visual blocks
        if (/financial stages/i.test(h2.textContent)) {
          renderFinancialStages(h2);
        }
      });
    })
    .catch(err => console.error(err));

  /**
   * Converts the Financial stages markdown list into styled stage blocks.
   * Expects the h2 to be followed by a <p> intro and a <ul> with items
   * formatted as "**01 Title** — Description".
   */
  function renderFinancialStages(h2) {
    let stageUl = null;
    let el = h2.nextElementSibling;
    while (el && el.tagName !== 'H2') {
      if (el.tagName === 'UL' && !stageUl) stageUl = el;
      el = el.nextElementSibling;
    }

    if (!stageUl) return;

    const grid = document.createElement('div');
    grid.className = 'financial-stages-grid';

    stageUl.querySelectorAll('li').forEach(li => {
      const strong = li.querySelector('strong');
      if (!strong) return;

      const titleText = strong.textContent.trim();
      const match     = titleText.match(/^(\d+)\s+(.+)$/);
      const number    = match ? match[1] : '';
      const name      = match ? match[2] : titleText;
      const desc      = li.textContent.replace(strong.textContent, '').replace(/^\s*[—–-]\s*/, '').trim();

      const block = document.createElement('div');
      block.className = 'financial-stage-block';
      block.innerHTML =
        '<span class="card-number">' + number + '</span>' +
        '<h3>' + name + '</h3>' +
        '<p>' + desc + '</p>';

      grid.appendChild(block);
    });

    stageUl.parentNode.replaceChild(grid, stageUl);
  }
})();
