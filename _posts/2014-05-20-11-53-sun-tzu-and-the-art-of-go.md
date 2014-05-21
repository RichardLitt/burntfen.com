---
layout: post
title: "Sun Tzu and the art of Go"
description: "Thoughts about battlefields"
category: thoughts
tags: [thoughts, game theory]
---
{% include JB/setup %}

I read a pretty good article in Wired recently, [The Mystery of Go, the Ancient Game that Computers Still Can't Win](http://www.wired.com/2014/05/the-world-of-computer-go/). If you didn't know, Go is an incredible chess-like game played mainly in Japan. In it, Remi Coulom's computer program that he's used to win some computer-vs-computer Go games is discussed, as is Remi's interest in the game and a history of the game itself. I suggest you read it rather than having me summarize it. 

In particular, they talk about how the best programs that can play Go (Not Go programs - Go is a programming language, as well as an awesome game) use Monte Carlo Markov Chains. That makes sense, because you can cut down on the amount of time needed to search possible paths for the game to play. I used to use Markov chains for my undergraduate thesis, modeling how 8-month-old children learn word boundaries when they don't know individual words.

My question here is; is this really the best way? To try and gamify the search space, so that you don't have to do so many calculations?

I think there's possibly another way to do it. You view the board as a map. Then, you apply the old logic of Sun Tzu and the Art of War, and learn the territory. Stay updated. Take a birds eye view. Here's what I'm thinking; instead of using the possible points on the board, model the board as topographical zones, or colors, or as water with boundaries. Then, fuzz the boundaries between the points; look at where the crucial choke points are, at the heat. Don't use the computer to simply do the odds of calculations; try and teach the computer to view the board as a whole.

Then do Markov chains. Then win. 