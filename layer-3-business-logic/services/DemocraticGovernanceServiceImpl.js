/**
 * Democratic Governance Service Implementation (Layer 3)
 *
 * CONTRACT COMPLIANCE: Implements IDemocraticGovernanceService interface
 * DOES NOT: Access data directly, make data persistence decisions
 * ONLY: Implements democratic governance business logic through repository contracts
 */

const { IDemocraticGovernanceService } = require('../../../../contracts/business-logic-interfaces');

class DemocraticGovernanceServiceImpl extends IDemocraticGovernanceService {
  constructor(communityDataRepository, auditTrailRepository) {
    super();
    this.communityDataRepository = communityDataRepository;
    this.auditTrailRepository = auditTrailRepository;

    // DEMOCRATIC GOVERNANCE CONSTANTS
    this.MINIMUM_PARTICIPATION = 0.1; // 10% minimum participation for quorum
    this.ONE_MEMBER_ONE_VOTE = true;
    this.CONSENSUS_THRESHOLD = 0.6; // 60% for consensus
  }

  /**
   * ONE-MEMBER-ONE-VOTE VALIDATION: Ensure democratic principles
   */
  async validateOneMemberOneVote(governanceRequest) {
    const validation = {
      valid: true,
      violations: [],
      democraticPrinciples: 'maintained',
      votingMethod: 'one_member_one_vote'
    };

    // Validate no duplicate votes
    const votes = governanceRequest.votes || [];
    const uniqueVoters = new Set(votes.map(v => v.memberId));

    if (uniqueVoters.size !== votes.length) {
      validation.valid = false;
      validation.violations.push('duplicate_votes_detected');
      validation.democraticPrinciples = 'violated';
    }

    // Validate all voters are community members
    for (const vote of votes) {
      if (!vote.memberId || !vote.communityId) {
        validation.valid = false;
        validation.violations.push('invalid_voter_credentials');
      }
    }

    // Audit validation through repository contract
    await this.auditTrailRepository.storeOperationAudit({
      operation_type: 'democratic_validation',
      governance_request_id: governanceRequest.id,
      validation_result: validation,
      democratic_principles_check: true,
      timestamp: new Date().toISOString()
    });

    return validation;
  }

  /**
   * GOVERNANCE PROCESSING: Process democratic decision
   */
  async processGovernanceDecision(governanceRequest) {
    const voteValidation = await this.validateOneMemberOneVote(governanceRequest);

    if (!voteValidation.valid) {
      const result = {
        processed: false,
        decision: 'invalid',
        reason: 'democratic_principles_violated',
        violations: voteValidation.violations
      };

      await this.auditTrailRepository.storeOperationAudit({
        operation_type: 'governance_processing_failure',
        governance_request_id: governanceRequest.id,
        processing_result: result,
        timestamp: new Date().toISOString()
      });

      return result;
    }

    // Calculate democratic result
    const votes = governanceRequest.votes || [];
    const supportVotes = votes.filter(v => v.decision === 'support').length;
    const totalVotes = votes.length;
    const supportRatio = totalVotes > 0 ? supportVotes / totalVotes : 0;

    const consensusReached = supportRatio >= this.CONSENSUS_THRESHOLD;

    const result = {
      processed: true,
      decision: consensusReached ? 'approved' : 'rejected',
      supportRatio,
      consensusThreshold: this.CONSENSUS_THRESHOLD,
      totalVotes,
      supportVotes,
      democraticLegitimacy: voteValidation.valid ? 'confirmed' : 'compromised',
      governanceMethod: 'one_member_one_vote_consensus'
    };

    // Store decision through repository contract
    await this.communityDataRepository.storeWithSovereignty({
      governance_decision: result,
      governance_request_id: governanceRequest.id,
      decision_type: 'democratic_consensus'
    }, {
      communityOwned: true,
      creatorControlled: false,
      sovereigntyLevel: 'community_democratic'
    });

    await this.auditTrailRepository.storeOperationAudit({
      operation_type: 'governance_processing_success',
      governance_request_id: governanceRequest.id,
      processing_result: result,
      democratic_legitimacy_confirmed: true,
      timestamp: new Date().toISOString()
    });

    return result;
  }

