---
layout: post
title: "Automatically grab the title of a web page"
description: ""
category: 
tags: []
date: 2025-05-11-16-51
public: true
---
{% include JB/setup %}

I often need to grab the title of a web page. For instance, this comes in handy when I am creating a new Wikipedia Page, like this one for [_Raoulia grandiflora_](https://en.wikipedia.org/wiki/Raoulia_grandiflora), where I needed to grab the title of web pages for the references.

To do this, I used to manually write out the titles, or guess at them. Then, I figured out that I could load up the sourcepage for the page using Firefox, and find the `<title>` tag. It wasn't long after that that I realized I could use the Firefox Developer Console to type `document.title`, and then copy that to my clipboard and use it.

Today, I realized I could automate that, too. So, I made [this Alfred Workflow](https://burntfen.com/assets/attachments/Copy Title of Web Page.alfredworkflow). It uses osascript to copy the title:

```
tell application "Firefox"
    set winTitle to name of front window
end tell
set the clipboard to winTitle
return winTitle
```

This is great, because I can now type 'copytitle' in [Alfred](https://www.alfredapp.com/), and then have the title right on my clipboard.

To make it easier to put these titles into BibTex, I also made this TextExpander template:

```bibtex
@misc{,
  author={},
  title={},
  howpublished={},
  url={},
  note={Accessed: <insert date>
},
  urldate={Accessed: <insert date>
}
}
```

The date is automatically inserted.

This saves me a good amount of time. Great.