// Shared burger menu for site-wide navigation.
// Works on any page that includes #nav-burger and #site-menu in the DOM.
(function () {
  const burger = document.getElementById('nav-burger');
  const menu   = document.getElementById('site-menu');

  if (!burger || !menu) return;

  const openMenu  = () => { menu.hidden = false; burger.setAttribute('aria-expanded', 'true');  };
  const closeMenu = () => { menu.hidden = true;  burger.setAttribute('aria-expanded', 'false'); };

  burger.addEventListener('click', () => {
    if (menu.hidden) openMenu(); else closeMenu();
  });

  // Close when clicking anywhere outside the burger or the open menu
  document.addEventListener('click', e => {
    if (!menu.hidden && !burger.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });

  // Close on Escape and return focus to the burger button
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) { closeMenu(); burger.focus(); }
  });
})();
