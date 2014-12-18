---
layout: index
title: Richard's Bog
tagline: 
---
{% include JB/setup %}

<div class="icons-bar">
  <div class="container-fluid">
    <div class="row-fluid">
      <div class="span1 offset2">
          <a href="https://github.com/RichardLitt" rel="me"><i class="icon-github">
          </i>
        </a>
      </div>
      <div class="span1">
          <a href="https://twitter.com/#!/richlitt" rel="me"><i class="icon-twitter">
          </i>
        </a>
      </div>
      <div class="span1">
          <a href="https://gplus.to/richlitt"><i class="icon-google-plus">
          </i>
        </a>
      </div>
      <div class="span1">
          <a href="http://richfenne.tumblr.com"><i class="icon-tumblr">
          </i>
        </a>
      </div>
      <div class="span1">
          <a href="http://uk.linkedin.com/pub/richard-littauer/29/576/197"><i class="icon-linkedin">
          </i>
        </a>
      </div>
      <div class="span1">
          <a href="http://www.youtube.com/user/Rich0Fenn"><i class="icon-youtube">
          </i>
        </a>
      </div>
      <div class="span1">
          <a href="http://stackoverflow.com/users/1166929/richlitt"><i class="icon-stackexchange">
          </i>
        </a>
      </div>
      <div class="span1">
        <a href="http://www.flickr.com/photos/101526362@N04/"><i class="icon-flickr">
        </i>
        </a>
      </div>
<!--      <div class="span1">
        <a href="https://www.gittip.com/richlitt/"><i class="icon-gittip">
        </i>
        </a>
      </div>
      <div class="span1">
        <a href="donate.html"><i class="icon-bitcoin">
        </i>
        </a>
      </div>
       <div class="span1">
        <a href="donate.html"><i class="icon-money">
        </i>
        </a>
      </div> -->
      <div class="span2">
      </div>
    </div>
  </div>
</div>

<!-- 
<div class="title" >
  <i class="icon-keyboard">
  </i>
  Recent Posts
</div> 
 -->

<div class="hidden-phone" id="blog-posts">
  <ul class="posts">
    {% for post in site.posts limit:15 %}
      <li class="posts-title"><span class="alignleft"><a href="{{ BASE_PATH }}{{ post.url }}"><b>{{ post.title }}</b></a> (<a href="{{ BASE_PATH }}categories.html#{{ post.category }}-ref">{{ post.category }}</a>)</span> <span class="alignright">{{ post.date | date_to_string }}</span></li>
    {% endfor %}
  </ul>
</div>

<div class="visible-phone">
  <ul class="posts">
    {% for post in site.posts limit:5 %}
      <li class="posts-title"><span><a href="{{ BASE_PATH }}{{ post.url }}"><b>{{ post.title }}</b></a></span><br /><span>{{ post.date | date_to_string }}</span></li>
    {% endfor %}
  </ul>
</div>

<div class="title" id="projects">
  <i class="icon-coffee">
  </i>
  Projects
</div> 

