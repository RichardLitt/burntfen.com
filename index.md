---
layout: index
title: Richard Littauer
tagline: My personal website, where I list all of my main projects and occasionally blog.
homepage: true
---
{% include JB/setup %}

<div class="wrapper">
  <div id="contact" >
    <div class="container">
      <div class="row col-sm-10 col-sm-offset-2 speak">
        <p class="name">Richard Littauer.</p>
        <div class="identity">
          <p class="identity-links">
            <a href="./projects/phd" class="social-media">PhD Student.</a>
          </p>
          <p class="identity-links">
            Open sourceror.
          </p>
          <p class="identity-links">
            <a href="./conlanger" class="social-media">Conlanger.</a>
          </p>
        </div>
        <div class="posts">
          <a class="more" href="/blog">Recent blog posts</a>
          {% assign posts = site.posts | where: "public", true %}
          {% for post in posts limit:5 %}
          <li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}<span class="date">{{post.date | date: "%b %d, '%y"}}</span></a></li>
          {% endfor %}
          <a class="more" href="/blog">More posts &rarr;</a>
        </div>
        <div class='social-media-wrapper'>
          <a href="./2023-05-30/socials" class="social-media">Contact or follow me.</a>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row col-md-12 projects">
      {% assign projects = site.projects | sort: 'ranking' %}
      {% for project in projects %}
        {% assign loopindex = forloop.index | modulo: 3 %}
          <div class="project col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-0 col-md-3">
            <div class="img-container">
              <a href="{{ project.url }}">
                <img src="assets/img/project/{{ project.picture-small }}" alt="{{ project.title }}" class="card-image"/>
              </a>
            </div>
            <a class="project-title" href="{{ project.url }}">
              <h4>
                {{ project.title }}
              </h4>
              <p>{{ project.stub}}<br />
              {{ project.role }} <span class="status">{{ project.status }}</span></p>
            </a>
          </div>
        {% if forloop.index == 3 %}
          <div class="clearfix visible-sm-block"></div>
        {% elsif forloop.index == 4 %}
          <div class="clearfix visible-md-block visible-lg-block"></div>
        {% elsif forloop.index == 12 %}
          <div class="clearfix visible-md-block visible-lg-block"></div>
        {% endif %}
      {% endfor %}
    </div>
  </div>
</div>

<div class="container">
  <div class="row press">
    <h1 class="section-header">Past Clients</h1>
    {% for client in site.data.clients %}
      {% if clients.hide != true %}
      <div class="col-xs-6 col-sm-3 col-md-2">
        <div class="img-container">
          <img src="assets/img/clients/{{ client.image }}" title="{{ client.client }}" class="card-image">
        </div>
      </div>
      {% endif %}
    {% endfor%}
  </div>
</div>

<div class="container">
  <div class="row press">
    <h1 class="section-header">Press</h1>
    {% for press in site.data.press %}
      {% if press.hide != true %}
        <div class="col-xs-6 col-sm-3 col-md-2">
          <div class="img-container">
            <a href="{{ press.url }}" title="{{ press.title }}">
              <img src="assets/img/press/{{ press.image }}" class="card-image">
            </a>
          </div>
        </div>
      {% endif %}
    {% endfor %}
  </div>
</div>

{% include footer.html %}
