(function () {
  var search = document.getElementById('publication-search');
  var count = document.getElementById('publication-count');
  var empty = document.getElementById('publication-empty');
  var items = document.querySelectorAll('#publication-list .publication');
  // Start with only peer-reviewed work shown; the full list is one click away.
  var DEFAULT_TAGS = ['peer-reviewed'];
  var active = {};

  // Lowercase and strip diacritics, so "kakapo" finds "kākāpō".
  function fold(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function update() {
    var query = fold(search.value.trim());
    var tags = Object.keys(active);
    var shown = 0;
    // Tags carried by at least one visible item: any other filter would empty the list.
    var available = {};
    items.forEach(function (item) {
      var itemTags = item.getAttribute('data-tags').split(' ');
      var match = tags.every(function (t) { return itemTags.indexOf(t) !== -1; }) &&
        (!query || fold(item.textContent).indexOf(query) !== -1);
      item.hidden = !match;
      if (match) {
        shown++;
        itemTags.forEach(function (t) { available[t] = true; });
      }
    });
    document.querySelectorAll('#publication-filters .pub-tag').forEach(function (button) {
      var tag = button.getAttribute('data-tag');
      button.hidden = !active[tag] && !available[tag];
    });
    document.querySelectorAll('#publication-filters .tag-group').forEach(function (group) {
      group.hidden = !group.querySelector('.pub-tag:not([hidden])');
    });
    document.querySelectorAll('.publication-year').forEach(function (year) {
      year.hidden = !year.querySelector('.publication:not([hidden])');
    });
    document.querySelectorAll('.pub-tag').forEach(function (button) {
      var on = !!active[button.getAttribute('data-tag')];
      button.classList.toggle('active', on);
      button.setAttribute('aria-pressed', on);
    });
    count.textContent = (tags.length || query)
      ? 'Showing ' + shown + ' of ' + items.length + ' publications and outputs.'
      : 'Showing all ' + items.length + ' publications and outputs.';
    empty.hidden = shown > 0;
  }

  // Filters live in the URL, e.g. ?tags=ornithology,journal-article&q=kakapo,
  // so a filtered view can be linked to and the back button undoes a click.
  // No `tags` parameter means the default view; `tags=` (empty) means no filters.
  function readURL() {
    var params = new URLSearchParams(window.location.search);
    var tags = params.get('tags');
    active = {};
    (tags === null ? DEFAULT_TAGS : tags.split(',')).forEach(function (tag) {
      if (tag) active[tag] = true;
    });
    search.value = params.get('q') || '';
  }

  function writeURL(push) {
    var tags = Object.keys(active).sort();
    var parts = [];
    if (tags.join(',') !== DEFAULT_TAGS.join(',')) {
      parts.push('tags=' + tags.map(encodeURIComponent).join(','));
    }
    var query = search.value.trim();
    if (query) parts.push('q=' + encodeURIComponent(query));
    var url = window.location.pathname + (parts.length ? '?' + parts.join('&') : '') + window.location.hash;
    if (url === window.location.pathname + window.location.search + window.location.hash) return;
    window.history[push ? 'pushState' : 'replaceState'](null, '', url);
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest('.pub-tag, .pub-clear');
    if (!button) return;
    if (button.classList.contains('pub-clear')) {
      active = {};
      search.value = '';
    } else {
      var tag = button.getAttribute('data-tag');
      if (active[tag]) delete active[tag]; else active[tag] = true;
    }
    update();
    writeURL(true);
  });
  search.addEventListener('input', function () {
    update();
    writeURL(false);
  });
  window.addEventListener('popstate', function () {
    readURL();
    update();
  });
  readURL();
  update();
})();
