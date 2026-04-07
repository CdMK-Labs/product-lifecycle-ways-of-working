(function () {
  var PROCESSES = [
    { id: 'allocate-funding-frames', title: 'Allocate Funding Frames', color: '#0D6A4B' },
    { id: 'approve-investments',     title: 'Approve Investments',     color: '#0C563D' },
    { id: 'forecast-financials',     title: 'Forecast Financials',     color: '#0B885A' },
    { id: 'report-financial-status', title: 'Report Financial Status', color: '#02462F' },
  ];

  var id = new URLSearchParams(window.location.search).get('p');
  var process = PROCESSES.find(function (p) { return p.id === id; });

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
  var contentEl = document.getElementById('process-content');

  fetch('stage-descriptions/financial-processes/' + process.id + '.md')
    .then(function (r) {
      if (!r.ok) throw new Error('Could not load markdown (' + r.status + ')');
      return r.text();
    })
    .then(function (md) {
      contentEl.innerHTML = marked.parse(md);

      // Wrap intro section (first h2 + following paragraphs) in .intro-block
      var firstH2 = contentEl.querySelector('h2');
      if (firstH2) {
        var wrapper = document.createElement('div');
        wrapper.className = 'intro-block';
        firstH2.parentNode.insertBefore(wrapper, firstH2);
        wrapper.appendChild(firstH2);
        var sib = wrapper.nextElementSibling;
        while (sib && sib.tagName === 'P') {
          var toMove = sib;
          sib = toMove.nextElementSibling;
          wrapper.appendChild(toMove);
        }
      }

      // Process h2 elements for special section treatment
      contentEl.querySelectorAll('h2').forEach(function (h2) {

        // Who Is Involved: mark role headings and bullet lists
        if (/who is involved/i.test(h2.textContent)) {
          var isFirst = true;
          var el = h2.nextElementSibling;
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

        // Common Pitfalls: replace bold-only <p> with <h3 class="role-name">
        if (/common pitfalls/i.test(h2.textContent)) {
          var el = h2.nextElementSibling;
          while (el && el.tagName !== 'H2') {
            var sibling = el.nextElementSibling;
            if (el.tagName === 'P'
                && el.children.length === 1
                && el.children[0].tagName === 'STRONG') {
              var h3 = document.createElement('h3');
              h3.className = 'role-name';
              h3.textContent = el.children[0].textContent;
              el.parentNode.replaceChild(h3, el);
            }
            el = sibling;
          }
        }

        // Outputs and decisions: style decision sub-headings
        if (/outputs and decisions/i.test(h2.textContent)) {
          var isFirst = true;
          var el = h2.nextElementSibling;
          while (el && el.tagName !== 'H2') {
            if (el.tagName === 'H3') {
              el.classList.add('role-name');
              if (isFirst) { el.classList.add('role-name-first'); isFirst = false; }
            }
            if (el.tagName === 'UL') {
              el.classList.add('role-bullets');
            }
            el = el.nextElementSibling;
          }
        }
      });
    })
    .catch(function (err) { console.error(err); });
})();
