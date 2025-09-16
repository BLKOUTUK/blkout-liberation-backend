/**
 * Community Assembly Governance (Layer 4 ONLY)
 * CRITICAL: Contains ONLY democratic voting decision logic - NO vote storage, NO infrastructure
 * 
 * LAYER SEPARATION COMPLIANCE:
 * ✅ Makes voting process decisions ONLY
 * ❌ NO vote storage operations (delegates to Layer 5)
 * ❌ NO voting infrastructure (delegates to Layer 6)
 * ❌ NO vote counting implementation (delegates to Layer 3)
 */

import {
  CommunityAssemblyGovernance as ICommunityAssemblyGovernance
} from './CommunityGovernanceInterface';
import {
  CommunityProposal,
  VoteResult,
  VotingRules,
  VoteEligibility,
  ProposalValidation,
  CommunityAssemblyDecision,
  VotingRuleType,
  LiberationPrincipleType,
  GovernanceDecisionType,
  DissentRecord
} from './CommunityGovernanceTypes';

/**
 * Community Assembly Democratic Governance
 * RESPONSIBILITY: Makes democratic voting decisions ONLY - no vote implementation
 */
export class CommunityAssemblyGovernance implements ICommunityAssemblyGovernance {
  
  /**
   * Conducts community assembly vote
   * DECISION ONLY: Returns voting process decision - does NOT store votes
   */
  async conductCommunityVote(proposal: CommunityProposal): Promise<VoteResult> {
    // 1. Validate proposal meets democratic and liberation criteria
    const proposalValidation = await this.validateProposal(proposal);
    
    if (!proposalValidation.valid) {
      return {
        approved: false,
        votingRules: await this.getVotingRules(),
        requiredQuorum: 0,
        passingThreshold: 0,
        proposalValidation,
        voteEligibility: { eligibleVoters: [], ineligibleVoters: [], eligibilityRequirements: [], specialVotingRights: {} },
        reason: `Proposal validation failed: ${proposalValidation.validationErrors.join(', ')}`
      };
    }

    // 2. Get voting rules for this proposal type
    const votingRules = await this.getVotingRules();
    
    // 3. Determine vote eligibility (DECISION ONLY - Layer 5 manages voter records)
    const voteEligibility = await this.determineVoteEligibility(proposal);
    
    // 4. Calculate democratic requirements based on liberation principles
    const democraticRequirements = this.calculateDemocraticRequirements(proposal, votingRules);
    
    return {
      approved: true, // Proposal approved for voting process
      votingRules,
      requiredQuorum: democraticRequirements.quorum,
      passingThreshold: democraticRequirements.threshold,
      proposalValidation,
      voteEligibility
    };
  }

  /**
   * Validates proposal meets democratic and liberation criteria
   * DECISION ONLY: Returns validation decision - no proposal modification
   */
  async validateProposal(proposal: CommunityProposal): Promise<ProposalValidation> {
    const validationErrors: string[] = [];
    const requiredImprovements: string[] = [];

    // 1. Validate liberation compliance
    const liberationCompliant = await this.validateProposalLiberation(proposal);
    if (!liberationCompliant.compliant) {
      validationErrors.push('Proposal does not meet liberation principles');
      requiredImprovements.push(...liberationCompliant.improvements);
    }

    // 2. Validate community benefit
    const communityBeneficial = await this.validateCommunityBenefit(proposal);
    if (!communityBeneficial.beneficial) {
      validationErrors.push('Proposal does not demonstrate community benefit');
      requiredImprovements.push(...communityBeneficial.improvements);
    }

    // 3. Validate democratic process requirements
    const democraticProcess = await this.validateDemocraticProcess(proposal);
    if (!democraticProcess.valid) {
      validationErrors.push('Proposal does not meet democratic process requirements');
      requiredImprovements.push(...democraticProcess.improvements);
    }

    const valid = validationErrors.length === 0;

    return {
      valid,
      liberationCompliant: liberationCompliant.compliant,
      communityBeneficial: communityBeneficial.beneficial,
      democraticProcess: democraticProcess.valid,
      validationErrors,
      requiredImprovements
    };
  }

