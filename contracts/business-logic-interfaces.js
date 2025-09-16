/**
 * Business Logic Layer Contracts (Layer 3)
 *
 * SCOPE: Interface definitions for business logic services ONLY
 * DOES NOT: Contain implementations, data access, or infrastructure concerns
 * ONLY: Defines business operation contracts for liberation platform
 */

/**
 * Creator Sovereignty Service Contract
 * Handles mathematical 75% creator revenue enforcement
 */
class ICreatorSovereigntyService {
  /**
   * Validate creator revenue share meets mathematical minimum
   * @param {Object} revenueData - Revenue distribution data
   * @returns {Promise<Object>} - Validation result with compliance status
   */
  async validateCreatorShare(revenueData) {
    throw new Error('validateCreatorShare must be implemented by concrete service');
  }

  /**
   * Enforce minimum 75% creator share across all operations
   * @param {Object} operation - Operation with revenue implications
   * @returns {Promise<Object>} - Enforcement result with mathematical validation
   */
  async enforceMinimumShare(operation) {
    throw new Error('enforceMinimumShare must be implemented by concrete service');
  }

  /**
   * Calculate creator sovereignty metrics for transparency
   * @param {Object} creatorData - Creator operation data
   * @returns {Promise<Object>} - Sovereignty metrics and compliance status
   */
  async calculateSovereigntyMetrics(creatorData) {
    throw new Error('calculateSovereigntyMetrics must be implemented by concrete service');
  }

  /**
   * Validate narrative control maintenance
   * @param {Object} contentOperation - Content operation data
   * @returns {Promise<boolean>} - True if narrative control maintained
   */
  async validateNarrativeControl(contentOperation) {
    throw new Error('validateNarrativeControl must be implemented by concrete service');
  }
}

/**
 * Democratic Governance Service Contract
 * Handles one-member-one-vote validation and community decisions
 */
class IDemocraticGovernanceService {
  /**
   * Validate one-member-one-vote compliance
   * @param {Object} voteRequest - Voting operation data
   * @returns {Promise<Object>} - Vote validation result
   */
  async validateOneMemberOneVote(voteRequest) {
    throw new Error('validateOneMemberOneVote must be implemented by concrete service');
  }

  /**
   * Process democratic governance decision
   * @param {Object} governanceDecision - Community decision data
   * @returns {Promise<Object>} - Processing result with community impact
   */
  async processGovernanceDecision(governanceDecision) {
    throw new Error('processGovernanceDecision must be implemented by concrete service');
  }

  /**
   * Calculate participation rate for democratic legitimacy
   * @param {Object} participationData - Community participation data
   * @returns {Promise<number>} - Participation rate (0-1)
   */
  async calculateParticipationRate(participationData) {
    throw new Error('calculateParticipationRate must be implemented by concrete service');
  }

  /**
   * Validate community benefit from governance decision
   * @param {Object} decision - Governance decision to validate
   * @returns {Promise<Object>} - Community benefit assessment
   */
  async validateCommunityBenefit(decision) {
    throw new Error('validateCommunityBenefit must be implemented by concrete service');
  }
}

/**
 * Community Protection Service Contract
 * Handles anti-oppression and trauma-informed protection algorithms
 */
class ICommunityProtectionService {
  /**
   * Perform community protection validation
   * @param {Object} protectionRequest - Protection validation request
   * @returns {Promise<Object>} - Protection assessment with effectiveness score
   */
  async performProtectionCheck(protectionRequest) {
    throw new Error('performProtectionCheck must be implemented by concrete service');
  }

  /**
   * Apply trauma-informed protection mechanisms
   * @param {Object} interactionData - User interaction data
   * @returns {Promise<Object>} - Trauma-informed adjustments
   */
  async applyTraumaInformedProtection(interactionData) {
    throw new Error('applyTraumaInformedProtection must be implemented by concrete service');
  }

  /**
   * Validate anti-oppression compliance
   * @param {Object} operationData - Operation to validate
   * @returns {Promise<Object>} - Anti-oppression assessment
   */
  async validateAntiOppression(operationData) {
    throw new Error('validateAntiOppression must be implemented by concrete service');
  }

