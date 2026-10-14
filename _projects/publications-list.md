{% assign publications = site.data.publications -%}
{% assign topics = publications | map: "topics" | join: "|" | split: "|" | uniq | sort -%}
{% assign types = publications | map: "type" | uniq | sort -%}
<div id="publication-filters">
<label for="publication-search" class="sr-only">Search publications</label>
<input type="search" id="publication-search" class="form-control" placeholder="Search by title, author, journal, year…">
<div class="tag-group" role="group" aria-label="Filter by review status">
<span class="tag-group-label">Show</span>
<button type="button" class="pub-tag" data-tag="peer-reviewed" aria-pressed="false">Peer Reviewed</button>
</div>
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
<p id="publication-count" aria-live="polite">Showing all {{ publications.size }} publications and outputs.</p>
</div>

<div id="publication-list">
{%- assign by_year = publications | group_by: "year" %}
{%- for group in by_year %}
<section class="publication-year">
<h3>{{ group.name }}</h3>
<ul>
{%- for pub in group.items %}
<li class="publication" data-tags="{% if pub.peer_reviewed %}peer-reviewed {% endif %}{{ pub.type | slugify }}{% for topic in pub.topics %} {{ topic | slugify }}{% endfor %}">
<div class="publication-citation">{{ pub.citation | markdownify | remove: "<p>" | remove: "</p>" | strip }}
{%- if pub.doi %} <a href="https://doi.org/{{ pub.doi }}">doi:{{ pub.doi }}</a>{% endif %}</div>
{%- assign open_doi = false %}
{%- if pub.doi contains "10.5281/zenodo" or pub.doi contains "10.48550/arXiv" %}{% assign open_doi = true %}{% endif %}
{%- assign request = false %}
{%- assign not_a_paper = "Presentation,Poster,Software,Data,Edited Volume" | split: "," %}
{%- unless pub.pdf or open_doi or not_a_paper contains pub.type %}{% assign request = true %}{% endunless %}
{%- if pub.url or pub.pdf or pub.bib or pub.slides or pub.recording or request %}
<div class="publication-links">
{%- if pub.url %} <a href="{{ pub.url }}">Link</a>{% endif %}
{%- if pub.pdf %} <a href="{{ pub.pdf }}">PDF</a>{% endif %}
{%- if pub.bib %} <a href="{{ pub.bib }}">bibtex</a>{% endif %}
{%- if pub.slides %} <a href="{{ pub.slides }}">slides</a>{% endif %}
{%- if pub.recording %} <a href="{{ pub.recording }}">recording</a>{% endif %}
{%- if request %} <a href="mailto:{{ site.author.email }}?subject={{ "Request for Paper: " | append: pub.title | url_encode | replace: "+", "%20" }}">email me</a>{% endif %}
</div>
{%- endif %}
<div class="publication-tags">
{%- if pub.peer_reviewed %}
<button type="button" class="pub-tag" data-tag="peer-reviewed" aria-pressed="false">Peer Reviewed</button>
{%- endif %}
<button type="button" class="pub-tag" data-tag="{{ pub.type | slugify }}" aria-pressed="false">{{ pub.type }}</button>
{%- for topic in pub.topics %}
<button type="button" class="pub-tag" data-tag="{{ topic | slugify }}" aria-pressed="false">{{ topic }}</button>
{%- endfor %}
</div>
</li>
{%- endfor %}
</ul>
</section>
{%- endfor %}
</div>

<p id="publication-empty" hidden>No publications match. <button type="button" class="pub-clear">Clear filters</button></p>

<script src="/assets/js/publications.js"></script>
