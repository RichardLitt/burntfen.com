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












