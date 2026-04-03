(function () {
  const mdFile = document.body.dataset.md;
  if (!mdFile) return;

  fetch(mdFile)
    .then(r => {
      if (!r.ok) throw new Error('Could not load ' + mdFile + ' (' + r.status + ')');
      return r.text();
    })
    .then(md => {
      document.getElementById('stage-content').innerHTML = marked.parse(md);
    })
    .catch(err => console.error(err));
})();
