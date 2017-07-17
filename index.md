---
layout: index
title: "The Litt Review"
description: "Where I review books"
---
{% include JB/setup %}
{% include themes/minimalber/litt-review-email-subscribe.html %}

<div class="wrapper">
<ul class="litt-list">
{% assign pages_list = site.reviews | reverse %}
{% for node in pages_list %}
  {% if node.title != null %}
    {% if page.url == node.url %}
    <li class="active"><a href="{{ BASE_PATH }}{{node.url}}" class="active">{{node.title}} by {{node.author}}</a></li>
    {% else %}
    <li><a href="{{ BASE_PATH }}{{node.url}}">{{node.title}}</a> by {{node.author}}.
      {% if node.date != null %}
      <span class="date">{{node.date | date: "%b %-d, %Y"}}</span>.</li>
      {% endif %}
    {% endif %}
  {% endif %}
{% endfor %}
{% assign pages_list = nil %}
{% assign group = nil %}
</ul>
</div>

<hr />

### Previous Years

I've been keeping track of what books I read for years. Here are lists set up before the Litt Review.

- [2017](/books/2017)
- [2016](/2017-02-08/books-i-read-in-2016)
- [2015](/2015-12-29/books-i-read-in-2015)
- [2014](/2015-01-04/books-from-2014)
