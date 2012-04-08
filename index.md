---
layout: page
title: The Micro Bog
tagline: Puddling thoughts...
---
{% include JB/setup %}

![Avatar](/images/inktank.png) Welcome to my personal Github site. I hope to integrate this with [Wired In](http://github.com/RichardLitt/wired-in), to create a
semi-automatic terminal-run blog-based time tracking program. As if
keeping track of myself weren't enough, soon you'll be able to follow
along. 

<hr />

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
    <br />
    <span>{{ post.content }}</span><br />
    <hr />
    </li>
  {% endfor %}
</ul>

And here we come to the end. 