  /**
   * Gets voting rules appropriate for proposal type
   * DECISION ONLY: Returns voting rule decisions
   */
  async getVotingRules(): Promise<VotingRules> {
    // Default liberation-weighted democratic voting rules
    return {
      ruleType: VotingRuleType.LIBERATION_WEIGHTED,
      quorumPercentage: 0.3, // 30% participation required
      passingThreshold: 0.6, // 60% approval required
      votingPeriodDays: 14, // 2 weeks for community deliberation
      eligibilityRequirements: [
        'active_community_member',
        'liberation_aligned',
        'consent_to_democratic_process'
      ],
      liberationWeighting: true // Votes weighted by liberation principle alignment
    };
  }

  /**
   * Determines vote eligibility
   * DECISION ONLY: Returns eligibility decision - Layer 5 manages actual voter records
   */
  async determineVoteEligibility(proposal: CommunityProposal): Promise<VoteEligibility> {
    // Mock eligibility determination - real implementation would query Layer 5
    const eligibilityRequirements = [
      'Community member for at least 30 days',
      'Has contributed to liberation-aligned activities',
      'Consented to democratic governance process',
      'No active governance violations'
    ];

    // This would typically query Layer 5 for actual member records
    const eligibleVoters = this.mockEligibleVoters(proposal);
    const ineligibleVoters = this.mockIneligibleVoters(proposal);
    const specialVotingRights = this.determineSpecialVotingRights(proposal);

    return {
      eligibleVoters,
      ineligibleVoters,
      eligibilityRequirements,
      specialVotingRights
    };
  }

  /**
   * Makes assembly-level governance decision
   * DECISION ONLY: Returns assembly decision - no implementation
   */
  async makeAssemblyDecision(proposal: CommunityProposal): Promise<CommunityAssemblyDecision> {
    const proposalValidation = await this.validateProposal(proposal);
    
    // Mock participation and consensus data - real implementation would get from Layer 5
    const participationRate = 0.45; // 45% participation
    const consensusLevel = 0.75; // 75% agreement
    const dissent = this.generateMockDissent(proposal);

    const democraticProcess = participationRate >= 0.3; // Met quorum
    const liberationAligned = proposalValidation.liberationCompliant;

    return {
      assemblyId: `assembly_${Date.now()}`,
      decisionType: this.mapProposalToDecisionType(proposal),
      participationRate,
      democraticProcess,
      liberationAligned,
      consensusLevel,
      dissent,
      implementationRequirements: this.generateImplementationRequirements(proposal, liberationAligned)
    };
  }

  // ===== PRIVATE HELPER METHODS =====

  private async validateProposalLiberation(proposal: CommunityProposal): Promise<{
    compliant: boolean;
    improvements: string[];
  }> {
    const improvements: string[] = [];
    
    // Check liberation impact scores
    let compliant = true;
    
    if (proposal.liberationImpact.blackQueerEmpowerment < 0.6) {
      compliant = false;
      improvements.push('Increase Black queer empowerment focus');
    }
    
    if (proposal.liberationImpact.communityLiberation < 0.6) {
      compliant = false;
      improvements.push('Strengthen community liberation benefits');
    }
    
    if (proposal.liberationImpact.oppressionResistance < 0.5) {
      improvements.push('Consider anti-oppression implications');
    }
    
    if (proposal.liberationImpact.mutualAidSupport < 0.4) {
      improvements.push('Add mutual aid components');
    }

    return { compliant, improvements };
  }

  private async validateCommunityBenefit(proposal: CommunityProposal): Promise<{
    beneficial: boolean;
    improvements: string[];
  }> {
    const improvements: string[] = [];
    
    // Assess community benefit based on proposal type and impact
    let beneficial = true;
    
    if (proposal.liberationImpact.communityPowerBuilding < 0.5) {
      beneficial = false;
      improvements.push('Demonstrate how proposal builds community power');
    }
    
    if (proposal.liberationImpact.overallLiberationScore < 0.6) {
      beneficial = false;
      improvements.push('Increase overall liberation impact');
    }
    
    // Check for extractive patterns
    if (proposal.description.toLowerCase().includes('profit') && 
        !proposal.description.toLowerCase().includes('community')) {
      improvements.push('Clarify community benefit beyond profit');
    }

    return { beneficial, improvements };
  }

