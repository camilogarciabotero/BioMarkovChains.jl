var documenterSearchIndex = {"docs":
[{"location":"api/","page":"API","title":"API","text":"CurrentModule = BioMarkovChains\nDocTestSetup = quote\n    using GeneFinder\nend","category":"page"},{"location":"api/","page":"API","title":"API","text":"","category":"page"},{"location":"api/","page":"API","title":"API","text":"Modules = [BioMarkovChains]","category":"page"},{"location":"api/#BioMarkovChains.BMC","page":"API","title":"BioMarkovChains.BMC","text":"BMC\n\nAlias for the type BioMarkovChain.\n\n\n\n\n\n","category":"type"},{"location":"api/#BioMarkovChains.BioMarkovChain","page":"API","title":"BioMarkovChains.BioMarkovChain","text":"struct BioMarkovChain{S<:DataType, M<:AbstractMatrix, I<:AbstractVector, N<:Integer} <: AbstractBioMarkovChain\n\nA BioMarkovChain represents a Markov chain used in biological sequence analysis. It contains a transition probability matrix (tpm) and an initial distribution of probabilities (inits) and also the order of the Markov chain.\n\nFields\n\nstatespace::S: Is the state space of the sequence whether DNA, RNA AminoAcid DataTypes.\ntpm::M: The transition probability matrix.\ninits::I: The initial distribution of probabilities.\nn::N: The order of the Markov chain.\n\nConstructors\n\nBioMarkovChain(tpm::M, inits::I, n::N=1) where {M<:AbstractMatrix, I<:AbstractVector, N<:Integer}: Constructs a BioMarkovChain object with the provided transition probability matrix, initial distribution, and order.\nBioMarkovChain(sequence::LongNucOrView{4}, n::Int64=1): Constructs a BioMarkovChain object based on the DNA sequence and transition order.\n\nExample\n\nsequence = LongDNA{4}(\"ACTACATCTA\")\n\nmodel = BioMarkovChain(sequence, 2)\nBioMarkovChain:\n  - Transition Probability Matrix -> Matrix{Float64}(4 × 4):\n    0.444    0.111\t0.0\t  0.444\n    0.444    0.444\t0.0\t  0.111\n    0.0      0.0\t0.0\t  0.0\n    0.111    0.444\t0.0\t  0.444\n  - Initial Probabilities -> Vector{Float64}(4 × 1):\n    0.333\n    0.333\n    0.0\n    0.333\n  - Markov Chain Order:2\n\n\n\n\n\n","category":"type"},{"location":"api/#BioMarkovChains.dnaseqprobability-Union{Tuple{A}, Tuple{Union{BioSequences.LongSequence{A}, BioSequences.LongSubSeq{A}}, BioMarkovChain}} where A","page":"API","title":"BioMarkovChains.dnaseqprobability","text":"sequenceprobability(sequence::LongNucOrView{4}, model::BioMarkovChain)\n\nCompute the probability of a given sequence using a transition probability matrix and the initial probabilities distributions of a BioMarkovModel.\n\nP(X_1 = i_1 ldots X_T = i_T) = pi_i_1^T-1 prod_t=1^T-1 a_i_t i_t+1\n\nArguments\n\nsequence::LongNucOrView{4}: The input sequence of nucleotides.\nmodel::BioMarkovChain is the actual data structure composed of a tpm::Matrix{Float64} the transition probability matrix and initials=Vector{Float64} the initial state probabilities.\n\nReturns\n\nprobability::Float64: The probability of the input sequence given the model.\n\nExample\n\nmainseq = LongDNA{4}(\"CCTCCCGGACCCTGGGCTCGGGAC\")\n   \nbmc = BioMarkovChain(mainseq)\n\nBioMarkovChain with DNA Alphabet:\n  - Transition Probability Matrix -> Matrix{Float64}(4 × 4):\n   0.0     1.0     0.0     0.0\n   0.0     0.5     0.2     0.3\n   0.25    0.125   0.625   0.0\n   0.0     0.6667  0.3333  0.0\n  - Initial Probabilities -> Vector{Float64}(4 × 1):\n   0.087\n   0.4348\n   0.3478\n   0.1304\n  - Markov Chain Order -> Int64:\n   1\n\nnewseq = LongDNA{4}(\"CCTG\")\n\n    4nt DNA Sequence:\n    CCTG\n\n\ndnaseqprobability(newseq, bmc)\n    \n    0.0217\n\n\n\n\n\n","category":"method"},{"location":"api/#BioMarkovChains.initials-Union{Tuple{Union{BioSequences.LongSequence{A}, BioSequences.LongSubSeq{A}}}, Tuple{A}} where A","page":"API","title":"BioMarkovChains.initials","text":"initials(sequence::SeqOrView{A}) where A\n\nCalculate the estimated initial probabilities for a Markov chain based on a given sequence.\n\nThis function takes a sequence of states and calculates the estimated initial probabilities of each state in the sequence for a Markov chain. The initial probabilities are estimated by counting the occurrences of each state at the beginning of the sequence and normalizing the counts to sum up to 1.\n\nbeginalign\npii = P(X_i = i)  i in T  \nsum_i=1^N pi_i = 1\nendalign\n\nNow using the dinucleotides counts estimating the initials would follow:\n\nhatpi_i = c_i sum_k c_k\n\nArguments\n\nsequence::SeqOrView{A}: The sequence of states representing the Markov chain.\n\nReturns\n\nAn Vector{Flot64} of estimated initial probabilities for each state in the sequence.\n\n\n\n\n\n","category":"method"},{"location":"api/#BioMarkovChains.log_odds_ratio_matrix-Tuple{BioMarkovChain, BioMarkovChain}","page":"API","title":"BioMarkovChains.log_odds_ratio_matrix","text":"log_odds_ratio_matrix(model1::BioMarkovChain, model2::BioMarkovChain)\n\nCalculates the log-odds ratio between the transition probability matrices of two BioMarkovChain models.\n\nbeta = log fracP(xmathscrm_1)P(xmathscrm_2)\n\nWhere mathscrm_1 and mathscrm_2 are the two models transition probability matrices.\n\nArguments\n\nmodel1::BioMarkovChain: The first BioMarkovChain model.\nmodel2::BioMarkovChain: The second BioMarkovChain model.\n\n\n\n\n\n","category":"method"},{"location":"api/#BioMarkovChains.log_odds_ratio_matrix-Union{Tuple{A}, Tuple{Union{BioSequences.LongSequence{A}, BioSequences.LongSubSeq{A}}, BioMarkovChain}} where A","page":"API","title":"BioMarkovChains.log_odds_ratio_matrix","text":"log_odds_ratio_matrix(sequence::NucleicSeqOrView{A}, model::BioMarkovChain) where A\n\nCalculates the log-odds ratio between the transition probability matrix of a given DNA sequence and a reference model.\n\nArguments\n\nsequence::NucleicSeqOrView{A}: A DNA, RNA sequence or view with a length of 4 nucleotides.\nmodel::BioMarkovChain: A reference BioMarkovChain model.\n\nExamples\n\nsequence = LongNucOrView{4}(\"ACGT\")\nmodel = BioMarkovChain(sequence)  # Provide appropriate initialization for BioMarkovChain\nresult = log_odds_ratio_matrix(sequence, model)\n\n\n\n\n\n","category":"method"},{"location":"api/#BioMarkovChains.log_odds_ratio_score-Union{Tuple{A}, Tuple{Union{BioSequences.LongSequence{A}, BioSequences.LongSubSeq{A}}, BioMarkovChain}} where A","page":"API","title":"BioMarkovChains.log_odds_ratio_score","text":"log_odds_ratio_score(sequence::SeqOrView{A}, model::BioMarkovChain; b::Number = ℯ)\n\nCompute the log odds ratio score between a given sequence and a BioMarkovChain model.\n\nS(x) = sum_i=1^L beta_x_ix = sum_i=1 log fraca^mathscrm_1_i-1 x_ia^mathscrm_2_i-1 x_i\n\nArguments\n\nsequence::SeqOrView{A}: A sequence of elements of type A.\nmodel::BioMarkovChain: A BioMarkovChain model.\nb::Number = ℯ: The base of the logarithm used to compute the log odds ratio.\n\nReturns\n\nThe log odds ratio score between the sequence and the model.\n\nExample\n\n\n\n\n\n","category":"method"},{"location":"api/#BioMarkovChains.perronfrobenius-Union{Tuple{Union{BioSequences.LongSequence{A}, BioSequences.LongSubSeq{A}}}, Tuple{A}} where A","page":"API","title":"BioMarkovChains.perronfrobenius","text":"perronfrobenius(sequence::SeqOrView{A}, n::Int64=1) where A\n\nCompute the Perron-Frobenius matrix, a column-stochastic version of the transition probability matrix (TPM), for a given nucleotide sequence.\n\nThe Perron-Frobenius matrix captures the asymptotic probabilities of transitioning between nucleotides in the sequence over a specified number of steps n. It provides insight into the long-term behavior of a Markov chain or a dynamical system associated with the sequence.\n\nArguments\n\nsequence::SeqOrView{A}: A nucleotide sequence represented as a NucleicSeqOrView{A} object.\nn::Int64=1: The number of steps to consider for the transition probability matrix. Default is 1.\n\nReturns\n\nA copy of the Perron-Frobenius matrix. Each column of this matrix corresponds to the probabilities of transitioning from the current nucleotide state to all possible nucleotide states after n steps.\n\nExample\n\nsequence = LongSequence{DNAAlphabet{4}}(\"ACGTCGTCCACTACGACATCAGC\")  # Replace with an actual nucleotide sequence\nn = 2\npf = perronfrobenius(sequence, n)\n\n\n\n\n\n","category":"method"},{"location":"api/#BioMarkovChains.transition_count_matrix-Union{Tuple{Union{BioSequences.LongSequence{A}, BioSequences.LongSubSeq{A}}}, Tuple{A}} where A","page":"API","title":"BioMarkovChains.transition_count_matrix","text":"transition_count_matrix(sequence::LongSequence{DNAAlphabet{4}})\n\nCompute the transition count matrix (TCM) of a given DNA sequence.\n\nArguments\n\nsequence::LongSequence{DNAAlphabet{4}}: a LongSequence{DNAAlphabet{4}} object representing the DNA sequence.\n\nReturns\n\nA Matrix object representing the transition count matrix of the sequence.\n\nExample\n\nseq = LongDNA{4}(\"AGCTAGCTAGCT\")\n\ntcm = transition_count_matrix(seq)\n\n4×4 Matrix{Int64}:\n 0  0  3  0\n 0  0  0  3\n 0  3  0  0\n 2  0  0  0\n\n\n\n\n\n","category":"method"},{"location":"api/#BioMarkovChains.transition_probability_matrix-Union{Tuple{Union{BioSequences.LongSequence{A}, BioSequences.LongSubSeq{A}}}, Tuple{A}, Tuple{Union{BioSequences.LongSequence{A}, BioSequences.LongSubSeq{A}}, Int64}} where A","page":"API","title":"BioMarkovChains.transition_probability_matrix","text":"transition_probability_matrix(sequence::LongSequence{DNAAlphabet{4}}, n::Int64=1)\n\nCompute the transition probability matrix (TPM) of a given DNA sequence. Formally it construct hatmathscrM where: \n\nmathscrm_ij = P(X_t = j mid X_t-1 = i) = fracP(X_t-1 = i X_t = j)P(X_t-1 = i)\n\nThe transition matrices of DNA and Amino-Acids are arranged sorted and in row-wise matrices:\n\nFirst the DNA matrix:\n\nmathscrM_DNA = beginbmatrix\n_AA  _AC  _AG  _AT \n_CA  _CC  _CG  _CT \n_GA  _GC  _GG  _GT \n_TA  _TC  _TG  _TT \nendbmatrix\n\nAnd then, the Aminoacids:\n\nmathscrM_AA = beginbmatrix\n_AA  _AC  _AD  dots  _AW \n_CA  _CC  _CD  dots  _CW \n_DA  _DC  _DD  dots  _DW \nvdots  vdots  vdots  ddots  vdots \n_WA  _WC  _WD  dots  _WW \nendbmatrix\n\nArguments\n\nsequence::LongNucOrView{4}: a LongNucOrView{4} object representing the DNA sequence.\nn::Int64=1: The order of the Markov model. That is the hatM^n\n\nKeywords\n\nextended_alphabet::Bool=false: If true will pass the extended alphabet of DNA to search\n\nReturns\n\nA Matrix object representing the transition probability matrix of the sequence.\n\nExample\n\nseq = dna\"AGCTAGCTAGCT\"\n\ntpm = transition_probability_matrix(seq)\n\n4×4 Matrix{Float64}:\n 0.0  0.0  1.0  0.0\n 0.0  0.0  0.0  1.0\n 0.0  1.0  0.0  0.0\n 1.0  0.0  0.0  0.0\n\n\n\n\n\n","category":"method"},{"location":"api/#StatsAPI.fit!-Tuple{BioMarkovChain, Vector{Float64}, Matrix{Float64}}","page":"API","title":"StatsAPI.fit!","text":"fit!(bmc::BMC, inits:Vector{Float64}, tpm::Matrix{Float64})\n\nUpdate bmc in-place based on information generated from a state sequence.\n\n\n\n\n\n","category":"method"},{"location":"#BioMarkovChains","page":"Home","title":"BioMarkovChains","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"\n<p align=\"center\">\n  <img src=\"assets/logo.svg\" height=\"150\"><br/>\n  <i>Representing biological sequences as Markov chains</i>\n</p>","category":"page"},{"location":"","page":"Home","title":"Home","text":"\n<div style=\"text-align: center;\">\n\n<a href=\"https://camilogarciabotero.github.io/BioMarkovChains.jl/dev/\"><img src=\"https://img.shields.io/badge/documentation-online-blue.svg?logo=Julia&logoColor=white\" alt=\"Documentation\"></a>\n<a href=\"https://github.com/camilogarciabotero/BioMarkovChains.jl/releases/latest\"><img src=\"https://img.shields.io/github/release/camilogarciabotero/BioMarkovChains.jl.svg\" alt=\"Latest Release\"></a>\n<a href=\"https://zenodo.org/badge/latestdoi/665161607\"><img src=\"https://zenodo.org/badge/665161607.svg\" alt=\"DOI\"></a>\n<br/>\n<a href=\"https://github.com/camilogarciabotero/BioMarkovChains.jl/actions/workflows/CI.yml\"><img src=\"https://github.com/camilogarciabotero/BioMarkovChains.jl/actions/workflows/CI.yml/badge.svg\" alt=\"CI Workflow\"></a>\n<a href=\"https://github.com/camilogarciabotero/BioMarkovChains.jl/blob/main/LICENSE\"><img src=\"https://img.shields.io/badge/license-MIT-green.svg\" alt=\"License\"></a>\n<a href=\"https://www.repostatus.org/#wip\"><img src=\"https://www.repostatus.org/badges/latest/wip.svg\" alt=\"Work in Progress\"></a>\n<a href=\"https://pkgs.genieframework.com?packages=BioMarkovChains\"><img src=\"https://shields.io/endpoint?url=https://pkgs.genieframework.com/api/v1/badge/BioMarkovChains&label=downloads\" alt=\"Downloads\"></a>\n\n</div>\n","category":"page"},{"location":"","page":"Home","title":"Home","text":"Documentation for BioMarkovChains.","category":"page"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"#Overview","page":"Home","title":"Overview","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package aim to represent BioSequences types as Markov chains to perform different operations and predictions","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"You can install BioMarkovChains from the julia REPL. Press ] to enter pkg mode, and enter the following:","category":"page"},{"location":"","page":"Home","title":"Home","text":"add BioMarkovChains","category":"page"},{"location":"","page":"Home","title":"Home","text":"If you are interested in the cutting edge of the development, please check out the master branch to try new features before release.","category":"page"},{"location":"biomarkovchains/#DNA-as-a-Markov-chain","page":"Towards Markov Chains","title":"DNA as a Markov chain","text":"","category":"section"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"Several packages (e.g. MarkovChainsHammer.jl, DiscreteMarkovChains.jl, etc.) in the Julia ecosystem have been implemented to work with Markov chains with a state space of integers, those could be efficient in many ways, but they are clumsy to work with a specialized biological types as in the BioJulia ecosystem. Therefore, in the GeneFinder package we dedicated some implementations to work with BioSequence types so that we can expand the functionality in an efficient way (see complete API).","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"One important step towards many gene finding algorithms is to represent a DNA sequence as a Markov chain. In this representation a DNA sequence of a reduced alphabet mathscrA = A  C  G   T  is draw as a four-vertex graph, where each letter of mathscrA is a state (vertex) and the edges of the graph represent transitions from one nucleotide to another in a sequence (e.g. A rightarrow T represent a single nucleotide to nucleotide transition). This is also considered more specifically as a Discrete Markov chain (Axelson-Fisk 2015). The complete set of transitions and states of a DNA sequence of alphabet mathscrA.","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"More formally a Markov chain is a random process where each state is a random variable X_t where t in T is a discrete time in a finite sequence T and the probability to jump from one state into another is only dependent of the current state. Therefore a definition of this Markov property is given by:","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"beginalign\nP(X_t = j X_t1 = i)\nendalign","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"where i j in  mathscrA . This property led us to generalize a way to calculate the probability of a sequence T from a process (X_1X_T) where each random variable is a nucleotide from mathscrA so that:","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"beginalign\nP(X_1 = i_1X_T = i_T) = P(X_1 = i_1) prod_t=2^T P(X_t = i_t  X_t1 = i_t1)\nendalign","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"Note that previous equations has two terms, a initial probability P(X_1 = i_1) and the the product of all transitions beginning at t = 2. So, to calculate the initial probability distribution of each of the nucleotides of a string T with the alphabet 𝒜 we can first calculate the transition probability matrix widehatmathscrM out of the frequency count of the transitions. In an alphabet 𝒜 we got 4^2 transitions of one order, that is the AA AC AG  which coincides with the frequency of the dinucleotides in the sequence. So we can later in fact build a 4 x 4 matrix representing all the transitions. For instance in a DNA sequence T of 24 nucleotides:  ","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"CCTCCCGGACCCTGGGCTCGGGAC","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"We can calculate each frequency nucleotide to any other nucleotide widehatm_ij = fracc_ijc_i where c_ij is the actual count of the dinucleotide, and therefore c_i is the counts of the nucleotide i to any other nucleotide and build the transition probability matrix:","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"beginbmatrix\n    textA  textC  textG  textT \ntextA  000  100  000  000 \ntextC  000  056  022  030 \ntextG  025  012  062  000 \ntextT  000  067  033  000 \nendbmatrix","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"It is noteworthy that initial probabilities can also be obtained from the counts of each nucleotide transitions c_ij over the total sum of the dinucleotide counts c_k:","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"beginalign\nwidehatpi_i = fracc_isum_kc_k\nendalign","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"That way for the previous example example we can can calculate the initial probabilities widehatpi = (008043034013). Both set of probabilities composed a transition model that can be used to predict the probability of any DNA sequence using equation (2).","category":"page"},{"location":"biomarkovchains/#Markov-Chains-using-BioSequences","page":"Towards Markov Chains","title":"Markov Chains using BioSequences","text":"","category":"section"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"We can now calculate a transition probability matrix from a LongDNA sequence using the transition_probability_matrix and initials methods for a given LongDNA sequence:","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"using BioSequences, GeneFinder\n\nsequence = dna\"CCTCCCGGACCCTGGGCTCGGGAC\"\n\ntpm = transition_probability_matrix(sequence)\ninitials = initials(sequence)\n\nprintln(tpm)\nprintln(initials)","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"4×4 Matrix{Float64}:\n 0.0   1.0       0.0       0.0\n 0.0   0.5       0.2       0.3\n 0.25  0.125     0.625     0.0\n 0.0   0.666667  0.333333  0.0\n\n4-element Vector{Float64}:\n 0.08695652173913043\n 0.43478260869565216\n 0.34782608695652173\n 0.13043478260869565","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"More conveniently, we can now use the transition_model method and obtain the transition probabilities and the initial distribution and build a transition model (BioMarkovChain):","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"BioMarkovChain(sequence)","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"BioMarkovChain with DNA Alphabet:\n  - Transition Probability Matrix --> Matrix{Float64}(4 × 4):\n   0.0     1.0     0.0     0.0\n   0.0     0.5     0.2     0.3\n   0.25    0.125   0.625   0.0\n   0.0     0.6667  0.3333  0.0\n  - Initial Probabilities -> Vector{Float64}(4 × 1):\n   0.087\n   0.4348\n   0.3478\n   0.1304\n  - Markov Chain Order -> Int64:\n   1","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"Note that, sometimes the dinucleotides transition do not harbor important biological meaning, whereas trinucleotides or codons are, in fact, the building block of proteins. Therefore, sometimes the transition model we want to build is usually a second-order Markov chain, that represents the possible transitions of a trinucleotide.","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"A very nice nice property of the transition probability matrix is that the n-step transition probability matrix mathscrM^n = (mathscrm_ij(n)), that is the nth power of mathscrM represents i rightarrow j transitions in n steps. We can also have higher order transition models as:","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"BioMarkovChain(sequence, 2)","category":"page"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"BioMarkovChain with DNA Alphabet:\n  - Transition Probability Matrix --> Matrix{Float64}(4 × 4):\n   0.0     0.5     0.2     0.3\n   0.05    0.475   0.325   0.15\n   0.1562  0.3906  0.4156  0.0375\n   0.0833  0.375   0.3417  0.2\n  - Initial Probabilities -> Vector{Float64}(4 × 1):\n   0.087\n   0.4348\n   0.3478\n   0.1304\n  - Markov Chain Order -> Int64:\n   2","category":"page"},{"location":"biomarkovchains/#References","page":"Towards Markov Chains","title":"References","text":"","category":"section"},{"location":"biomarkovchains/","page":"Towards Markov Chains","title":"Towards Markov Chains","text":"Axelson-Fisk, Marina. 2015. Comparative Gene Finding. Vol. 20. Computational Biology. London: Springer London. http://link.springer.com/10.1007/978-1-4471-6693-1.","category":"page"}]
}