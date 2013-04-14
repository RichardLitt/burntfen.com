---
layout: index
title: Richard's Bog
tagline: 
---
{% include JB/setup %}

<div class="title" id="blog-posts">
  Recent Posts
</div> 

<div>
  <ul class="posts">
    {% for post in site.posts limit:15 %}
      <li class="posts-title"><span class="alignleft"><a href="{{ BASE_PATH }}{{ post.url }}"><b>{{ post.title }}</b></a> (<a href="{{ BASE_PATH }}categories.html#{{ post.category }}-ref">{{ post.category }}</a>)</span> <span class="alignright">{{ post.date | date_to_string }}</span></li>
    {% endfor %}
  </ul>
</div>

<div class="title" id="projects">
  Projects
</div> 

<div class="container-fluid">
  <div class="row-fluid">
    <div class="span3 text-box">
      <h4>projects</h4> 
      <p><a href="http://www.ideapod.com">IdeaPod</a><br />i am the front-end developer for this idea-sharing site. this is my child right now.</p>
      <p><a href="http://wyrdin.com/">Wyrd In</a><br />a Realise It! sponsored project i'm leading a team on, based on <a href="https://github.com/RichardLitt/wired-in/">wired in</a>, my time keeper and task organiser project</p>
      <p><a href="http://www.ideaotter.com/">idea otter</a><br />a site to share ideas.</p>
      <p><a href="http://www.octobuild.com/">octobuild</a><br />we're working on a month-long appathon, this october</p>
    </div>

    <div class="span3 text-box">
      <h4>linguistics</h4> 
      <p><a href="https://github.com/RichardLitt/keypuk-ninavi">keypuk nìna'vi</a><br />a community project i'm spearheading translating facebook into na'vi</p>
      <p><a href="http://glossy.vansintjan.net/">glossy</a><br />my friend simon and i are working on an app for quick sharing of word lists</p>
      <p><a href="http://burntfen.net/healingwords">healing words</a><br />an ongoing project with simon to provide word and phrase lists for aid workers</p>
    </div>

    <div class="span3 text-box">
      <h4>conlangs</h4> 
      <p><a href="http://www.learnnavi.org">na'vi</a><br/>as 'taronyu', i created the definitive na'vi dictionary, and still function as an admin of the largest na'vi site in the world.</p>
      <p><a href="http://www.dothraki.org">dothraki</a><br />as 'lajaki', i started up the fanbase for david peterson's language, based off of g.r.r. martin's books, now an h.b.o. series</p>
    </div>

    <div class="span3 text-box">
      <h4>other stuff</h4> 
      <p><a href="http://www.tigatag.com/home/">tigatag</a><br />i write stuff for this web app company sometimes</p>
      <p><a href="https://github.com/RichardLitt">github</a><br />all of my publicly available code</p>
    </div>
  </div>
</div>

<div class="title" id="linguistics">
  Linguistics
</div> 

<div class="container-fluid row-fluid">
  <div class="span3 text-box">
    <h4>research</h4>
    <p><a href="http://richardlitt.github.com/publications.html">publications</a><br />a list of my current academic publications</p>
    <p><a href="http://scholar.google.com/citations?hl=en&user=X2UD62YAAAAJ">scholar</a><br />my google scholar account</p>
    <p><a href="http://www.slideshare.net/RichLitt">slides</a><br />slides for presentations i've given</p>
    <p><a href="http://www.burntfen.net/merecat/?page_id=472">current lines</a><br />i keep a list of current research projects on my blog</p>
  </div>

  <div class="span3 text-box">
    <h4>blogging</h4>
    <p><a href="http://www.replicatedtypo.com">replicated typo</a><br />i write the occasional research blog here, on the evolution of culture and language.</p>
    <p><a href="http://clojurelx.blogspot.com/">clojurelx</a><br />i help explain why lisp is great for linguists</p>
    <p><a href="visquantling.github.com">visquantling</a><br />i write about visualisation of language, following after a workshop at eacl in avignon</p>

    <br />

    <h4>web master</h4>
    <p><a href="http://www.uklo.org">the u.k. linguistics olympiad</a><br />part of an international linguistics olympiad for school children</p>
    <p><a href="http://www.clie.org.uk">the committee for linguistics in education</a><br />promoting linguistics in schools</p>
    <p><a href="http://www.language-alliance.org.uk">the language alliance</a><br />promoting linguistics in the uk</p>
  </div>

  <div class="span3 text-box">
    <h4>professional societies</h4>
      <p><a href="http://lsacelp.org/">c.e.l.p.</a><br />the linguistics society of america committee for endangered languages and their preservation; i helped set this page up.</p>
      <p><a href="http://groups.google.com/group/ling-outside">linguists outside of academia</a><br />i cofounded this email list and group.</p>
      <p><a href="http://linguistics.okfn.org/">open linguistics</a><br />i'm a member of this working group, part of the open knowledge foundation</p>
      <p><a href="http://www.lingstudents.co.uk/blog">u.l.a.b.</a><br/>the undergraduate linguistics association of britain: i helped found it, ran the first conference, and help out as an advisor.</p>
  </div>

  <div class="span3 text-box">
    <h4>student representative</h4>
      <p><a href="http://www.lagb.org.uk/">l.a.g.b.</a><br />the linguistics association of great britain: i am on the student committee.</p>
      <p><a href="https://lsadc.org/">c.o.s.i.a.c.</a><br />the linguistics society of america committee on student issues and concerns: member</p>
      <p><a href="http://em-a.eu/">erasmus mundus</a><br />i am the representative for the  language and communication technologies course.</p>
  </div>
