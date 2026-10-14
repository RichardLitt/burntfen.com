### External links

- [ORCID](https://orcid.org/0000-0001-5428-7535)
- [Google Scholar](https://scholar.google.com/citations?user=X2UD62YAAAAJ&hl=en&authuser=1)

{% assign publications = site.data.publications -%}
{% assign topics = publications | map: "topics" | join: "|" | split: "|" | uniq | sort -%}
{% assign types = publications | map: "type" | uniq | sort -%}
<div id="publication-filters">
<label for="publication-search" class="sr-only">Search publications</label>
<input type="search" id="publication-search" class="form-control" placeholder="Search by title, author, journal, year…">
<div class="tag-group" role="group" aria-label="Filter by topic">
<span class="tag-group-label">Topic</span>
{%- for topic in topics %}
<button type="button" class="pub-tag" data-tag="{{ topic | slugify }}" aria-pressed="false">{{ topic }}</button>
{%- endfor %}
</div>
<div class="tag-group" role="group" aria-label="Filter by type">
<span class="tag-group-label">Type</span>
{%- for type in types %}
<button type="button" class="pub-tag" data-tag="{{ type | slugify }}" aria-pressed="false">{{ type }}</button>
{%- endfor %}
</div>
<p id="publication-count" aria-live="polite">Showing all {{ publications.size }} publications.</p>
</div>

<div id="publication-list">
{%- assign by_year = publications | group_by: "year" %}
{%- for group in by_year %}
<section class="publication-year">
<h3>{{ group.name }}</h3>
<ul>
{%- for pub in group.items %}
<li class="publication" data-tags="{{ pub.type | slugify }}{% for topic in pub.topics %} {{ topic | slugify }}{% endfor %}">
{{ pub.citation | markdownify | remove: "<p>" | remove: "</p>" | strip }}
<span class="publication-tags">
<button type="button" class="pub-tag" data-tag="{{ pub.type | slugify }}" aria-pressed="false">{{ pub.type }}</button>
{%- for topic in pub.topics %}
<button type="button" class="pub-tag" data-tag="{{ topic | slugify }}" aria-pressed="false">{{ topic }}</button>
{%- endfor %}
</span>
</li>
{%- endfor %}
</ul>
</section>
{%- endfor %}
</div>

<p id="publication-empty" hidden>No publications match. <button type="button" class="pub-clear">Clear filters</button></p>

<script>
(function () {
  var search = document.getElementById('publication-search');
  var count = document.getElementById('publication-count');
  var empty = document.getElementById('publication-empty');
  var items = document.querySelectorAll('#publication-list .publication');
  var active = {};

  function update() {
    var query = search.value.trim().toLowerCase();
    var tags = Object.keys(active);
    var shown = 0;
    items.forEach(function (item) {
      var itemTags = item.getAttribute('data-tags').split(' ');
      var match = tags.every(function (t) { return itemTags.indexOf(t) !== -1; }) &&
        (!query || item.textContent.toLowerCase().indexOf(query) !== -1);
      item.hidden = !match;
      if (match) shown++;
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
      ? 'Showing ' + shown + ' of ' + items.length + ' publications.'
      : 'Showing all ' + items.length + ' publications.';
    empty.hidden = shown > 0;
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
  });
  search.addEventListener('input', update);
})();
</script>

### Other contributions
<hr />

I also frequently facilitate discussions. Some of those are listed here:

* Moderator of a Panel on the role of Open Source in Open Science, June 27-29, 2023 at the <a href="https://acm-rep.github.io/2023/">2023 ACM Conference on Reproducibility and Replicability</a>.
