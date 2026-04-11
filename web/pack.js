(function () {
  var PACKS = [
    { id: 'opportunity-brief',                        title: 'Opportunity Brief',                       color: '#0D6A4B', zip: '../../../content/deliverable-model/supporting-materials/opportunity-brief-starter-pack.zip',                note: 'Includes a main pack placeholder. Starter files will be expanded in future versions.' },
    { id: 'discovery-pack',                           title: 'Discovery Pack',                          color: '#0C563D', zip: '../../../content/deliverable-model/supporting-materials/discovery-pack-starter-pack.zip',                   note: 'Includes a main pack placeholder. Starter files will be expanded in future versions.' },
    { id: 'business-case-and-delivery-decision-pack', title: 'Business Case & Delivery Decision Pack',  color: '#0B885A', zip: '../../../content/deliverable-model/supporting-materials/business-case-delivery-decision-starter-pack.zip',  note: 'Includes a main pack and four appendix placeholders. Starter files will be expanded in future versions.' },
    { id: 'delivery-pack',                            title: 'Delivery Pack',                           color: '#0D6A4B', zip: '../../../content/deliverable-model/supporting-materials/delivery-pack-starter-pack.zip',                    note: 'Includes a main pack placeholder. Starter files will be expanded in future versions.' },
    { id: 'release-and-readiness-pack',               title: 'Release & Readiness Pack',                color: '#02462F', zip: '../../../content/deliverable-model/supporting-materials/release-readiness-starter-pack.zip',                note: 'Includes a main pack placeholder. Starter files will be expanded in future versions.' },
    { id: 'product-review-pack',                      title: 'Product Review Pack',                     color: '#2DA973', zip: '../../../content/deliverable-model/supporting-materials/product-review-pack-starter-pack.zip',              note: 'Includes a main pack placeholder. Starter files will be expanded in future versions.' },
  ];

  var id = document.body.dataset.pack;
  var pack = PACKS.find(function (p) { return p.id === id; });

  if (!pack) {
    document.getElementById('pack-title').textContent = 'Pack not found';
    return;
  }

  // Accent bar colour and CSS custom property
  document.getElementById('accent-bar').style.background = pack.color;
  document.documentElement.style.setProperty('--stage-color', pack.color);

  // Page title and heading
  document.title = pack.title + ' \u2013 Product Lifecycle';
  document.getElementById('pack-title').textContent = pack.title;

  // Fetch and render markdown content
  var contentEl = document.getElementById('pack-content');

  fetch('../../../content/deliverable-model/packs/' + pack.id + '.md')
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

      // Inject download CTA after intro block
      var introBlock = contentEl.querySelector('.intro-block');
      var ctaTarget = introBlock ? introBlock.nextSibling : contentEl.firstChild;
      var ctaLink = document.createElement('a');
      ctaLink.href = pack.zip;
      ctaLink.className = 'download-cta';
      ctaLink.setAttribute('download', '');
      ctaLink.textContent = 'Download starter pack (.zip)';
      contentEl.insertBefore(ctaLink, ctaTarget);

      var noteP = document.createElement('p');
      noteP.className = 'download-note';
      noteP.textContent = pack.note;
      contentEl.insertBefore(noteP, ctaLink.nextSibling);

      // Process h2 elements for special section treatment
      contentEl.querySelectorAll('h2').forEach(function (h2) {

        // Who Is Involved: mark role headings and bullet lists
        if (/who is (typically )?involved/i.test(h2.textContent)) {
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
      });
    })
    .catch(function (err) { console.error(err); });
})();
