---
layout: page
title: "Microblog"
description: "An attempt at publishing all of my social media posts locally first"
---
{% include JB/setup %}

I've made a new page that I can throw microposts at, so I can link to them from Mastodon, Twitter, BlueSky, whatever. This way they're published here first, and I retain copyright. It's not perfect, and I need to set up bridges to automatically post to other platforms. Ideally, though, I would publish here first. There's of course more questions around image hosting, retweets or boosts, proper metadata and conforming to platform limits like character counts. 


{% for mpost in site.data.microposts %}
<p>
    <a href="#{{ mpost.date }}">{{ mpost.date | date: "%c %Z" }}</a>: {{ mpost.post }}
</p>
{% endfor %}