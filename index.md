---
layout: index
title: Richard Littauer
tagline: My personal website, where I list all of my main projects and occasionally blog.
---
{% include JB/setup %}

<div class="wrapper">
  <div id="contact" >
    <div class="container">
      <div class="row col-sm-8 col-sm-offset-2 speak">

        <p>Burnt Fen Creative is where Richard Littauer and his team exercises their creative muscles. From <a href="https://www.burntfen.com/projects/maintainer-mountaineer/">Maintainer Mountaineer</a> to <a href="https://www.burntfen.com/projects/the-user-is-drunk/">The User is Drunk</a>, from <a href="https://www.burntfen.com/projects/bushwhich/">Bushwhich</a> to <a href="https://www.burntfen.com/projects/wordhoard-press/">Word Hoard Press</a>, we focus on new ways to understand art and media, the internet and words, markets and businesses.</p>

        <p>Richard is available for talks, consulting, and collaboration.</p>

        <form class="tlemailform" action="https://tinyletter.com/richlitt" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/richlitt', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
          <span class="input input--madoka">
              <input type="hidden" value="1" name="embed" />
              <input class="input__field input__field--madoka" name="email" type="text" id="tlemail" />
              <label class="input__label input__label--madoka" for="tlemail">
              <svg class="graphic graphic--madoka" width="100%" height="100%" viewBox="0 0 404 77" preserveAspectRatio="none">
              <path d="m0,0l404,0l0,77l-404,0l0,-77z"/>
              </svg>
              <span class="input__label-content input__label-content--madoka">Email</span>
          </label>
          </span>
          <button class="btn btn-subscribe" type="submit" value="Subscribe">Start reading Richard's weekly newsletter</button>
        </form>

        <div class='social-media'>
          <a href="https://github.com/RichardLitt" rel="me"><i class="fa fa-github"></i></a>
          <a href="https://twitter.com/#!/richlitt" rel="me"><i class="fa fa-twitter"></i></a>
          <a href="https://medium.com/@richlitt"><i class="fa fa-medium"></i></a>
          <a href="https://instagram.com/richlittv3/"><i class="fa fa-instagram"></i></a>
          <a href="https://dribbble.com/richlitt"><i class="fa fa-dribbble"></i></a>
          <a href="http://www.flickr.com/photos/101526362@N04/"><i class="fa fa-flickr"></i></a>
          <a href="http://www.last.fm/user/RichardFenn"><i class="fa fa-lastfm"></i></a>
          <a href="https://angel.co/richlitt"><i class="fa fa-angellist"></i></a>
        </div>

        <p><a href="mailto:richard@burntfen.com">richard@burntfen.com</a></p>

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
                <img src="assets/img/project/{{ project.picture-small }}" class="card-image"/>
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
  <div class="row col-md-12 press">
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
