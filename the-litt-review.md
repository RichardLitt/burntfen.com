---
layout: review-index
title: "The Litt Review"
description: "I'm in the news"
permalink: /the-litt-review/index.html
---
{% include JB/setup %}

Do you want to get book reviews and notes from books I read in your inbox? Sign up! I'll include a summary, my favorite quotes from the book, and any vocabulary I found interesting or didn't know already.

<!-- Begin MailChimp Signup Form -->
<link href="https://cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
<div id="mc_embed_signup">
<form action="//burntfen.us9.list-manage.com/subscribe/post?u=54a70a2c82373a0980e031871&amp;id=dd50cf0034" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
<div id="mc_embed_signup_scroll">

<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
<div class="mc-hidden"> aria-hidden="true"><input type="text" name="b_54a70a2c82373a0980e031871_dd50cf0034" tabindex="-1" value=""></div>
<div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
</div>
</form>
</div>

<!--End mc_embed_signup-->

<ul>
{% assign pages_list = site.reviews %}
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

<hr />

### Previous Years

I've been keeping track of what books I read for years. Here are lists set up before the Litt Review.

- [2017](https://www.burntfen.com/books/2017)
- [2016](https://www.burntfen.com/2017-02-08/books-i-read-in-2016)
- [2015](https://www.burntfen.com/2015-12-29/books-i-read-in-2015)
- [2014](https://www.burntfen.com/2015-01-04/books-from-2014)
