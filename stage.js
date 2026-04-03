(function () {
  const mdFile = document.body.dataset.md;
  if (!mdFile) return;

  // Inject the process flow indicator between the heading and the content area
  const contentEl = document.getElementById('stage-content');
  const flow = document.createElement('div');
  flow.className = 'stage-flow';
  flow.innerHTML =
    '<span class="flow-step">Entry Criteria</span>' +
    '<span class="flow-arrow">→</span>' +
    '<span class="flow-step">What Happens</span>' +
    '<span class="flow-arrow">→</span>' +
    '<span class="flow-step">Deliverables</span>';
  contentEl.parentNode.insertBefore(flow, contentEl);

  fetch(mdFile)
    .then(r => {
      if (!r.ok) throw new Error('Could not load ' + mdFile + ' (' + r.status + ')');
      return r.text();
    })
    .then(md => {
      contentEl.innerHTML = marked.parse(md);

      // Style the "Who Is Involved" list as role pills
      contentEl.querySelectorAll('h2').forEach(h2 => {
        if (/who is involved/i.test(h2.textContent)) {
          const ul = h2.nextElementSibling;
          if (ul && ul.tagName === 'UL') ul.classList.add('who-list');
        }
      });

      // Make template links trigger a download
      contentEl.querySelectorAll('a[href^="templates/"]').forEach(a => {
        a.setAttribute('download', '');
      });
    })
    .catch(err => console.error(err));
})();
