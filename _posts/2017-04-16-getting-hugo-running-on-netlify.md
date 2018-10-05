---
layout: post
title: "Getting Hugo running on Netlify"
description: "How to get a static site up and running easily"
category: code
tags: [code, hugo, netlify, static]
date: 2017-04-16-18-11
canonicalUrl: 'https://www.burntfen.com/2017-04-16/getting-hugo-running-on-netlify'
---
{% include JB/setup %}

Running [Hugo](https://gohugo.io/) on [Netlify](https://www.netlify.com/) is satisfyingly great. You can get a static website running with almost no operating costs (unless you're at major scale), and you're also able to quickly deploy by pushing to GitHub, as well as getting SSL through LetsEncrypt automatically at the push of a button. All told, you can have a website up and running in around 30 minutes from domain purchase. It's fast.

I have [58Liters](https://58liters.com) and [Maintainer Mountaineer](https://maintainer.io) all running on Netlify, using Hugo. (I have half a dozen sites on Netlify using Jekyll, too.)

But, there are a few hitches. Without going into huge detail, here is the standard way of getting something up and running. Since I'll be going through this, I'll use a site I've been meaning to build - interruptedfern.com. I already have the domain pointed to Netlify, with these settings:

![]({{BASE_PATH}}/assets/img/interrupted-fern-settings.png)

Now, the steps to follow:

1. Install Hugo: `brew update && brew install hugo`.
2. Go to your development directory: `cd ~/src`.
3. Initiate a new site: `hugo new site interrupted-fern`.

At this point, you need to install a theme. I'm going to install the [Hugo Tranquil Peak](https://themes.gohugo.io/hugo-tranquilpeak-theme/) theme. 

```
cd themes
git clone https://github.com/kakawait/hugo-tranquilpeak-theme.git
```

### Moving the config.toml

Now, you have a theme installed. What you need to do is copy the `config.toml` from the `exampleSite` folder to your base folder. This is a bit strange - but it's generally the easiest way I've seen to ensure that your config has all of the settings needed for the installed theme to work. This means that each time you change a theme, you need to change all of the metadata in the config, too. Keep that in mind - it's hard to change themes.

Once you've copied it, go back to your directory - in my case, `~/src/interrupted-fern/`, and edit the `config.toml` there to match what you want.

### Adding empty folders to git

Now, you should add this stuff to GitHub. (I use [`hub`](http://github.com/github/hub) and [`git-extras`](https://github.com/tj/git-extras), if any of these commands look weird).

```
~/src/interrupted-fern $ git create
~/src/interrupted-fern $ git ls
archetypes  config.toml content     data        layouts     static      themes
~/src/interrupted-fern $ git add -A
~/src/interrupted-fern $ git status
On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   config.toml
	new file:   themes/hugo-tranquilpeak-theme
~/src/interruped-fern $ git commit -m 'Lets go, hugo!'
~/src/interruped-fern $ git up
```

If you're all set up on Netlify, this should build.

Wait, so why weren't the other folders - archetypes, content, data, layouts, static - added? Well, they're empty. Hugo likes empty folders. Git doesn't. If you want to keep them, you'll need to add a file into each of them. To do this, you can use a convention of having an empty file called `.gitkeep`.

Why is this important? Because **Netlify needs those folders**. Let's look at the build on Netlify, which has since failed:

```
6:39:12 PM: Build started
6:39:12 PM: Fetching cached dependencies
6:39:13 PM: Starting to download cache of 27.6MB
6:39:13 PM: Preparing Git Reference refs/heads/master
6:39:14 PM: Warning during submodule checkout: No submodule mapping found in .gitmodules for path 'themes/hugo-tranquilpeak-theme'
6:39:15 PM: Building site
6:39:15 PM: Running build command
6:39:18 PM: Downloading and installing node v6.10.2...
6:39:18 PM: Downloading https://nodejs.org/dist/v6.10.2/node-v6.10.2-linux-x64.tar.xz...
6:39:18 PM:
6:39:18 PM: 0.0%
6:39:18 PM: 1.1%
6:39:18 PM: ### 4.7%
6:39:19 PM: ######### 13.3%
6:39:19 PM: ######################### 35.5%
6:39:19 PM: ################################################# 68.9%
6:39:19 PM: ##################################################################
6:39:19 PM: 92.4%
6:39:19 PM: ######################################################################## 100.0%
6:39:19 PM: 
6:39:19 PM: Computing checksum with sha256sum
6:39:19 PM: Checksums matched!
6:39:21 PM: Now using node v6.10.2 (npm v3.10.10)
6:39:21 PM: Using version v6.10.2 of node
6:39:21 PM: Using /opt/buildhome/.rvm/gems/ruby-2.1.2
6:39:21 PM: Started building sites ...
6:39:21 PM: Error: Error building site: No source directory found, expecting to find it at /opt/build/repo/content
6:39:22 PM: Cleaning up docker container
6:39:22 PM: Error running command: Build script returned non-zero exit code: 255
6:39:22 PM: Error running command: Build script returned non-zero exit code: 255
6:39:22 PM: Finished processing build request
```

Notice the fifth line from the bottom. It needs `content` to exist. But you don't have any content for this theme. It doesn't matter. Add `.gitkeep` to the folder.

```sh
touch archetypes/.gitkeep
touch content/.gitkeep
touch layouts/.gitkeep
touch static/.gitkeep
touch data/.gitkeep
git ca -m 'Adding folders'
git up
```

At this point, it should build. Maybe. 

### Git submodules

Gitmodules are fun and powerful, but they are also confusing to set up and run with. It's possible, at this point, that you failed to add the theme as a Git module. (I've been following these steps as I go, and that was my issue). You can see this in the build log:

```
6:52:51 PM: Warning during submodule checkout: No submodule mapping found in .gitmodules for path 'themes/hugo-tranquilpeak-theme'
...
6:52:56 PM: Started building sites ...
6:52:57 PM: =============================================================
Your rendered home page is blank: /index.html is zero-length
* Did you specify a theme on the command-line or in your
"config.toml" file? (Current theme: "hugo-tranquilpeak-theme")
* For more debugging information, run "hugo -v"
=============================================================
```

You can check this by running `cat .git/config` or `cat .gitmodules`: if the first doesn't have a `[submodule *]` listing and if the second doesn't exist, you haven't added it. You could do this:

```
rm -rf themes
git submodule add https://github.com/kakawait/hugo-tranquilpeak-theme.git themes/hugo-tranquilpeak-theme
```

But that's a bit silly, because you don't need to clone the repository down again, which this would do (hence why you need to remove `themes` - otherwise, it'll say it already exists in the index).

Instead, `touch .gitmodules`, and add this:

```
[submodule "themes/hugo-tranquilpeak-theme"]
  path = themes/hugo-tranquilpeak-theme
  url = https://github.com/kakawait/hugo-tranquilpeak-theme.git
```

Why not in `.git/config`? Because you can't add that to GitHub, which means Netlify won't see it.

### Editing your theme

What if you want to edit your theme?

Well, as far as I can tell, you can't. Hugo demands that you clone from someone else's theme. If you want to edit it, you can add templates into `layouts` and css into `static`, according to [Hugo's weird rendering hierarchy](https://gohugo.io/templates/list/), which is difficult to navigate and debug.

But there's another option. You can fork the theme, and push commits in it to your own fork, and use that as your theme.

Let's try that. Fork hugo-tranquilpeak-theme, add some commits, and then commit from inside the `themes/hugo-tranquilpeak-theme` folder. Then, let's change the submodule:

```
[submodule "themes/hugo-tranquilpeak-theme"]
  path = themes/hugo-tranquilpeak-theme
  url = https://github.com/RichardLitt/hugo-tranquilpeak-theme.git
```

Note: If you try to add the submodule using `git submodule add`, you'll need to delete the theme from `themes` _and_ push. Otherwise, it'll think it's still in the index.

### Knowing which version of Hugo you're running

Make sure you're using the correct version of hugo.  By default, Netlify is currently running hugo `v0.17` but other versions are available: as for instance 'hugo_0.20'.

How would you know what version they are running? Their logs currently don't tell you. The best thing to do, in this case, is to add your own logging information. I did this by making my own Makefile, and then having Netlify build that instead of building hugo directly:

```
all:
	hugo version
	hugo -v
```

This way, it will print the current version before it runs Hugo, so you know which version it is running

How do you change the version? There are [two ways](https://www.netlify.com/blog/2017/04/11/netlify-plus-hugo-0.20-and-beyond/). You can set `HUGO_VERSION` as an environmental variable in Netlify, or you can upload a `netlify.toml` file:

```
[context.deploy-preview.environment]
  HUGO_VERSION = "0.20"
```

That should do it for you.

### Ensuring HTTPS

I had an issue at this point where the CSS files weren't being loaded. I had set the `baseurl` in my `config.toml` to `https://interruptedfern.com`, instead of to `http`. But SSL wasn't being enforced, so the site wasn't loading the CSS. A quick switch on Netlify to enable SSL fixed this.

### All done

At this point, the site is up and running. You can edit your own theme, you have Hugo compiling well, and you've got SSL enabled.

Worth the effort.
