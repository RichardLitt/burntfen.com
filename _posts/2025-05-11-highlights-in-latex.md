---
layout: post
title: "Highlights in LaTeX"
description: "How to add highlights"
category: academia
tags: [research, academia, latex]
date: 2025-05-11-15-59
public: true
---
{% include JB/setup %}

Sometimes, I want to me able to write a note in LaTeX, and not just in a comment, which I can have in the finished PDF and then come back to later. I think comments can be a bit too hidden, and when you have a lot of them, it's tough to remember which ones were urgent. Highlights can do that.

Right now, I'm using this method to do highlights:

```tex
% TODO Remove this during final editing
\usepackage{soul}
\sethlcolor{yellow}
\newcommand{\highlight}[1]{\hl{#1}}
```

The comment helps me remember to remove it before I publish.