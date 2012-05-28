---
layout: page
title: Richard Littauer's Bog
tagline: (a mere mirror-mere)
---
{% include JB/setup %}

<div style="width:800px;">
<img style="float:left;padding-right:15px;" src="images/inktank.png" /> 

Welcome to my personal Github site. This blog is for:<br/>
 - Talking about projects, like <a href="http://github.com/RichardLitt/wired-in">Wired In</a>, my
semi-automatic terminal-run blog-based time tracking program.<br />
 - Blog posts when I don't want to use Wordpress on my [normal blog](http://www.burntfen.net)<br />
 - Random thoughts<br />
 - Cafe reviews, a.l.a. [Edinburgh Cafes](http://www.edinburghcafes.com)<br />
<br />
I've written more information on my <a href="about.html">About</a> page, but I
doubt it'll actually be very helpful. By the way, I am <a href="http://www.burntfen.net">this guy</a>.  
</div>
<br />
####And now for some posts completely different. 

<hr />

{% for post in site.posts limit:5 %}
  <div style="width:700px;padding-left:100px;">
  <span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}"><b>{{ post.title }}</b></a>
  <div style="float:right;">      
    <span>{% for tag in post.tags %} {{ tag }} {% endfor %} </span>
    &laquo;&laquo;
    <span><a href="{{ BASE_PATH }}categories.html#{{ post.category }}-ref">
      {{ post.category }}
    </a></span>
  </div>
  <br /><br />
  <span>{{ post.content }}</span>
  <br />
  <hr />
  </div>
{% endfor %}

<div style="width:800px;padding-left:100px;">
<h4>Past posts.</h4>
<br />
<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}"><b>{{ post.title }}</b></a>
      &raquo;&raquo;
      <span>
      <a href="{{ BASE_PATH }}categories.html#{{ post.category }}-ref">
        {{ post.category }}
      </a>
      </span>
    </li>
  {% endfor %}
</ul>

And here we come to the end. 
</div>
