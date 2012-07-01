---
layout: post
title: "Mark Liberman on Automating Phonetic Measurements"
description: "At the Quantitative Linguistics and Dialectology
Workshop in Groningen"
category: academia
tags: [notes, talks, conferences]
---
{% include JB/setup %}



Over the weekend, I attended a workshop on [Quantitative Linguistics and
Dialectology](http://www.martijnwieling.nl/workshop) in Groningen, in
Holland. This was my first time in Groningen - I had friends there from
my Erasmus Mundus program in Language and Communication Technologies,
and it was great to meet up with them and to stay with another friend of
mine, Jelke, an honorary EMLCT member. The workshop was centred around topics relevant to Martijn Wieling PhD defense, which occured the day before. Several of the speakers were invited for this, and the workshop was supplementary to their appearance. This was certainly the case for Mark Liberman, of UPenn, LDC, and LanguageLog fame. His talk ended the workshop. 

Here are the notes I took (as good as they could be), along with the transcriptions of the question and answer session. I hope I didn't annoy too many by typing loudly and too fast. There were most likely many transcription errors.

Mark Liberman - Automating Phonetic Measurements  
====================================  
__Talk at the Quantitative Linguistics and Dialectology Workshop__  
  
Here's a talk about automating phonetic segmentation and manipulation, and why we're not using the tools available, and how that may change in the future.   
  
__For most well-defined phonetic detection, classification, and measurement tasks, judicious choice of acoustic features and application of modern machine-learning techniques will produce and automatated annotation system that works about as well as a human annotator.__ (This slide was referred to several times.)  
  
Two papers that aren't really known by many linguists:  
 * Saul Sternberg et al. 1978. The Latency and Duration of Rapid Movement Sequences: Comparisons of Speech and Typewriting.  
 * Saul Sternberg et al. 1980. Motor Programs in Rapid Speech: Additional Evidence. In Cole, Ed., _Perception and Production_  
  
Why did they use these? Motivations:   
  
 * Accuracy, as human annotators aren't the best.   
 * Freedom from experiment bias.   
 * Efficiency. (Praat did not exist.)   
  
Forward 32 years: _Journal of Phonetics_: 45 articles, 4 issues this year.  
Use of automated measures? Either 0, or 1, papers.   
  
 * Mooshammer et al, 2012, 'Bridging...': This is a good paper, and I suggest it.  
 * Schuppler et al, 2012. Used some forced alignment, but eventually returned to Praat for detailed analysis.  
  
Why does this matter? Well, human judgement means wasted time and effort, slower research, problems with confirmation and experimenter bias. There's also a lost opportunity for very-large scale research, especially on 'Found data'. Also on large-scale laboratory speech collections. Well, is there an alternative?  
  
So, an example: VOT measurement for voiceless stops. The concept is to use forced alignment to find the approximate region for a measurement. And then use machine-learning methods to classify the region, and to detect relevant events and measure durations, frequencies, amplitudes, etc., as appropriate. This is work in progress by Neville Ryant at Penn, supported by an NSF grant.   
  
Architecture: at each identified stop region (as localised by forced alignment):    
  
 * We create a time series of acoustic feature vectors, extracted every ms.  
 * The decision function of a max-margin stop-burst detector is computed for ever frame.  
 * The decision function of a max-margin stop-burst detector is computed for every frame following a burst.  
 * If either the burst onset or voice onset detector fails to find a non-negative peak, VOT measurement fails for this region. Otherwise, it is recorded.  
  
We measured five acoustic features: locally-normalised total energy, low- and high- frequency energy, and spectral entropy and centroid. The details do not matter - what matters is that this is all standard machine-learning guff.   

So, we get good results from these, compared to human annotators. For instance, 1.5ms mean absolute difference between two human phonetician annotators, while 1.89ms between the algorithm and a human annotator.  

So, the statement (_in bold_) above fits.

Questions:
----------

__To what extent are you thinking about firing all of the human annotators?__ I mean, well, I don't know, the way that it stands now, you certainly wouldn't want to apply this sort of thing without a significant check. We need to do random spot checks of the rest of the data to make sure that nothing weird has happened, and similar kinds of problems.

__I have such and such a corpora...__ (_missed_). There's a version which is easy: Say, there's a tape with a digital recording, and you know what the word list spoken was, and you want to associate the word list with the region of the tape where it is said, that's easy. __Also for two and half hours?__ Well, we've done two (_laughs in the room_). Just how crappy this was, forgive my wording, _can be shown by how we did it the application of it_ in Swedish. I contacted all of my Swedish phonetician friends, and I came up empty with regards to sound rules or a Swedish pronouncing dictionary. They pointed to everyone else around in the circle; 'mine was mislaid in the wash', etc. We didn't have anything. So, without knowing anything about Swedish, I made a guess for each letter of the English alphabet what English phoneme it was most like, not even using digraphs, and used models trained on the Supreme Court arguments, 2001, and we were able to properly align it. I think we can deal with your corpora.

__I wonder how many class labels this can deal with__ Well, the more classes, the harder the problem. There's no technical problem, it's just that as the classes increase, the accuracy decreases. Of course, the same tends to be true for human annotators in most classes. We can talk about your problem. You know we're ... the claim is of course a bit overstated. But I think there's no reason in principle that whatever task can't be taken care of. Coming back to the previous question: what would be harder, is what the Nijmegen Schuppler et al paper used forced alignment for, which is not only getting words in the right place, but to figure out what configuration is used in each particular case, which isn't fairly perfect, but should work well.

__What about public approachability for this? Like a wiki?__ Well, we've already done that for the forced alignment. That's open source, you can download it. There's also a web-based trial. The languages for which we have models, we now have five or six languages, in addition to English: Portuguese, Vietnamese, Chinese... I forget. For these, you can upload audio and transcript, and after a while, you get emailed a link to a Praat file giving you the alignment. For certain, I would expect, we're not there yet, but in the next few years for a number of standard phonetic measurements like VOT - we ought to be able to offer some analogous service, although I would hope that people could learn to do it themselves.

__What about automating this... Often, when you look at the output, you see different patterns between human and computer errors.__ If the automated analysis is unbiased relative to the analysis of interest for you, you'll still be better off. I'm less concerned about whether there are bizarre errors, which there might be - of course, human's do this too, with finger slips and the like - I'm more concerned as to whether the mistakes there are are biased with respect to the object of interest.

__Maybe I could ask about sociolinguistic variation. Some tasks that we regularly have: checking transcription quality and vowel quality.__ Let me take the second first. Starting in 2009, we are working with Bill Labov's students, in particular with Kielen Melanini (sp?) We took a Bayesian approach to formant tracking, using a transcript, forced alignment with a sociolinguistic interview, we then select from a transcript the words containing the vowels you want to analyse, perhaps all of the vowels, and then, because you know the environment that you want to get, you know something about where you expect the formants to be. There's a prior. Then you take LPC poles, for each set of poles in the appropriate frequency range, you do a joint optimization of the things you need, based on the bandwidth and so on, multiplied by the prior. That eliminates a large percentage of formatting errors. I can show you scatter plots, it's been done for a few languages now. Keelin convinced Bill by doing this for the Atlas of North American English. He was able to say quite precise things about what conclusions you'd come to from using the machine generated numbers, versus the hand stuff. Bill and their students now do all of their measurements using this technique.

Checking transcripts is a very interesting and difficult problem. One of the
dirty little secrets of speech recognition is that confidence measurements are
surprisingly poor. One of the major projects at Limsee is making error analysis
of confidence better. It's true that for transcripts you can find analyses that
have been way off, but transcript errors are harder to find.

_Applause._

