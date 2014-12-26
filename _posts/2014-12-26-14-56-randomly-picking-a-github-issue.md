---
layout: post
title: "Randomly picking a GitHub Issue"
description: "How to let your code choose you"
category: code
tags: [code]
---
{% include JB/setup %}

I sometimes have an issue choosing what GitHub issue to tackle next. Who doesn't? Here's my solution to fixing that problem.

First, install [ghi](https://github.com/stephencelis/ghi). `ghi` is a command line client for GitHub issues. `brew install ghi` will do it. Try it out in your repo dir by running `ghi` - look, all of your open issues.

Next, if you're using OSX, the `sort` command is sadly defficient. It doesn't allow `--random-sort` or `-R`, and I don't know why. To fix this, install GNU coreutils: `brew install coreutils`. This will install Linux `sort`, with the prefix `g`. Now, to randomly choose an issue, just run:  

```
ghi | gsort -R | head -n 1
```

Fun times! 
