---
layout: page
title: Richard Littauer's Blog
tagline: 
---
{% include JB/setup %}

<div style="width:800px;">
<img style="float:left;padding-right:15px;" src="images/inktank.png" /> 
Welcome to my personal Github site. I hope to integrate this with [Wired In](http://github.com/RichardLitt/wired-in), to create a
semi-automatic terminal-run blog-based time tracking program. As if
keeping track of myself weren't enough, soon you'll be able to follow
along. 

However, that might be a while. For one, I don't want everything I do
all day to be publicly on the internet, no matter how much I like Open
Notebooks. So, instead, this blog will be used to keep track of my thoughts when a commit on a time tracker won't do it, and when I don't have the effort to write a full
blog on Wordpress. All of this is to say that you can expect a lot of posts
a couple of paragraphs long here. If I stop at any point, someone remind
me. I've written more information on my [About](about.html) page, but I
doubt it'll actually be very helpful. By the way, I am [this
guy](http://www.burntfen.net).
</div>

####And now for some posts. 

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

<div style="width:700px;padding-left:100px;">
####Past posts.
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