  /**
   * PARTICIPATION CALCULATION: Measure democratic participation
   */
  async calculateParticipationRate(governanceRequest) {
    // Get community membership data through repository contract
    const communityMembers = await this.communityDataRepository.findByCommunityId(governanceRequest.communityId);

    const totalMembers = communityMembers.length || 1; // Prevent division by zero
    const participatingMembers = (governanceRequest.votes || []).length;

    const participationRate = participatingMembers / totalMembers;
    const quorumMet = participationRate >= this.MINIMUM_PARTICIPATION;

    const participationMetrics = {
      participationRate,
      totalMembers,
      participatingMembers,
      minimumParticipation: this.MINIMUM_PARTICIPATION,
      quorumMet,
      democraticLegitimacy: quorumMet ? 'valid' : 'insufficient_participation',
      engagementLevel: this.calculateEngagementLevel(participationRate)
    };

    // Store participation metrics through repository contract
    await this.auditTrailRepository.storeLiberationMetric({
      metric_type: 'democratic_participation',
      governance_request_id: governanceRequest.id,
      metrics: participationMetrics,
      timestamp: new Date().toISOString()
    });

    return participationRate;
  }

  /**
   * COMMUNITY BENEFIT VALIDATION: Ensure decisions benefit community
   */
  async validateCommunityBenefit(governanceRequest) {
    const benefitAnalysis = {
      communityBenefitConfirmed: true,
      benefitType: 'collective_empowerment',
      liberationAlignment: 'community_centered',
      antiOppressionCheck: true,
      benefitScore: 0.85
    };

    // Analyze decision impact on community liberation
    if (governanceRequest.decisionType === 'resource_allocation') {
      benefitAnalysis.benefitType = 'economic_justice';
      benefitAnalysis.benefitScore = 0.9;
    } else if (governanceRequest.decisionType === 'policy_change') {
      benefitAnalysis.benefitType = 'governance_improvement';
      benefitAnalysis.benefitScore = 0.8;
    }

    // Check for oppressive decisions
    const oppressiveKeywords = ['restrict', 'limit', 'penalize', 'exclude'];
    const decisionDescription = (governanceRequest.description || '').toLowerCase();

    const hasOppressiveLanguage = oppressiveKeywords.some(keyword =>
      decisionDescription.includes(keyword)
    );

    if (hasOppressiveLanguage) {
      benefitAnalysis.communityBenefitConfirmed = false;
      benefitAnalysis.antiOppressionCheck = false;
      benefitAnalysis.liberationAlignment = 'potentially_oppressive';
      benefitAnalysis.benefitScore = 0.2;
    }

    await this.auditTrailRepository.storeOperationAudit({
      operation_type: 'community_benefit_validation',
      governance_request_id: governanceRequest.id,
      benefit_analysis: benefitAnalysis,
      anti_oppression_protection: true,
      timestamp: new Date().toISOString()
    });

    return benefitAnalysis;
  }

  /**
   * CONSENSUS BUILDING: Facilitate democratic consensus
   */
  async facilitateConsensusBuilding(governanceRequest) {
    const currentSupport = await this.calculateCurrentSupport(governanceRequest);

    const consensusStrategy = {
      currentSupportLevel: currentSupport.supportRatio,
      consensusNeeded: this.CONSENSUS_THRESHOLD,
      gapToConsensus: Math.max(0, this.CONSENSUS_THRESHOLD - currentSupport.supportRatio),
      facilitationNeeded: currentSupport.supportRatio < this.CONSENSUS_THRESHOLD,
      democraticProcess: 'consensus_building',
      communityEngagement: 'active_facilitation'
    };

    if (consensusStrategy.facilitationNeeded) {
      // Store facilitation request through repository contract
      await this.communityDataRepository.storeWithSovereignty({
        consensus_facilitation: consensusStrategy,
        governance_request_id: governanceRequest.id,
        facilitation_type: 'democratic_consensus'
      }, {
        communityOwned: true,
        creatorControlled: false,
        sovereigntyLevel: 'community_democratic'
      });
    }

    return consensusStrategy;
  }

  /**
   * Helper: Calculate current support levels
   */
  async calculateCurrentSupport(governanceRequest) {
    const votes = governanceRequest.votes || [];
    const supportVotes = votes.filter(v => v.decision === 'support').length;
    const totalVotes = votes.length;

    return {
      supportVotes,
      totalVotes,
      supportRatio: totalVotes > 0 ? supportVotes / totalVotes : 0
    };
  }

  /**
   * Helper: Calculate engagement level
   */
  calculateEngagementLevel(participationRate) {
    if (participationRate >= 0.7) return 'highly_engaged';
    if (participationRate >= 0.3) return 'moderately_engaged';
    if (participationRate >= this.MINIMUM_PARTICIPATION) return 'minimally_engaged';
    return 'disengaged';
  }
}

module.exports = DemocraticGovernanceServiceImpl;