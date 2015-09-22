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
          <a href="https://github.com/RichardLitt" rel="me"><i class="fa fa-github">
          </i>
        </a>
      </div>
      <div class="span1">
          <a href="https://twitter.com/#!/richlitt" rel="me"><i class="fa fa-twitter">
          </i>
        </a>
      </div>
      <div class="span1">
          <a href="https://medium.com/@richlitt"><i class="fa fa-medium">
          </i>
        </a>
      </div>
      <div class="span1">
          <a href="https://instagram.com/richlittv3/"><i class="fa fa-instagram">
          </i>
        </a>
      </div>
<!--       <div class="span1">
          <a href="http://www.youtube.com/user/Rich0Fenn"><i class="fa fa-youtube">
          </i>
        </a>
      </div> -->
      <div class="span1">
          <a href="https://dribbble.com/richlitt"><i class="fa fa-dribbble">
          </i>
        </a>
      </div>

<!--       <div class="span1">
          <a href="http://richfenne.tumblr.com"><i class="fa fa-tumblr">
          </i>
        </a>
      </div> -->
<!--       <div class="span1">
          <a href="http://stackoverflow.com/users/1166929/richlitt"><i class="fa fa-stack-exchange">
          </i>
        </a>
      </div> -->
      <div class="span1">
        <a href="http://www.flickr.com/photos/101526362@N04/"><i class="fa fa-flickr">
        </i>
        </a>
      </div>
      <div class="span1">
        <a href="http://www.last.fm/user/RichardFenn"><i class="fa fa-lastfm">
        </i>
        </a>
      </div>
<!--       <div class="span4">
      </div> -->
    </div>
  </div>
</div>

<div class="title" id="projects" style="text-align: center; margin: 20px 0px 50px;">
  <i class="fa fa-keyboard-o">
  </i>
  Blog
</div>

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
  <i class="fa fa-coffee">
  </i>
  Projects
</div>

<div class="container-fluid">
  <div class="row-fluid">
    <div class="span8 offset2 text-box">

      <h5><a href="https://www.github.com/BeagleLab/voyage">beagle</a></h5><p>
      i work on beagle, building a scientific nagivator for research as a chrome extension, for m.i.t.</p>

      <h5><a href="http://theuserisdrunk.com">the user is drunk</a></h5><p>
      i occasionally review websites from a ux perspective. i haven't done this one yet</p>

      <h5><a href="http://nodeschool.io">nodeschool</a></h5><p>
      i organized the first nodeschool in <a href="http://nodeschool.io/chiang-mai/">chiang mai</a>, coorganized the first nodeschool in <a href="http://nodeschool.io/bali/">bali</a>, and have mentored nodeschool and nodesummit workshops in <a href="http://nodeschool.io/sanfrancisco">san francisco</a></p>

      <h5><a href="http://osprotocol.com">os protocol</a></h5><p>
      i created a protocol for sharing where your website is hosted</p>

      <h5><a href="http://wordhoardpress.com">word hoard press</a></h5><p>
      i founded and run the only literary press publishing original work in old english</p>

      <h5><a href="http://www.bushwhich.com/">bushwhich</a></h5><p>
      i made a choose-your-own-adventure photography game around my old neighborhood in brooklyn</p>

      <h5><a href="http://www.sadyoungman.com">sad young man</a></h5><p>
      i am working on a book of poetry and drawings</p>

      <h5><a href="http://theuserismymom.com">the user is my mom</a></h5><p>
      my friend scotty's mom reviews your websites for you. set up as a prospective clone of the user is drunk.</p>

      <h5><a href="http://iswindsofwinteroutyet.com">is winds of winter out yet?</a></h5><p>
      probably my most useful site, on whether grr martin has published the next book yet</p>

      <h5><a href="http://octobuild.com/">octobuild</a></h5><p>
      i administer a month long online hackathon of sorts in october</p>

      <h5><a href="http://linguistsoutsideacademia.com">linguists outside of academia</a></h5><p>
      i cofounded this email list and group</p>

      <h5><a href="http://www.hipcamp.com">hipcamp</a></h5><p>
      i worked on this site for discovering parks and booking campsites</p>

      <h5><a href="http://www.ideapod.com">ideapod</a></h5><p>
      i was the front end developer for this idea-sharing site</p>

      <h5><a href="http://www.ideaotter.com/">idea otter</a></h5><p>
      simon vansintjan (mostly) and i built this site to share ideas; less ambitious than ideapod</p>

