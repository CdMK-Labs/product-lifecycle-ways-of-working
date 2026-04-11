(function () {
  // Pack pages are the canonical single destination per deliverable.
  // Redirect any legacy ?d= links to the corresponding pack page.
  var PACK_PAGES = {
    'opportunity-brief':                        'pack.html?p=opportunity-brief',
    'discovery-pack':                           'pack.html?p=discovery-pack',
    'business-case-and-delivery-decision-pack': 'pack.html?p=business-case-and-delivery-decision-pack',
    'delivery-pack':                            'pack.html?p=delivery-pack',
    'release-and-readiness-pack':               'pack.html?p=release-and-readiness-pack',
    'product-review-pack':                      'pack.html?p=product-review-pack',
  };

  var id = new URLSearchParams(window.location.search).get('d');
  if (id && PACK_PAGES[id]) {
    window.location.replace(PACK_PAGES[id]);
  }
})();
