---
layout: page
title: Stasis Box
tagline: Open it, there might be a tcheran board.
---
{% include JB/setup %}

Welcome to my personal Github site. I hope to integrate this with
[Wired In](http://github.com/RichardLitt/wired-in), to create a
semi-automatic terminal-run blog-based time tracking program. As if
keeping track of myself weren't enough, soon you'll be able to follow
along. 

## Current Posts

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

That's all for now. Unless you know where I can find the M'Hael?
