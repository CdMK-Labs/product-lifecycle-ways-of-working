(function () {
  const contentEl = document.getElementById('model-content');

  fetch('../../content/roles-and-responsibilities/model/roles-and-responsibilities.md')
    .then(r => {
      if (!r.ok) throw new Error('Could not load roles-and-responsibilities.md (' + r.status + ')');
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

      // Convert each category h2 + list into a roles-section with roles-grid
      contentEl.querySelectorAll('h2').forEach(h2 => {
        renderRolesSection(h2);
      });
    })
    .catch(err => {
      contentEl.innerHTML = '<p>Could not load content.</p>';
      console.error(err);
    });

  function renderRolesSection(h2) {
    let ul = h2.nextElementSibling;
    if (!ul || ul.tagName !== 'UL') return;

    const section = document.createElement('div');
    section.className = 'roles-section';

    const label = document.createElement('p');
    label.className = 'roles-section-label';
    label.textContent = h2.textContent;
    section.appendChild(label);

    const grid = document.createElement('div');
    grid.className = 'roles-grid';

    ul.querySelectorAll('li').forEach(li => {
      const strong = li.querySelector('strong');
      if (!strong) return;

      const titleText = strong.textContent.trim();
      const match = titleText.match(/^\[([^\]]+)\]\s+(.+)$/);
      if (!match) return;

      const id   = match[1];
      const name = match[2];
      const desc = li.textContent.replace(strong.textContent, '').replace(/^\s*[—–-]\s*/, '').trim();

      const card = document.createElement('a');
      card.href = 'role.html?r=' + id;
      card.className = 'role-card';
      card.innerHTML = '<h3>' + name + '</h3><p>' + desc + '</p>';

      grid.appendChild(card);
    });

    section.appendChild(grid);
    h2.parentNode.insertBefore(section, h2);
    h2.parentNode.removeChild(h2);
    ul.parentNode.removeChild(ul);
  }
})();
