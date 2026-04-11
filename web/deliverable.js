(function () {
  // Pack pages are the canonical single destination per deliverable.
  // Redirect any legacy ?d= links to the corresponding pack page.
  var PACK_PAGES = {
    'opportunity-brief':                        'supporting-materials/opportunity-brief/',
    'discovery-pack':                           'supporting-materials/discovery-pack/',
    'business-case-and-delivery-decision-pack': 'supporting-materials/business-case-and-delivery-decision-pack/',
    'delivery-pack':                            'supporting-materials/delivery-pack/',
    'release-and-readiness-pack':               'supporting-materials/release-and-readiness-pack/',
    'product-review-pack':                      'supporting-materials/product-review-pack/',
  };

  var id = new URLSearchParams(window.location.search).get('d');
  if (id && PACK_PAGES[id]) {
    window.location.replace(PACK_PAGES[id]);
  }
})();
