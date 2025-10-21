---
layout: post
title: "Formatting bibtex entries"
description: "How I keep my personal bib files in order"
category: research
tags: [publishing, research, publications, bibtex, latex, ai]
date: 2025-10-21-21-10
public: true
---
{% include JB/setup %}

I keep a list of all of my publications in a few places - on my CV, on ORCID, on Google Scholar, and on [this site](https://www.burntfen.com/publications). When I have the opportunity to include a bib file in those lists, I try to. In order to do that, I keep a folder of all of my bib files. I use LaTeX, I find bibtex a useful format for storing citations, and I want to make it easier for everyone else to cite my publications.

I've been using `cat` to automatically make [a giant list](https://github.com/RichardLitt/burntfen.com/blob/master/publications/bib/publications.bib) of all of the bibfiles for a while. But this wasn't really great. What I wanted was a script that formatted all of the entries, and which checked the DOIs.

A few months ago I used an LLM to automatically generate a Python script to check DOIs and to concatenate the files easily. That worked well. Today, I extended it to check multiple DOI registries (not all DOIs are registered everywhere) for validation, and to use [bibtex-tidy](https://github.com/FlamingTempura/bibtex-tidy) to automatically format each of the entries. I'm happy with the result; each individual file is more readable now. For example, [this file](https://github.com/RichardLitt/burntfen.com/blob/master/publications/bib/Littauer2025ZootaxaPycnocraspedum.bib):

{% raw %}
```bibtex
@article{Littauer2025ZootaxaPycnocraspedum,
  author        = {Richard Littauer},
  year          = {2025},
  title         = {
    On the correct spelling of \textit{{Pycnocraspedum} rowleyense} {Schwarzhans, Psomadakis \&
    Nielsen}, 2025 ({Ophidiidae})
  },
  journal       = {Zootaxa},
  volume        = {5692},
  number        = {1},
  pages         = {200--200},
  doi           = {10.11646/zootaxa.5692.1.12},
  url           = {https://doi.org/10.11646/zootaxa.5692.1.12}
}
```
{% endraw %}

It just looks better.

That script is [here](https://github.com/RichardLitt/burntfen.com/blob/master/publications/bib/merge_bib.py). I hope its useful to someone else.

How do you keep your publications in order? Do you?
