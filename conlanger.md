---
layout: page
title: "Conlanger"
group: navigation
description: "A description of my general work with constructed languages"
---
{% include JB/setup %}

I am a professional conlanger - a term for someone who makes up constructed languages. Over the years, I've made a few languages for various purposes - for the _His Dark Materials_ TV Show, for a video game, and for a few artists and writers. I've also taught a high school course on linguistics and creating constructed languages at Pacem School in Vermont (where I was also the Latin tutor for three years).

Generally, I start with talking to the client about what their needs are. Depending on that, I make a phoneme set for the language, and then develop phonotactic rules for how those sounds are put together in words. More recently, I've spent time using code to automatically generate word lists, with help from Joe Hildebrand and based on [Lexifer](https://www.lingweenie.org/conlang/lexifer.html) by WM Annis. Then I build morphological and syntactic rules for the languages, and start translating. I provide pronounciation guides, word lists, and translations. It's very rewarding work.

Some of my work is under NDA. Recent, relevant work is below.

I started conlanging in my early teens. In university, I got pretty involved in the Na'vi community, the conlang from the movie Avatar. I then spent time on GRR Martin's languages, before David Peterson took over and made excellent conlangs based on them for the HBO show.

I'm a member of the [Language Creation Society](https://conlang.org/), and support conlanging in general. If you're interested in talking about conlangs, hit me up at my email, richard at this site.

<div class="other-projects">
  <div class="row col-xs-12">
    <hr />
    <h1 class="section-title">Other Projects</h1>
  </div>
  <div class="row projects">
    {% assign projects = site.projects | where: "conlang", true | sort: 'ranking' %}
    {% for project in projects %}
      {% if page.id == project.id %}
        {% continue %}
      {% endif %}
        <div class="project col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-0 col-md-3">
          <div class="img-container">
            <a href="{{ project.url }}">
              <img src="../../assets/img/project/{{ project.picture-small }}" alt="{{ project.title }} logo" class="card-image"/>
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
      <div class="clearfix visible-sm-block"></div>
    {% endfor %}
  </div>
</div>