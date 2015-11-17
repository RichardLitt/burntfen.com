---
layout: index
title: Richard's Bog
tagline:
---
{% include JB/setup %}

<div class="posts">
  {% for post in site.posts limit:3 %}
  <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a><br />
  {% endfor %}
  <a class="more" href="/archive">More posts...</a>
</div>

<div class="row col-md-12 projects">
  {% assign projects = (site.projects | sort: 'ranking') %}
  {% for project in projects %}
    {% assign loopindex = forloop.index | modulo: 3 %}
    {% if loopindex == 1 %}
      <div class="col-xs-6 col-sm-4 col-md-3" style="margin-left:0px;">
    {% else %}
      <div class="col-xs-6 col-sm-4 col-md-3">
    {% endif %}
        <div class="img-container">
          <a href="{{ project.outbound }}">
            <img src="assets/img/projects/{{ project.picture }}" class="card-image"/>
          </a>
        </div>
        <a class="project-title" href="{{ project.outbound }}">
          <h4>
            {{ project.title }}
          </h4>
          <p>{{ project.stub}}<br />
          {{ project.role }} <span class="status">{{ project.status }}</span></p>
        </a>
      </div>
  {% endfor %}
</div>
