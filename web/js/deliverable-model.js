(function () {
  const contentEl = document.getElementById('model-content');

  fetch('../../content/deliverable-model/model/deliverable-model.md')
    .then(r => {
      if (!r.ok) throw new Error('Could not load deliverable-model.md (' + r.status + ')');
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

      // Convert "Deliverable packs" list to deliverable-grid with deliverable-cards
      contentEl.querySelectorAll('h2').forEach(h2 => {
        if (/deliverable packs/i.test(h2.textContent)) {
          renderDeliverableGrid(h2);
        }
      });

      // Apply template-note class to the starter packs note paragraph
      contentEl.querySelectorAll('p').forEach(p => {
        if (/starter packs are available/i.test(p.textContent)) {
          p.className = 'template-note';
        }
      });
    })
    .catch(err => {
      contentEl.innerHTML = '<p>Could not load content.</p>';
      console.error(err);
    });

  function renderDeliverableGrid(h2) {
    let ul = null;
    let el = h2.nextElementSibling;
    while (el && el.tagName !== 'H2') {
      if (el.tagName === 'UL' && !ul) ul = el;
      el = el.nextElementSibling;
    }
    if (!ul) return;

    const grid = document.createElement('div');
    grid.className = 'deliverable-grid';

    ul.querySelectorAll('li').forEach(li => {
      const strong = li.querySelector('strong');
      if (!strong) return;

      const titleText = strong.textContent.trim();
      const match = titleText.match(/^(\d+)\s+\[([^\]]+)\]\s+(.+)$/);
      if (!match) return;

      const number = match[1];
      const id     = match[2];
      const name   = match[3];
      const desc   = li.textContent.replace(strong.textContent, '').replace(/^\s*[—–-]\s*/, '').trim();

      const card = document.createElement('a');
      card.href = 'pack.html?p=' + id;
      card.className = 'deliverable-card';
      card.innerHTML =
        '<span class="card-number">' + number + '</span>' +
        '<h3>' + name + '</h3>' +
        '<p>' + desc + '</p>';

      grid.appendChild(card);
    });

    ul.parentNode.replaceChild(grid, ul);
  }
})();
