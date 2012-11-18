---
layout: post
title: "Twitter Signal to Noise Application?"
description: "The beginnings of an idea..."
category: apps
tags: [development, app, twitter]
---
{% include JB/setup %}

An interesting post ran across my twitter feed this morning:  

> @cortesi: I want a tool that calculates the cost of following a Twitter user. Something like volume\*signal/noise...  

I started thinking
that this is something you could do automatically. Cortesi seems to
already be working on a side project that would add a _like_ button to
tweets, so that he can manually manage which ones he likes and help the
program predict more. I think that this is a good way to go, but the
data deluge may get exhausting training wise, and it depends upon too
much of a conscious choice on the part of the tweeter.  

Instead, it might be worthwhile making a program that logs:  
 
 * when you follow a link on a tweet
 * when you reply to a tweet
 * when you follow someone new
 * when you unfollow someone
 * what percentage, of all of these, for each user.

Combined, this should work fairly well to let the app know what sort of
information you like on your feed. It doesn't work for self-contained
tweets which you enjoy, however - in that case, the manual system,
worked out by cortesi, would be best. But still, this would be a major
bootstrapper.

I'm thinking about how I would do it. I would log links followed using a
browser add-on - I'm not sure if Twitter development code allows you to
log followed links (anyone know?) I would also do a simple reply
search to log that, again using the Twitter api. And then perhaps some
basic NLP on those posts to see what sort of thing I'm replying. 

How would you do it? 
