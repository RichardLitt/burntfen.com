(function () {
  var search = document.getElementById('publication-search');
  var count = document.getElementById('publication-count');
  var empty = document.getElementById('publication-empty');
  var items = document.querySelectorAll('#publication-list .publication');
  // The selection is a list of clauses. An item must match every clause (AND),
  // and a clause matches if the item has any of its tags (OR). A plain click
  // adds a tag as its own clause; Shift-click adds it to the most recent clause
  // from the same row (Show, Topic or Type) instead. Shift because, on a button,
  // it has no browser behaviour of its own: Ctrl-click is right-click on a Mac,
  // and ⌘ only exists on Macs.
  // Start with only peer-reviewed work shown; the full list is one click away.
  var DEFAULT = 'peer-reviewed';
  var clauses = [];
  var filters = document.getElementById('publication-filters');
  // While Shift is held over the filters, show the tags a Shift-click could add.
  var shiftHeld = false;

  // Lowercase and strip diacritics, so "kakapo" finds "kākāpō".
  function fold(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function isActive(tag) {
    return clauses.some(function (clause) { return clause.indexOf(tag) !== -1; });
  }

  function matches(itemTags, someClauses) {
    return someClauses.every(function (clause) {
      return clause.some(function (t) { return itemTags.indexOf(t) !== -1; });
    });
  }

  // Which row (Show, Topic or Type) a tag's button sits in.
  var groups = [].slice.call(document.querySelectorAll('#publication-filters .tag-group'));
  function groupOf(tag) {
    var button = document.querySelector('#publication-filters .pub-tag[data-tag="' + tag + '"]');
    return button ? groups.indexOf(button.closest('.tag-group')) : -1;
  }

  // The latest clause from a row, which a Shift-click there joins; -1 if none.
  function latestClauseIn(group) {
    for (var i = clauses.length - 1; i >= 0; i--) {
      if (groupOf(clauses[i][0]) === group) return i;
    }
    return -1;
  }

  function label(tag) {
    var button = document.querySelector('#publication-filters .pub-tag[data-tag="' + tag + '"]');
    return button ? button.textContent.trim() : tag;
  }

  function update() {
    var query = fold(search.value.trim());
    var shown = 0;
    // Per row, the tags carried by an item that clicking could still reach. With a
    // Shift held that's any tag that could join the row's latest clause;
    // otherwise only tags that narrow the list without emptying it.
    var available = groups.map(function () { return {}; });
    var narrowBy = groups.map(function (group, g) {
      var skip = shiftHeld ? latestClauseIn(g) : -1;
      return clauses.filter(function (clause, i) { return i !== skip; });
    });
    items.forEach(function (item) {
      var itemTags = item.getAttribute('data-tags').split(' ');
      var queryMatch = !query || fold(item.textContent).indexOf(query) !== -1;
      var match = queryMatch && matches(itemTags, clauses);
      item.hidden = !match;
      if (match) shown++;
      if (!queryMatch) return;
      narrowBy.forEach(function (rowClauses, g) {
        if (matches(itemTags, rowClauses)) {
          itemTags.forEach(function (t) { available[g][t] = true; });
        }
      });
    });
    document.querySelectorAll('#publication-filters .pub-tag').forEach(function (button) {
      var tag = button.getAttribute('data-tag');
      var g = groups.indexOf(button.closest('.tag-group'));
      button.hidden = !isActive(tag) && !available[g][tag];
    });
    document.querySelectorAll('#publication-filters .tag-group').forEach(function (group) {
      group.hidden = !group.querySelector('.pub-tag:not([hidden])');
    });
    document.querySelectorAll('.publication-year').forEach(function (year) {
      year.hidden = !year.querySelector('.publication:not([hidden])');
    });
    document.querySelectorAll('.pub-tag').forEach(function (button) {
      var on = isActive(button.getAttribute('data-tag'));
      button.classList.toggle('active', on);
      button.setAttribute('aria-pressed', on);
    });
    var text = (clauses.length || query)
      ? 'Showing ' + shown + ' of ' + items.length + ' publications and outputs'
      : 'Showing all ' + items.length + ' publications and outputs';
    // Spell the filter out once it includes an OR, since the buttons alone can't show it.
    if (clauses.some(function (clause) { return clause.length > 1; })) {
      text += ': ' + clauses.map(function (clause) {
        return clause.map(label).join(' or ');
      }).join('; and ');
    }
    count.textContent = text + '.';
    empty.hidden = shown > 0;
  }

  // Filters live in the URL, e.g. ?tags=ornithology|linguistics,journal-article&q=kakapo
  // (commas between clauses, | within one), so a filtered view can be linked to
  // and the back button undoes a click.
  // No `tags` parameter means the default view; `tags=` (empty) means no filters.
  function readURL() {
    var params = new URLSearchParams(window.location.search);
    var tags = params.get('tags');
    clauses = (tags === null ? DEFAULT : tags).split(',').map(function (clause) {
      return clause.split('|').filter(Boolean);
    }).filter(function (clause) { return clause.length; });
    search.value = params.get('q') || '';
  }

  function writeURL(push) {
    var tags = clauses.map(function (clause) {
      return clause.map(encodeURIComponent).join('%7C');
    }).join(',');
    var parts = [];
    if (tags !== DEFAULT) parts.push('tags=' + tags);
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
      clauses = [];
      search.value = '';
    } else {
      var tag = button.getAttribute('data-tag');
      var or = event.shiftKey;
      if (isActive(tag)) {
        clauses = clauses.map(function (clause) {
          return clause.filter(function (t) { return t !== tag; });
        }).filter(function (clause) { return clause.length; });
      } else if (or && latestClauseIn(groupOf(tag)) !== -1) {
        clauses[latestClauseIn(groupOf(tag))].push(tag);
      } else {
        clauses.push([tag]);
      }
    }
    update();
    writeURL(true);
  });
  search.addEventListener('input', function () {
    update();
    writeURL(false);
  });
  function setShiftHeld(held) {
    if (held !== shiftHeld) {
      shiftHeld = held;
      update();
    }
  }
  // Only Shift on its own, with the pointer over the filters, reveals tags, so
  // Shift+Tab, typing capitals and keyboard shortcuts don't make buttons flash.
  var pointerOverFilters = false;
  filters.addEventListener('mouseenter', function (event) {
    pointerOverFilters = true;
    setShiftHeld(event.shiftKey);
  });
  filters.addEventListener('mouseleave', function () {
    pointerOverFilters = false;
    setShiftHeld(false);
  });
  document.addEventListener('keydown', function (event) {
    setShiftHeld(event.key === 'Shift' && pointerOverFilters && event.target !== search);
  });
  document.addEventListener('keyup', function (event) {
    if (event.key === 'Shift') setShiftHeld(false);
  });
  window.addEventListener('blur', function () {
    setShiftHeld(false);
  });
  window.addEventListener('popstate', function () {
    readURL();
    update();
  });
  readURL();
  update();
})();
