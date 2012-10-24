---
layout: post
title: "Morphological induction"
description: "Ideas from Keshava and Pitler 2005"
category: research
tags: [research]
---
{% include JB/setup %}

Thoughts while reading: S. Keshava & E. Pitler (2005). _A Simpler,
Intuitive Approach to Morpheme Induction_. Proceedings of
Morphochallenge 2005, pp. 28-32. 

 * Goldsmith 2001 seems to be used often to sum up morphological
   induction - what's the new must-read article for the past decade?  
 * This paper was released around the same time as Morfessor 1.0. How do
   they compare?  
 * This isn't good for Arabic or semitic languages (Maltese). How does
   it compare to Poon et al, 2009, NAACL, _Unsupervised Morphological Segmentation with Log-Linear Models_?  
 * __Paper idea__: using orthographically cleaned data, could one use historical knowledge of a language, perhaps by using Bayesian analysis of similar languages to find cognates, to bootstrap better morphological induction? Pitfalls, possibilities?  
 * "The forward and backward trees allow us to calculate conditional probabilities in O(1) time…" What does this mean exactly?  
 * What influence do multiword expressions or complicated NPs have on morphological analysis? Does _The Mayor of Boston's Hat_ actually do anything?  
 * I'm sorry, but I think that using the argument that "19+1 is not arbitrary, as x / x+y = .05" is not a valid argument. .05 is also arbitrary. If you want to go for non-arbitrary, use human-evaluated morpheme to lexeme percentages.  
 * What exactly do the other 20%, after 80%~ Recall and precision, look like? Are there regularities to the exceptions? Perhaps etymological / PoS / orthographical? Throwing out the baby with the bathwater. 
 * This paper was also run on Finnish. Morfessor was too. Going to have to read both. 
 * What about differences between derivational and inflectional morphemes?
 * Good example: _widen_ is _wid_ + _en_, which is missed by the script. Ideally, one should be able to know that long vowels shortened when there is a following syllabic morpheme (have I written/read this aright?). That should be testable given statistical regularities in Germanic roots or Bayesian inference of likely source language, followed by likely age, followed by intelligent morpheme induction that would treat _widen_ as both _wide_ + _en_ and _wid_ + _en_. 
 * _passionflowers_ is arguably on the cusp of being non-compositional. Morpheme induction for this is useful how, exactly?
 * Another Saffran quoting paper! __I need to get that paper of mine out__. __Now__. 
 * Read Yang 2004 in response to Saffran 1996. 
 * Regarding _Future Work_: What follow-ups have they had? Why didn't they utilise Saffran & Aslin earlier, if they knew about it? What sort of phonological information would help them? Why don't they use collocations? How would batch learning actually change the program recognition (opaque)? 
 * "While we do not claim that humans use our algorithm to segment words, we believe that further research along this line has potential to reveal insight into human language processing." What sort of insight? What other algorithms would humans use? What about subconscious vs. conscious induction? What about linguistically-informed induction vs. first language acquisition? Isn't it an error to lump all of these together? 
 * Hafer and Weiss, 1974. _Word segmentation by Letter Successor Varities_. Information Storage and Retrieval, 10:371-385. - might be worth reading. 

As always, reader, if anything is interesting, don't hesitate to get into contact.