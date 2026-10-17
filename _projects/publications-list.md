{% assign publications = site.data.publications -%}
{% assign topics = publications | map: "topics" | join: "|" | split: "|" | where_exp: "topic", "topic != ''" | uniq | sort -%}
{% assign types = publications | map: "type" | join: "|" | split: "|" | uniq | sort -%}
{% assign statuses = publications | map: "status" | compact | uniq -%}
<div id="publication-filters">
<label for="publication-search" class="sr-only">Search publications</label>
<input type="search" id="publication-search" class="form-control" placeholder="Search by title, author, journal, year…">
<div class="tag-group" role="group" aria-label="Filter by review status">
<span class="tag-group-label">Show</span>
<button type="button" class="pub-tag" data-tag="peer-reviewed" aria-pressed="false">Peer Reviewed</button>
<button type="button" class="pub-tag" data-tag="during-phd" aria-pressed="false">During PhD</button>
{%- for status in statuses %}
<button type="button" class="pub-tag" data-tag="{{ status | slugify }}" aria-pressed="false">{{ status }}</button>
{%- endfor %}
</div>
<div class="tag-group" role="group" aria-label="Filter by topic">
<span class="tag-group-label">Topic</span>
{%- for topic in topics %}
<button type="button" class="pub-tag topic topic-{{ topic | slugify }}" data-tag="{{ topic | slugify }}" aria-pressed="false">{{ topic }}</button>
{%- endfor %}
</div>
<div class="tag-group" role="group" aria-label="Filter by type">
<span class="tag-group-label">Type</span>
{%- for type in types %}
<button type="button" class="pub-tag" data-tag="{{ type | slugify }}" aria-pressed="false">{{ type }}</button>
{%- endfor %}
</div>
<p id="publication-count" aria-live="polite">Showing all {{ publications.size }} publications and outputs.</p>
<p id="publication-hint">Click tags to narrow the list. Shift-click to add a tag as an alternative instead.</p>
</div>

<div id="publication-list">
{%- assign by_year = publications | group_by: "year" %}
{%- for group in by_year %}
<section class="publication-year">
<h3>{{ group.name }}</h3>
<ul>
{%- comment %} In-press entries first, as they're the most recent; then newest first by date; undated entries follow in file order {% endcomment %}
{%- assign in_press = group.items | where: "status", "In Press" %}
{%- assign published = group.items | where_exp: "pub", "pub.status != 'In Press'" %}
{%- assign dated = published | where_exp: "pub", "pub.date" | sort: "date" | reverse %}
{%- assign undated = published | where_exp: "pub", "pub.date == nil" %}
{%- assign items = in_press | concat: dated | concat: undated %}
{%- for pub in items %}
{%- comment %} `type` may be a single type or a list of them {% endcomment %}
{%- assign pub_types = pub.type | join: "|" | split: "|" %}
{%- comment %} My PhD started in 2024; anything since then, or still in review, counts as "During PhD" {% endcomment %}
{%- assign during_phd = false %}
{%- if pub.year == "In Review" %}{% assign during_phd = true %}{% elsif pub.year >= 2024 %}{% assign during_phd = true %}{% endif %}
<li class="publication" data-tags="{% if during_phd %}during-phd {% endif %}{% if pub.peer_reviewed %}peer-reviewed {% endif %}{% if pub.status %}{{ pub.status | slugify }} {% endif %}{% for t in pub_types %}{{ t | slugify }} {% endfor %}{% for topic in pub.topics %} {{ topic | slugify }}{% endfor %}">
{%- comment %} Bold my name when there's more than one author {% endcomment %}
{%- assign authors = pub.citation | split: " (2" | first %}
{%- assign opening = pub.citation | slice: 0, 18 %}
{%- assign citation = pub.citation %}
{%- if authors contains "Richard Littauer" and opening != "Richard Littauer (" and opening != "Richard Littauer. " %}
{%- assign citation = citation | replace_first: "Richard Littauer", "**Richard Littauer**" %}
{%- endif %}
<div class="publication-citation">{{ citation | markdownify | remove: "<p>" | remove: "</p>" | strip }}
{%- if pub.doi %} <a href="https://doi.org/{{ pub.doi }}">https://doi.org/{{ pub.doi }}</a>{% endif %}</div>
{%- assign open_doi = false %}
{%- if pub.doi contains "10.5281/zenodo" or pub.doi contains "10.48550/arXiv" %}{% assign open_doi = true %}{% endif %}
{%- assign request = false %}
{%- assign not_a_paper = "Presentation,Poster,Software,Data,Edited Volume,Popular Article,Creative Writing,Dictionary" | split: "," %}
{%- assign is_paper = false %}
{%- for t in pub_types %}{% unless not_a_paper contains t %}{% assign is_paper = true %}{% endunless %}{% endfor %}
{%- unless pub.pdf or pub.preprint or open_doi %}{% if is_paper %}{% assign request = true %}{% endif %}{% endunless %}
{%- capture abstract_id %}abstract-{{ group.name | slugify }}-{{ forloop.index }}{% endcapture %}
{%- if pub.url or pub.pdf or pub.preprint or pub.bib or pub.slides or pub.poster or pub.recording or request or pub.abstract %}
<div class="publication-links">
{%- comment %} PDF first, then the link, then everything else; bibtex, then the abstract toggle, last {% endcomment %}
{%- if pub.pdf %} <a href="{{ pub.pdf }}">PDF</a>{% endif %}
{%- if pub.url %} <a href="{{ pub.url }}">Link</a>{% endif %}
{%- if pub.preprint %} <a href="{{ pub.preprint }}">preprint</a>{% endif %}
{%- if pub.slides %} <a href="{{ pub.slides }}">slides</a>{% endif %}
{%- if pub.poster %} <a href="{{ pub.poster }}">poster</a>{% endif %}
{%- if pub.recording %} <a href="{{ pub.recording }}">recording</a>{% endif %}
{%- if request %} <a href="mailto:{{ site.author.email }}?subject={{ "Request for Paper: " | append: pub.title | url_encode | replace: "+", "%20" }}">email me</a>{% endif %}
{%- if pub.bib %} <a href="{{ pub.bib }}">bibtex</a>{% endif %}
{%- if pub.abstract %} <button type="button" class="pub-abstract-toggle" aria-expanded="false" aria-controls="{{ abstract_id }}">abstract <span class="pub-abstract-arrow" aria-hidden="true">▾</span></button>{% endif %}
</div>
{%- endif %}
{%- if pub.abstract %}
<div class="publication-abstract" id="{{ abstract_id }}" hidden>{{ pub.abstract | markdownify }}</div>
{%- endif %}
<div class="publication-tags">
{%- if pub.peer_reviewed %}
<button type="button" class="pub-tag" data-tag="peer-reviewed" aria-pressed="false">Peer Reviewed</button>
{%- endif %}
{%- if pub.status %}
<button type="button" class="pub-tag" data-tag="{{ pub.status | slugify }}" aria-pressed="false">{{ pub.status }}</button>
{%- endif %}
{%- for t in pub_types %}
<button type="button" class="pub-tag" data-tag="{{ t | slugify }}" aria-pressed="false">{{ t }}</button>
{%- endfor %}
{%- for topic in pub.topics %}
<button type="button" class="pub-tag topic topic-{{ topic | slugify }}" data-tag="{{ topic | slugify }}" aria-pressed="false">{{ topic }}</button>
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