<div class="container-fluid">
  <div class="row-fluid">
    <div class="span8 offset2 text-box">    
      <h5><a href="http://www.hipcamp.com">hipcamp</a></h5><p>
      i worked on this site for discovering parks and booking campsites</p>
      
      <h5><a href="http://www.ideapod.com">ideapod</a></h5><p>
      i was the front end developer for this idea-sharing site</p>
      
      <h5><a href="http://www.sadyoungman.com">sad young man</a></h5><p>
      i am releasing a book of poetry and drawings at some point</p>

      <h5><a href="http://octobuild.com/">octobuild</a></h5><p>
      i administer a month long online hackathon of sorts in october</p>

      <h5><a href="http://www.bushwhich.com/">bushwhich</a></h5><p>
      i made a choose-your-own-adventure photography game around my old neighborhood in brooklyn</p>
      
      <h5><a href="http://mellowpageslibrary.com">mellow pages library</a></h5><p>a website i built for my favorite library in bushwick</p>
      
      <h5><a href="http://linguistsoutsideacademia.com">linguists outside of academia</a></h5><p>
      i cofounded this email list and group.</p>

      <h5><a href="http://www.ideaotter.com/">idea otter</a></h5><p>
      a site to share ideas; less ambitious than ideapod</p>

      <h5><a href="http://jakinney.com/">j.a. kinney</a></h5><p>
      i built this portfolio website for an old friend of mine, who is a pretty
      good photographer</p>

      <h5><a href="http://www.lingstudents.co.uk/blog">u.l.a.b.</a></h5><p>
      the undergraduate linguistics association of britain: i cofounded it, ran the first conference, and help out as an advisor. it currently is in it's fifth year, and has hundreds of members</p>

      <h5>wyrd in</h5><p>
      i led a team of six in an incubator building a time keeper and task organisor, based on my<a href="https://github.com/RichardLitt/wired-in/">wired in</a> prototype</p>

      <h5><a href="http://www.uklo.org">the u.k. linguistics olympiad</a></h5><p>i'm the webmaster and built the site (years ago) of this organisation helping thousands of school children learn linguistics</p>

      <h5><a href="http://www.learnnavi.org">na'vi</a></h5><p>as 'taronyu', i created the definitive na'vi dictionary for the language from the movie avatar, used by 5000 regular users. i still technically function as an admin of the largest na'vi site in the world.</p>

      <h5><a href="http://www.dothraki.org">dothraki</a></h5><p>as 'lajaki', i started up the fanbase for david peterson's language, based off of g.r.r. martin's books, now an h.b.o. series</p>

      <h5><a href="http://langsoc.eusa.ed.ac.uk">langsoc</a></h5><p> the edinburgh university linguistics and english language society: i started it up again, and was president and webmaster</p>

      <h5><a href="http://em-a.eu/">erasmus mundus</a></h5><p>
      i was the representative for the  language and communication technologies masters course in seven countries, and was a student in germany and malta.</p>

      <h5><a href="http://thelifeemphatic.com">the life emphatic</a></h5><p>
      i built this site to chronicle my ownership and mediterranean voyage of my 25' yacht, maya</p>

      <h5><a href="http://www.burntfen.net/comic/index.html">webcomic</a></h5><p>my old burnt fen comic, which i kept going for around two years. very depressing at times.</p>

    </div>
  </div>
</div>


<div class="title" id="art">
  <i class="icon-camera-retro">
  </i>
  Art
</div> 

<div class="container-fluid">
  <div class="row-fluid">
    <div class="span8 offset2 text-box">
      <h5><a href="heraclitus/">heraclitus</a></h5>
      <p>fragments of heraclitus spoken word story-telling project</p>
      <h5><a href="http://soundcloud.com/marsalfornication">marsalifornication</a></h5>
      <p>my band from malta, with jan joachimsen and daan henselmans.</p>
      <h5><a href="categories.html#poetry-ref">poetry</a></h5><p>i blog my new poems here, for the moment</p>
      <h5><a href="http://www.burntfen.net/poetry">older poetry</a></h5><p>some poetry i am not entirely ashamed of</p>
      <h5><a href="http://www.burntfen.net/prose">prose</a></h5><p>some old prose pieces of mine</p>
      <h5><a href="http://soundcloud.com/richard-littauer">spoken</a></h5>
      <p>my spoken word poems and some songs.</p>
      <h5><a href="http://www.burntfen.net/themeadows.png">meadows</a></h5><p>a map of the meadows in edinburgh divided into mario characters.</p>
      <h5><a href="http://www.burntfen.net/comic/merch/">fashion</a></h5><p>i sometimes design and sell shirts, among other things</p>
      <h5><a href="http://www.edinburghcafes.com">café</a></h5><p>where i rated various cafes in edinburgh; chris scott and simon too</p>
      <h5><a href="https://twitter.com/#!/deadguys">deadguys</a></h5><p>i tweeted when musicians died. <i>discontinued</i></p>
    </div>
  </div>
</div>

<div class="title" id="linguistics">
  <i class="icon-book">
  </i>
  Academia
</div> 