<!--       <h5><a href="http://jakinney.com/">j.a. kinney</a></h5><p>
      a portfolio website i built for an old friend of mine, who is a really good photographer</p> -->

      <h5><a href="http://mellowpageslibrary.com">mellow pages library</a></h5><p>
      i built a website for my favorite library in bushwick, which was live for two years. now it redirects, because the library closed. sad times</p>

      <h5><a href="http://www.lingstudents.co.uk/blog">u.l.a.b.</a></h5><p>
      the undergraduate linguistics association of britain: i cofounded it, ran the first conference, and help out as an advisor. it currently is in it's fifth year, and has hundreds of members</p>

      <h5><a href="http://www.uklo.org">the u.k. linguistics olympiad</a></h5><p>
      i'm the webmaster and built the site (many years ago) of this organisation helping thousands of school children learn linguistics</p>

      <h5><a href="https://github.com/RichardLitt/wired-in/">wyrd in</a></h5><p>
      i led a team of six in an incubator building a time keeper and task organisor, based on my prototype</p>

      <h5><a href="http://www.learnnavi.org">na'vi</a></h5><p>
      as 'taronyu', i created the definitive na'vi dictionary for the language from the movie avatar, used by 5000 regular users. i still technically function as an admin of the largest na'vi site in the world</p>

      <h5><a href="http://www.dothraki.org">dothraki</a></h5><p>
      as 'lajaki', i started up the fanbase for david peterson's language, based off of g.r.r. martin's books, now an h.b.o. series</p>

      <h5><a href="http://langsoc.eusa.ed.ac.uk">langsoc</a></h5><p>
      the edinburgh university linguistics and english language society: i started it up again, and was president and webmaster</p>

      <h5><a href="http://em-a.eu/">erasmus mundus</a></h5><p>
      i was the representative for the language and communication technologies masters course in seven countries, and was a student in germany and malta</p>

<!--       <h5><a href="http://thelifeemphatic.com">the life emphatic</a></h5><p>
      i built this site to chronicle my ownership and mediterranean voyage of my 25' yacht, maya</p>
 -->
      <h5><a href="http://www.burntfen.net/comic/index.html">webcomic</a></h5><p>
      my old burnt fen comic, which i kept going for around two years. very depressing at times. had 100 hits a day when i stopped.</p>

      <h5><a href="http://www.edinburghcafes.blogspot.com">edinburgh cafes</a></h5><p>
      i rated various cafes in edinburgh for their wifi and coffee; along with chris scott and simon vansintjan</p>

      <h5><a href="http://www.replicatedtypo.com">replicated typo</a></h5><p>i wrote the occasional research blog here, on the evolution of culture and language</p>

      <h5><a href="http://llama.conlang.org">llárriésh</a></h5><p>my old conlanging site, where i talk about my involvement with na'vi, dothraki, and my language, llárriésh</p>

      <h5><a href="https://twitter.com/#!/learnvalyrian">valyrian</a></h5><p>a twitter to build hype for valyrian, also from game of thrones, before david peterson created it</p>

      <h5><a href="http://conlang.org">language creation society</a></h5><p>a professional conlanging association; i served on the board of directors as an advisor</p>

      <h5><a href="https://github.com/RichardLitt/keypuk-ninavi">keypuk nìna'vi</a></h5><p>a community project i spearheaded translating facebook into na'vi</p>

      <h5><a href="http://learnnavi.org/media">garmin</a></h5><p>i recorded a gps language interface for garmin in na'vi</p>

      <h5><a href="https://www.youtube.com/user/LearnDothraki">learn dothraki youtube</a></h5><p>i had a youtube channel with thousands of views about dothraki</p>

<!--       <h5><a href="http://www.sailingschoolmalta.com/">sailing school malta</a></h5><p> i made this website for a friend of mine in malta. it's pretty hacky</p>

      <h5><a href="http://clojurelx.blogspot.com/">clojurelx</a></h5><p>zoltan varju and i explained why clojure is great for linguists</p>

      <h5><a href="http://www.tigatag.com/home/">tigatag</a></h5><p>i wrote stuff for this web app company sometimes</p>

      <h5><a href="http://glossy.vansintjan.net/">glossy</a></h5><p>my friend simon and i were working on an app for quick sharing of word lists</p>
      <h5><a href="http://burntfen.net/healingwords">healing words</a></h5><p>another project with simon to provide word and phrase lists for aid workers</p>

      <h5><a href="https://github.com/RichardLitt/clarin/tree/master/wordnet_tagger">wordnet tagger</a></h5><p>a wordnet .xml and cqp tagger i made while an intern for clarin-d</p>

      <h5><a href="http://lean.burntfen.com">lean</a></h5><p>a task manager app in node + angular. basically, wired in v3</p> -->


    </div>
  </div>
