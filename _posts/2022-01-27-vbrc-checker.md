---
layout: post
title: "VBRC checker"
description: "A tool to help people spot birds that should be reported to the Vermont Rare Birds Committee"
category: birding
tags: [birding, birds]
date: 2022-01-27-21-23
---
{% include JB/setup %}

The majority of my coding these days appears to be based around birds. Much of what I've been working on has been fun little side projects for [birdinginvermont.com](https://birdinginvermont.com), my little site for playing around with eBird data and for finding new ways to gamify or help understand birding and birds.

One tool that I've built recently is a VBRC checker: [https://birdinginvermont.com/vbrc-checker](https://birdinginvermont.com/vbrc-checker).

The VBRC - Vermont Bird Records Committee - is a committee of experts in Vermont who spend time keeping records of what birds are seen in Vermont. They do this not only for birders keen on knowing what's around, but also to track long-term changes to bird populations in the state, and to understand when birds breed, migrate, and irrupt here. This spreadsheet can tell you when you should report a bird to the VBRC - but it is also hard to figure out. You have to spend some time looking at the dates, and maybe know more about birding that the average person would. That's OK! It's a specialized use-case. In practice, birders who see birds that are rare tell someone who knows how to check for them - someone like a VBRC member, or an eBird reviewer (who are often basically the same thing).

My tool uses the VBRC rare birds spreadsheet to automatically tell you whether a bird in any given town should or should not be submitted to the VBRC checklist. This way, anyone who knows the species for a bird sighting should be able to easily know whether or not they need to let someone at the VBRC know about it. I like that.

Technically, making it was a bit difficult. I used React for the site, and that's been a pain to get working at times, especially when mixed with D3 for mapping. I would like to take a lot of the computation and put it in the cloud to speed up the site, but I'm not sure how to do that without making a headless browser for D3.js and generally just making the whole thing a horrible monolith. So, instead, I've just tacked on another page to the site. Let the browser beware the cost of downloading the site on low-data phones, I guess. Besides that, making it was straightforward, and took a few hours - load in data using a drop-down, make these autocomplete to make it easier to avoid spelling issues, and then just use a JSON file which was converted from the old, rather dirty .xls file. Fun work.

Hopefully this site will be useful. Let me know if you hear of anyone using it!