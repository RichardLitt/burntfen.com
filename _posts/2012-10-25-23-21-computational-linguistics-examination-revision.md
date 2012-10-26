---
layout: post
title: "Computational Linguistics Examination Revision"
description: ""
category: academia
tags: [reviews, research, examination, revision, notes]
---
{% include JB/setup %}
#Computational Linguistics

These are examination preparation notes from the slides for a course I took at the University of Saarland in Saarbrücken in the summer of 2012. The majority of the information here came from the slides for that course, which are available online, but not under any copyright. To save embarassment in case I mistype or misunderstood, I won't cite the lecturers here. Much of this information can be found in better quality in Dan Jurafsky or Chris Mannings books, cited below. 

That is all, I think. 

---
##Lecture 1: _Course Outline_

Textbooks:  

 * Dan Jurafsky and J. H. Martin: Speech and Language Processing: An Introduction to Natural Language Processing, Computational Linguistics, and Speech Recognition, Prentice-Hall, 2009.  
 * Chris Manning and H. Schütze: Foundations of Statistical Natural Language Processing, MIT Press, 1999.  

#####Finite State Automata (Lecture 1)  
 * Deterministic & non-deterministic finite state automata
 * Algorithms for recognizing strings
 * Aogrithms for determinizing non-deterministic automata

#####Grammars and Parsing (Lecture 2,3,4)
 * Context free grammars
 * Bottom-up parsing (Shift-reduce)
 * Chart parsing (CYK)
 * Probabilistic grammars and parsing
 * Dependency parsing

#####Distributional Semantics (Lecture 5)
 * Distributional semantics
 * Vector space models
 * Similarity measures

#####Matrix Factorization (Lecture 6)
 * Latent semantic analysis (LSA)
 * Non-negative matrix factorization (NMF)

#####Clustering (Lecture 7)

#####Word Sense Disambiguation (Lecture 8)

#####Computational Semantics (Lecture 9)
 * Semantics construction
 * Scope underspecification
 * Dominance graphs and tree automata

#####Combining Visual and Textual Data (Lecture 10)

---
##Lecture 2: _Finite State Automata_
Due to worries about copyright for these slides, I will not be posting images or screenshots from them, unfortunately. 