</div>


<div class="title" id="art">
  <i class="fa fa-camera-retro">
  </i>
  Art
</div>

<div class="container-fluid">
  <div class="row-fluid">
    <div class="span8 offset2 text-box">
      <h5><a href="heraclitus/">heraclitus</a></h5>
      <p>fragments of heraclitus spoken word story-telling project</p>
      <h5><a href="http://soundcloud.com/marsalfornication">marsalifornication</a></h5>
      <p>my band from malta, with jan joachimsen and daan henselmans</p>
      <h5><a href="categories.html#poetry-ref">poetry</a></h5><p>i blog my new poems here, for the moment</p>
      <h5><a href="http://www.burntfen.net/poetry">older poetry</a></h5><p>some poetry i am not entirely ashamed of</p>
      <h5><a href="http://www.burntfen.net/prose">prose</a></h5><p>some old prose pieces of mine</p>
      <h5><a href="http://soundcloud.com/richard-littauer">spoken</a></h5>
      <p>my spoken word poems and some songs</p>
      <h5><a href="http://www.burntfen.net/themeadows.png">meadows</a></h5><p>a map of the meadows in edinburgh divided into mario characters. goes viral every spring</p>
      <h5><a href="http://www.burntfen.net/comic/merch/">fashion</a></h5><p>i sometimes design and sell shirts, among other things</p>
      <h5><a href="http://code-poems.com">code poems</a></h5><p>i have a couple of poems in this book of code poetry</p>
      <h5><a href="https://twitter.com/#!/deadguys">deadguys</a></h5><p>i tweeted when musicians died <i>discontinued</i></p>
      <h5><a href="http://www.redbubble.com/people/richardlitt">t-shirt designs</a></h5><p>i design and sell t-shirts</p>
      <h5><a href="https://github.com/RichardLitt/the-new-field">the new field</a></h5><p>an attempt at collaborative storytelling on github</p>
      <h5><a href="http://www.chaos-mag.com/">chaos magazine</a></h5><p>i wrote a couple of art reviews for this fashion magazine</p>
    </div>
  </div>
</div>

<div class="title" id="linguistics">
  <i class="fa fa-book">
  </i>
  Academia
</div>

<div class="container-fluid row-fluid">
  <div class="span8 offset2 text-box">
    <h5><a href="http://www.burntfen.com/publications.html">publications</a></h5><p>a list of my current academic publications</p>
    <h5><a href="http://scholar.google.com/citations?hl=en&amp;user=X2UD62YAAAAJ">scholar</a></h5><p>my google scholar account</p>
    <h5><a href="http://www.slideshare.net/RichLitt">slides</a></h5><p>slides for presentations i've given</p>
    <h5><a href="http://linguistics.okfn.org/">open linguistics</a></h5><p>i'm a member of this working group, part of the open knowledge foundation</p>
    <h5><a href="http://lsacelp.org/">c.e.l.p.</a></h5><p>the linguistics society of america committee for endangered languages and their preservation; i helped set this page up</p>
    <h5><a href="https://lsadc.org/">c.o.s.i.a.c.</a></h5><p>the linguistics society of america committee on student issues and concerns: webmaster</p>
    <h5><a href="http://ela.eusa.ed.ac.uk">e.l.a.</a></h5><p>the edinburgh language ambassadors promote multilingualism in scotland; i built their website, back when i used wordpress</p>
    <h5><a href="http://www.clie.org.uk">the committee for linguistics in education</a></h5><p>promoting linguistics in schools</p>
    <h5><a href="http://www.language-alliance.org.uk">the language alliance</a></h5><p>promoting linguistics in the uk</p>
    <h5><a href="http://www.lagb.org.uk/">l.a.g.b.s.c.</a></h5><p>the linguistics association of great britain: i was on the student committee</p>
    <h5><a href="http://www.coli.uni-saarland.de/fs-coli/Main/HomePage">fachschaft</a></h5><p>i was a member of the student committee in saarbrücken</p>
  </div>
</div>
