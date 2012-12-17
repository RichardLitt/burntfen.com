---
layout: page
title: Richard Littauer's Bog
tagline: (a mere mirror-mere)
---
{% include JB/setup %}

<div style="width:800px;">
<img style="float:left;padding-right:15px;" src="images/inktank.png" /> 

<p>I'm Richard Littauer, a computational linguist graduate student. This
is my blog. I generally talk here about stuff I am doing, things that
interest me, or random thoughts. I use this site as a base for
disseminating my research, which focuses on providing resources for low
resource languages, among other topics. I also use this site to
catalogue my many side projects, whether academic, scholastic, or
artistic.</p>

<p><b>I am currently writing many of the pages listed in the navbar, above.
Please remain calm and check in again soon, or send me an email if you
really want to read something.</b></p>

<p>I've written much more information on my <a
href="about.html">About</a> page. If you want a more visual site, I am
<a href="http://www.burntfen.net">this guy</a>.</p>  
</div> 


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
  {% for post in site.posts limit:10 %}
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
