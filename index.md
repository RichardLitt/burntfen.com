---
layout: index
title: Richard's Bog
tagline:
---
{% include JB/setup %}

<style>
.card-image {
  /*display: block;*/
  /*margin: auto;*/
  /*min-height:100%;*/
  max-width: 100%;
  position: absolute;
  -webkit-filter: opacity(100%);
  -webkit-transition: -webkit-filter .25s;
  transition: -webkit-filter .25s;
}

.img-container:hover {
  -webkit-filter: opacity(60%);
}

.img-container {
  position: relative;
  overflow:hidden;
  padding-bottom: 100%;
  /*height:300px;*/
  /*width:auto;*/
}

.project-title {
  font-size: 14px;
  line-height: 1.6em;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: .06em;
  text-align: center;
  font-weight: 300;
  font-style: normal;
  margin-bottom:60px;
  color: #404040;
}

h4 {
  height: 40px;
  margin-bottom: 0px;
  padding-bottom: 60px;
}

</style>

<div class="container row col-md-12" style="margin-left: 0px;">
  {% assign projects = (site.projects | sort: 'ranking') %}
  {% for project in projects %}
    {% assign loopindex = forloop.index | modulo: 3 %}
    {% if loopindex == 1 %}
      <div class="col-xs-6 col-sm-4 col-md-3" style="margin-left:0px;">
    {% else %}
      <div class="col-xs-6 col-sm-4 col-md-3">
    {% endif %}
        <div class="img-container">
          <a href="{{project.url}}">
            <img src="assets/img/projects/{{ project.picture }}" class="card-image"/>
          </a>
        </div>
        <a href="{{ project.url }}">
          <h4 class="project-title">
            {{ project.title }}
          </h4>
        </a>
      </div>
  {% endfor %}
</div>
