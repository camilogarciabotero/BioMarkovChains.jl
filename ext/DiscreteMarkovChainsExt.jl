module DiscreteMarkovChainsExt

using BioMarkovChains
using DiscreteMarkovChains:
    DiscreteMarkovChains, DiscreteMarkovChain,
    is_absorbing, is_ergodic, is_regular, is_reversible,
    stationary_distribution, first_passage_probabilities, exit_probabilities,
    fundamental_matrix, mean_first_passage_time, mean_recurrence_time, mean_time_to_absorption

## Boolean functions ##

import DiscreteMarkovChains: is_absorbing, is_ergodic, is_regular, is_reversible

function DiscreteMarkovChains.is_absorbing(bmc::BioMarkovChain)
    return is_absorbing(DiscreteMarkovChain(bmc.tpm))
end

function DiscreteMarkovChains.is_ergodic(bmc::BioMarkovChain)
    return is_ergodic(DiscreteMarkovChain(bmc.tpm))
end

function DiscreteMarkovChains.is_regular(bmc::BioMarkovChain)
    return is_regular(DiscreteMarkovChain(bmc.tpm))
end

function DiscreteMarkovChains.is_reversible(bmc::BioMarkovChain)
    return is_reversible(DiscreteMarkovChain(bmc.tpm))
end

## Probability functions

import DiscreteMarkovChains: stationary_distribution, first_passage_probabilities, exit_probabilities

function DiscreteMarkovChains.exit_probabilities(bmc::BioMarkovChain)
    return exit_probabilities(DiscreteMarkovChain(bmc.tpm))
end

function DiscreteMarkovChains.stationary_distribution(bmc::BioMarkovChain)
    return stationary_distribution(DiscreteMarkovChain(bmc.tpm))
end

function DiscreteMarkovChains.first_passage_probabilities(bmc::BioMarkovChain, t) # it recieves other args...
    return first_passage_probabilities(DiscreteMarkovChain(bmc.tpm), t)
end

## Mean time functions

import DiscreteMarkovChains: fundamental_matrix, mean_first_passage_time, mean_recurrence_time, mean_time_to_absorption

function DiscreteMarkovChains.fundamental_matrix(bmc::BioMarkovChain)
    return fundamental_matrix(DiscreteMarkovChain(bmc.tpm))
end

function DiscreteMarkovChains.mean_first_passage_time(bmc::BioMarkovChain)
    return mean_first_passage_time(DiscreteMarkovChain(bmc.tpm))
end

function DiscreteMarkovChains.mean_recurrence_time(bmc::BioMarkovChain)
    return mean_recurrence_time(DiscreteMarkovChain(bmc.tpm))
end

function DiscreteMarkovChains.mean_time_to_absorption(bmc::BioMarkovChain)
    return mean_time_to_absorption(DiscreteMarkovChain(bmc.tpm))
end

end