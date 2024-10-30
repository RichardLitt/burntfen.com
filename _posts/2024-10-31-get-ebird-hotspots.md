---
layout: post
title: "Get eBird Hotspots"
description: ""
category: 
tags: []
date: 2024-10-31-12-13
public: false
---
{% include JB/setup %}

This is a simple form to get all of the eBird hotspots for a region.


<form id="api-form">
    <label for="user-input">Enter your eBird region:</label>
    <input type="text" id="user-input" name="user-input" required>
    <button type="submit">Submit</button>
</form>

<div id="api-response">
    <!-- API response will be displayed here -->
</div>

<script src="{{ '/assets/js/api-form.js' | relative_url }}"></script>
