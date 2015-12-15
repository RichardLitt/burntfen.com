---
layout: project
title: "OS Protocol"
ranking: 5
picture: osprotocol.png
status: ongoing
stub: Metadata Protocol
role: Creator
outbound: http://osprotocol.com
---
{% include JB/setup %}

You used to be able to inspect the source for a page and understand all of the HTML, CSS, and JavaScript written on it. However, with modern frameworks, compression, and other tools prevalent, it is no longer easy to do so. As well, while many sites are hosted in open-source repositories (such as most of those on GitHub), it is often hard to find where they are hosted, and how to report bugs for the site you are on.

To solve these problems, I created a protocol for sharing where your website is hosted directly in your sites HTML `<head>`. The spec, based on Facebook's OGP, is online and open source. This current site also follows the OS Protocol.