</div>

<div class="title" id="art">
  Poetry and Art
</div> 

<div class="container-fluid">
  <div class="row-fluid">
    <div class="span3 text-box">
      <h4>writing</h4>
      <p><a href="http://richardlitt.github.com">poetry</a><br />i blog my new poems here, for the moment</p>
      <p><a href="http://www.burntfen.net/poetry">older poetry</a><br />some poetry i am not entirely ashamed of</p>
      <p><a href="http://www.burntfen.net/prose">prose</a><br />some old prose pieces of mine</p>
    </div>

    <div class="span3 text-box">
      <h4>audio</h4>
      <p><a href="http://soundcloud.com/richard-littauer">spoken</a><br />my spoken word poems and some songs.</p>
      <p><a href="http://soundcloud.com/marsalfornication">marsalifornication</a><br />my band from malta, with jan joachimsen and daan henselmans.</p>
      <p><a href="/heraclitus">heraclitus</a><br />fragments of heraclitus spoken word story-telling project</p>
    </div>

    <div class="span3 text-box">
      <h4>art</h4>
      <p><a href="http://www.burntfen.net/comic/index.html">webcomic</a><br />my old burnt fen comic, which i kept going for around two years. very depressing at times.</p>
      <p><a href="http://www.burntfen.net/themeadows.png">meadows</a><br />a map of the meadows in edinburgh divided into mario characters.</p>
      <p><a href="http://www.burntfen.net/merch/">fashion</a><br />i sometimes design and sell shirts, among other things</p>
    </div>

    <div class="span3 text-box">
      <h4>more</h4>
      <p><a href="http://www.edinburghcafes.wordpress.com">café</a><br />where i rated various cafes in edinburgh; chris scott and simon too</p>
      <p><a href="https://twitter.com/#!/deadguys">deadguys</a><br />i tweet when musicians die.</p>
    </div>
  </div>
</div>

<!-- 
<div class="title" id="real-life">
  Real Life
</div> 

<div class="container-fluid">
  <div class="row-fluid">
    <div class="span3 text-box">
      <i>i love to do these things. drop a line if you do, too. always looking for others.</i>
      <p>
      <b>mountains:</b> ski mountaineer trek climb <br/>
      <b>waters:</b> sail canoe kayak fly-fish<br />
      <b>hills:</b> slackline hike camp trudge bird-watch <br />
      <b>cities:</b> bike walk explore dumpster-dive <br /></p>
      <p>i am also an avid <a href="http://www.couchsurfing.org/people/richardlitt"><b>couch surfer</b></a>.</p>
    </div>
    <div class="span9"></div>
  </div>
</div> 
-->

<div class="title" id="fossils">
  Past Projects
</div> 

<div class="container-fluid">
  <div class="row-fluid">
    <div class="span3 text-box">
      <h4>linguistics</h4>
      <p><a href="http://langsoc.eusa.ed.ac.uk">langsoc</a><br/> the edinburgh university linguistics and english language society: i started it up again, and was president and webmaster</p>
      <p><a href="http://ela.eusa.ed.ac.uk">e.l.a.</a><br />the edinburgh language ambassadors promote multilingualism in scotland; i built their website, back when i used wordpress. </p>
      <p><a href="http://thedatahub.org/user/richlitt">datahub</a><br /> data hub for any data i might have</p>
    </div>

    <div class="span3 text-box">
      <h4>blogs</h4>
      <p><a href="https://notebooks.dataone.org/workflows/">workflows</a><br /> my 2011 DataONE internship on scientific workflows.</p>
      <p><a href="http://langsoc.eusa.ed.ac.uk/?cat=4">langsoc blog</a><br/> i blogged a lot about linguistics here as an undergrad.</p>
    </div>

    <div class="span3 text-box">
      <h4>conlangs</h4>
      <p><a href="http://conlang.org">language creation society</a><br />a professional conlanging association; i served on the board of directors as an advisor.</p>
      <p><a href="http://llama.conlang.org">about</a><br />my old conlanging site, where i talk about my involvement with na'vi, dothraki, and my language, llárriésh.</p>
      <p><a href="https://twitter.com/#!/learnvalyrian">valyrian</a><br />trying to build the hype for valyrian, also from game of thrones</p>
    </div>

    <div class="span3 text-box">
      <h4>societies</h4>
      <p><a href="http://www.coli.uni-saarland.de/fs-coli/Main/HomePage">fachschaft</a><br />i was a member of the student committee in saarbrücken.</p>
      <p><a href="http://www.lingstudents.org">i.a.l.s</a><br />the international association of linguistics students: i was the founder and director, and used to maintain this site.</p>
      <p><a href="http://www.saivus.org">s.a.i.v.u.s.</a><br />the society for advancing the indigenous vernaculars of the united states; i helped out with tech support.</p>
    </div>
  </div>
</div>
