---
layout: post
title: "microbogging it down"
description: ""
category: site
tags: [site, admin, python, languages, code]
---
{% include JB/setup %}

Decided I am not going to try to push wired stuff to this directly, at the moment. For one, I don't know how to properly sequence os.system() in Python. For instance, what I would like is to do this: 

<code>
    if (sys.argv[1] == "bog"):
        import os
        title = raw_input(' title? ')
        os.system('cd ../richardlitt.github.com')
        os.system('rake post title="'+title+'"')
</code>

Sadly, that doesn't actually work (wait - would a symbolic link work?). Neither does using a |. I'm really not sure why, but it is pretty annoying, because there are a lot of things I could do if that did work. Right now I am trying to figure out how to automate calls to a local installation of WordNet, so if you have any ideas, let me know. 

Basically, instead of trying to fiddle with that for ages and pushing things here, and then becoming reliant on this site instead of just using the .csv database I am using at the moment (why .csv? Because I didn't want to learn .sql when I started. That goes to show you how bad at planning us humans are.) Instead, I am going to use this as a microblogging site. More and more recently I realise I have these little burts of writing inspiration, scientific or not, that go nowhere, and I wish I had an easy way of just putting them down and publishing them without consigning them to the 'Writings' section of my HD, from which nothing ever returns. So, let's try this.

