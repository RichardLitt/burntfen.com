---
layout: post
title: "Getting Mou to run in the terminal"
description: "MacOSX Issues"
category: code
tags: [code]
---
{% include JB/setup %}

I just tried to get Mou to run in the terminal. [Mou](http://mouapp.com/) is actually a pretty
lovely program that allows you to see what a document with Markdown
syntax looks like as you type it, something like an instant TeX
compiler. I use Markdown on this blog, and on Github Wikis, so it's
proven useful. It's the main reason I upgraded to Mountain Lion - I wish
I hadn't, as they killed spaces, which in turn killed my entire
productivity flow. I look forward to more updates, as I can't do other
things anymore, such as have a transparent vim workspace.

I just tried this:

    sudo ln -s /Applications/Mou.app/Contents/MacOS/mou /usr/bin/mou

This should have worked. Instead, I got this error:

    No Info.plist file in application bundle or no NSPrincipalClass in the Info.plist file, exiting

I then tried using 'echo test > test' 'open App.../mou test'. No dice,
as it instead opened test in mvim, and Mou opened nothing. So,
basically, I can't open things from Mou in the terminal.

Of course, then I googled it. 

    open -a Mou test.md

And we have it. For future reference, Richard, Google stuff first, you
knob. 