{%- comment %} schema.org metadata for search engines. Work still in review is left out. {% endcomment %}
{%- assign published = publications | where_exp: "pub", "pub.year != 'In Review'" %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Publications and research outputs by Richard Littauer",
  "itemListElement": [
{%- for pub in published %}
{%- assign pub_types = pub.type | join: "|" | split: "|" %}
{%- assign schema_type = "CreativeWork" %}
{%- if pub_types contains "Journal Article" or pub_types contains "Short Note" or pub_types contains "Conference Paper" or pub_types contains "Book Review" %}{% assign schema_type = "ScholarlyArticle" %}
{%- elsif pub_types contains "Book Chapter" %}{% assign schema_type = "Chapter" %}
{%- elsif pub_types contains "Thesis" %}{% assign schema_type = "Thesis" %}
{%- elsif pub_types contains "Report" %}{% assign schema_type = "Report" %}
{%- elsif pub_types contains "Software" %}{% assign schema_type = "SoftwareSourceCode" %}
{%- elsif pub_types contains "Data" %}{% assign schema_type = "Dataset" %}
{%- elsif pub_types contains "Popular Article" %}{% assign schema_type = "Article" %}
{%- elsif pub_types contains "Presentation" or pub_types contains "Poster" %}{% assign schema_type = "PresentationDigitalDocument" %}
{%- endif %}
{%- assign author_names = pub.citation | split: " (2" | first | remove: ", et al." | remove: " et al." | remove: ", eds." | replace: " & ", ", " | split: ", " %}
{%- capture link %}{% if pub.doi %}https://doi.org/{{ pub.doi }}{% elsif pub.url %}{{ pub.url }}{% elsif pub.pdf %}{{ site.production_url }}{{ pub.pdf }}{% endif %}{% endcapture %}
    {
      "@type": "ListItem",
      "position": {{ forloop.index }},
      "item": {
        "@type": {{ schema_type | jsonify }},
        "name": {{ pub.title | jsonify }},
        "datePublished": "{{ pub.date | default: pub.year }}",
        "author": [{% for name in author_names %}{"@type": "Person", "name": {{ name | strip | jsonify }}}{% unless forloop.last %}, {% endunless %}{% endfor %}],
        "keywords": {{ pub.topics | join: ", " | jsonify }}
        {%- if pub.doi %},
        "identifier": {"@type": "PropertyValue", "propertyID": "DOI", "value": {{ pub.doi | jsonify }}}{% endif %}
        {%- if link != "" %},
        "url": {{ link | jsonify }}{% endif %}
      }
    }{% unless forloop.last %},{% endunless %}
{%- endfor %}
  ]
}
</script>
