---
layout: post
title: "Removing local npm modules from your development workflow"
description: "Or how I refactored and started publishing all of my modules"
category: coding
tags: [coding, beagle]
date: 2015-04-26-18-48
---
{% include JB/setup %}

While building [beagle](https://github.com/BeagleLab/beagle), I've tried to modularize as much as possible. Beagle is a Chrome extension, using browserify and React, that injects a sidebar into any page or PDF on the web. We also rerender PDFs using [PDF.js](https://mozilla.github.io/pdf.js/), and add in the sidebar to the native PDF.js viewer. Beagle is an annotation tool; one of the goals of the product is to be able to eventually build a web portal for anyone to see annotations without having downloaded the Chrome extension, which would mean loading PDFs on our own website. Because of this, I knew fairly early on that some of the styles would be specific to the Chrome extension, and some specific to the website. So, I decided to make a `beagle-style` module, to factor out the styles for the extension. I also factored out the code that deals with the PDFjs api into a module, `beagle-pdf`. 

This was a smart move at the time, but it has become increasingly clear that there must be a better way. What this did was require every developer working on the platform to symlink two other git repositories into their `node_modules` folder. I made a shell script to help do this:

```
cd ..
printf 'cd to' && pwd
echo 'Cloning BeagleLab/beagle-style'
git clone git@github.com:BeagleLab/beagle-style.git
cd beagle-style 
echo 'Installing modules...'
npm install
cd ..
echo 'Cloning BeagleLab/beagle-pdf'
git clone git@github.com:BeagleLab/beagle-pdf.git
cd beagle-pdf
echo 'Installing modules...'
npm install 
echo 'Set up symlinks...'
cd ../beagle/node_modules
printf 'cd to' && pwd
ln -s ../../beagle-style
ln -s ../../beagle-pdf
```

Sure, this is one way to do it. But this means requiring every developer to run this symlink, which is a major barrier to installaton and debugging for people who aren't interested in the entire app, but just want to test it. Further, this goes against the idea of modularity. If I have to have two connected modules, at all times, and they can't be unplugged - than why am I making two modules at all? 

The first inkling that I could change this came when I considered `beagle-pdf`. That module is basically a wrapper around PDF.js, so that I have specific methods I can call that do things with the PDF.js api such as highlight text. At the moment, that module is stable, and works pretty well independantly of the Beagle core. As this is the case, there's no reason to not publish it and remove the dev environment. If I want to change it live, I can edit the module installed in `node_modules` directly, and copy those changes over to another repository, commit, push, and publish them. That's one removed.

`beagle-style` is a bit more complex - these styles are hypothetically modular so that the sidebar can be separated from the future web instance. But I'm using React - which means that each component can actually have it's own styles injected in the React component itself, without having to use an external CSS file. This makes my life a lot easier, too, as I don't need to require and inject entire CSS files. Further, the web instance shouldn't look different than the Sidebar, and if it is different, the CSS should reflect that directly where it happens - in the component. 

So, we can take that out too. For now, I've published the `beagle-style` module, but I expect to complete remove it of all of its CSS at some point soon as I work the CSS into the React components. What this means is that now users can clone my repository and just run `npm install` and everything works. This is a much easier workflow.

And now that that barrier is lowered, hopefully it will be easier for other devs to work on the project. When in doubt, refactor, minimize, and remove barriers to entry. 