  /**
   * Calculate aggregate protection effectiveness
   * @param {Array} protectionResults - Protection check results
   * @returns {Promise<Object>} - Aggregate effectiveness metrics
   */
  async calculateAggregateEffectiveness(protectionResults) {
    throw new Error('calculateAggregateEffectiveness must be implemented by concrete service');
  }
}

/**
 * Revenue Transparency Service Contract
 * Handles transparent revenue calculation and community benefit tracking
 */
class IRevenueTransparencyService {
  /**
   * Calculate transparent revenue distribution
   * @param {Object} revenueData - Revenue operation data
   * @returns {Promise<Object>} - Transparent revenue breakdown
   */
  async calculateTransparentDistribution(revenueData) {
    throw new Error('calculateTransparentDistribution must be implemented by concrete service');
  }

  /**
   * Track community benefit from revenue operations
   * @param {Object} benefitData - Community benefit tracking data
   * @returns {Promise<Object>} - Community benefit metrics
   */
  async trackCommunityBenefit(benefitData) {
    throw new Error('trackCommunityBenefit must be implemented by concrete service');
  }

  /**
   * Generate liberation impact metrics
   * @param {Object} operationData - Operation impact data
   * @returns {Promise<Object>} - Liberation impact assessment
   */
  async generateLiberationImpactMetrics(operationData) {
    throw new Error('generateLiberationImpactMetrics must be implemented by concrete service');
  }

  /**
   * Validate economic justice compliance
   * @param {Object} economicOperation - Economic operation to validate
   * @returns {Promise<boolean>} - True if economically just
   */
  async validateEconomicJustice(economicOperation) {
    throw new Error('validateEconomicJustice must be implemented by concrete service');
  }
}

/**
 * Feature Flag Management Service Contract
 * Handles community-controlled feature flag operations
 */
class IFeatureFlagService {
  /**
   * Validate feature flag governance requirements
   * @param {Object} flagRequest - Feature flag change request
   * @returns {Promise<Object>} - Governance validation result
   */
  async validateFeatureFlagGovernance(flagRequest) {
    throw new Error('validateFeatureFlagGovernance must be implemented by concrete service');
  }

  /**
   * Apply feature flag change with community oversight
   * @param {Object} flagChange - Feature flag change data
   * @returns {Promise<Object>} - Change application result
   */
  async applyFeatureFlagChange(flagChange) {
    throw new Error('applyFeatureFlagChange must be implemented by concrete service');
  }

  /**
   * Assess liberation impact of feature flag change
   * @param {Object} flagData - Feature flag impact data
   * @returns {Promise<Object>} - Liberation impact assessment
   */
  async assessLiberationImpact(flagData) {
    throw new Error('assessLiberationImpact must be implemented by concrete service');
  }
}

/**
 * Liberation Metrics Service Contract
 * Handles liberation metric calculation and rollback detection
 */
class ILiberationMetricsService {
  /**
   * Monitor liberation metrics across all services
   * @param {Object} metricsData - Service metrics data
   * @returns {Promise<Object>} - Liberation metrics assessment
   */
  async monitorLiberationMetrics(metricsData) {
    throw new Error('monitorLiberationMetrics must be implemented by concrete service');
  }

  /**
   * Detect threshold violations requiring rollback
   * @param {Object} thresholdData - Threshold monitoring data
   * @returns {Promise<Array>} - Array of threshold violations
   */
  async detectThresholdViolations(thresholdData) {
    throw new Error('detectThresholdViolations must be implemented by concrete service');
  }

  /**
   * Calculate overall liberation health score
   * @param {Object} healthData - System health data
   * @returns {Promise<Object>} - Liberation health assessment
   */
  async calculateLiberationHealth(healthData) {
    throw new Error('calculateLiberationHealth must be implemented by concrete service');
  }

  /**
   * Trigger liberation metric rollbacks
   * @param {Array} violations - Detected violations requiring rollback
   * @returns {Promise<Object>} - Rollback execution result
   */
  async triggerLiberationRollbacks(violations) {
    throw new Error('triggerLiberationRollbacks must be implemented by concrete service');
  }
}

// Export all business logic interfaces
module.exports = {
  ICreatorSovereigntyService,
  IDemocraticGovernanceService,
  ICommunityProtectionService,
  IRevenueTransparencyService,
  IFeatureFlagService,
  ILiberationMetricsService
};