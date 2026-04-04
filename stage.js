(function () {
  const STAGES = [
    { id: 'value-proposition',   title: 'Value Proposition',   color: '#0D6A4B', prev: null,                  next: 'product-discovery'   },
    { id: 'product-discovery',   title: 'Product Discovery',   color: '#0C563D', prev: 'value-proposition',   next: 'align-and-plan'      },
    { id: 'align-and-plan',      title: 'Align & Plan',        color: '#0B885A', prev: 'product-discovery',   next: 'develop-and-deliver' },
    { id: 'develop-and-deliver', title: 'Develop & Deliver',   color: '#0D6A4B', prev: 'align-and-plan',      next: 'deploy'              },
    { id: 'deploy',              title: 'Deploy',              color: '#02462F', prev: 'develop-and-deliver',  next: 'operate-and-monitor' },
    { id: 'operate-and-monitor', title: 'Operate & Monitor',   color: '#0C563D', prev: 'deploy',              next: 'measure-and-learn'   },
    { id: 'measure-and-learn',   title: 'Measure & Learn',     color: '#0C563D', prev: 'operate-and-monitor', next: 'adapt-and-optimize'  },
    { id: 'adapt-and-optimize',  title: 'Adapt & Optimize',    color: '#2DA973', prev: 'measure-and-learn',   next: 'value-proposition'   },
  ];

  function stageUrl(id) { return 'stage.html?s=' + id; }
  function find(id) { return STAGES.find(s => s.id === id); }

  const id = new URLSearchParams(window.location.search).get('s');
  const stage = find(id);

  if (!stage) {
    document.getElementById('stage-title').textContent = 'Stage not found';
    return;
  }

  // Accent bar colour
  document.getElementById('accent-bar').style.background = stage.color;

  // Page and heading title
  document.title = stage.title + ' — Product Lifecycle';
  document.getElementById('stage-title').textContent = stage.title;

  // Prev / next navigation
  const navStages = document.getElementById('nav-stages');
  if (stage.prev) {
    const a = document.createElement('a');
    a.href = stageUrl(stage.prev);
    a.className = 'nav-btn';
    a.textContent = '← ' + find(stage.prev).title;
    navStages.appendChild(a);
  }
  if (stage.next) {
    const a = document.createElement('a');
    a.href = stageUrl(stage.next);
    a.className = 'nav-btn';
    a.textContent = find(stage.next).title + ' →';
    navStages.appendChild(a);
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

      // Style "Who Is Involved" lists as role pills (handles subgroups via h3)
      contentEl.querySelectorAll('h2').forEach(h2 => {
        if (/who is involved/i.test(h2.textContent)) {
          let el = h2.nextElementSibling;
          while (el && el.tagName !== 'H2') {
            if (el.tagName === 'UL') el.classList.add('who-list');
            el = el.nextElementSibling;
          }
        }
      });

      // Make template links trigger a download
      contentEl.querySelectorAll('a[href^="templates/"]').forEach(a => {
        a.setAttribute('download', '');
      });
    })
    .catch(err => console.error(err));
})();
