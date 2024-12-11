---
layout: post
title: "Announcing Codex Mutabilis"
description: "In order to publish things related to the ICZN"
category: blog
tags: [blog, iczn, science, nomenclature, taxonomy]
date: 2024-12-11-18-35
public: true
---
{% include JB/setup %}

In [my last post](./2024-12-03-applying-for-issn), I talked about applying for an ISSN. In short, I wanted to get one because the International Commission of Zoological Nomenclature has a code, which mandates how scientific names are made - and names are only made valid according to that code if published in particular types of publications. Getting an ISSN would be one of the ways to make an independent website like this into a valid place of publication.

Unfortunately, I heard back fairly swiftly from the National Library of New Zealand: No, I can't have an ISSN for burntfen.com. The reason is that personal blogs are not suitable for ISSNs, according to the [ISSN's own website](https://www.issn.org/understanding-the-issn/assignment-rules/the-issn-for-electronic-media/). This is interesting, as Jessamyn West followed this blog and [got one for her website](https://librarian.net/). But I was stymied for a few seconds - what can I do, instead? How do I make a blog that would be considered valid?

An day later, and [Codex Mutabilis](https://codexmutabilis.com/) was live. A day later, the NZ library gave it an ISSN! Excellent.

Codex Mutabilis is a Jekyll blog running on GitHub Pages, with a new domain and an about page that makes clear that it isn't a personal website, and is made exclusively for publishing scientific names for the ICZN. Because it's a GitHub Pages website, there's even an easy process for people to submit new names if they wanted, by making a pull request. After talking to Jessamyn on Mastodon for a bit, she agreed to join the editorial board (as long as there was no work involved, which is fair!). So, we now have an independent, new, microjournal.

This is pretty cool!

I've made a few posts already. I searched for a few minutes after setting up the page, and quickly found some issues in the taxonomy on [WoRMS](https://www.marinespecies.org/). One of these I have now registered on Zoobank - which took a few minutes, as I also had to register it on Zenodo to get a DOI. Both of those tasks are somewhat mundane and arduous, and I am going to think on ways to improve them.

For now, though, _Prunum boreale_ is now _Prunum borealis_. As far as I can tell, this was a valid nomenclatural act, published on the site. The issue was minor - an adjective is also a noun in Medieval Latin, and so shouldn't have been changed when it was. Publishing corrections like this is normal, although they're normally a footnote to wider papers.

There are a few questions that jump out to me from this work. First, doesn't the work need to be peer-reviewed? I don't think so. The ICZN doesn't specify that, and you don't need to have work be peer-reviewed to be valid in a journal. I can't put it on my CV as a peer-reviewed publication, but "Prunum boreale (A. E. Verrill, 1884) is changed to P. borealis" is, for all intents and purposes, published.

Secondly, why? What's the point?

My answer to that is mixed. First, I wanted to do this because I wanted to see if I could. Curiosity is as good a reason for doing something as anything else.

But the second reason is a bit more complicated.

The ICZN Code is how we know what scientific names are formed correctly. If you've ever heard the term _Homo sapiens_, or _Passer domesticus_, you know what scientific names are. You probably wouldn't expect to see a scientific name formed like _You are a really good dog, aren't you?_. It doesn't even make sense to think of that as a scientific name. The Code is what prevents that from happening. 

However, there are a _lot_ of issues in the taxonomic code. It is difficult to understand, confusing, and at times, contradictory. Most names are fine - but there are several bugbears that are crawling out from under the rug. For instance, you can't name an animal after a person of non-binary gender. Or, a species name that is spelled wrong needs to stay spelled wrong, but if a species name is spelled the same as a Latin adjective by accident, it needs to be changed if the gender doesn't match the genus. Or, genders of non-European languages aren't even considered in the code unless a scientist explicitly notes them, but that isn't the case for German or French. Or, any name ending in -*ops* is masculine, forever (unless the Code ruled in an opinion that it isn't). The list of strange rules goes on.

Consistently, I've come across statements in the literature or talking to others that some of these issues shouldn't be addressed immediately, because to do so would upset hundreds or thousands of names. That makes sense to me - but it also means that people get confused. Names get changed when they shouldn't. And then have to be changed again. There's a lot of time wasted on understanding Latin and Ancient Greek rules, when those languages have been functionally dead for a while now.

Understanding these concerns and issues takes a good amount of time, and then trying to fix them takes more. This is the kind of work that takes a lifetime to do well. Especially when you have to go through the peer-review process, and explain how the code works to reviewers, or why a word is or isn't Latin. All of that work takes time and effort that could be better spent somewhere else, if the code was different.

Or if publishing was different. 

That's the point of Codex Mutabilis. It's a fast, lightweight way to change lots of names. I imagine it is also horrifying to some academics - it breaks the social contract we've agreed on for how names work.

I see this from a different angle. Publishing on Codex Mutabilis isn't any more or less worse than publishing on Zootaxa or in Nature. It's exactly how the Code currently works. I'm not publishing things that aren't valid or in a way that the Code doesn't allow - I'm using the requirements listed by the Code itself. If the Code is broken, maybe the Code should be fixed itself?

If the Code is more like guidelines, than it isn't a code. If the social contract doesn't work, then there ought to be another way to do things.

At the same time as I am working on Codex Mutabilis, I am also working on several articles about nomenclature that address issues in the more regular way. I've gone through the entirety of the BirdsNZ list of birds in Aotearoa New Zealand for errors according to the code, and found several. I'm halfway through the list of British birds published by the British Ornithological Union, and I've found more. I'm working on an article about these, and am hoping to submit it to an actual journal soon. But in the meantime, small things can go on this new website. 

I'd be happy to talk about this with anyone, and more than happy to learn that Codex Mutabilis isn't actually valid. Let me know! You can email richard@codexmutabilis.com, of course. We're also looking for editors, if you're interested in being involved with peer review.
