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

<script src="/assets/js/publications.js"></script>

### Other contributions
<hr />

I also frequently facilitate discussions. Some of those are listed here:

* Moderator of a Panel on the role of Open Source in Open Science, June 27-29, 2023 at the <a href="https://acm-rep.github.io/2023/">2023 ACM Conference on Reproducibility and Replicability</a>.