####Basic Definitions
 * An __alphabet ∑__ is a finite set of symbols
 * A __string over ∑__ is a sequence of symvols from ∑. 
 * __epsilon__ is the empty string. 
 * The __length |w|__ is the number of symbols in w. 
 * __∑*__ denotes this set of all strings over ∑
 * A __formal language__ is a subset of ∑* for some alphabet ∑
 * A __configuration__ is a pair {k,w} which is an element of K•∑*, where k is the current state, and w is the unread part of the string to be processed. This is basically where one is in the automata. 
 * __Yields in one step__ means when {k,w} ⊢m {k',w'} iff w = aw' and ∂(k,a) = k'.
 * __Yields__ ⊢m* is the reflexive, transitive closure of ⊢m. (_What this means, I don't rightly know.)
 * A language is __accepted__ if the unread string after going through the machine consists only of epsilon, and the current state is an element of F, the final state. Basically, L(M) = {w | {s,w}⊢m*{k,epsilon} for some k element F}.  In which case, the entire string ∑ is a subset of the language applied to the machine. 
 
###Deterministic Finite Automata
 * M = {K, ∑, ∂, s, F}
 * * K is a finite set of states (a list)
 * * ∑ is an input alphabet (a list)
 * * ∂ is a transition function. ∂(k, a) means that when the machine M is in state k and reads input a, it goes into state q'. This is generally a list of several transition functions, the the first state (for instance, q_0) and then an input _a_ from the alphabet ∑. This then is mapped (or equals) another state. A loop would be the same state. 
 * * s element K is the start state
 * * F subset K is the set of final (accepting) states 

#####Automata as Graphs
To understand automata, you must know that: nodes are states, edges represent the transition function, > marks the start state, and double circles are final states.

#####Recognition Algorithm Pseudo-code

	function RECOGNIZE(DFA M, STRING input)
		index ‹- 0
		state ‹- start state of M
		while index < length(input) do
			state ‹- trans[state, input[index]]
		end
		if state is a final state of M
		then return accept
		else return reject
	end
	
###Nondeterministic Automata

In these, several symbols (or none) can be read at once, and there are several possible next states. M = {K, ∑, ∆, s, F}, where ∆ is a subset of K•∑*•K and is a finite transition relation. For DFAs, the next step is always determined - for NFAs, the next state can go either way. 

The only real difference seems to be that k' is included in the original tuple of the transition function, and where there are several options for each transition on occasion. While running, each time there is an accepted string, that is added to the agenda. The configuration continues to run on the first item in the agenda until it returns an empty string (after the string is accepted or rejected). It then goes on to take the next item in the agenda, and so on. 

For every Nondeterministic automata, there is an equivalent Deterministic finite automata. It doesn't work the other way around as easily. In NFAs, there is more than one succesful combination which can get to the final state. To implement, use backtracking - if there is a failure, go back to the point you remember last that workd, and use that (on the agenda).

#####Recognition Algorithm Pseudo-code

	function RECOGNIZE(NFA M, STRING input)
		agenda = list of configurations, initially containing only
			the configuration (start state of M, input) 
		while agenda is not empty do
			conf ← POP(agenda)
			if conf is an accepting configuration then
				return accept 
			else
				for all conf’ such that conf ⊢ conf’ do 
					PUSH(agenda, conf’)
				end 
			end
			return reject 
	end

#####Subset construction algorithm

 * __epsilon-closure(s)__ returns the set of NFA states reachable from state _s_ using Element-transitions  
 * __epsilon-closure(T)__ returns the set of NFA states reachable from some _s_ in _T_ using element-transition
 * __move(T,a)__ returns the set of NFA states to which there is transition for input _a_ Element ∑ from some state _s_ element _T_

---
##Lecture 3: Parsing

Grammars generate sentences (“words”). Context-free grammars can be thought of as G = {N, T, R, S}, where:

 * N is the nonterminal symbols  
 * T is all terminal symbols
 * S (an element of N) is the start symbol
 * R is the finite set of production rules, and is a subset of N•(N•T)*
 
In this case, if [x,y,u,v,w,z] is our alphabet (the union of nonterminal symbols and terminal symbols), X =>G y in our grammar iff x = uvw and y = uzw, and v->z is one of our production rules (is an element of R). A language generated by this grammar is accepted if {w|S =>G* w}, where =>G* is the reflexive, transitive closure of =>G. This works from the left edge of y  - If there is a rule S -> NP VP, then the next =>G application of the grammar G would go to DET N VP (if there is a rule such that NP -> DET, for instance). In all cases, end in the terminal symbol, and then move on to the next element to the right of =>G (in y). Although, according to these slides, it doesn't matter if you stay consistent with which edge to start from, or which rules to apply where. Leftmost or rightmost derivation is certainly the norm, if not necessary, however. Either should end with the same parse tree. 

The language generated by a grammar G is the set of all of those sequences that can be derived from the start symbol. In this case, derivation is done when you replace one symbol or sequence by a sequence of symbols. 

The derivations themselves are uninteresting - what is interesting is the __parse trees__. Each node (inner nodes elements in N, leaf nodes elements of T or empty symbols)and its branches correspond to one rule in the grammar. Epsilon is accepted only as the only child of a node. 

If w = w1…wn has two or more parse trees, than the grammar is ambiguous. 
 
####Parsing Strategies
__Top-down parsers__ work by starting with S, and then applying from left to right (like in natural language processing), and trie to match the input sequence. __Bottom-up parsers__ do the opposite, and start with the leaf nodes, going up, looking at subsequences in the input that match the left-hand side of a rule and apply it from right to left. 

__Shift-Reduce Parsing__ is a bottom-up strategy, with a stack and input {[stack],[input in the format w1…1n]}. In each step, there are two options: __shift__ the left-most symbol to the right edge of the stack, or __reduce__ by applying a matching rule to the topmost elements (right-edge, two or more) on the stack. For unambiguous grammars, the shift-reduce decision (which to do when) is automatic. 

Bottom up parsers, however, can't deal with some grammars, for instance with trace elements (where the leaf node is an empty symbol), of for cylic rules, or for ambiguous prepositional phrases such as _The dog killed the man in the park with a telescope_. 

A context-free grammar doesn't depend on context to know whether a rule applies or not. One way to get around this problem is to use __chart-parsing__, which stores intermediate results for already analysed constituents in a chart, a compact representation of all possible analyses. Charts (“parse forests”) can contain complete consituents or hypotheses for possible constituents. 

__CYK Parser__ (Cocke-Younger-Kasami) is a bottom-up chart-based parser. This applies only to grammars in Chomsky normal form, where A -> w (terminal symbol), A -> B C (both non-terminal symbols), and S -> epsilon (S start symbol, only if epsilon is an element of the language). 

	function CYK(G, w1 ... wn): 
		for i in 1 ... n do
			T[i-1,i]={ A|A→wi ∈ R } 
			for j in i - 2 ... 0 do
         		T[j, i] = ∅
         		for k in j + 1 ... i - 1 do
            		T[j, i] = T[j, i] ∪
               		{ A | A → B C, B ∈ T[j,k], C ∈ T[k, i] }
				done 
			done
		done
	if S ∈ T[0, n] then return True else return False

The CYK Parser is correct if the sentence is an element in the ordered list of leaf nodes, and complete if S can be derived for each input word. The runtime for this algorithm is very fast - polynomial in the input length O(n^3). However, it requires the Chomsky Normal form, which can be slow due to the size. On the plus side, all parse trees can be saved by storing nodes as elements in an array instead of as booleans, by storing for each category A a list of pointers to other entries in the chart that were used to derive A. 

This can be done by binarizing the output, either using left or right binarization. 

	left binarization(G):
		while G contains rules A → A1 A2 A3 …Ak,k≥3
		delete the rule from G
		add rule ⟨A1,…, Ak-1⟩ → A1 … Ak-1 
		add rule A → ⟨A1,…,Ak-1⟩ Ak

	right binarization(G):
		while G contains rules A → A1 A2 A3 …Ak,k≥3
		delete the rule from G
		add rule ⟨A2,…,Ak⟩ → A2 … Ak 
		add rule A → A1 ⟨A2,…,Ak⟩

There are implementation variations of this:  

 * Method 1: iterate over all rules A -> B C, and check if B and C are next to each other in the T
 * Method 2: iterate over B leaf nodes, then over all A -> B C, and see if C is to the right side of B in T
 * Method 3: iterate over C leaf nodes, then over all A -> B C, and see if A is to the left side of C in T
 * Method 4: iterate over all B and C leaf nodes, and then see if A -> B C exists. 
 
According to Song et. Al, 2008, in EMNLP, right binarization on method 3 is the most efficient, while for left binarization method 2 is the most efficient. 

---
##Lecture 4: _Clustering_

The goal of clusting is to group similar items together. To do this, define similarity between samples, define a loss function, and then find an algorithm that minimizes this loss function. These can be used to cluster text, words, images, image regions, and so on.

In __K-means cluster__, when there are no labels to go by, one has to go on the assumption that similar objects will be close to each other in a spatial relation. So, the aim is the find _k_ number of clusters that will classify the data properly. We have to manually supply _k_. So, we randomly assing _k_ number of inital centroids (“mu”), which we will assume to be the center of clusters. We then check _mu_ against the other points using distance measurements, and then assign each point to an imaginary cluster based on these measurements. Then find the meand distance of all of the points of the same cluster, set that as _mu_, and recalculate. Eventually, there should be convergance (optimal clustering). 

Distortion, the sum of the squared distances between each point and it's centroid, should be lessened the tighter a cluster holds together. This levels out after a few iterations. Picking k such that distortion is as small as possible is a good idea - one way to do this is to find a large jump in the value of j for a given amount of Ks - the larger the jump, the more likely that _k_ was the right value. If the number of clusters (k) is equal to the number of elements (n), then the loss function will be 0, but of course, this is not what we want. We want to minimize the number of clusters.

__Soft clustering__ involves no strict assignment of any point _n_ to a cluster. There can be overlapping regions, no class information whatsoever, or soft clustering based on probabilities. There can also be hierarchical clustering, either agglomerative (making clusters from the unclustered data) or divisive (making more clusters from previously clustered data). For text clustering, several options are: word frequency, TF-IDF, stop wording, and stemming. What these last two are is anyone's guess. 

The __Brown algorithm__ clusters words together with similar neighbors, and minimizes perplexity in the training test. This is useful for NE tagging. (For instance, it would identify city names based on prepositional collocations.) 

	start with some initial mapping w -> gw
		for w in vocabulary:
			for each class k:
				tentatively exchange word w from class gw to class k and update counts
				compare perplexity for this exchange
			exchange word w from class gw to class k with minimum perplexity
	do until stopping criterion met 


#####Similarity Measures

 * Euclidean distance: pythagorean theorem, in essence.
 * Manhattan disance: D1(x,y) = ∑|x_k - y_k|. The sum of the absolute value of the x value for each point _k_ minus the y value for said point. Basically the sum of the two distances, or going the long way around a triangle.
 * Maximum distance: d_inf(x,y) = max_k(|x_k-y_k|). Basically, the maximum possible distance between two points. 
 
 Others include: Cosine, edit distance, Jaccard, kernels. A _distance measure_ is a function from pairs of points to reals such that: 
 
 * d(x,y) ≥ 0 [The distance is greater than zero]  
 * d(x,y) = 0 iff x=y (If the points are the same, there is no distance)
 * d(x,y) = d(y,x) (The points should be reversable with the same distance value)
 * d(x,y) ≤ d(x,z) + d(z,y) (A point further on on either axis will make a longer distance - triangle inequality)
 
---
##Lecture 5,6,7: _Latent Spaces and Matrix Factorisation_
####Lecture 5
The goal is to treat document and word clustering on the same level, and to find low-dimensional representations that can find latent similarities. For document clustering, one can describe each document by a vector containing the frequency of the words. For word clustering, antoher vector containing the frequencies of each word in different documents can be used. These can be added together into a single matrix - the tf-idf measurement.

On the subject of matrices: A matrix is an array with two indices. The transpose is when the indices are swapped. The elements of a product matrix (the product of two matrices) can be calculated by multiplying each against the other like so: c[i,j] = a[i,k]*b[k,j]. When a unit matrix - with 1s on the diagonals, and 0s else, represented as a_i,j = d_i,j - can be used to diagnosed whether a product matrix is a result of two inverse square matrices. 

---
####Lecture 6

#####Latent semantic analysis (LSA)
__Latent semantic analysis (LSA)__ is an NLP technique for finding relationshops between a set of documents and the terms therein, by producing concepts related to both which aren't on the surface analysis level (hence, latent). It works on collocations - words that are close in meaning will occur in similar texts. __Singular Value Decomposition (SVD)__ is used to reduce the number of columns while preserving similarity structure among rows (or vice versa). Words are then compared by taking the cosine of the angle between the two vector of any rows. Values close to 1 represent very similar words, while values close to 0 represent very dissimilar words. 

If we have a matrix A, we decompose that such that Ã = TSD^t - in essence, into three matrices, one of which is a transpose. Here, it is best (although I don't know why) to keep |Ã-A|^2 minimal. A is a t•d matrix, T a t•n matrix, S and n•n matrix, and D a d•n matrix. In essence, then, T and D are orthogonal matrices, and S is the diagonal matrix. Document-document similarity can be found by rewriting ÃtA as = (SDt)tSDt. Term term similarity is (TS)(TS)t. 

LSA performance consistently improves recall on standard test collections (precision/recall improved). It has variable performance on larger TREC collections. The dimensionality of the latent space is hard to asses, but 300-1000 seems to work best. The computational cost is high.

#####Probabilistic Latent Semantic Analysis
Instead of using decompositionality into orthogonal vectors, PLSA works using statistically. The probability of a document is the product of the probability of all terms in that document (uncontroversial). A term frequency matrix would add the sum of the probabilities of a term in a document, for each document.  By introducing a hidden topic in a lower-dimensional space, and then figuring out the probability of a term given that topic times the probability of that topic in a document, the likelihood of the document can be reassessed. P(term|doc)=∑P(t|k)P(k|doc). And the likelihood of the document is then P(doc)=∏{∑P(t|k)P(k|doc)}^A(t,doc). There is a training objective function which maximises with respect to the parameters p(t|k) and p(k|d). 

#####Non-negative Matrix Factorisation
NMF works by decomposing a non-negative matrix A into two matrices, W and H. A=WH, then. A: N•M (data matrix), W: N•R (source matrix), and H: R•M (mixture matrix). NMF is equivalent to a relaxed form of K-means clustering: matrix factor W contains cluster centroids and H contains cluster membership indicators, when using the least square as NMF objective. This provides theoretical foundation for using NMF for data clustering. This matrix is factored into a term-feature and a feature-document matrix. The features are derived from the contents of the documents, and the feature-document matrix describes data clusters of related documents. 

In essence, when multiplying matrices the factor matrices can be of significantly lower rank than the product matrix and it's this property that forms the basis of NMF. If we can factorize a matrix into factors of significantly lower rank than the original matrix then the column vectors of the first factor matrix can be considered as spanning vectors of the vector space defined by the original matrix.

---
####Lecture 7

… [ This seems to be a repeat of the previous slides.] …

---
##Lecture 8: _Probabilistic Parsing_


