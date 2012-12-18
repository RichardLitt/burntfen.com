---
layout: page
title: "Language Resource Development"
description: "Building stuff that does stuff with words"
---
{% include JB/setup %}

These are included here if they aren't being included elsewhere as
'research.' Basically, if the connection to acedmia is tenuous, or if I
can't see myself being published anywhere with them. 

###CLARIN-D

I've been working at CLARIN-D for the past year, or so, as a *Hiwi*,
which is a shortening of the German word *Hilfswissenschaftler*, meaning
assistant scientist. Much of that time has been given over to me
learning new things, but I have developed a [WordNet .xml and CQP
tagger](https://github.com/RichardLitt/clarin/tree/master/wordnet_tagger),
andbeen working on an annotation tool more recently.

###Kelmu

I've started making a little Python script applet called
[Kelmu](https://github.com/RichardLitt/lrl/tree/master/Maltese) (Maltese
for *words*) that provides a user interface for the online
[Aquilina](http://aboutmalta.com/language/engmal.htm) dictionary, one of
the only publicly available Maltese dictionaries, and arguably the best,
especially after being cleaned by my friends (who work in my office) at
[Metanet4U](http://metanet4u.research.um.edu.mt/). It's a work in
progess.

###Keypuk NìNa'vi

Based on [Kevin Scannell](http://borel.slu.edu/)'s
[reworking](https://github.com/kscanne/secwepemc-facebook) of the
[Secwepemc Facebook](https://github.com/neskie/secwepemc-facebook)
project, I have been working, along with some other [Learn
Na'vi](learnnavi.org) people, on making a Javascript script called
[Keypuk NìNa'vi](https://github.com/RichardLitt/keypuk-ninavi) that
translates Facebook automatically into Na'vi for the fan community.
Since Na'vi is not a large or a recognised langauged (there are
arguments enough there to call it a low-resource language), translating
it through the process Facebook provides is unfeasible. This is a work
around, and was mostly a lot of fun coming up with a technical
vocabulary for Facebook from Na'vi.

###Eana Eltu & Kusamea Tskxe

As I mentioned in [Fun Stuff](/fun-stuff.html), I was involved in making
the Na'vi dictionary for the [Learn Na'vi](learnnavi.org) community.
This was a very large and long project, mostly because it started with
me writing it in LaTeX, without any other automation. Eventually, a guy
called [Tuiq](https://github.com/Quit) wrote some cool Perl and SQL
stuff which made it all automated and online, and included a translator
interface. He didn't stop there - he used the dictionary to make [Eana
Eltu](https://github.com/Quit/EanaEltu), which was a toolbox with
various morphological segmenters and other small language tools.
However, most of this is deprecated, and I want to see what we could do
with NLTK and Na'vi. So, I've started planning how to redo his work
using Python, at [Kusamea
Tskxe](https://github.com/RichardLitt/kusamea-tskxe), which is Na'vi for
'Seeing Stone'. It's a quote from the movie, I guess. This may
eventually be forked onto the [LearnNavi
Github](https://github.com/LearnNavi).