<div class="container-fluid row-fluid">
  <div class="span8 offset2 text-box">
    <h5><a href="http://www.burntfen.com/publications.html">publications</a></h5><p>a list of my current academic publications</p>

    <h5><a href="http://scholar.google.com/citations?hl=en&amp;user=X2UD62YAAAAJ">scholar</a></h5><p>my google scholar account</p>

    <h5><a href="http://www.slideshare.net/RichLitt">slides</a></h5><p>slides for presentations i've given</p>

    <h5><a href="http://linguistics.okfn.org/">open linguistics</a></h5><p>i'm a member of this working group, part of the open knowledge foundation</p>

    <h5><a href="http://lsacelp.org/">c.e.l.p.</a></h5><p>the linguistics society of america committee for endangered languages and their preservation; i helped set this page up.</p>

    <h5><a href="https://lsadc.org/">c.o.s.i.a.c.</a></h5><p>the linguistics society of america committee on student issues and concerns: webmaster</p>
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
      <b>mountains:</b> ski mountaineer trek climb <br />
      <b>waters:</b> sail canoe kayak fly-fish<br />
      <b>hills:</b> slackline hike camp trudge bird-watch <br />
      <b>cities:</b> bike walk explore dumpster-dive <br /></p>
      <p>i am also an avid <a href="http://www.couchsurfing.org/people/richardlitt"><b>couch surfer</b></a>.</p>
    </div>
  </div>
</div> 
-->

<div class="title" id="fossils">
  <i class="icon-beer">
  </i>
  More Projects
</div> 

<div class="container-fluid">
  <div class="row-fluid">
    <div class="span8 offset2 text-box">

      <h5><a href="http://lean.burntfen.com">lean</a></h5><p>a task manager app in node + angular. basically, wired in v3.</p>

      <h5><a href="http://www.replicatedtypo.com">replicated typo</a></h5><p>i wrote the occasional research blog here, on the evolution of culture and language.</p>

      <h5><a href="http://llama.conlang.org">llárriésh</a></h5><p>my old conlanging site, where i talk about my involvement with na'vi, dothraki, and my language, llárriésh.</p>

      <h5><a href="https://twitter.com/#!/learnvalyrian">valyrian</a></h5><p>a twitter to build hype for valyrian, also from game of thrones, before david peterson created it</p>

      <h5><a href="http://conlang.org">language creation society</a></h5><p>a professional conlanging association; i served on the board of directors as an advisor.</p>

      <h5><a href="https://github.com/RichardLitt/keypuk-ninavi">keypuk nìna'vi</a></h5><p>a community project i spearheaded translating facebook into na'vi</p>

      <h5><a href="http://ela.eusa.ed.ac.uk">e.l.a.</a></h5><p>the edinburgh language ambassadors promote multilingualism in scotland; i built their website, back when i used wordpress. </p>

      <h5><a href="http://www.clie.org.uk">the committee for linguistics in education</a></h5><p>promoting linguistics in schools</p>

      <h5><a href="http://www.language-alliance.org.uk">the language alliance</a></h5><p>promoting linguistics in the uk</p>

      <h5><a href="http://www.sailingschoolmalta.com/">sailing school malta</a></h5><p> i made this website for a friend of mine in malta. it's pretty hacky.</p>

      <h5><a href="http://www.tigatag.com/home/">tigatag</a></h5><p>i wrote stuff for this web app company sometimes</p>

      <h5><a href="http://glossy.vansintjan.net/">glossy</a></h5><p>my friend simon and i were working on an app for quick sharing of word lists</p>

      <h5><a href="http://burntfen.net/healingwords">healing words</a></h5><p>another project with simon to provide word and phrase lists for aid workers</p>

      <h5><a href="http://clojurelx.blogspot.com/">clojurelx</a></h5><p>i explained why clojure is great for linguists</p>

      <h5><a href="http://www.lagb.org.uk/">l.a.g.b.s.c.</a></h5><p>the linguistics association of great britain: i was on the student committee.</p>

      <h5><a href="http://www.coli.uni-saarland.de/fs-coli/Main/HomePage">fachschaft</a></h5><p>i was a member of the student committee in saarbrücken.</p>

      <h5><a href="http://www.lingstudents.org">i.a.l.s</a></h5><p>the international association of linguistics students: i was the founder and director, and used to maintain this site.</p>

      <h5><a href="http://www.saivus.org">s.a.i.v.u.s.</a></h5><p>the society for advancing the indigenous vernaculars of the united states; i helped out with tech support.</p>

    </div>
  </div>
</div>

