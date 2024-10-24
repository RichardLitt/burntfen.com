---
layout: post
title: "Cutting down the size of eBird datasets for R work"
description: "Or, how to use ChatGPT to help me figure out basics in R, like how to save a file and then source it..."
category: coding
tags: ["R", "coding", "code", "ebird", "science"]
date: 2024-10-24-21-48
public: false
---
{% include JB/setup %}

I'm working with larger datasets from [eBird](https://ebird.org) than I am used to, as part of my [PhD](../projects/phd) work involving [community science](../projects/citizen-science/). You can request [downloads](https://ebird.org/data/download) of eBird data from the website, which gives you a lot of observations that you can then use to do your work. For me - I'm building a dataset of all of Aotearoa's bird observations in order to build an agent-based model that I can use to track avian bird flu.

I've been having issues dealing with the size of the dataset I've had - it's a bit slow to load in. Rather than download another sample dataset on a smaller timescale, I decided to write a function that filters the dataset down using the sampling (checklist) and then the observation (individual species) data from eBird. I spent an hour or so writing a Python file that did this, but ran into memory constraints I could have avoided if I was cleverer with dealing with streams or line-by-line filters.

But rewriting it in R helped.

```R
#' Filter and sample observations data frame
#'
#' This function filters and samples a given `checklists` data frame and filters the `observations`
#' data frame based on the sampled checklists' "SAMPLING EVENT IDENTIFIER". This allows you to run more
#' stuff on a smaller subset of an eBird database export, so you don't need to spend a lot of time waiting
#' for everything to run.
#'
#' License: MIT © Richard Littauer
#'
#' @param checklists Data frame containing checklists.
#' @param observations Data frame containing observations.
#' @param sample_rate Sampling rate; every nth row will be selected from the `checklists`. Default is 1000.
#' @param checklists_output_file The name of the file where the sampled checklists will be saved. Default is "sampled_checklists.csv".
#' @param observations_output_file The name of the file where the filtered observations will be saved. Default is "filtered_observations.csv".
#'
#' @return A list containing two data frames: `sampled_checklists` and `filtered_observations`.
#' @export
sample_checklists_and_observations_dfs <- function(checklists, observations, sample_rate = 1000,
                                            checklists_output_file = "sampled_checklists.csv",
                                            observations_output_file = "filtered_observations.csv") {
  # Reduce the sampling size by keeping every nth row
  sampled_checklists <- checklists[seq(1, nrow(checklists), by = sample_rate), ]

  # Extract "SAMPLING EVENT IDENTIFIER" from the sampled data
  sampling_event_ids <- sampled_checklists$sampling_event_identifier

  # Filter the observations based on the "SAMPLING EVENT IDENTIFIER" values
  filtered_observations <- observations[observations$sampling_event_identifier %in% sampling_event_ids, ]

  # Save the sampled checklists and filtered observations to CSV files
  write.csv(sampled_checklists, checklists_output_file, row.names = FALSE)
  write.csv(filtered_observations, observations_output_file, row.names = FALSE)

  # Return the modified data frames
  return(list(sampled_checklists = sampled_checklists, filtered_observations = filtered_observations))
}
```

If this looks like it is a bit of ChatGPT answer - that is because it is. I haven't found a faster way to help me understand basic things while coding, yet. Google and DuckDuckGo are _horrendous_ at returning valuable data on how to think about simple things. It's true that ChatGPT is giving me an older dataset, and that there may be newer ways of dealing with this data. But for the level of coding that I am at, I think this is ultimately trivial.

I'm not happy using ChatGPT. But with clear, concise instructions on what I want, it does help me get to a function like this easier.

This work is something that I am doing as part of my continual run through of [eBird's best practices](https://ebird.github.io/ebird-best-practices/intro.html). Up next: really filtering this data better, and possibly using an rShiny or a JupyterNotebook.