  private async validateDemocraticProcess(proposal: CommunityProposal): Promise<{
    valid: boolean;
    improvements: string[];
  }> {
    const improvements: string[] = [];
    let valid = true;

    // Validate proposal meets democratic standards
    if (proposal.title.length < 10) {
      valid = false;
      improvements.push('Provide more descriptive proposal title');
    }
    
    if (proposal.description.length < 100) {
      valid = false;
      improvements.push('Provide detailed proposal description (minimum 100 characters)');
    }
    
    if (!proposal.deadline || proposal.deadline < new Date()) {
      valid = false;
      improvements.push('Set appropriate voting deadline in the future');
    }
    
    if (proposal.requiredVoteType === VotingRuleType.CONSENSUS && 
        proposal.liberationImpact.overallLiberationScore < 0.8) {
      improvements.push('Consensus voting requires higher liberation alignment');
    }

    return { valid, improvements };
  }

  private calculateDemocraticRequirements(proposal: CommunityProposal, votingRules: VotingRules): {
    quorum: number;
    threshold: number;
  } {
    let quorum = votingRules.quorumPercentage;
    let threshold = votingRules.passingThreshold;

    // Adjust requirements based on proposal type and liberation impact
    if (proposal.proposalType === 'governance_rule') {
      // Governance changes require higher participation
      quorum = Math.max(quorum, 0.4); // 40% minimum for governance
      threshold = Math.max(threshold, 0.67); // 2/3 majority for governance
    }
    
    if (proposal.liberationImpact.overallLiberationScore > 0.9) {
      // High liberation impact can have slightly lower requirements
      threshold = Math.max(threshold - 0.05, 0.5); // Never below simple majority
    }
    
    if (proposal.proposalType === 'creator_dispute') {
      // Creator disputes require supermajority
      threshold = 0.75; // 75% for creator disputes
    }

    return { quorum, threshold };
  }

  private mockEligibleVoters(proposal: CommunityProposal): string[] {
    // Mock data - real implementation would query Layer 5 member database
    return [
      'member_1001',
      'member_1002', 
      'member_1003',
      'member_1004',
      'member_1005'
    ];
  }

  private mockIneligibleVoters(proposal: CommunityProposal): string[] {
    // Mock data - real implementation would query Layer 5 member database
    return [
      'member_2001', // New member (< 30 days)
      'member_2002'  // Governance violation
    ];
  }

  private determineSpecialVotingRights(proposal: CommunityProposal): Record<string, string[]> {
    const specialRights: Record<string, string[]> = {};
    
    // Liberation leaders get enhanced voting weight
    specialRights['liberation_leaders'] = ['weighted_vote_1.5x'];
    
    // Affected creators get veto rights for creator-related proposals
    if (proposal.proposalType === 'creator_dispute') {
      specialRights['affected_creators'] = ['veto_right'];
    }
    
    // Community elders get advisory voice
    specialRights['community_elders'] = ['advisory_voice'];
    
    return specialRights;
  }

  private generateMockDissent(proposal: CommunityProposal): DissentRecord[] {
    // Mock dissent records - real implementation would get from vote results
    return [
      {
        voterType: 'community_elder',
        dissentReason: 'Concerned about implementation timeline',
        liberationConcern: false,
        alternativeProposal: 'Extend timeline by 2 weeks'
      }
    ];
  }

  private mapProposalToDecisionType(proposal: CommunityProposal): GovernanceDecisionType {
    switch (proposal.proposalType) {
      case 'governance_rule':
        return GovernanceDecisionType.GOVERNANCE_RULE_UPDATE;
      case 'creator_dispute':
        return GovernanceDecisionType.CREATOR_SOVEREIGNTY;
      case 'platform_change':
        return GovernanceDecisionType.LIBERATION_VALIDATION;
      default:
        return GovernanceDecisionType.COMMUNITY_VOTE;
    }
  }

  private generateImplementationRequirements(proposal: CommunityProposal, liberationAligned: boolean): string[] {
    const requirements: string[] = [];
    
    if (liberationAligned) {
      requirements.push('Monitor liberation impact during implementation');
      requirements.push('Report community benefits quarterly');
    } else {
      requirements.push('Mandatory liberation alignment review before implementation');
      requirements.push('Community consent required for each implementation phase');
    }
    
    if (proposal.proposalType === 'governance_rule') {
      requirements.push('Update governance documentation');
      requirements.push('Notify all community members of rule changes');
      requirements.push('Provide 30-day transition period');
    }
    
    if (proposal.proposalType === 'creator_dispute') {
      requirements.push('Affected creators must consent to resolution');
      requirements.push('Revenue redistribution must occur within 48 hours');
    }
    
    return requirements;
  }
}